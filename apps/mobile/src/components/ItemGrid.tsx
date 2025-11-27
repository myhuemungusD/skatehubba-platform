import { FlatList, Image, Pressable, StyleSheet, Text } from "react-native";
import { SKATE } from "@/theme";

// Expanded catalog with real skateboarding brands: PD (Dustin Dollin), Hours is Yours, Happy Hour Shades
const PRODUCT_CATALOG = {
  top: [
    {
      id: "thrasher-black",
      name: "THRASHER TEE",
      price: 450,
      image: require("@/assets/items/thrasher-hoodie-black.png"),
      brand: "Thrasher",
      category: "top",
    },
    {
      id: "thrasher-purple",
      name: "THRASHER HOODIE",
      price: 800,
      image: require("@/assets/items/thrasher-hoodie-purple.png"),
      brand: "Thrasher",
      category: "top",
    },
    {
      id: "pd-dollin-tee",
      name: "DOLLIN PD TEE",
      price: 650,
      image: require("@/assets/items/pd-dollin-tee.png"),
      brand: "PD x Dustin Dollin",
      category: "top",
    },
    {
      id: "hiy-cashmere-crew",
      name: "HIY CASHMERE CREW",
      price: 950,
      image: require("@/assets/items/hiy-cashmere-crew.png"),
      brand: "Hours is Yours",
      category: "top",
    },
    {
      id: "happy-hour-stencil-shirt",
      name: "HAPPY HOUR STENCIL SHIRT",
      price: 550,
      image: require("@/assets/items/happy-hour-stencil.png"),
      brand: "Happy Hour Shades",
      category: "top",
    },
  ],
  bottom: [
    {
      id: "Baker-black-jeans",
      name: "BAKER DENIM",
      price: 720,
      image: require("@/assets/items/baker-jeans.png"),
      brand: "Baker Brand",
      category: "bottom",
    },
    {
      id: "thrasher-shorts",
      name: "THRASHER SHORTS",
      price: 380,
      image: require("@/assets/items/thrasher-shorts.png"),
      brand: "Thrasher",
      category: "bottom",
    },
    {
      id: "pd-chaos-cargo",
      name: "PD CHAOS CARGO",
      price: 850,
      image: require("@/assets/items/pd-chaos-cargo.png"),
      brand: "PD x Dustin Dollin",
      category: "bottom",
    },
    {
      id: "hiy-herman-denim",
      name: "HIY HERMAN DENIM",
      price: 900,
      image: require("@/assets/items/hiy-herman-denim.png"),
      brand: "Hours is Yours",
      category: "bottom",
    },
  ],
  deck: [
    {
      id: "baker-pro-deck",
      name: "BAKER PRO DECK",
      price: 650,
      image: require("@/assets/items/baker-pro-deck.png"),
      brand: "Baker Brand",
      category: "deck",
    },
    {
      id: "thrasher-mag-deck",
      name: "THRASHER MAG DECK",
      price: 580,
      image: require("@/assets/items/thrasher-mag-deck.png"),
      brand: "Thrasher",
      category: "deck",
    },
    {
      id: "pd-dollin-deck",
      name: "DOLLIN PD DECK",
      price: 700,
      image: require("@/assets/items/pd-dollin-deck.png"),
      brand: "PD x Dustin Dollin",
      category: "deck",
    },
  ],
  trucks: [
    {
      id: "thunder-lights",
      name: "THUNDER LIGHTS",
      price: 560,
      image: require("@/assets/items/thunder-lights.png"),
      brand: "Thunder",
      category: "trucks",
    },
    {
      id: "independent-std",
      name: "INDEPENDENT STD",
      price: 620,
      image: require("@/assets/items/independent-std.png"),
      brand: "Independent",
      category: "trucks",
    },
    {
      id: "royal-trucks",
      name: "ROYAL TRUCKS",
      price: 540,
      image: require("@/assets/items/royal-trucks.png"),
      brand: "Royal",
      category: "trucks",
    },
  ],
  wheels: [
    {
      id: "spitfire-wheels",
      name: "SPITFIRE CLASSICS",
      price: 480,
      image: require("@/assets/items/spitfire-wheels.png"),
      brand: "Spitfire",
      category: "wheels",
    },
    {
      id: "bones-wheels",
      name: "BONES STF V2",
      price: 500,
      image: require("@/assets/items/bones-wheels.png"),
      brand: "Bones",
      category: "wheels",
    },
    {
      id: "ricta-clouds",
      name: "RICTA CLOUDS",
      price: 520,
      image: require("@/assets/items/ricta-clouds.png"),
      brand: "Ricta",
      category: "wheels",
    },
  ],
  shoes: [
    {
      id: "hiy-cohiba-sl30",
      name: "COHIBA SL30 LOAFER",
      price: 1100,
      image: require("@/assets/items/hiy-cohiba-sl30.png"),
      brand: "Hours is Yours",
      category: "shoes",
    },
    {
      id: "hiy-callio-s77",
      name: "CALLIO S77 BLUE",
      price: 1200,
      image: require("@/assets/items/hiy-callio-s77.png"),
      brand: "HIY x Heroin",
      category: "shoes",
    },
    {
      id: "pd-dollin-kicks",
      name: "DOLLIN PD KICKS",
      price: 800,
      image: require("@/assets/items/pd-dollin-kicks.png"),
      brand: "PD x Dustin Dollin",
      category: "shoes",
    },
  ],
  accessories: [
    {
      id: "happy-hour-polar",
      name: "HAPPY HOUR POLAR",
      price: 450,
      image: require("@/assets/items/happy-hour-polar.png"),
      brand: "Happy Hour Shades",
      category: "accessories",
      colors: ["Black", "Tortoise", "Green"],
    },
    {
      id: "happy-hour-aviator",
      name: "HAPPY HOUR AVIATOR",
      price: 500,
      image: require("@/assets/items/happy-hour-aviator.png"),
      brand: "Happy Hour Shades",
      category: "accessories",
      colors: ["Gold", "Mirror"],
    },
    {
      id: "pd-dollin-chain",
      name: "DOLLIN CHAIN",
      price: 300,
      image: require("@/assets/items/pd-dollin-chain.png"),
      brand: "PD x Dustin Dollin",
      category: "accessories",
    },
    {
      id: "baker-sticker-pack",
      name: "BAKER STICKER PACK",
      price: 100,
      image: require("@/assets/items/baker-stickers.png"),
      brand: "Baker Brand",
      category: "accessories",
    },
  ],
};

