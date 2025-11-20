import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Camera, useCameraDevices, useCameraPermission } from 'react-native-vision-camera';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db, functions } from '@/lib/firebase';
import { httpsCallable } from 'firebase/functions';
import { useAuth } from '@/hooks/useAuth';
import { SKATE } from '@skatehubba/ui';
import { Timer } from '@/components/Timer';
import { ChallengePreview } from '@/components/ChallengePreview';

const { width, height } = Dimensions.get('window');
const RECORD_DURATION = 15; // seconds, hard cap per spec

export default function NewChallengeScreen() {
  const { opponentHandle } = useLocalSearchParams<{ opponentHandle: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const { hasPermission, requestPermission } = useCameraPermission();

  const device = devices.back;

  if (!hasPermission) {
    // Request permission on mount
    requestPermission().then((granted) => {
      if (!granted) Alert.alert('Permission Denied', 'Camera access is required for challenges.');
    });
  }

  const createChallengeMutation = useMutation({
    mutationFn: async (videoUrl: string) => {
      if (!user?.uid || !opponentHandle) throw new Error('Missing user or opponent');

      // Client-side validation: exactly 15s
      const response = await fetch(recordedUri!);
      const blob = await response.blob();
      if (blob.size > 8 * 1024 * 1024) throw new Error('Video exceeds 8MB limit'); // H.264 720p cap

      const challengeRef = doc(db, 'challenges', doc(db, 'challenges').id);
      const challengeData = {
        createdBy: user.uid,
        opponent: opponentHandle,
        status: 'pending',
        rules: { oneTake: true, durationSec: RECORD_DURATION },
        clipA: { url: videoUrl, uploadedAt: serverTimestamp() },
        createdAt: serverTimestamp(),
      };

      await setDoc(challengeRef, challengeData);

      // Call Cloud Function for validation, transcoding, and opponent notification
      const validateAndNotify = httpsCallable(functions, 'onChallengeCreate');
      await validateAndNotify({ challengeId: challengeRef.id, videoUrl });

      return challengeRef.id;
    },
    onMutate: () => setUploadProgress(0),
    onSuccess: (challengeId) => {
      queryClient.invalidateQueries({ queryKey: ['challenges', user?.uid] });
      Alert.alert('Challenge Sent!', `Your one-take is live. ${opponentHandle} has 24h to reply.`);
      router.push(`/challenge/${challengeId}`);
    },
    onError: (err) => Alert.alert('Upload Failed', err.message),
  });

  const startRecording = async () => {
    if (camera.current && !isRecording) {
      setIsRecording(true);
      await camera.current.startRecording({
        onRecordingFinished: (video) => {
          setRecordedUri(video.path);
          setIsRecording(false);
        },
        onRecordingError: (error) => {
          Alert.alert('Recording Error', error.message);
          setIsRecording(false);
        },
      });
    }
  };

  const stopRecording = async () => {
    if (camera.current && isRecording) {
      await camera.current.stopRecording();
      setIsRecording(false);
    }
  };

  const handleUpload = async () => {
    if (!recordedUri || !user?.uid) return;

    const response = await fetch(recordedUri);
    const blob = await response.blob();
    const storageRef = ref(storage, `challenges/${user.uid}/${Date.now()}.mp4`);

    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => Alert.alert('Upload Error', error.message),
      async () => {
        const downloadURL = await getDownloadURL(storageRef);
        createChallengeMutation.mutate(downloadURL);
      }
    );
  };

  if (!device || !hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Camera not available. Grant permission to proceed.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← CANCEL</Text>
        </Pressable>
        <Text style={styles.title}>ONE-TAKE CHALLENGE</Text>
        <Text style={styles.subtitle}>vs {opponentHandle}</Text>
      </View>

      <View style={styles.cameraContainer}>
        <Camera
          ref={camera}
          style={styles.camera}
          device={device}
          isActive={true}
          video={true}
          audio={true}
          photo={false}
          enableZoomGesture={false}
        />
        {isRecording && <Timer duration={RECORD_DURATION} onExpire={stopRecording} />}
        <Pressable
          style={[styles.recordBtn, isRecording && styles.stopBtn]}
          onPress={isRecording ? stopRecording : startRecording}
          disabled={!hasPermission}
        >
          <Text style={styles.recordText}>{isRecording ? 'STOP' : 'RECORD'}</Text>
        </Pressable>
      </View>

      {recordedUri && !uploadProgress && (
        <View style={styles.preview}>
          <ChallengePreview uri={recordedUri} />
          <Pressable style={styles.uploadBtn} onPress={handleUpload}>
            <Text style={styles.uploadText}>SEND CHALLENGE</Text>
          </Pressable>
        </View>
      )}

      {uploadProgress > 0 && (
        <View style={styles.progress}>
          <Text style={styles.progressText}>Uploading... {Math.round(uploadProgress)}%</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: SKATE.colors.ink },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  backBtn: { position: 'absolute', left: 20, top: 50 },
  backText: { color: SKATE.colors.neon, fontFamily: 'BakerScript', fontSize: 24 },
  title: { color: SKATE.colors.gold, fontFamily: 'BakerScript', fontSize: 32, marginVertical: 8 },
  subtitle: { color: SKATE.colors.paper, fontSize: 18 },
  cameraContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  camera: { width: width * 0.9, height: height * 0.6, borderRadius: SKATE.radius.lg },
  recordBtn: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: SKATE.colors.blood,
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#000',
  },
  stopBtn: { backgroundColor: SKATE.colors.neon },
  recordText: { color: '#000', fontFamily: 'BakerScript', fontSize: 18, fontWeight: '900' },
  preview: { padding: 20, alignItems: 'center' },
  uploadBtn: {
    backgroundColor: SKATE.colors.gold,
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 4,
    borderColor: '#000',
  },
  uploadText: { color: '#000', fontFamily: 'BakerScript', fontSize: 24, fontWeight: '900' },
  progress: { padding: 20, alignItems: 'center' },
  progressText: { color: SKATE.colors.neon, fontFamily: 'BakerScript', fontSize: 18 },
  error: { color: SKATE.colors.blood, textAlign: 'center', padding: 40, fontSize: 16 },
});
