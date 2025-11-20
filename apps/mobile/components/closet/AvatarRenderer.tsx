import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { SKATE } from '@skatehubba/ui';

interface AvatarRendererProps {
  equipped: Record<string, string>;
  size: number;
}

export function AvatarRenderer({ equipped, size }: AvatarRendererProps) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Base avatar body */}
      <View style={[styles.body, { width: size * 0.6, height: size * 0.8 }]}>
        {/* Head */}
        <View style={[styles.head, { width: size * 0.25, height: size * 0.25 }]} />
        
        {/* Torso */}
        <View style={[styles.torso, { width: size * 0.35, height: size * 0.3 }]}>
          {equipped.top && (
            <View style={[styles.equipped, styles.topEquipped]}>
              {/* Render equipped top item */}
            </View>
          )}
        </View>

        {/* Legs */}
        <View style={[styles.legs, { width: size * 0.3, height: size * 0.25 }]}>
          {equipped.bottom && (
            <View style={[styles.equipped, styles.bottomEquipped]}>
              {/* Render equipped bottom item */}
            </View>
          )}
        </View>
      </View>

      {/* Skateboard */}
      <View style={[styles.skateboard, { width: size * 0.5, height: size * 0.15 }]}>
        {equipped.deck && (
          <View style={[styles.deck, { backgroundColor: SKATE.colors.gold }]} />
        )}
        {equipped.trucks && (
          <>
            <View style={[styles.truck, styles.truckLeft]} />
            <View style={[styles.truck, styles.truckRight]} />
          </>
        )}
        {equipped.wheels && (
          <>
            <View style={[styles.wheel, styles.wheelFL]} />
            <View style={[styles.wheel, styles.wheelFR]} />
            <View style={[styles.wheel, styles.wheelBL]} />
            <View style={[styles.wheel, styles.wheelBR]} />
          </>
        )}
      </View>

      {/* Stickers overlay */}
      {equipped.stickers && (
        <View style={styles.stickerLayer}>
          {/* Render stickers */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  body: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  head: {
    backgroundColor: '#f5d6ba',
    borderRadius: 100,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#000',
  },
  torso: {
    backgroundColor: SKATE.colors.grime,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#000',
    position: 'relative',
  },
  legs: {
    backgroundColor: '#1a4d8f',
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#000',
    position: 'relative',
  },
  skateboard: {
    marginTop: 20,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deck: {
    width: '100%',
    height: '60%',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#000',
  },
  truck: {
    position: 'absolute',
    width: 30,
    height: 8,
    backgroundColor: '#888',
    borderWidth: 2,
    borderColor: '#000',
  },
  truckLeft: { left: '15%', top: '50%' },
  truckRight: { right: '15%', top: '50%' },
  wheel: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#222',
    borderWidth: 2,
    borderColor: '#000',
  },
  wheelFL: { left: '10%', top: '40%' },
  wheelFR: { left: '30%', top: '40%' },
  wheelBL: { right: '30%', top: '40%' },
  wheelBR: { right: '10%', top: '40%' },
  equipped: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topEquipped: {
    borderRadius: 12,
  },
  bottomEquipped: {
    borderRadius: 8,
  },
  stickerLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
