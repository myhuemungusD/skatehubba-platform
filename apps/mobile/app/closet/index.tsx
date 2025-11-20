import React, { useState } from 'react';
import { View, ImageBackground, StyleSheet, Dimensions, Pressable, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { SKATE } from '@skatehubba/ui';
import { AvatarRenderer } from '@/components/AvatarRenderer';
import { EquippedDisplay } from '@/components/EquippedDisplay';
import { CategoryTabs } from '@/components/CategoryTabs';
import { ItemGrid } from '@/components/ItemGrid';

const { width, height } = Dimensions.get('window');

type Category = 'top' | 'bottom' | 'deck' | 'trucks' | 'wheels' | 'bearings' | 'hardware' | 'stickers';

const BACKGROUND = require('@/assets/closet/shop-interior.jpg');

export default function ClosetScreen() {
  const { uid: paramUid } = useLocalSearchParams<{ uid?: string }>();
  const { user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const uid = paramUid || user?.uid;
  const isOwnCloset = !paramUid || paramUid === user?.uid;
  const [activeCategory, setActiveCategory] = useState<Category>('top');

  const rotateY = useSharedValue(0);

  const { data: closet } = useQuery({
    queryKey: ['closet', uid],
    queryFn: async () => {
      if (!uid) return { equipped: {}, owned: {} };
      const snap = await getDoc(doc(db, 'closet', uid));
      return snap.data() || { equipped: {}, owned: {} };
    },
    enabled: !!uid,
  });

  const { data: equipped } = useQuery({
    queryKey: ['equipped', uid],
    queryFn: async () => {
      if (!uid) return {};
      const snap = await getDoc(doc(db, 'users', uid, 'public', 'equipment'));
      return snap.data()?.equipped || {};
    },
    enabled: !!uid,
  });

  const equipMutation = useMutation({
    mutationFn: async ({ category, itemId }: { category: Category; itemId: string }) => {
      if (!uid) throw new Error('No user ID');
      await setDoc(
        doc(db, 'users', uid, 'public', 'equipment'),
        {
          equipped: { ...equipped, [category]: itemId },
        },
        { merge: true }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipped', uid] });
      rotateY.value = withTiming(360, { duration: 600 }, () => {
        rotateY.value = 0;
      });
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value}deg` }],
  }));

  return (
    <ImageBackground source={BACKGROUND} style={styles.container} resizeMode="cover">
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← BACK</Text>
        </Pressable>
        <Text style={styles.title}>BACKPACK</Text>
      </View>

      <View style={styles.avatarContainer}>
        <Animated.View style={[styles.avatarWrapper, animatedStyle]}>
          <AvatarRenderer equipped={equipped || {}} size={height * 0.5} />
        </Animated.View>
        {isOwnCloset && <EquippedDisplay equipped={equipped || {}} />}
      </View>

      <View style={styles.shopFloor}>
        <CategoryTabs
          categories={['TOP', 'BOTTOM', 'DECK', 'TRUCKS', 'WHEELS', 'BEARINGS', 'HARDWARE', 'STICKERS']}
          activeCategory={activeCategory.toUpperCase()}
          onSelect={(cat) => setActiveCategory(cat.toLowerCase() as Category)}
        />

        <ItemGrid
          category={activeCategory}
          ownedItems={closet?.owned?.[activeCategory] || []}
          equippedId={equipped?.[activeCategory]}
          onEquip={(itemId) => equipMutation.mutate({ category: activeCategory, itemId })}
          disabled={!isOwnCloset}
        />

        {isOwnCloset && (
          <Pressable style={styles.equipBtn} onPress={() => router.push('/shop')}>
            <Text style={styles.equipText}>GO TO SHOP</Text>
          </Pressable>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: SKATE.colors.ink },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  backBtn: { padding: 10 },
  backText: { color: SKATE.colors.neon, fontFamily: 'BakerScript', fontSize: 24 },
  title: {
    color: SKATE.colors.gold,
    fontFamily: 'BakerScript',
    fontSize: 48,
    textShadowColor: '#000',
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 0,
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 20,
  },
  shopFloor: {
    height: height * 0.45,
    backgroundColor: 'rgba(28,28,28,0.96)',
    borderTopLeftRadius: SKATE.radius.xl,
    borderTopRightRadius: SKATE.radius.xl,
    paddingTop: 20,
  },
  equipBtn: {
    backgroundColor: SKATE.colors.gold,
    marginHorizontal: 40,
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#000',
  },
  equipText: {
    color: '#000',
    fontFamily: 'BakerScript',
    fontSize: 36,
    fontWeight: '900',
  },
});
