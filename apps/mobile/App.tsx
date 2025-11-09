import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SKATE } from './theme';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SkateHubba™</Text>
      <Text style={styles.subtitle}>Mobile skateboarding social platform</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SKATE.colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: SKATE.colors.neon,
    fontSize: 32,
    fontWeight: '900',
  },
  subtitle: {
    color: SKATE.colors.paper,
    fontSize: 16,
    marginTop: 8,
  },
});
