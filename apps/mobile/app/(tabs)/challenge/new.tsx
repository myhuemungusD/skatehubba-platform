import { useMutation } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { db, storage } from "../../../firebase";
import { SKATE } from "../../../theme";

export default function NewChallenge() {
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState(15);
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef<Camera>(null);
  const progress = useSharedValue(0);
  const mutation = useMutation({
    mutationFn: async (clipBlob: Blob) => {
      const refPath = ref(storage, `clips/${Date.now()}.mp4`);
      await uploadBytes(refPath, clipBlob);
      await addDoc(collection(db, "challenges"), {
        createdBy: "uid",
        status: "pending",
        rules: { oneTake: true, durationSec: 15 },
        clipA: refPath.fullPath,
        ts: serverTimestamp(),
      });
    },
  });

  const startRecording = async () => {
    if (camera.current) {
      setIsRecording(true);
      Haptics.impactAsync("heavy");
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
        maxDuration: 15.0,
        maxFileSize: 8 * 1024 * 1024,
        videoBitRate: 5000000,
      });
      progress.value = withTiming(1, { duration: 15000 });
    }
  };

  const stopRecording = async () => {
    if (camera.current) {
      const clip = await camera.current.stopRecording();
      setIsRecording(false);
      await mutation.mutateAsync(clip);
      Alert.alert("Clip Sent", "Opponent has 24h to reply.");
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
