import { useLocalSearchParams, useRouter } from "expo-router";
// Fix: Adjust path to reach src/screens
import { ChallengeScreen } from "@/screens/ChallengeScreen";

// Fix: Define the expected params to prevent TypeScript errors
type ChallengeParams = {
  challengeId?: string;
  [key: string]: string | string[] | undefined;
};

export default function ChallengeRoute() {
  const params = useLocalSearchParams<ChallengeParams>();
  const router = useRouter();

  // Adapt Expo Router hooks to React Navigation props expected by ChallengeScreen
  const navigation = {
    goBack: () => router.back(),
    navigate: (screen: string, navParams?: any) => {
      // Fix: Use correct capitalization for .startsWith() and pass params
      const cleanPath = screen.startsWith('/') ? screen : `/${screen.toLowerCase()}`;
      
      router.push({
        pathname: cleanPath as any, // Type casting for migration safety
        params: navParams
      });
    },
    // Mock listeners to prevent crashes if the screen uses them
    setOptions: () => {},
    addListener: () => () => {},
  };

  const route = {
    // Normalize params (e.g., convert ID string to number if needed)
    params: {
      ...params,
      challengeId: params.challengeId ? Number(params.challengeId) : undefined,
    },
  };

  // @ts-ignore - Intentionally ignoring strict navigation prop mismatch during migration
  return <ChallengeScreen route={route} navigation={navigation} />;
}