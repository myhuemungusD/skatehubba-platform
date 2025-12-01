// apps/mobile/src/navigation/RootNavigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useUserStore } from "@/store/userStore";
import { OnboardingScreen } from "@/screens/OnboardingScreen";
import { HomeTabs } from "./HomeTabs";
import { ChallengeRecordScreen } from "@/screens/challenge/ChallengeRecordScreen";
import { ChallengeViewScreen } from "@/screens/challenge/ChallengeViewScreen";
import { ClosetScreen } from "@/screens/closet/ClosetScreen";
import { HeshurChatScreen } from "@/screens/heshur/HeshurChatScreen";

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  const { user, loading } = useUserStore();

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#0a0a0a", justifyContent: "center" }}>
        <Text style={{ color: "#39ff14", textAlign: "center", fontSize: 32, fontFamily: "Thrasher" }}>
          SKATEHUBBA
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: { backgroundColor: "#0a0a0a" },
        }}
      >
        {!user ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeTabs} />
            <Stack.Screen name="ChallengeRecord" component={ChallengeRecordScreen} options={{ presentation: "fullScreenModal" }} />
            <Stack.Screen name="ChallengeView" component={ChallengeViewScreen} />
            <Stack.Screen name="Closet" component={ClosetScreen} />
            <Stack.Screen name="Heshur" component={HeshurChatScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
