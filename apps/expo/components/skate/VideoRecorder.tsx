import type React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

interface VideoRecorderProps {
  maxDurationSec?: number;
  onRecordingComplete: (uri: string) => void;
  label?: string;
}

export const VideoRecorder: React.FC<VideoRecorderProps> = ({
  maxDurationSec,
  onRecordingComplete,
  label,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label || "Record Video"}</Text>
      <Button
        title="Start Recording (Mock)"
        onPress={() =>
          onRecordingComplete("https://example.com/mock-video.mp4")
        }
      />
      <Text style={styles.subtext}>Max duration: {maxDurationSec}s</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginVertical: 16,
  },
  text: {
    color: "#fff",
    marginBottom: 10,
  },
  subtext: {
    color: "#888",
    marginTop: 5,
    fontSize: 12,
  },
});
