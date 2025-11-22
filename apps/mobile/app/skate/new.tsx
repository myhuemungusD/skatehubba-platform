import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { httpsCallable } from 'firebase/functions';
import { collection, addDoc } from 'firebase/firestore';
import { db, functions } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import { VideoRecorder } from '../../components/skate/VideoRecorder';
import { SKATE } from '../../theme';
import { uploadSkateClip } from '../../lib/storage';

export default function NewSkateChallenge() {
  const { user } = useAuth();
  const router = useRouter();
  const [opponentHandle, setOpponentHandle] = useState('');

  const createGame = useMutation({
    mutationFn: async ({ trickVideoUrl }: { trickVideoUrl: string }) => {
      if (!user) throw new Error('Not authenticated');
      
      const gameRef = await addDoc(collection(db, 'skate_games'), {
        challengerUid: user.uid,
        opponentUid: null, // will be claimed via handle search or invite
        status: 'pending',
        letters: { challenger: '', opponent: '' },
        currentTurnUid: user.uid,
        currentTurnType: 'setTrick',
        currentTrickVideoUrl: trickVideoUrl,
        rounds: [{
          setBy: user.uid,
          trickVideoUrl,
          attempts: []
        }],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Notify via FCM: "Yo @handle challenged you to SKATE!"
      // const notify = httpsCallable(functions, 'notifySkateChallenge');
      // await notify({ gameId: gameRef.id, opponentHandle });
      
      return gameRef.id;
    },
    onSuccess: (gameId) => {
      router.replace(`/skate/${gameId}`);
    }
  });

  return (
    <View style={{ flex: 1, backgroundColor: SKATE.colors.ink }}>
      <Text style={{ color: SKATE.colors.neon, fontSize: 32, fontWeight: '900', textAlign: 'center', marginTop: 60 }}>
        SET THE FIRST TRICK
      </Text>
      <Text style={{ color: '#fff', textAlign: 'center', marginHorizontal: 32, marginTop: 16 }}>
        One take. 15 seconds. No edits. Just like curbside.
      </Text>

      <VideoRecorder
        maxDurationSec={15}
        onRecordingComplete={async (uri) => {
          if (!user) return;
          const url = await uploadSkateClip(uri, user.uid);
          createGame.mutate({ trickVideoUrl: url });
        }}
      />

      <TextInput
        placeholder="Tag opponent @handle"
        placeholderTextColor="#666"
        value={opponentHandle}
        onChangeText={setOpponentHandle}
        style={{ backgroundColor: SKATE.colors.grime, color: SKATE.colors.neon, margin: 32, padding: 16, borderRadius: 12 }}
      />
    </View>
  );
}

