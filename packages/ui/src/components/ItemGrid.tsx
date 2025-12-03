import { FlatList, Image, Pressable, Text, StyleSheet, View } from 'react-native';
import { SKATE } from '../theme';

const MOCK_ITEMS: Record<string, Array<{ id: string; name: string; price: number; image: any; brand?: string }>> = {
  top: [
    { id: 'thrasher-black', name: 'THRASHER HOODIE', price: 800, image: { uri: 'https://placehold.co/200x200/png?text=Thrasher' }, brand: 'Thrasher' },
    { id: 'thrasher-purple', name: 'THRASHER HOODIE', price: 800, image: { uri: 'https://placehold.co/200x200/png?text=Thrasher+Purple' }, brand: 'Thrasher' },
    { id: 'hours-hoodie', name: 'HOURS CREW', price: 950, image: { uri: 'https://placehold.co/200x200/png?text=Hours' }, brand: 'Hours is Yours' },
    { id: 'pd-tee', name: 'PISS DRUNK TEE', price: 600, image: { uri: 'https://placehold.co/200x200/png?text=PD' }, brand: 'PD' },
    { id: 'shake-junt-flannel', name: 'SHAKE JUNT FLANNEL', price: 700, image: { uri: 'https://placehold.co/200x200/png?text=Shake+Junt' }, brand: 'Shake Junt' },
  ],
  bottom: [
    { id: 'pd-cargo', name: 'PD CARGO PANTS', price: 850, image: { uri: 'https://placehold.co/200x200/png?text=PD+Cargo' }, brand: 'PD' },
    { id: 'hours-denim', name: 'HOURS JEANS', price: 900, image: { uri: 'https://placehold.co/200x200/png?text=Hours+Jeans' }, brand: 'Hours is Yours' },
    { id: 'baker-pants', name: 'BAKER CARGO', price: 750, image: { uri: 'https://placehold.co/200x200/png?text=Baker+Cargo' }, brand: 'Baker' },
  ],
  deck: [
    { id: 'pd-dollin-deck', name: 'DOLLIN PD DECK', price: 650, image: { uri: 'https://placehold.co/200x200/png?text=Dollin' }, brand: 'PD' },
    { id: 'hours-herman-deck', name: 'HERMAN HIY DECK', price: 700, image: { uri: 'https://placehold.co/200x200/png?text=Herman' }, brand: 'Hours is Yours' },
    { id: 'shake-junt-deck', name: 'SHAKE JUNT DECK', price: 600, image: { uri: 'https://placehold.co/200x200/png?text=Shake+Junt' }, brand: 'Shake Junt' },
    { id: 'baker-skull-deck', name: 'BAKER SKULL', price: 620, image: { uri: 'https://placehold.co/200x200/png?text=Baker' }, brand: 'Baker' },
  ],
  trucks: [
    { id: 'independent', name: 'INDEPENDENT 139', price: 550, image: { uri: 'https://placehold.co/200x200/png?text=Indy' }, brand: 'Independent' },
    { id: 'thunder', name: 'THUNDER 147', price: 580, image: { uri: 'https://placehold.co/200x200/png?text=Thunder' }, brand: 'Thunder' },
  ],
  wheels: [
    { id: 'spitfire', name: 'SPITFIRE 52MM', price: 400, image: { uri: 'https://placehold.co/200x200/png?text=Spitfire' }, brand: 'Spitfire' },
    { id: 'bones', name: 'BONES STF 53MM', price: 420, image: { uri: 'https://placehold.co/200x200/png?text=Bones' }, brand: 'Bones' },
  ],
  bearings: [
    { id: 'bones-reds', name: 'BONES REDS', price: 300, image: { uri: 'https://placehold.co/200x200/png?text=Reds' }, brand: 'Bones' },
    { id: 'bronson', name: 'BRONSON G3', price: 350, image: { uri: 'https://placehold.co/200x200/png?text=Bronson' }, brand: 'Bronson' },
  ],
  hardware: [
    { id: 'shake-junt-hardware', name: 'SHAKE JUNT BOLTS', price: 50, image: { uri: 'https://placehold.co/200x200/png?text=Bolts' }, brand: 'Shake Junt' },
  ],
  stickers: [
    { id: 'pd-sticker', name: 'PD LOGO STICKER', price: 20, image: { uri: 'https://placehold.co/200x200/png?text=PD+Sticker' }, brand: 'PD' },
    { id: 'hours-sticker', name: 'HIY CLOCK STICKER', price: 25, image: { uri: 'https://placehold.co/200x200/png?text=HIY+Sticker' }, brand: 'Hours is Yours' },
    { id: 'shake-junt-sticker', name: 'SHAKE JUNT HAND STICKER', price: 15, image: { uri: 'https://placehold.co/200x200/png?text=SJ+Sticker' }, brand: 'Shake Junt' },
  ],
};

export function ItemGrid({ category, ownedItems, equippedId, onEquip, onTrade, disabled }: {
  category: string;
  ownedItems: string[];
  equippedId?: string;
  onEquip: (id: string) => void;
  onTrade?: (id: string) => void;
  disabled?: boolean;
}) {
  const items = MOCK_ITEMS[category] || [];

  return (
    <FlatList
      data={items}
      numColumns={3}
      keyExtractor={(i: any) => i.id}
      contentContainerStyle={{ padding: 20 }}
      renderItem={({ item }: { item: any }) => {
        const isOwned = ownedItems.includes(item.id);
        const isEquipped = equippedId === item.id;
        const canInteract = isOwned && (!disabled || !!onTrade);

        return (
          <Pressable
            style={[
              styles.item, 
              !isOwned && styles.locked, 
              isEquipped && styles.equippedItem
            ]}
            disabled={!canInteract}
            onPress={() => {
              if (onTrade && disabled) {
                onTrade(item.id);
              } else {
                onEquip(item.id);
              }
            }}
          >
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} resizeMode="contain" />
              {item.brand && <Text style={styles.brand}>{item.brand}</Text>}
            </View>
            <Text style={styles.name}>{item.name}</Text>
            {isEquipped && <Text style={styles.equipped}>EQUIPPED</Text>}
            {!isOwned && <Text style={styles.price}>{item.price} ₿</Text>}
            {onTrade && disabled && isOwned && (
              <Text style={styles.tradeText}>TRADE</Text>
            )}
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
  tradeText: {
    color: SKATE.colors.neon,
    fontSize: 10,
    marginTop: 4,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: SKATE.colors.neon,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
});
