import React, { useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';
import Reanimated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { useAuth } from '../../hooks/useAuth';
import { GrittyButton } from '@skatehubba/ui';
import { db } from '../../firebase';
import { SKATE } from '../../theme';
import type { UserProfile } from '@skatehubba/types';

export default function ProfileScreen() {
  const { user } = useAuth();
  const params = useLocalSearchParams<{ uid?: string }>();
  const uid = params.uid || user?.uid;
  const isOwner = uid === user?.uid;
  const router = useRouter();
  const progress = useSharedValue(0);

  const { data: profile } = useQuery<UserProfile>({
    queryKey: ['profile', uid],
    queryFn: async () => {
      const docRef = doc(db, 'users', uid!);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) throw new Error('Profile not found');
      return { uid: docSnap.id, ...docSnap.data() } as UserProfile;
    },
  });

  useEffect(() => {
    if (profile) {
      progress.value = withTiming(profile.xp / profile.maxXp, { duration: 800 });
    }
  }, [profile]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  if (!profile) return <Text style={styles.loading}>Loading...</Text>;

  return (
    <View style={styles.container}>
      {/* Avatar + Buddy */}
      <View style={styles.avatarContainer}>
        <Image source={{ uri: profile.avatar.buddy || '/assets/buddy-placeholder.png' }} style={styles.buddy} />
        <Image source={{ uri: profile.avatar.outfit || '/assets/avatar-default.png' }} style={styles.avatar} />
        <Image source={{ uri: profile.avatar.deck || '/assets/deck-default.png' }} style={styles.deck} />
      </View>

      <Text style={styles.handle}>{profile.handle}</Text>

      {/* Level Bar */}
      <View style={styles.levelContainer}>
        <Reanimated.View style={[styles.levelFill, animatedStyle]} />
        <Text style={styles.levelLabel}>LVL {profile.level}</Text>
        <Text style={styles.xpLabel}>{profile.xp}/{profile.maxXp}</Text>
      </View>

      {/* Stats */}
      <FlatList
        data={[
          { label: 'WINS', value: profile.stats.wins },
          { label: 'LOSSES', value: profile.stats.losses },
          { label: 'CHECK-INS', value: profile.stats.checkIns },
          { label: 'HUBBA BUCKS', value: profile.stats.hubbaBucks },
          { label: 'DISTANCE SKATED', value: `${profile.stats.distanceSkated.toFixed(1)} km` },
        ]}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{item.value}</Text>
            <Text style={styles.statLabel}>{item.label}</Text>
          </View>
        )}
        keyExtractor={item => item.label}
        contentContainerStyle={styles.statsList}
      />

      {/* Sponsors */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>VERIFIED SPONSORS</Text>
        <FlatList
          data={profile.sponsors}
          horizontal
          renderItem={({ item }) => <Text style={styles.tag}>{item}</Text>}
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Badges */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>BADGES</Text>
        <FlatList
          data={profile.badges}
          horizontal
          renderItem={({ item }) => <Image source={{ uri: item }} style={styles.badge} />}
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <GrittyButton onPress={() => router.push('/friends')} size="default">
          CHALLENGE
        </GrittyButton>
        <GrittyButton onPress={() => router.push('/checkins')} size="default">
          CHECK-INS
        </GrittyButton>
        <GrittyButton onPress={() => router.push('/closet')} size="default">
          CLOSET
        </GrittyButton>
      </View>
    </View>
  );
}

const styles = {
  container: { flex: 1, backgroundColor: SKATE.colors.ink, padding: 16 },
  avatarContainer: { alignItems: 'center', marginTop: 40, position: 'relative' as const },
  buddy: { width: 100, height: 100, position: 'absolute' as const, left: 0, bottom: 0 },
  avatar: { width: 150, height: 250 },
  deck: { width: 120, height: 40, position: 'absolute' as const, bottom: 0 },
  handle: { fontSize: 32, fontWeight: '900' as const, color: SKATE.colors.neon, textAlign: 'center' as const, marginTop: 16 },
  levelContainer: { backgroundColor: SKATE.colors.grime, height: 24, borderRadius: 12, overflow: 'hidden' as const, marginVertical: 16, position: 'relative' as const },
  levelFill: { backgroundColor: SKATE.colors.gold, height: '100%' },
  levelLabel: { position: 'absolute' as const, left: 16, color: SKATE.colors.paper, fontWeight: 'bold' as const, fontSize: 14 },
  xpLabel: { position: 'absolute' as const, right: 16, color: SKATE.colors.paper, fontSize: 12 },
  statsList: { gap: 16 },
  statCard: { flex: 1, backgroundColor: SKATE.colors.grime, padding: 16, borderRadius: 12, alignItems: 'center' as const, margin: 8 },
  statValue: { fontSize: 28, fontWeight: '900' as const, color: SKATE.colors.neon },
  statLabel: { fontSize: 14, color: SKATE.colors.gold },
  section: { marginTop: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '900' as const, color: SKATE.colors.blood, marginBottom: 8 },
  tag: { backgroundColor: SKATE.colors.grime, color: SKATE.colors.paper, padding: 8, borderRadius: 20, marginRight: 8 },
  badge: { width: 60, height: 60, marginRight: 8 },
  buttonRow: { flexDirection: 'row' as const, justifyContent: 'space-between', marginTop: 32 },
  loading: { flex: 1, color: SKATE.colors.paper, textAlign: 'center' as const, fontSize: 20, justifyContent: 'center' as const },
};
