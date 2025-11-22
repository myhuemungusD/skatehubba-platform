import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { SKATE } from '../../theme';
import { getClient } from '../../lib/client';
import type { User } from '@skatehubba/types';

export default function SkateLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const client = await getClient();
        const data = await client.skate.leaderboard();
        setLeaderboard(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1, backgroundColor: '#000' }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GLOBAL RANKING</Text>
      <FlatList
        data={leaderboard}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={[styles.row, index === 0 && styles.goldRow]}>
            <Text style={styles.rank}>#{index + 1}</Text>
            <Text style={styles.name}>@{item.displayName || 'Anonymous'}</Text>
            <Text style={styles.stats}>
              {(item.stats as any)?.skateWins || 0}W - {(item.stats as any)?.skateLosses || 0}L
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  title: {
    color: '#ffd700',
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#222',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    alignItems: 'center',
  },
  goldRow: {
    backgroundColor: '#ffd700',
  },
  rank: {
    color: '#fff', // Will be overridden by goldRow logic if needed, but simple for now
    fontWeight: '900',
    width: 40,
  },
  name: {
    marginLeft: 16,
    color: '#fff',
    flex: 1,
    fontWeight: 'bold',
  },
  stats: {
    color: '#0f0',
    fontWeight: 'bold',
  }
});
