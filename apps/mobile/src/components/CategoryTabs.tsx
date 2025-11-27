import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { SKATE } from "@/theme";

interface CategoryTabsProps {
  categories: string[];
  onSelect: (category: string) => void;
  activeCategory?: string;
}

export function CategoryTabs({
  categories,
  onSelect,
  activeCategory,
}: CategoryTabsProps) {
  const [selected, setSelected] = useState(activeCategory || categories[0]);

  const handleSelect = (cat: string) => {
    setSelected(cat);
    onSelect(cat.toLowerCase());
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {categories.map((cat) => (
        <Pressable
          key={cat}
          style={[styles.tab, selected === cat && styles.activeTab]}
          onPress={() => handleSelect(cat)}
        >
          <Text style={[styles.tabText, selected === cat && styles.activeText]}>
            {cat}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 12 },
  content: { paddingVertical: 8 },
  tab: {
    backgroundColor: SKATE.colors.grime,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 8,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#000",
  },
  activeTab: {
    backgroundColor: SKATE.colors.gold,
    borderColor: SKATE.colors.neon,
  },
  tabText: {
    color: SKATE.colors.gold,
    fontFamily: "BakerScript",
    fontSize: 20,
    fontWeight: "700",
  },
  activeText: {
    color: "#000",
    fontWeight: "900",
  },
});
