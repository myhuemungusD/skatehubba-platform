import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, Text, Pressable, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useMicrophonePermission } from 'react-native-vision-camera';
import { useMutation } from '@tanstack/react-query';
import { ref, uploadBytes } from 'firebase/storage';
import Reanimated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { Video } from 'react-native-compressor'; 
import { SKATE } from '../../../theme';
import { storage, auth } from '@/lib/firebase';
import * as Haptics from 'expo-haptics';
import { useSkateHubba } from '@skatehubba/api-sdk';

export default function NewChallenge() {
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState(15);
  
  const api = useSkateHubba(); 

  const { hasPermission: hasCam, requestPermission: reqCam } = useCameraPermission();
  const { hasPermission: hasMic, requestPermission: reqMic } = useMicrophonePermission();
  
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const progress = useSharedValue(0);

  useEffect(() => {
    if (!hasCam) reqCam();
    if (!hasMic) reqMic();
  }, []);

  const mutation = useMutation({
    mutationFn: async (videoPath: string) => {
      const compressedUri = await Video.compress(
        videoPath,
        { compressionMethod: 'auto', minimumFileSizeForCompress: 2 },
      );

      const blobResponse = await fetch(compressedUri);
      const clipBlob = await blobResponse.blob();
      const filename = `clips/${auth.currentUser?.uid || 'anon'}/${Date.now()}.mp4`;
      const storageRef = ref(storage, filename);
      await uploadBytes(storageRef, clipBlob);

      return await api.challenges.create({
        creatorId: auth.currentUser?.uid || 'unknown',
        status: 'pending',
        rules: { oneTake: true, durationSec: 15 },
        videoUrl: storageRef.fullPath,
        createdAt: Date.now(),
      });
    },
    onSuccess: () => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert('STOMPED IT!', 'Clip uploaded. Waiting for opponent.');
      setCountdown(15);
      progress.value = 0;
    },
    onError: (err) => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Bail', 'Upload failed. Check your connection.');
      console.error(err);
    }
  });

  const startRecording = useCallback(async () => {
    if (!camera.current) return;
    setIsRecording(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    progress.value = withTiming(1, { duration: 15000, easing: Easing.linear });

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    try {
      await camera.current.startRecording({
        fileType: 'mp4',
        onRecordingFinished: async (video) => {
           clearInterval(interval);
           setIsRecording(false);
           mutation.mutate(video.path);
        },
        onRecordingError: (error) => {
          console.error("Camera Error", error);
          setIsRecording(false);
        },
      });
    } catch (e) {
      console.error("Start recording failed", e);
      setIsRecording(false);
    }
  }, [mutation, progress]);

  if (!device || !hasCam || !hasMic) return <View style={styles.container}><Text>Loading...</Text></View>;

  return (
    <View style={styles.container}>
      <Camera ref={camera} style={styles.camera} device={device} isActive={true} video={true} audio={true} />
      {isRecording && <Reanimated.View style={[styles.progressBar, useAnimatedStyle(() => ({ width: `${progress.value * 100}%` }))]} />}
      
      <Pressable 
        style={styles.button} 
        onPress={isRecording ? () => camera.current?.stopRecording() : startRecording}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? <ActivityIndicator color="white"/> : <Text style={styles.buttonText}>{isRecording ? 'STOP' : 'REC'}</Text>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: SKATE.colors.ink },
  camera: { flex: 1 },
  progressBar: { position: 'absolute', top: 0, left: 0, height: 6, backgroundColor: SKATE.colors.neon },
  button: { position: 'absolute', bottom: 50, alignSelf: 'center', backgroundColor: SKATE.colors.blood, padding: 20, borderRadius: 50 },
  buttonText: { color: 'white', fontWeight: '900' },
});
