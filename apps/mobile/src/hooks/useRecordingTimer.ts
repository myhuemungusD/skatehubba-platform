/**
 * useRecordingTimer Hook
 * 
 * Custom hook to manage the 15-second countdown for video recording.
 * This enforces the hard limit on video duration and provides clean
 * separation of concerns for the timer logic.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { MAX_RECORDING_SECONDS } from '../types/v2-core-loop';

interface TimerControls {
  /** Current time left in seconds */
  timeLeft: number;
  /** Boolean indicating if the timer is actively counting down */
  isCounting: boolean;
  /** Function to start the countdown */
  startTimer: () => void;
  /** Function to stop the countdown and get the recorded duration */
  stopTimer: () => number;
  /** Function to reset the timer without starting it */
  resetTimer: () => void;
}

/**
 * Custom hook to manage the 15-second countdown for the video constraint.
 * 
 * @param onTimerEnd Callback function to execute when the timer hits 0.
 * @returns TimerControls object with timer state and control functions.
 */
export const useRecordingTimer = (onTimerEnd: () => void): TimerControls => {
  const [timeLeft, setTimeLeft] = useState(MAX_RECORDING_SECONDS);
  const [isCounting, setIsCounting] = useState(false);
  // Use a ref to hold the interval ID, allowing stopTimer to clear it reliably
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Start the countdown timer.
   * Called when the user begins recording.
   */
  const startTimer = useCallback(() => {
    if (intervalRef.current !== null) return; // Prevent multiple intervals
    
    setTimeLeft(MAX_RECORDING_SECONDS); // Reset to max
    setIsCounting(true);
    
    intervalRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) { // 1 second remaining, about to hit 0
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setIsCounting(false);
          onTimerEnd(); // Execute callback for max duration reached
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // 1 second interval
  }, [onTimerEnd]);

  /**
   * Stop the countdown timer.
   * Called when the user manually stops recording.
   * 
   * @returns The actual recorded duration in seconds.
   */
  const stopTimer = useCallback((): number => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // Calculate actual recorded duration for the submission document
    const recordedDuration = MAX_RECORDING_SECONDS - timeLeft;
    setIsCounting(false);
    return recordedDuration;
  }, [timeLeft]);

  /**
   * Reset the timer to initial state without starting it.
   * Useful for when the user cancels or deletes a recording.
   */
  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimeLeft(MAX_RECORDING_SECONDS);
    setIsCounting(false);
  }, []);

  // Clean up the interval on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { 
    timeLeft, 
    isCounting, 
    startTimer, 
    stopTimer, 
    resetTimer 
  };
};
