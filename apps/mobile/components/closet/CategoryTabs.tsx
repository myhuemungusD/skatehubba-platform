import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SKATE } from '@skatehubba/ui';

interface CategoryTabsProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export function CategoryTabs({ categories, selected, onSelect }: CategoryTabsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => {
        const isSelected = category === selected;
        return (
          <Pressable
            key={category}
            style={[styles.tab, isSelected && styles.tabActive]}
            onPress={() => onSelect(category)}
          >
            <Text style={[styles.tabText, isSelected && styles.tabTextActive]}>
              {category}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  tabActive: {
    backgroundColor: SKATE.colors.gold,
    borderColor: SKATE.colors.gold,
  },
  tabText: {
    color: SKATE.colors.paper,
    fontFamily: 'BakerScript',
    fontSize: 18,
    fontWeight: '700',
  },
  tabTextActive: {
    color: '#000',
    fontWeight: '900',
  },
});
