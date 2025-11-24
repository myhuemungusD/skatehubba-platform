import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera'; // ✅ FIXED: New Architecture Camera
import { Video, ResizeMode } from 'expo-av'; // ✅ FIXED: Added ResizeMode
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Firebase Imports
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '@/lib/firebase'; // ✅ FIXED: Uses your new file
import { useAuth } from '@/hooks/useAuth';    // ✅ FIXED: Uses your new hook

// Custom Imports (Keep these if they exist in your project)
import { SKATE } from '@skatehubba/ui'; 
// import useTrickDetector from '../../src/utils/mlEdge'; // Uncomment if you have this file

const { width, height } = Dimensions.get('window');
const RECORD_DURATION = 15; // seconds

export default function NewChallengeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [facing, setFacing] = useState<'front' | 'back'>('back'); // ✅ FIXED: Type is string now
  const [permission, requestPermission] = useCameraPermissions(); // ✅ FIXED: New Permission Hook
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const cameraRef = useRef<CameraView>(null); // ✅ FIXED: Ref type

  // 1. Handle Permissions
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 2. Toggle Camera Front/Back
  function toggleCameraType() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  // 3. Start Recording
  async function startRecording() {
    if (cameraRef.current) {
      setIsRecording(true);
      try {
        const video = await cameraRef.current.recordAsync({
          maxDuration: RECORD_DURATION,
        });
        setVideoUri(video.uri);
        setIsRecording(false);
      } catch (e) {
        console.error("Recording failed", e);
        setIsRecording(false);
      }
    }
  }

  // 4. Stop Recording
  function stopRecording() {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  }

  // 5. Upload to Firebase
  async function handleUpload() {
    if (!videoUri || !user) return;
    setUploading(true);

    try {
      // A. Create Blob from URI
      const response = await fetch(videoUri);
      const blob = await response.blob();

      // B. Upload to Storage
      const filename = `challenges/${user.uid}/${Date.now()}.mp4`;
      const storageRef = ref(storage, filename);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      // C. Save Metadata to Firestore (if db is set up)
      if (db) {
        await addDoc(collection(db, "challenges"), {
            videoUrl: downloadURL,
            userId: user.uid,
            createdAt: serverTimestamp(),
            status: "pending_review"
        });
      }

      setUploading(false);
      router.replace('/(tabs)/feed'); // Go back to feed after upload
    } catch (error) {
      console.error("Upload failed", error);
      setUploading(false);
      alert("Upload failed. Please try again.");
    }
  }

  // Render Video Preview if recorded
  if (videoUri) {
    return (
      <View style={styles.container}>
        <Video
          source={{ uri: videoUri }}
          style={styles.preview}
          useNativeControls
          resizeMode={ResizeMode.COVER} // ✅ FIXED: Enum usage
          isLooping
        />
        <View style={styles.controls}>
            <TouchableOpacity onPress={() => setVideoUri(null)} style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleUpload} style={styles.primaryButton}>
                {uploading ? <ActivityIndicator color="#000"/> : <Text style={styles.primaryButtonText}>Post Challenge</Text>}
            </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Render Camera View
  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={facing} 
        ref={cameraRef}
        mode="video" // Important for recording
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Ionicons name="camera-reverse" size={30} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.recordButton, isRecording && styles.recording]}
            onPress={isRecording ? stopRecording : startRecording}
          >
            <View style={styles.recordInner} />
          </TouchableOpacity>

          <View style={styles.spacer} /> 
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  camera: { flex: 1, width: width },
  preview: { flex: 1, width: width },
  text: { color: 'white', textAlign: 'center', marginTop: 20 },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  button: {
    alignItems: 'center',
    padding: 10,
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  recordButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recording: { borderColor: 'red' },
  recordInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'red',
  },
  spacer: { width: 40 }, // Balances the layout
  controls: {
      position: 'absolute',
      bottom: 40,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
      alignItems: 'center'
  },
  primaryButton: {
      backgroundColor: '#00ff00', // SkateHubba Green
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 30,
  },
  primaryButtonText: { fontWeight: 'bold', fontSize: 16 },
  secondaryButton: {
      padding: 15,
  },
  secondaryButtonText: { color: 'white', fontSize: 16 }
});