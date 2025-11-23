import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';
import { useLocalSearchParams } from 'expo-router';
import { db } from '@skatehubba/utils';
import { SKATE, ARPreview, Button } from '@skatehubba/ui';
import type { User } from '@skatehubba/types';
import { Modal, Pressable } from 'react-native';
import { useState } from 'react';

export default function Profile() {
  const { handle } = useLocalSearchParams<{ handle: string }>();
  const [showAR, setShowAR] = useState(false);
  
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['profile', handle],
    queryFn: async () => {
      if (!handle) throw new Error('No handle provided');
      // In a real app, you might query by 'handle' field if doc ID isn't the handle
      // For this demo, assuming doc ID is the handle or UID mapped to handle
      const ref = doc(db, 'users', handle); 
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        // Return mock data if not found for demo purposes
        return {
          uid: 'mock-uid',
          email: 'mock@skatehubba.com',
          handle: handle,
          stance: 'regular',
          sponsors: ['Baker', 'Spitfire'],
          stats: { wins: 12, losses: 4 },
          board: { deck: 'Baker 8.25' },
          avatarUrl: 'https://github.com/shadcn.png'
        } as User;
      }
      return snap.data() as User;
    },
    enabled: !!handle,
  });

  if (isLoading) return <View style={styles.center}><Text style={styles.loading}>Loading...</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user?.avatarUrl || 'https://via.placeholder.com/150' }} style={styles.avatar} />
        <Text style={styles.handle}>@{user?.handle}</Text>
        <Text style={styles.stance}>{user?.stance?.toUpperCase()}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.title}>Sponsors</Text>
        {user?.sponsors?.map((s) => <Text key={s} style={styles.item}>{s}</Text>)}
        {!user?.sponsors?.length && <Text style={styles.item}>None yet</Text>}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.title}>Stats</Text>
        <Text style={styles.item}>W/L: {user?.stats?.wins ?? 0}/{user?.stats?.losses ?? 0}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.title}>Board Setup</Text>
        <Text style={styles.item}>Deck: {user?.board?.deck || 'Unknown'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Trophy Case</Text>
        <Button label="View 3D Ollie" onPress={() => setShowAR(true)} />
      </View>

      <Modal visible={showAR} animationType="slide" onRequestClose={() => setShowAR(false)}>
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <Pressable onPress={() => setShowAR(false)} style={{ position: 'absolute', top: 50, right: 20, zIndex: 10 }}>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>CLOSE X</Text>
            </Pressable>
            <ARPreview trickId="ollie" />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: SKATE.colors.paper, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: SKATE.colors.paper },
  header: { alignItems: 'center', marginBottom: 24, marginTop: 20 },
  avatar: { width: 120, height: 120, borderRadius: SKATE.radius.xl, borderWidth: 2, borderColor: SKATE.colors.neon },
  handle: { fontSize: 24, fontWeight: '900', color: SKATE.colors.ink, marginTop: 12 },
  stance: { fontSize: 16, color: SKATE.colors.grime, marginTop: 4 },
  section: { marginBottom: 24, backgroundColor: '#fff', padding: 16, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
  title: { fontSize: 18, fontWeight: 'bold', color: SKATE.colors.gold, marginBottom: 8 },
  item: { fontSize: 16, color: SKATE.colors.ink, marginBottom: 4 },
  loading: { fontSize: 18, color: SKATE.colors.blood },
});
