import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../hooks/useAuth';
import { GrittyButton } from '@skatehubba/ui';
import { db } from '../../firebase';
import { SKATE } from '../../theme';
import type { AvatarItem } from '@skatehubba/types';

export default function ClosetScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const qc = useQueryClient();

  const { data: items = [] } = useQuery<AvatarItem[]>({
    queryKey: ['closet', user?.uid],
    queryFn: async () => {
      const docRef = doc(db, 'users', user!.uid);
      const docSnap = await getDoc(docRef);
      return docSnap.data()?.items || [];
    },
  });

  const equipMutation = useMutation({
    mutationFn: async (item: AvatarItem) => {
      await updateDoc(doc(db, 'users', user!.uid), {
        [`avatar.${item.type}`]: item.id,
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profile', user?.uid] }),
  });

  const proposeTrade = (item: AvatarItem) => {
    // Navigate to trade screen with item
    router.push(`/trade?itemId=${item.id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CLOSET</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemRarity}>{item.rarity.toUpperCase()}</Text>
            <GrittyButton onPress={() => equipMutation.mutate(item)} style={styles.equipButton}>
              EQUIP
            </GrittyButton>
            {item.tradable && (
              <GrittyButton variant="ghost" onPress={() => proposeTrade(item)} style={styles.tradeButton}>
                TRADE
              </GrittyButton>
            )}
          </View>
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = {
  container: { flex: 1, backgroundColor: SKATE.colors.ink, padding: 16 },
  title: { fontSize: 32, fontWeight: '900' as const, color: SKATE.colors.neon, textAlign: 'center' as const },
  listContent: { gap: 16 },
  itemCard: { flex: 1, backgroundColor: SKATE.colors.grime, padding: 16, borderRadius: 12, alignItems: 'center' as const, margin: 8 },
  itemImage: { width: 80, height: 80, marginBottom: 8 },
  itemName: { color: SKATE.colors.paper, fontWeight: 'bold' as const },
  itemRarity: { color: SKATE.colors.gold, fontSize: 12, marginBottom: 8 },
  equipButton: { padding: 8, width: '100%' },
  tradeButton: { marginTop: 8, width: '100%' },
};
