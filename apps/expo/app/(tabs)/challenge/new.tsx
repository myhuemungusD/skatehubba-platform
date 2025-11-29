import { useMutation } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import React, { useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import { db, storage } from "@/lib/firebase";
import { SKATE } from "../../../theme";

export default function NewChallenge() {
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState(15);
  const device = useCameraDevice("back");
  const camera = useRef<Camera>(null);
  const progress = useSharedValue(0);
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
        createdBy: auth.currentUser?.uid || 'unknown',
        status: 'pending',
        rules: { oneTake: true, durationSec: 15 },
        clipA: storageRef.fullPath,
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

  const startRecording = async () => {
    if (camera.current) {
      setIsRecording(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      const interval = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            clearInterval(interval);
            stopRecording();
            return 0;
          }
          return c - 1;
        });
      }, 1000);
      camera.current.startRecording({
        onRecordingFinished: async (video) => {
          const response = await fetch(video.path);
          const blob = await response.blob();
          await mutation.mutateAsync(blob);
          Alert.alert("Clip Sent", "Opponent has 24h to reply.");
        },
        onRecordingError: (error) => console.error(error),
      });
      progress.value = withTiming(1, { duration: 15000 });
    }
  };

  const stopRecording = async () => {
    if (camera.current) {
      await camera.current.stopRecording();
      setIsRecording(false);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  if (!device) return <Text>Loading camera...</Text>;

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={styles.camera}
        device={device}
        isActive={true}
        video={true}
      />
      {isRecording && (
        <Reanimated.View style={[styles.countdown, animatedStyle]}>
          <Text style={styles.countText}>{countdown}</Text>
        </Reanimated.View>
      )}
      <Pressable
        style={styles.button}
        onPress={isRecording ? stopRecording : startRecording}
        disabled={isRecording && countdown > 0}
      >
        <Text style={styles.buttonText}>
          {isRecording ? "Recording..." : "Start One-Shot"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: SKATE.colors.ink },
  camera: { flex: 1 },
  countdown: {
    position: "absolute",
    top: 50,
    left: 0,
    height: 4,
    backgroundColor: SKATE.colors.neon,
  },
  countText: {
    position: "absolute",
    top: -20,
    color: "white",
    fontSize: 24,
    fontWeight: "900",
  },
  button: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: SKATE.colors.blood,
    padding: 16,
    borderRadius: SKATE.radius.lg,
  },
  buttonText: { color: "white", fontWeight: "900" },
});
