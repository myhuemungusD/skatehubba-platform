import { FlatList, Image, Pressable, Text, StyleSheet, View } from 'react-native';
import { SKATE } from '@skatehubba/ui';

const MOCK_ITEMS: Record<string, Array<{ id: string; name: string; price: number; image: any; brand?: string }>> = {
  top: [
    { id: 'thrasher-black', name: 'THRASHER HOODIE', price: 800, image: require('@/assets/items/thrasher-hoodie-black.png'), brand: 'Thrasher' },
    { id: 'thrasher-purple', name: 'THRASHER HOODIE', price: 800, image: require('@/assets/items/thrasher-hoodie-purple.png'), brand: 'Thrasher' },
    { id: 'hours-hoodie', name: 'HOURS CREW', price: 950, image: require('@/assets/items/hours-crew-neck.png'), brand: 'Hours is Yours' },
    { id: 'pd-tee', name: 'PISS DRUNK TEE', price: 600, image: require('@/assets/items/pd-tee.png'), brand: 'PD' },
    { id: 'shake-junt-flannel', name: 'SHAKE JUNT FLANNEL', price: 700, image: require('@/assets/items/shake-junt-flannel.png'), brand: 'Shake Junt' },
  ],
  bottom: [
    { id: 'pd-cargo', name: 'PD CARGO PANTS', price: 850, image: require('@/assets/items/pd-cargo.png'), brand: 'PD' },
    { id: 'hours-denim', name: 'HOURS JEANS', price: 900, image: require('@/assets/items/hours-denim.png'), brand: 'Hours is Yours' },
    { id: 'baker-pants', name: 'BAKER CARGO', price: 750, image: require('@/assets/items/baker-cargo.png'), brand: 'Baker' },
  ],
  deck: [
    { id: 'pd-dollin-deck', name: 'DOLLIN PD DECK', price: 650, image: require('@/assets/items/pd-dollin-deck.png'), brand: 'PD' },
    { id: 'hours-herman-deck', name: 'HERMAN HIY DECK', price: 700, image: require('@/assets/items/hours-herman-deck.png'), brand: 'Hours is Yours' },
    { id: 'shake-junt-deck', name: 'SHAKE JUNT DECK', price: 600, image: require('@/assets/items/shake-junt-deck.png'), brand: 'Shake Junt' },
    { id: 'baker-skull-deck', name: 'BAKER SKULL', price: 620, image: require('@/assets/items/baker-skull-deck.png'), brand: 'Baker' },
  ],
  trucks: [
    { id: 'independent', name: 'INDEPENDENT 139', price: 550, image: require('@/assets/items/independent-trucks.png'), brand: 'Independent' },
    { id: 'thunder', name: 'THUNDER 147', price: 580, image: require('@/assets/items/thunder-trucks.png'), brand: 'Thunder' },
  ],
  wheels: [
    { id: 'spitfire', name: 'SPITFIRE 52MM', price: 400, image: require('@/assets/items/spitfire-wheels.png'), brand: 'Spitfire' },
    { id: 'bones', name: 'BONES STF 53MM', price: 420, image: require('@/assets/items/bones-wheels.png'), brand: 'Bones' },
  ],
  bearings: [
    { id: 'bones-reds', name: 'BONES REDS', price: 300, image: require('@/assets/items/bones-reds.png'), brand: 'Bones' },
    { id: 'bronson', name: 'BRONSON G3', price: 350, image: require('@/assets/items/bronson-bearings.png'), brand: 'Bronson' },
  ],
  hardware: [
    { id: 'shake-junt-hardware', name: 'SHAKE JUNT BOLTS', price: 50, image: require('@/assets/items/shake-junt-hardware.png'), brand: 'Shake Junt' },
  ],
  stickers: [
    { id: 'pd-sticker', name: 'PD LOGO STICKER', price: 20, image: require('@/assets/items/pd-sticker.png'), brand: 'PD' },
    { id: 'hours-sticker', name: 'HIY CLOCK STICKER', price: 25, image: require('@/assets/items/hours-sticker.png'), brand: 'Hours is Yours' },
    { id: 'shake-junt-sticker', name: 'SHAKE JUNT HAND STICKER', price: 15, image: require('@/assets/items/shake-junt-sticker.png'), brand: 'Shake Junt' },
  ],
};

export function ItemGrid({ category, ownedItems, equippedId, onEquip, disabled }: {
  category: string;
  ownedItems: string[];
  equippedId?: string;
  onEquip: (id: string) => void;
  disabled?: boolean;
}) {
  const items = MOCK_ITEMS[category] || [];

  return (
    <FlatList
      data={items}
      numColumns={3}
      keyExtractor={(i) => i.id}
      contentContainerStyle={{ padding: 20 }}
      renderItem={({ item }) => {
        const isOwned = ownedItems.includes(item.id);
        const isEquipped = equippedId === item.id;

        return (
          <Pressable
            style={[
              styles.item, 
              !isOwned && styles.locked, 
              isEquipped && styles.equippedItem
            ]}
            disabled={disabled || !isOwned}
            onPress={() => onEquip(item.id)}
          >
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} resizeMode="contain" />
              {item.brand && <Text style={styles.brand}>{item.brand}</Text>}
            </View>
            <Text style={styles.name}>{item.name}</Text>
            {isEquipped && <Text style={styles.equipped}>EQUIPPED</Text>}
            {!isOwned && <Text style={styles.price}>{item.price} ₿</Text>}
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 8,
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000',
    minHeight: 140,
  },
  locked: { opacity: 0.4 },
  equippedItem: {
    borderColor: SKATE.colors.neon,
    backgroundColor: 'rgba(57, 255, 20, 0.1)',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  image: { width: 80, height: 80 },
  brand: { 
    color: SKATE.colors.blood, 
    fontFamily: 'BakerScript', 
    fontSize: 10, 
    marginTop: 4,
    textTransform: 'uppercase',
  },
  name: { 
    color: SKATE.colors.gold, 
    fontFamily: 'BakerScript', 
    fontSize: 12, 
    textAlign: 'center',
    marginTop: 4,
  },
  equipped: { 
    color: SKATE.colors.neon, 
    fontSize: 10, 
    marginTop: 4, 
    fontWeight: 'bold',
  },
  price: { 
    color: SKATE.colors.blood, 
    fontWeight: 'bold', 
    marginTop: 4,
    fontSize: 12,
  },
});
