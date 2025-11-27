/**
 * JudgeScreen.tsx
 *
 * The "Judge View" - Optimized UI for rapid-fire voting.
 * Features full-screen video, optimistic updates, and a Tinder-like flow.
 */

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Video, { type VideoRef } from "react-native-video";
import { useJudgeQueue } from "../hooks/useJudgeQueue";
import type { VoteType } from "../types/v2-core-loop";

const { width, height } = Dimensions.get("window");

export default function JudgeScreen() {
  const navigation = useNavigation();
  const { queue, isLoading, error, submitVote, fetchQueue } = useJudgeQueue();
  const videoRef = useRef<VideoRef>(null);

  // We only render the first item in the queue (the "active" card)
  const currentSubmission = queue[0];
  // Fix: Performance - Preload the next video to ensure instant playback
  const nextSubmission = queue[1];

  const handleVote = (vote: VoteType) => {
    if (!currentSubmission) return;
    submitVote(currentSubmission.id, vote);
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007aff" />
        <Text style={styles.loadingText}>Entering the Chambers...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchQueue}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!currentSubmission) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="checkmark-circle-outline" size={80} color="#4cd964" />
        <Text style={styles.emptyTitle}>All Caught Up!</Text>
        <Text style={styles.emptyText}>
          You've judged all pending submissions. Check back later for more
          clips.
        </Text>
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.exitText}>Exit Chambers</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Full Screen Video - Current */}
      <Video
        ref={videoRef}
        source={{ uri: currentSubmission.videoURL }}
        style={styles.backgroundVideo}
        resizeMode="cover"
        repeat={true}
        paused={false}
        // Fix: Performance - Add buffer config to prevent stall
        bufferConfig={{
          minBufferMs: 2500,
          maxBufferMs: 5000,
          bufferForPlaybackMs: 2500,
          bufferForPlaybackAfterRebufferMs: 5000,
        }}
        onBuffer={() => {}}
        onError={(e: any) => console.log("Video Error:", e)}
      />

      {/* Fix: Performance - Hidden Video Player for Preloading Next Clip */}
      {nextSubmission && (
        <Video
          source={{ uri: nextSubmission.videoURL }}
          style={{ width: 0, height: 0, opacity: 0 }} // Hidden but active
          paused={true} // Paused but loaded
          muted={true}
          bufferConfig={{
            minBufferMs: 2500,
            maxBufferMs: 5000,
            bufferForPlaybackMs: 2500,
            bufferForPlaybackAfterRebufferMs: 5000,
          }}
        />
      )}

      {/* Overlay UI */}
      <SafeAreaView style={styles.overlayContainer}>
        {/* Header Info */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close" size={30} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.gameBadge}>
            <Text style={styles.gameText}>{currentSubmission.gameLength}</Text>
          </View>
        </View>

        {/* Bottom Controls */}
        <View style={styles.controlsContainer}>
          <Text style={styles.instructionText}>Is this a make?</Text>

          <View style={styles.buttonRow}>
            {/* LETTER (Fail) */}
            <TouchableOpacity
              style={[styles.voteButton, styles.letterButton]}
              onPress={() => handleVote("LETTER")}
            >
              <Ionicons name="close-circle" size={40} color="#FFF" />
              <Text style={styles.buttonText}>LETTER</Text>
            </TouchableOpacity>

            {/* DISPUTE (Unsure/Cheating) */}
            <TouchableOpacity
              style={[styles.voteButton, styles.disputeButton]}
              onPress={() => handleVote("DISPUTE")}
            >
              <Ionicons name="alert-circle" size={30} color="#FFF" />
              <Text style={styles.smallButtonText}>DISPUTE</Text>
            </TouchableOpacity>

            {/* LANDED (Pass) */}
            <TouchableOpacity
              style={[styles.voteButton, styles.landedButton]}
              onPress={() => handleVote("LANDED")}
            >
              <Ionicons name="checkmark-circle" size={40} color="#FFF" />
              <Text style={styles.buttonText}>LANDED</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    padding: 20,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 25,
  },
  gameBadge: {
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFF",
  },
  gameText: {
    color: "#FFF",
    fontWeight: "900",
    fontSize: 16,
  },
  controlsContainer: {
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  instructionText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "flex-end",
  },
  voteButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  letterButton: {
    backgroundColor: "#ff3b30", // Red
    flex: 1,
    marginRight: 10,
    height: 100,
  },
  landedButton: {
    backgroundColor: "#4cd964", // Green
    flex: 1,
    marginLeft: 10,
    height: 100,
  },
  disputeButton: {
    backgroundColor: "#8e8e93", // Grey
    width: 80,
    height: 80,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 5,
  },
  smallButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 5,
  },
  loadingText: {
    color: "#FFF",
    marginTop: 20,
    fontSize: 16,
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#007aff",
    borderRadius: 8,
  },
  retryText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  emptyTitle: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    color: "#ccc",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  exitButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: "#333",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#666",
  },
  exitText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
