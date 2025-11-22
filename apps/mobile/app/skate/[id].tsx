import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { VideoPlayer } from '../../components/skate/VideoPlayer';
import { VideoRecorder } from '../../components/skate/VideoRecorder';
import { SKATE } from '../../theme';
import { getClient } from '../../lib/client';
import { uploadSkateClip } from '../../lib/storage';
import type { SkateGame } from '@skatehubba/types';

export default function SkateGameScreen() {
  const { id } = useLocalSearchParams();
  const [game, setGame] = useState<SkateGame | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('mock-user-id'); // Replace with auth

  const fetchGame = async () => {
    try {
      const client = await getClient();
      const data = await client.skate.get(id as string);
      setGame(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to load game');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGame();
  }, [id]);

  if (loading || !game) return <ActivityIndicator style={{ flex: 1, backgroundColor: '#000' }} />;

  const isMyTurn = game.currentTurnId === userId;
  const isChallenger = game.challengerId === userId;
  const myLetters = isChallenger ? game.letters.challenger : game.letters.opponent;
  const oppLetters = isChallenger ? game.letters.opponent : game.letters.challenger;

  const handleAttempt = async (uri: string) => {
    try {
      const url = await uploadSkateClip(uri, userId);
      const client = await getClient();
      await client.skate.turn(game.id, {
        action: 'attempt',
        videoUrl: url
      });
      fetchGame();
    } catch (error) {
      Alert.alert('Error', 'Failed to submit attempt');
    }
  };

  const handleJudge = async (judgment: 'landed' | 'bailed') => {
    try {
      const client = await getClient();
      await client.skate.turn(game.id, {
        action: 'judge',
        judgment
      });
      fetchGame();
    } catch (error) {
      Alert.alert('Error', 'Failed to submit judgment');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.scoreBlock}>
          <Text style={styles.letters}>{myLetters || '—'}</Text>
          <Text style={styles.label}>YOU</Text>
        </View>
        <Text style={styles.vs}>SKATE</Text>
        <View style={styles.scoreBlock}>
          <Text style={styles.letters}>{oppLetters || '—'}</Text>
          <Text style={styles.label}>OPP</Text>
        </View>
      </View>

      {game.currentTrickVideoUrl && (
        <VideoPlayer url={game.currentTrickVideoUrl} style={{ height: 300, marginBottom: 20 }} />
      )}

      {isMyTurn && game.currentTurnType === 'attemptMatch' && (
        <VideoRecorder
          label="MATCH IT — ONE TAKE"
          onRecordingComplete={handleAttempt}
        />
      )}

      {isMyTurn && game.currentTurnType === 'judgeAttempt' && game.pendingAttemptVideoUrl && (
        <View>
          <Text style={styles.instruction}>Judge the attempt:</Text>
          <VideoPlayer url={game.pendingAttemptVideoUrl} style={{ height: 300, marginBottom: 20 }} />
          <View style={styles.judgeButtons}>
            <Button title="LANDED 🔥" color="#0f0" onPress={() => handleJudge('landed')} />
            <View style={{ width: 20 }} />
            <Button title="BAILED 💀" color="#f00" onPress={() => handleJudge('bailed')} />
          </View>
        </View>
      )}

      {!isMyTurn && (
        <Text style={styles.waiting}>Waiting for opponent...</Text>
      )}

      {game.status === 'completed' && (
        <Text style={styles.winner}>
          {game.winnerId === userId ? 'YOU WON SKATE!' : 'YOU LOST SKATE...'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
    alignItems: 'center',
  },
  scoreBlock: {
    alignItems: 'center',
  },
  letters: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 4,
  },
  label: {
    color: '#0f0',
    fontSize: 12,
    marginTop: 4,
  },
  vs: {
    color: '#ffd700', // Gold
    fontSize: 48,
    fontWeight: '900',
  },
  judgeButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  instruction: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  waiting: {
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
  },
  winner: {
    color: '#ffd700',
    fontSize: 42,
    textAlign: 'center',
    marginTop: 40,
    fontWeight: 'bold',
  }
});
