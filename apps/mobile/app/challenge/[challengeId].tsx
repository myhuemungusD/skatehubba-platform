import { useLocalSearchParams, useRouter } from "expo-router";
// 🛠 FIX: Adjusted path. Up two levels to root, then into src.
import { ChallengeScreen } from "@/screens/ChallengeScreen"; 

// 💡 PRO TIP: Define your params interface so TypeScript doesn't bail on you
type ChallengeParams = {
  challengeId?: string; // It's usually a string from URL
  otherParam?: string;
};

export default function ChallengeRoute() {
  const params = useLocalSearchParams<ChallengeParams>();
  const router = useRouter();

  // The Adapter (Trucks & Risers)
  const navigation = {
    goBack: () => router.back(),
    // Remember the fix I mentioned earlier: Pass the params!
    navigate: (screen: string, navParams?: any) => {
      router.push({
        pathname: screen.startsWith('/') ? screen : `/${screen.toLowerCase()}`,
        params: navParams
      });
    },
  };

  const route = {
    params: {
      ...params,
      // If your screen needs a number, cast it here:
      challengeId: params.challengeId ? Number(params.challengeId) : undefined,
    },
  };

  return <ChallengeScreen route={route} navigation={navigation} />;
}