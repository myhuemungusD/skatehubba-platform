// ⚠️ Import your engine logic
// Check your path! If @skatehubba/utils isn't aliased, use the relative path below
import { joinSkateChallenge, submitTurnResult } from "@skatehubba/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { VideoRecorder } from "../../components/skate/VideoRecorder";
import { useAuth } from "../../hooks/useAuth";
import { db } from "../../lib/firebase";
import { SKATE } from "../../theme";
// import { submitTurnResult, joinSkateChallenge } from '../../../../packages/utils/src/api-sdk/skate';

export default function SkateGameScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [gameData, setGameData] = useState<any>(null);

  // 1. Real-time Game Subscription
  // This ensures the screen updates INSTANTLY when the other player moves.
  useEffect(() => {
    if (!id) return;
    const unsub = onSnapshot(doc(db, "skate_games", id), (doc) => {
      setGameData(doc.data());
    });
    return () => unsub();
  }, [id]);

  const game = gameData;

  // 2. Mutation: Submit a Turn (Land/Bail)
  const submitTurn = useMutation({
    mutationFn: async ({
      result,
      url,
    }: {
      result: "landed" | "bailed";
      url?: string;
    }) => {
      if (!game || !user) return;
      // 🧠 The SDK Engine handles all the math (letters, turn switching)
      await submitTurnResult(game, user.uid, result, url);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skate", id] });
      Alert.alert("Update Sent", "The game state has been updated.");
    },
    onError: (err: any) => Alert.alert("Error", err.message),
  });

  // 3. Mutation: Join a Game
  const joinGame = useMutation({
    mutationFn: async () => {
      if (!user) return;
      await joinSkateChallenge(id!, user.uid);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["skate", id] }),
  });

  if (!game)
    return (
      <ActivityIndicator
        style={{ flex: 1, backgroundColor: SKATE.colors.ink }}
      />
    );

  // --- HELPER VARIABLES ---
  const isChallenger = user?.uid === game.challengerUid;
  const isOpponent = user?.uid === game.opponentUid;
  const isSpectator = !isChallenger && !isOpponent;
  const isMyTurn = game.currentTurnUid === user?.uid;

  const myLetters = isChallenger
    ? game.letters.challenger
    : game.letters.opponent;
  const oppLetters = isChallenger
    ? game.letters.opponent
    : game.letters.challenger;

  return (
    <View style={{ flex: 1, backgroundColor: SKATE.colors.ink }}>
      {/* --- SCOREBOARD --- */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 24,
          marginTop: 40,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            style={{ color: "#fff", fontSize: 24, fontFamily: "monospace" }}
          >
            {isSpectator ? game.letters.challenger : myLetters || "—"}
          </Text>
          <Text style={{ color: SKATE.colors.neon }}>
            {isSpectator ? "P1" : "YOU"}
          </Text>
        </View>
        <Text
          style={{ color: SKATE.colors.gold, fontSize: 48, fontWeight: "900" }}
        >
          SKATE
        </Text>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{ color: "#fff", fontSize: 24, fontFamily: "monospace" }}
          >
            {isSpectator ? game.letters.opponent : oppLetters || "—"}
          </Text>
          <Text style={{ color: "#fff" }}>{isSpectator ? "P2" : "OPP"}</Text>
        </View>
      </View>

      {/* --- VIDEO PLAYER AREA --- */}
      <View
        style={{
          height: 400,
          backgroundColor: "#000",
          justifyContent: "center",
        }}
      >
        {game.currentTrickVideoUrl ? (
          // In real app: <VideoPlayer url={game.currentTrickVideoUrl} />
          <Text style={{ color: "white", textAlign: "center" }}>
            ▶️ Playing: Current Trick to Match
          </Text>
        ) : (
          <Text style={{ color: "#666", textAlign: "center" }}>
            Waiting for trick to be set...
          </Text>
        )}
      </View>

      {/* --- ACTION ZONE (Context Aware) --- */}
      <View style={{ padding: 20 }}>
        {/* 1. SPECTATOR: Accept Battle */}
        {game.status === "pending" && isSpectator && (
          <Button
            title="ACCEPT BATTLE (JOIN)"
            color={SKATE.colors.neon}
            onPress={() => joinGame.mutate()}
          />
        )}

        {/* 2. PLAYER: Match a Trick */}
        {game.status === "active" &&
          isMyTurn &&
          game.currentTurnType === "attemptMatch" && (
            <>
              <Text
                style={{
                  color: SKATE.colors.neon,
                  textAlign: "center",
                  marginBottom: 10,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                YOUR TURN TO MATCH
              </Text>
              <VideoRecorder
                maxDurationSec={15}
                onRecordingComplete={(uri) => {
                  // Mock upload for testing
                  const mockUrl = "https://example.com/match_video.mp4";
                  submitTurn.mutate({ result: "landed", url: mockUrl });
                }}
              />
              <Button
                title="I Bailed (Take Letter)"
                color={SKATE.colors.blood}
                onPress={() => submitTurn.mutate({ result: "bailed" })}
              />
            </>
          )}

        {/* 3. PLAYER: Set a Trick */}
        {isMyTurn && game.currentTurnType === "setTrick" && (
          <>
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                marginBottom: 10,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              SET A TRICK
            </Text>
            <VideoRecorder
              maxDurationSec={15}
              onRecordingComplete={(uri) => {
                const mockUrl = "https://example.com/set_video.mp4";
                submitTurn.mutate({ result: "landed", url: mockUrl });
              }}
            />
          </>
        )}

        {/* 4. WAITING STATE */}
        {!isMyTurn && game.status === "active" && (
          <Text style={{ color: "#666", textAlign: "center", marginTop: 10 }}>
            Waiting for opponent...
          </Text>
        )}

        {/* 5. GAME OVER */}
        {game.status === "completed" && (
          <Text
            style={{
              color: SKATE.colors.gold,
              fontSize: 32,
              textAlign: "center",
              marginTop: 20,
            }}
          >
            GAME OVER{"\n"}
            WINNER: {game.winnerUid === user?.uid ? "YOU" : "OPPONENT"}
          </Text>
        )}
      </View>
    </View>
  );
}
