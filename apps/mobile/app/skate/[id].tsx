import React from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import { VideoPlayer } from '../../components/skate/VideoPlayer';
import { VideoRecorder } from '../../components/skate/VideoRecorder';
import { SKATE } from '../../theme';
import { uploadSkateClip } from '../../lib/storage';
import type { SkateGame } from '@skatehubba/utils';

export default function SkateGameScreen() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  
  const { data: game } = useQuery({
    queryKey: ['skate', id],
    queryFn: async () => {
      const snap = await getDoc(doc(db, 'skate_games', id as string));
      return snap.data() as SkateGame;
    }
  });

  if (!game) return <ActivityIndicator style={{flex: 1, backgroundColor: SKATE.colors.ink}} />;

  const isMyTurn = game.currentTurnUid === user?.uid;
  const isChallenger = game.challengerUid === user?.uid;
  const myLetters = isChallenger ? game.letters.challenger : game.letters.opponent;
  const oppLetters = isChallenger ? game.letters.opponent : game.letters.challenger;

  const judgeAttempt = async (gameId: string, result: 'landed' | 'bailed') => {
     // Logic to update game state based on judgment
     // This would typically involve updating the rounds, letters, and turn
     // For now, just a placeholder update to show interaction
     console.log(`Judging ${result}`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: SKATE.colors.ink }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 24 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 24 }}>{myLetters || '—'}</Text>
          <Text style={{ color: SKATE.colors.neon }}>YOU</Text>
        </View>
        <Text style={{ color: SKATE.colors.gold, fontSize: 48, fontWeight: '900' }}>SKATE</Text>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 24 }}>{oppLetters || '—'}</Text>
          <Text style={{ color: '#fff' }}>OPP</Text>
        </View>
      </View>

      {game.currentTrickVideoUrl && (
        <VideoPlayer url={game.currentTrickVideoUrl} style={{ height: 400 }} />
      )}

      {isMyTurn && game.currentTurnType === 'attemptMatch' && (
        <VideoRecorder
          label="MATCH IT — ONE TAKE"
          onRecordingComplete={async (uri) => {
            if (!user) return;
            const url = await uploadSkateClip(uri, user.uid);
            await updateDoc(doc(db, 'skate_games', id as string), {
              pendingAttemptVideoUrl: url,
              currentTurnType: 'judgeAttempt'
            });
          }}
        />
      )}

      {isMyTurn && game.currentTurnType === 'judgeAttempt' && game.pendingAttemptVideoUrl && (
        <View>
          <VideoPlayer url={game.pendingAttemptVideoUrl} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 24 }}>
            <Button title="LANDED 🔥" color={SKATE.colors.neon} onPress={() => judgeAttempt(id as string, 'landed')} />
            <Button title="BAILED 💀" color={SKATE.colors.blood} onPress={() => judgeAttempt(id as string, 'bailed')} />
          </View>
        </View>
      )}

      {game.status === 'completed' && (
        <Text style={{ color: SKATE.colors.gold, fontSize: 42, textAlign: 'center' }}>
          {game.winnerUid === user?.uid ? 'YOU WON SKATE!' : 'YOU LOST SKATE...'}
        </Text>
      )}
    </View>
  );
}

