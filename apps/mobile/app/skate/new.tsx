// ⚠️ Ensure packages/utils/src/index.ts exports this, or import directly from the file path
import { createSkateChallenge } from "@skatehubba/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, View } from "react-native";
import { VideoRecorder } from "@/components/skate/VideoRecorder";
import { useAuth } from "@/hooks/useAuth";
import { SKATE } from "@/theme";
// import { createSkateChallenge } from '../../../../packages/utils/src/api-sdk/skate'; // Use this relative path if aliases aren't set up

export default function NewSkateChallenge() {
  const { user } = useAuth();
  const router = useRouter();
  const [opponentHandle, setOpponentHandle] = useState("");

  const createGame = useMutation({
    mutationFn: async ({ trickVideoUrl }: { trickVideoUrl: string }) => {
      if (!user) throw new Error("Must be logged in");

      // 1. Call the SDK Engine
      const gameId = await createSkateChallenge(user.uid, trickVideoUrl);

      // 2. (Optional) Invite logic would go here (e.g. finding opponentUid by handle)
      return gameId;
    },
    onSuccess: (gameId) => {
      // 3. Redirect to the Game Room
      router.replace(`/skate/${gameId}`);
    },
    onError: (err: any) => {
      Alert.alert("Failed to create challenge", err.message);
    },
  });

  if (createGame.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: SKATE.colors.ink,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={SKATE.colors.neon} />
        <Text style={{ color: "#fff", marginTop: 20 }}>Creating Arena...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: SKATE.colors.ink }}>
      <Text
        style={{
          color: SKATE.colors.neon,
          fontSize: 32,
          fontWeight: "900",
          textAlign: "center",
          marginTop: 60,
        }}
      >
        SET THE FIRST TRICK
      </Text>
      <Text
        style={{
          color: "#fff",
          textAlign: "center",
          marginHorizontal: 32,
          marginTop: 16,
        }}
      >
        One take. 15 seconds. No edits. Just like curbside.
      </Text>

      <VideoRecorder
        maxDurationSec={15}
        onRecordingComplete={async (uri) => {
          console.log("Uploading clip...", uri);
          // In a real app, you'd use your uploadToStorage function here:
          // const url = await uploadToStorage(uri, `skate_games/${user!.uid}_${Date.now()}.mp4`);

          // For now, we simulate a URL so you can test the DB flow:
          const mockUrl =
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
          createGame.mutate({ trickVideoUrl: mockUrl });
        }}
      />

      <TextInput
        placeholder="Tag opponent @handle"
        placeholderTextColor="#666"
        value={opponentHandle}
        onChangeText={setOpponentHandle}
        style={{
          backgroundColor: SKATE.colors.grime,
          color: SKATE.colors.neon,
          margin: 32,
          padding: 16,
          borderRadius: 12,
        }}
      />
    </View>
  );
}
