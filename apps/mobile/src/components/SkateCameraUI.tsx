/**
 * SkateCameraUI Component
 * 
 * Main UI component for the V2 core loop recording experience.
 * Manages the 15-second timer, recording state, and "SEND IT?" prompt.
 */

import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useRecordingTimer } from '../hooks/useRecordingTimer';
import { setCooldown } from '../services/CooldownService';
import { createSubmission } from '../services/V2SubmissionService';
import { GameLength, MAX_RECORDING_SECONDS } from '../types/v2-core-loop';
import auth from '@react-native-firebase/auth';

interface SkateCameraUIProps {
  /** Path to the recorded video file (from camera library) */
  videoFilePath: string | null;
  /** Selected game length (SKATE or SK8) */
  gameLength: GameLength;
  /** Challenge ID for this submission */
  challengeId: string;
  /** Callback when recording starts - should trigger camera.startRecording() */
  onStartRecording: () => void;
  /** Callback when recording stops - should trigger camera.stopRecording() */
  onStopRecording: () => void;
  /** Callback when video is sent successfully */
  onVideoSent?: () => void;
  /** Callback when video is deleted and cooldown is set */
  onVideoDeleted?: () => void;
}

export const SkateCameraUI: React.FC<SkateCameraUIProps> = ({
  videoFilePath,
  gameLength,
  challengeId,
  onStartRecording,
  onStopRecording,
  onVideoSent,
  onVideoDeleted,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [finalDuration, setFinalDuration] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Callback for when the 15-second timer runs out
  const onTimerEnd = useCallback(() => {
    // 1. Stop the camera recording
    onStopRecording();
    setIsRecording(false);
    
    // 2. Show the prompt immediately
    // Since the timer hit 0, the finalDuration is MAX_RECORDING_SECONDS (15)
    setFinalDuration(MAX_RECORDING_SECONDS);
    setShowPrompt(true);
  }, [onStopRecording]);

  const { timeLeft, isCounting, startTimer, stopTimer, resetTimer } = useRecordingTimer(onTimerEnd);

  // --- Core Action Handlers ---

  /**
   * Start the recording process.
   * Initiates both the camera recording and the countdown timer.
   */
  const handleStartRecording = useCallback(() => {
    if (!isRecording) {
      // 1. Start the camera recording (via parent callback)
      onStartRecording();
      setIsRecording(true);
      startTimer();
    }
  }, [isRecording, onStartRecording, startTimer]);

  /**
   * Stop the recording process manually (before timer runs out).
   * Shows the "SEND IT?" prompt with the actual recorded duration.
   */
  const handleStopRecording = useCallback(() => {
    if (isRecording) {
      // 1. Stop the camera recording (via parent callback)
      onStopRecording();
      const duration = stopTimer();
      setIsRecording(false);

      // 2. Show the prompt immediately with actual duration
      setFinalDuration(duration);
      setShowPrompt(true);
    }
  }, [isRecording, onStopRecording, stopTimer]);

  // --- Prompt Action Handlers ---

  /**
   * Handle the "SEND" action.
   * Uploads the video and creates a submission for judging.
   */
  const handleSend = useCallback(async () => {
    if (!videoFilePath) {
      console.error('No video file path available');
      return;
    }

    setIsUploading(true);

    try {
      // TODO: Upload video to Firebase Storage and get the public URL
      // For now, using the local path as a placeholder
      const videoURL = videoFilePath; // Replace with actual upload logic

      // Create the submission
      await createSubmission({
        challengeId,
        gameLength,
        videoURL,
        duration: finalDuration,
      });

      console.log('Submission created successfully');
      setShowPrompt(false);
      resetTimer();
      
      // Notify parent component
      onVideoSent?.();
    } catch (error: any) {
      console.error('Error sending submission:', error);
      alert(error.message || 'Failed to send submission');
    } finally {
      setIsUploading(false);
    }
  }, [videoFilePath, challengeId, gameLength, finalDuration, resetTimer, onVideoSent]);

  /**
   * Handle the "DELETE" action.
   * Sets the 24-hour cooldown and dismisses the prompt.
   */
  const handleDelete = useCallback(async () => {
    const userId = auth().currentUser?.uid;
    
    if (!userId) {
      console.error('No authenticated user');
      return;
    }

    try {
      // Set the cooldown
      await setCooldown(userId, challengeId);
      
      console.log('Cooldown set. User cannot attempt again for 24 hours.');
      setShowPrompt(false);
      resetTimer();
      
      // Notify parent component
      onVideoDeleted?.();
    } catch (error) {
      console.error('Error setting cooldown:', error);
      alert('Failed to set cooldown');
    }
  }, [challengeId, resetTimer, onVideoDeleted]);

  return (
    <View style={styles.container}>
      {/* 1. Timer Display */}
      {isRecording && (
        <View style={styles.timerBox}>
          <Text style={styles.timerText}>
            {`${timeLeft < 10 ? '0' : ''}${timeLeft}`}
          </Text>
        </View>
      )}

      {/* 2. Recording Button */}
      <View style={styles.captureButtonContainer}>
        <TouchableOpacity 
          style={[
            styles.captureButton, 
            isRecording ? styles.stopButton : styles.recordButton
          ]}
          onPress={isRecording ? handleStopRecording : handleStartRecording}
          disabled={isCounting && !isRecording} // Disable only during countdown before recording
        >
          {isRecording ? (
            <Text style={styles.stopText}>STOP</Text>
          ) : (
            <Text style={styles.recordText}>REC</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* 3. SEND IT? Prompt */}
      <Modal
        visible={showPrompt}
        transparent={true}
        animationType="fade"
        onRequestClose={() => !isUploading && setShowPrompt(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.promptBox}>
            <Text style={styles.promptTitle}>SEND IT?</Text>
            <Text style={styles.promptMessage}>
              This is your one chance. You recorded a {finalDuration}s clip.
            </Text>
            
            <View style={styles.promptActions}>
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={handleDelete}
                disabled={isUploading}
              >
                <Text style={styles.deleteText}>DELETE</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.sendButton, isUploading && styles.buttonDisabled]} 
                onPress={handleSend}
                disabled={isUploading}
              >
                <Text style={styles.sendText}>
                  {isUploading ? 'SENDING...' : 'SEND'}
                </Text>
              </TouchableOpacity>
            </View>
            
            {/* Take Rule Reminder */}
            <Text style={styles.takeRule}>
              *Take Rule: Clip must clearly start with the skater positioning for the trick 
              and end with a clean roll-away and full stop.
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// --- Styles ---

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
    backgroundColor: 'transparent',
  },
  timerBox: {
    position: 'absolute',
    top: 50,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  timerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'], // Ensures fixed width for digits
  },
  captureButtonContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    backgroundColor: 'red',
  },
  stopButton: {
    backgroundColor: 'white',
  },
  recordText: {
    color: 'white',
    fontWeight: 'bold',
  },
  stopText: {
    color: 'red',
    fontWeight: 'bold',
  },
  // Modal Styles
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  promptBox: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
  },
  promptTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#000',
    marginBottom: 10,
  },
  promptMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 25,
  },
  promptActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  deleteButton: {
    flex: 1,
    marginRight: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#ff6961', // Soft red for delete
  },
  sendButton: {
    flex: 1,
    marginLeft: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#007aff', // Blue for SEND/Go
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  sendText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  takeRule: {
    marginTop: 20,
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#666',
  },
});
