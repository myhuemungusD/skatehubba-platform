import { View, Text, StyleSheet } from 'react-native';
import { SKATE } from '../theme';

export function EquippedDisplay({ equipped }: { equipped: Record<string, string> }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>HARDWARE: x{equipped.hardware || 0}</Text>
      <Text style={styles.label}>BEARINGS: x{equipped.bearings || 0}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 12,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: SKATE.colors.gold,
  },
  label: {
    color: SKATE.colors.neon,
    fontFamily: 'BakerScript',
    fontSize: 18,
    marginVertical: 4,
  },
});
