import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useCreateChallenge } from '@skatehubba/utils';
import { Camera, CameraType } from 'expo-camera';
import { Video } from 'expo-av';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { serverTimestamp } from 'firebase/firestore';
import { storage } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { SKATE } from '@skatehubba/ui';

const { width, height } = Dimensions.get('window');
const RECORD_DURATION = 15; // seconds, hard cap per spec

export default function NewChallengeScreen() {
  const { opponentHandle } = useLocalSearchParams<{ opponentHandle: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(RECORD_DURATION);
  const cameraRef = useRef<Camera>(null);
  
  const createChallengeMutation = useCreateChallenge();

  // Request camera permission on mount
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Camera access is required for challenges.');
      }
    })();
  }, []);

  const handleUpload = async () => {
    if (!recordedUri || !user?.uid) return;

    setUploadProgress(10);

    try {
      const response = await fetch(recordedUri);
      const blob = await response.blob();
      
      setUploadProgress(30);
      
      const storageRef = ref(storage, `challenges/${user.uid}/${Date.now()}.mp4`);
      await uploadBytes(storageRef, blob);
      
      setUploadProgress(70);
      
      const downloadURL = await getDownloadURL(storageRef);
      
      setUploadProgress(90);
      
      await createChallengeMutation.mutateAsync({
        createdBy: user.uid,
        // opponent: opponentHandle, // TODO: Add opponent to Challenge type in utils
        // status: 'pending',
        rules: { oneTake: true, durationSec: RECORD_DURATION },
        clipA: downloadURL,
        // createdAt: serverTimestamp(),
      });
      
      setUploadProgress(100);
      Alert.alert('Challenge Sent!', `Your one-take is live. ${opponentHandle} has 24h to reply.`);
      router.back();
    } catch (error: any) {
      Alert.alert('Upload Error', error.message);
      setUploadProgress(0);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Requesting camera...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Camera permission denied. Enable in app settings.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={CameraType.back}
      />
      
      <View style={styles.overlay}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← CANCEL</Text>
        </Pressable>
        <Text style={styles.title}>ONE-TAKE CHALLENGE</Text>
        <Text style={styles.subtitle}>vs {opponentHandle}</Text>
        {isRecording && (
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{timeLeft}s</Text>
          </View>
        )}
      </View>

      {!recordedUri && (
        <Pressable
          style={[styles.recordBtn, isRecording && styles.recordingBtn]}
          onPress={isRecording ? stopRecording : startRecording}
          disabled={!hasPermission}
        >
          <Text style={styles.recordText}>{isRecording ? '● STOP' : 'RECORD'}</Text>
        </Pressable>
      )}

      {recordedUri && !uploadProgress && (
        <View style={styles.previewContainer}>
          <Video
            source={{ uri: recordedUri }}
            style={styles.previewVideo}
            resizeMode="cover"
            shouldPlay
            isLooping
            isMuted
          />
          <Text style={styles.previewLabel}>PREVIEW YOUR ONE-TAKE</Text>
          <Pressable style={styles.sendBtn} onPress={handleUpload}>
            <Text style={styles.sendText}>SEND CHALLENGE</Text>
          </Pressable>
        </View>
      )}

      {uploadProgress > 0 && uploadProgress < 100 && (
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Uploading... {Math.round(uploadProgress)}%</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: SKATE.colors.ink },
  loading: { 
    flex: 1, 
    color: SKATE.colors.neon, 
    textAlign: 'center', 
    fontSize: 24, 
    marginTop: height / 3 
  },
  error: { 
    flex: 1, 
    color: SKATE.colors.blood, 
    textAlign: 'center', 
    fontSize: 18, 
    padding: 40,
    marginTop: height / 3 
  },
  camera: { flex: 1 },
  overlay: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backBtn: { position: 'absolute', left: 20, top: 0 },
  backText: { color: SKATE.colors.neon, fontFamily: 'BakerScript', fontSize: 24 },
  title: {
    color: SKATE.colors.gold,
    fontFamily: 'BakerScript',
    fontSize: 32,
    marginVertical: 8,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: { color: SKATE.colors.paper, fontSize: 18 },
  timerContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: SKATE.colors.blood,
    marginTop: 20,
  },
  timerText: {
    color: SKATE.colors.neon,
    fontFamily: 'BakerScript',
    fontSize: 32,
    fontWeight: '900',
  },
  recordBtn: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: SKATE.colors.blood,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 20,
  },
  recordingBtn: { backgroundColor: SKATE.colors.neon },
  recordText: { color: '#000', fontFamily: 'BakerScript', fontSize: 24, fontWeight: '900' },
  previewContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    padding: 20,
    alignItems: 'center',
  },
  previewVideo: {
    width: width - 40,
    height: 200,
    borderRadius: SKATE.radius.lg,
    borderWidth: 3,
    borderColor: SKATE.colors.gold,
  },
  previewLabel: {
    color: SKATE.colors.gold,
    fontFamily: 'BakerScript',
    fontSize: 18,
    marginTop: 12,
  },
  sendBtn: {
    backgroundColor: SKATE.colors.gold,
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 4,
    borderColor: '#000',
  },
  sendText: { color: '#000', fontFamily: 'BakerScript', fontSize: 24, fontWeight: '900' },
  progressContainer: { 
    position: 'absolute', 
    bottom: 100, 
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
  },
  progressText: { 
    color: SKATE.colors.neon, 
    fontFamily: 'BakerScript', 
    fontSize: 18 
  },
});
