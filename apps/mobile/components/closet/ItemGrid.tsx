import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { SKATE } from '@skatehubba/ui';

interface ItemGridProps {
  category: string;
  ownedItems: string[];
  equippedId?: string;
  onEquip: (itemId: string) => void;
  disabled?: boolean;
}

export function ItemGrid({ category, ownedItems, equippedId, onEquip, disabled }: ItemGridProps) {
  if (ownedItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No {category} items yet</Text>
        <Text style={styles.emptySubtext}>Visit the shop to get gear!</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.grid}
      showsVerticalScrollIndicator={false}
    >
      {ownedItems.map((itemId) => {
        const isEquipped = itemId === equippedId;
        return (
          <Pressable
            key={itemId}
            style={[styles.item, isEquipped && styles.itemEquipped]}
            onPress={() => !disabled && onEquip(itemId)}
            disabled={disabled}
          >
            <View style={styles.itemImage}>
              {/* Placeholder for item image */}
              <View style={styles.imagePlaceholder}>
                <Text style={styles.placeholderText}>{itemId.substring(0, 2).toUpperCase()}</Text>
              </View>
            </View>
            
            {isEquipped && (
              <View style={styles.equippedBadge}>
                <Text style={styles.equippedText}>EQUIPPED</Text>
              </View>
            )}

            <Text style={styles.itemName} numberOfLines={1}>
              {formatItemName(itemId)}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

function formatItemName(itemId: string): string {
  return itemId
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    paddingBottom: 20,
  },
  item: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemEquipped: {
    borderColor: SKATE.colors.gold,
    backgroundColor: 'rgba(227,195,0,0.1)',
  },
  itemImage: {
    width: '100%',
    height: '70%',
    marginBottom: 8,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: SKATE.colors.grime,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  placeholderText: {
    color: SKATE.colors.neon,
    fontFamily: 'BakerScript',
    fontSize: 24,
    fontWeight: '900',
  },
  equippedBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: SKATE.colors.gold,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#000',
  },
  equippedText: {
    color: '#000',
    fontFamily: 'BakerScript',
    fontSize: 10,
    fontWeight: '900',
  },
  itemName: {
    color: SKATE.colors.paper,
    fontFamily: 'BakerScript',
    fontSize: 12,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    color: SKATE.colors.paper,
    fontFamily: 'BakerScript',
    fontSize: 24,
    marginBottom: 8,
  },
  emptySubtext: {
    color: SKATE.colors.neon,
    fontFamily: 'BakerScript',
    fontSize: 18,
  },
});
