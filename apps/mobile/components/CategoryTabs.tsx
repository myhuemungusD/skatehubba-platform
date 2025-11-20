import { ScrollView, Pressable, Text, StyleSheet } from 'react-native';
import { SKATE } from '@skatehubba/ui';

export function CategoryTabs({ 
  categories, 
  activeCategory, 
  onSelect 
}: { 
  categories: string[]; 
  activeCategory: string;
  onSelect: (cat: string) => void 
}) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {categories.map((cat) => {
        const isActive = cat === activeCategory;
        return (
          <Pressable key={cat} style={[styles.tab, isActive && styles.activeTab]} onPress={() => onSelect(cat)}>
            <Text style={[styles.tabText, isActive && styles.activeText]}>{cat}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, marginBottom: 16 },
  tab: {
    backgroundColor: SKATE.colors.grime,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#000',
  },
  activeTab: {
    backgroundColor: SKATE.colors.blood,
    borderColor: SKATE.colors.gold,
  },
  tabText: {
    color: SKATE.colors.gold,
    fontFamily: 'BakerScript',
    fontSize: 24,
  },
  activeText: {
    color: SKATE.colors.neon,
  },
});
