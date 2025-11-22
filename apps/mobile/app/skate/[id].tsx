import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button, Alert, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { VideoRecorder } from '../../components/skate/VideoRecorder';
import { SKATE } from '../../theme';
// ⚠️ Import your engine
import { submitTurnResult, joinSkateChallenge } from '@skatehubba/utils'; 
import { reportContent, blockUser } from '../../lib/moderation';

export default function SkateGameScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [gameData, setGameData] = useState<any>(null);

  // 1. Real-time Subscription (The "Pro" way for Games)
  useEffect(() => {
    if (!id) return;
    const unsub = onSnapshot(doc(db, 'skate_games', id), (doc) => {
      setGameData(doc.data());
    });
    return () => unsub();
  }, [id]);

  const game = gameData;

  // 2. Mutations for Actions
  const submitTurn = useMutation({
    mutationFn: async ({ result, url }: { result: 'landed' | 'bailed', url?: string }) => {
      if (!game || !user) return;
      await submitTurnResult(game, user.uid, result, url);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skate', id] });
      Alert.alert("Update Sent", "The game state has been updated.");
    },
    onError: (err: any) => Alert.alert("Error", err.message)
  });

  const joinGame = useMutation({
    mutationFn: async () => {
      if (!user) return;
      await joinSkateChallenge(id!, user.uid);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['skate', id] })
  });

  const handleReport = () => {
    Alert.alert(
      "Report or Block",
      "Select an action for this content or user.",
      [
        {
          text: "Report Content",
          onPress: () => {
            Alert.alert("Report Reason", "Why are you reporting this?", [
              { text: "Inappropriate Video", onPress: () => submitReport("inappropriate_video") },
              { text: "Spam / Scam", onPress: () => submitReport("spam") },
              { text: "Cancel", style: "cancel" }
            ]);
          }
        },
        {
          text: "Block User",
          style: "destructive",
          onPress: () => {
            Alert.alert("Block User", "Are you sure? You won't see their content again.", [
              { text: "Block", style: "destructive", onPress: confirmBlock },
              { text: "Cancel", style: "cancel" }
            ]);
          }
        },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const submitReport = async (reason: string) => {
    if (!user || !game) return;
    const opponentUid = isChallenger ? game.opponentUid : game.challengerUid;
    try {
      await reportContent(user.uid, id as string, 'skate_game', reason, opponentUid);
      Alert.alert("Report Sent", "Thank you for helping keep SkateHubba safe.");
    } catch (e) {
      Alert.alert("Error", "Could not send report.");
    }
  };

  const confirmBlock = async () => {
    if (!user || !game) return;
    const opponentUid = isChallenger ? game.opponentUid : game.challengerUid;
    try {
      await blockUser(user.uid, opponentUid);
      Alert.alert("User Blocked", "You have blocked this user.");
      router.replace('/map');
    } catch (e) {
      Alert.alert("Error", "Could not block user.");
    }
  };

  if (!game) return <ActivityIndicator style={{ flex: 1, backgroundColor: SKATE.colors.ink }} />;

  // Helper State
  const isChallenger = user?.uid === game.challengerUid;
  const isOpponent = user?.uid === game.opponentUid;
  const isSpectator = !isChallenger && !isOpponent;
  const isMyTurn = game.currentTurnUid === user?.uid;

  const myLetters = isChallenger ? game.letters.challenger : game.letters.opponent;
  const oppLetters = isChallenger ? game.letters.opponent : game.letters.challenger;

  // --- RENDER ---
  return (
    <View style={{ flex: 1, backgroundColor: SKATE.colors.ink }}>
      
      {/* HEADER / SCOREBOARD */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' }}>
         <TouchableOpacity onPress={() => router.back()}>
           <Text style={{ color: SKATE.colors.paper }}>Back</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={handleReport}>
           <Text style={{ color: SKATE.colors.blood, fontWeight: 'bold' }}>REPORT</Text>
         </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 24, marginTop: 10 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 24, fontFamily: 'monospace' }}>
            {isSpectator ? game.letters.challenger : myLetters || '—'}
          </Text>
          <Text style={{ color: SKATE.colors.neon }}>{isSpectator ? 'P1' : 'YOU'}</Text>
        </View>
        <Text style={{ color: SKATE.colors.gold, fontSize: 48, fontWeight: '900' }}>SKATE</Text>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 24, fontFamily: 'monospace' }}>
            {isSpectator ? game.letters.opponent : oppLetters || '—'}
          </Text>
          <Text style={{ color: '#fff' }}>{isSpectator ? 'P2' : 'OPP'}</Text>
        </View>
      </View>

      {/* GAME VIDEO AREA */}
      <View style={{ height: 400, backgroundColor: '#000', justifyContent: 'center' }}>
         {game.currentTrickVideoUrl ? (
            // <VideoPlayer url={game.currentTrickVideoUrl} />
            <Text style={{color: 'white', textAlign: 'center'}}>Playing: Current Trick</Text>
         ) : (
            <Text style={{color: '#666', textAlign: 'center'}}>Waiting for trick...</Text>
         )}
      </View>

      {/* ACTION ZONE */}
      <View style={{ padding: 20 }}>
        
        {/* SCENARIO 1: OPEN GAME */}
        {game.status === 'pending' && isSpectator && (
          <Button 
            title="ACCEPT BATTLE" 
            color={SKATE.colors.neon} 
            onPress={() => joinGame.mutate()} 
          />
        )}

        {/* SCENARIO 2: MY TURN TO MATCH */}
        {game.status === 'active' && isMyTurn && game.currentTurnType === 'attemptMatch' && (
          <>
            <Text style={{color: SKATE.colors.neon, textAlign: 'center', marginBottom: 10}}>
              YOUR TURN TO MATCH
            </Text>
            <VideoRecorder
              maxDurationSec={15}
              onRecordingComplete={(uri) => {
                // Mock upload
                const mockUrl = "https://example.com/match.mp4";
                submitTurn.mutate({ result: 'landed', url: mockUrl });
              }}
            />
          </>
        )}

        {/* SCENARIO 3: JUDGING (Did I land it?) */}
        {/* Note: In strict street rules, if you set a trick, you must land it first. */}
        {isMyTurn && game.currentTurnType === 'setTrick' && (
           <>
            <Text style={{color: '#fff', textAlign: 'center', marginBottom: 10}}>
              SET A TRICK (Step 1: Record & Land)
            </Text>
            <VideoRecorder
              maxDurationSec={15}
              onRecordingComplete={(uri) => {
                // In the 'set' phase, uploading implies you landed it locally
                const mockUrl = "https://example.com/set.mp4";
                submitTurn.mutate({ result: 'landed', url: mockUrl });
              }}
            />
           </>
        )}

        {/* GAME OVER */}
        {game.status === 'completed' && (
          <Text style={{ color: SKATE.colors.gold, fontSize: 32, textAlign: 'center', marginTop: 20 }}>
            WINNER: {game.winnerUid === user?.uid ? 'YOU' : 'OPPONENT'}
          </Text>
        )}

      </View>
    </View>
  );
}