interface ItemGridProps {
  category: string;
  ownedItems: string[];
  equippedId?: string;
  onEquip: (id: string) => void;
  disabled?: boolean;
}

export function ItemGrid({
  category,
  ownedItems,
  equippedId,
  onEquip,
  disabled,
}: ItemGridProps) {
  const items = PRODUCT_CATALOG[category as keyof typeof PRODUCT_CATALOG] || [];

  return (
    <FlatList
      data={items}
      numColumns={3}
      keyExtractor={(i) => i.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => {
        const isOwned = ownedItems.includes(item.id);
        const isEquipped = equippedId === item.id;

        return (
          <Pressable
            style={[styles.item, !isOwned && styles.locked]}
            disabled={disabled || !isOwned}
            onPress={() => isOwned && onEquip(item.id)}
          >
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.brand} numberOfLines={1}>
              {item.brand}
            </Text>
            {isEquipped && <Text style={styles.equipped}>✓ EQUIPPED</Text>}
            {!isOwned && <Text style={styles.price}>{item.price} ₿</Text>}
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 12 },
  item: {
    flex: 1,
    margin: 6,
    backgroundColor: "#1c1c1c",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000",
  },
  locked: { opacity: 0.5 },
  image: { width: 70, height: 70 },
  name: {
    color: SKATE.colors.gold,
    fontFamily: "BakerScript",
    marginTop: 6,
    fontSize: 12,
    fontWeight: "700",
  },
  brand: {
    color: SKATE.colors.neon,
    fontSize: 9,
    marginTop: 2,
    fontFamily: "monospace",
  },
  equipped: {
    color: SKATE.colors.neon,
    fontSize: 10,
    marginTop: 4,
    fontWeight: "bold",
  },
  price: {
    color: SKATE.colors.blood,
    fontWeight: "bold",
    marginTop: 4,
    fontSize: 11,
  },
});
