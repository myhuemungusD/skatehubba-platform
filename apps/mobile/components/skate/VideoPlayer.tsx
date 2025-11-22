import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface VideoPlayerProps {
  url: string;
  style?: any;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>Video Player</Text>
      <Text style={styles.url}>{url}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  url: {
    color: '#666',
    fontSize: 10,
    marginTop: 4,
  }
});
