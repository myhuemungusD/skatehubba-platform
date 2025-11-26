import React, { useState } from 'react';
import { View, Alert, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { SkateCameraUI } from '../components/SkateCameraUI'; 
import { GameModeSelector, GameLength } from '../components/GameModeSelector';
import { SubmissionService } from '../services/SubmissionService';

// Assuming you have navigation props
export const ChallengeScreen = ({ route, navigation }: any) => {
  // If used with Expo Router, route.params might need to be retrieved differently if not passed as props
  // But keeping as requested for now.
  const { challengeId } = route?.params || {}; 

  const [gameLength, setGameLength] = useState<GameLength | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Handlers
  const handleSelectMode = (mode: GameLength) => {
    setGameLength(mode);
  };

  const handleVideoRecorded = async (uri: string, duration: number) => {
    if (!gameLength) {
      Alert.alert("Error", "Game mode not selected.");
      return;
    }

    setIsUploading(true);

    try {
      await SubmissionService.submitChallenge({
        challengeId,
        gameLength,
        videoUri: uri,
        duration
      });

      // Success Logic
      Alert.alert("SENT IT!", "Your submission is now with the judges.", [
        { text: "OK", onPress: () => navigation.goBack() } 
      ]);
      
    } catch (error) {
      Alert.alert("Upload Failed", "Something went wrong. Please check your connection.");
    } finally {
      setIsUploading(false);
    }
  };

  // If uploading, show a blocking loader (High Stakes feel - no backgrounding allowed)
  if (isUploading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>UPLOADING CLIP...</Text>
        <Text style={styles.subLoadingText}>Don't close the app.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 1. The Setup Phase */}
      <View style={styles.header}>
        <GameModeSelector 
          selectedMode={gameLength} 
          onSelectMode={handleSelectMode} 
          locked={false} // Could lock if camera is active
        />
      </View>

      {/* 2. The Action Phase */}
      {/* Only show camera UI if game length is chosen */}
      {gameLength ? (
        <View style={styles.cameraContainer}>
          {/* We pass the simplified handler to the UI we built previously */}
          <SkateCameraUI 
            videoFilePath={null} // Managed internally by Vision Camera usually
            onVideoRecorded={handleVideoRecorded}
          />
        </View>
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>Select SKATE or SK8 to unlock camera</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { zIndex: 10 }, // Ensure dropdowns/selectors sit on top
  cameraContainer: { flex: 1, backgroundColor: 'black' },
  placeholderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee' },
  placeholderText: { color: '#999', fontWeight: 'bold' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.9)' },
  loadingText: { fontSize: 20, fontWeight: '900', marginTop: 20 },
  subLoadingText: { marginTop: 10, color: '#666' }
});
