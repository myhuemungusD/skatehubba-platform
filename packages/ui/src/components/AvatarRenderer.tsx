import React from 'react';
import { View, Image } from 'react-native';

const AVATAR_BASE = { uri: 'https://placehold.co/400x400/png?text=Avatar' };

export function AvatarRenderer({ equipped, size = 200 }: { equipped: Record<string, string>; size?: number }) {
  return (
    <View style={{ width: size, height: size, position: 'relative' }}>
      <Image source={AVATAR_BASE} style={{ width: size, height: size }} resizeMode="contain" />
      
      {/* Top Layer */}
      {equipped.top && (
        <Image 
          source={{ uri: 'https://placehold.co/400x400/png?text=' + equipped.top }} 
          style={{ position: 'absolute', top: size * 0.1, left: size * 0.1, width: size * 0.8, height: size * 0.6 }} 
          resizeMode="contain" 
        />
      )}
      
      {/* Bottom Layer */}
      {equipped.bottom && (
        <Image 
          source={{ uri: 'https://placehold.co/400x400/png?text=' + equipped.bottom }} 
          style={{ position: 'absolute', bottom: size * 0.05, left: size * 0.1, width: size * 0.8, height: size * 0.5 }} 
          resizeMode="contain" 
        />
      )}
      
      {/* Deck Layer */}
      {equipped.deck && (
        <Image 
          source={{ uri: 'https://placehold.co/400x400/png?text=' + equipped.deck }} 
          style={{ position: 'absolute', bottom: size * 0.05, left: size * 0.3, width: size * 0.4, height: size * 0.1 }} 
          resizeMode="contain" 
        />
      )}
      
      {/* Stickers (overlay on deck or top) */}
      {equipped.stickers && (
        <Image 
          source={{ uri: 'https://placehold.co/400x400/png?text=' + equipped.stickers }} 
          style={{ position: 'absolute', top: size * 0.2, right: size * 0.1, width: 40, height: 40 }} 
          resizeMode="contain" 
        />
      )}
    </View>
  );
}
