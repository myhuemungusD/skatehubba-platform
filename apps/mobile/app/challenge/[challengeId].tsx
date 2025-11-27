import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ChallengeScreen } from "../../../src/screens/ChallengeScreen";

export default function ChallengeRoute() {
  const params = useLocalSearchParams();
  const router = useRouter();

  // Adapt Expo Router hooks to React Navigation props expected by ChallengeScreen
  const navigation = {
    goBack: () => router.back(),
    navigate: (screen: string, params?: any) => router.push(screen), // Basic adaptation
  };

  const route = {
    params: params,
  };

  return <ChallengeScreen route={route} navigation={navigation} />;
}
