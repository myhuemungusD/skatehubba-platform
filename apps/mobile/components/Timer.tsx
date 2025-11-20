import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';
import { SKATE } from '@skatehubba/ui';

interface TimerProps {
  duration: number;
  onExpire?: () => void;
}

export function Timer({ duration, onExpire }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const scaleValue = useState(new Animated.Value(1))[0];

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Pulse animation on expire
          Animated.sequence([
            Animated.timing(scaleValue, { toValue: 1.2, duration: 100, useNativeDriver: true }),
            Animated.timing(scaleValue, { toValue: 1, duration: 100, useNativeDriver: true }),
          ]).start();
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [timeLeft, duration, onExpire, scaleValue]);

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleValue }] }]}>
      <Text style={styles.text}>{Math.ceil(timeLeft)}s</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: SKATE.colors.blood,
  },
  text: {
    color: SKATE.colors.neon,
    fontFamily: 'BakerScript',
    fontSize: 32,
    fontWeight: '900',
  },
});
