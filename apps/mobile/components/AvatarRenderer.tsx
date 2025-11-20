import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const AVATAR_BASE = require('@/assets/avatar/base.png');

export function AvatarRenderer({ equipped, size = 200 }: { equipped: Record<string, string>; size?: number }) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Base avatar */}
      <Image 
        source={AVATAR_BASE} 
        style={{ width: size, height: size }} 
        resizeMode="contain" 
      />

      {/* Equipped items overlay - rendered on top of base */}
      {equipped.top && (
        <View style={styles.overlay}>
          {/* Top item rendering */}
        </View>
      )}
      
      {equipped.bottom && (
        <View style={styles.overlay}>
          {/* Bottom item rendering */}
        </View>
      )}

      {equipped.deck && (
        <View style={styles.overlay}>
          {/* Deck rendering */}
        </View>
      )}

      {equipped.stickers && (
        <View style={styles.overlay}>
          {/* Stickers rendering */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
