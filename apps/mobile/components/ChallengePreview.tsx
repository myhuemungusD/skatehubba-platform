import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { SKATE } from '@skatehubba/ui';

const { width } = Dimensions.get('window');

interface ChallengePreviewProps {
  uri: string;
}

export function ChallengePreview({ uri }: ChallengePreviewProps) {
  return (
    <View style={styles.container}>
      <Video
        source={{ uri }}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay
        isMuted
      />
      <Text style={styles.label}>PREVIEW YOUR ONE-TAKE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  video: {
    width: width * 0.8,
    height: 200,
    borderRadius: SKATE.radius.lg,
    borderWidth: 3,
    borderColor: '#000',
  },
  label: {
    color: SKATE.colors.gold,
    fontFamily: 'BakerScript',
    fontSize: 18,
    marginTop: 12,
  },
});
