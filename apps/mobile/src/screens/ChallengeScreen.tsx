import { useIsFocused } from "@react-navigation/native"; // Or your router's equivalent
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
  type VideoFile,
} from "react-native-vision-camera";
import { GameLengthSelector } from "../components/GameLengthSelector";
import { SkateCameraUI } from "../components/SkateCameraUI";
import type { GameLength } from "../types/v2-core-loop";

// Assuming standard navigation props
export const ChallengeScreen = ({ route, navigation }: any) => {
  const { challengeId } = route?.params || {};
  const isFocused = useIsFocused();

  // Permissions
  const {
    hasPermission: hasCamPermission,
    requestPermission: requestCamPermission,
  } = useCameraPermission();
  const {
    hasPermission: hasMicPermission,
    requestPermission: requestMicPermission,
  } = useMicrophonePermission();

  // State
  const [selectedLength, setSelectedLength] = useState<GameLength>("SKATE"); // Default selection
  const [gameLength, setGameLength] = useState<GameLength | null>(null); // Active game length
  const [videoPath, setVideoPath] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(true); // To pause camera when backgrounded

  // Camera Refs
  const camera = useRef<Camera>(null);
  const device = useCameraDevice("back");

  // Initial Permission Request
  useEffect(() => {
    const requestPermissions = async () => {
      if (!hasCamPermission) await requestCamPermission();
      if (!hasMicPermission) await requestMicPermission();
    };
    requestPermissions();
  }, [
    hasCamPermission,
    hasMicPermission,
    requestCamPermission,
    requestMicPermission,
  ]);

  // Handle App Background/Foreground (Optional but recommended)
  useEffect(() => {
    setIsActive(isFocused);
  }, [isFocused]);

  // --- Camera Actions ---

  const handleStartRecording = useCallback(() => {
    if (!camera.current) return;

    try {
      camera.current.startRecording({
        onRecordingFinished: (video: VideoFile) => {
          console.log("Recording finished:", video.path);
          setVideoPath(video.path);
        },
        onRecordingError: (error: any) => {
          console.error("Recording error:", error);
          Alert.alert("Recording Error", "Failed to record video.");
        },
      });
    } catch (e) {
      console.error("Failed to start recording", e);
    }
  }, []);

  const handleStopRecording = useCallback(async () => {
    if (!camera.current) return;
    try {
      await camera.current.stopRecording();
    } catch (e) {
      console.error("Failed to stop recording", e);
    }
  }, []);

  // --- UI Callbacks ---

  const handleVideoSent = useCallback(() => {
    Alert.alert("SENT IT!", "Your clip is with the judges. Good luck.", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  }, [navigation]);

  const handleVideoDeleted = useCallback(() => {
    // Reset state to allow re-recording?
    // Actually, the prompt says "DELETE" sets a cooldown.
    // If cooldown is set, we should probably kick them out or show a locked state.
    // But SkateCameraUI handles the cooldown logic.
    // We just need to close the screen or reset.
    Alert.alert("Cooldown Active", "You bailed. Try again in 24 hours.", [
      { text: "Understood", onPress: () => navigation.goBack() },
    ]);
  }, [navigation]);

  const handleStartChallenge = () => {
    setGameLength(selectedLength);
  };

  // --- Render ---

  if (!hasCamPermission || !hasMicPermission) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.text}>
          Camera & Microphone permissions are required.
        </Text>
      </View>
    );
  }

  if (device == null) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.text}>No camera device found.</Text>
      </View>
    );
  }

  // Step 1: Select Game Length
  if (!gameLength) {
    return (
      <SafeAreaView style={styles.selectionContainer}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>CHALLENGE MODE</Text>
        </View>

        <View style={styles.selectorWrapper}>
          <GameLengthSelector
            selectedLength={selectedLength}
            onSelect={setSelectedLength}
          />
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartChallenge}
          >
            <Text style={styles.startButtonText}>START CHALLENGE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Step 2: Camera & Recording UI
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        video={true}
        audio={true}
      />

      <SkateCameraUI
        videoFilePath={videoPath}
        gameLength={gameLength}
        challengeId={challengeId || "default_challenge"} // Fallback if no ID
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}
        onVideoSent={handleVideoSent}
        onVideoDeleted={handleVideoDeleted}
      />

      {/* Back Button (only if not recording) */}
      {/* You might want to hide this during recording, handled by UI overlay usually */}
      <View style={styles.topBar}>
        <Text style={styles.modeBadge}>{gameLength}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  selectionContainer: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 60,
    width: "100%",
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 2,
    fontStyle: "italic",
  },
  selectorWrapper: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  actionContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 16,
  },
  startButton: {
    backgroundColor: "#FFD700", // Gold
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  startButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  cancelButton: {
    paddingVertical: 12,
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
  },
  topBar: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  modeBadge: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});
