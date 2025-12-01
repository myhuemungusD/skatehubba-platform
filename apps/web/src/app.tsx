// apps/mobile/src/App.tsx
import "react-native-url-polyfill/auto";
import "react-native-get-random-values";
import "@/global.css";

import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { useUserStore } from "@/store/userStore";
import { RootNavigator } from "@/navigation/RootNavigator";
import { SKATE } from "@/theme/skateTheme";

// Keep splash on until fonts + auth ready
SplashScreen.preventAutoHideAsync();

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

initializeApp(firebaseConfig);
const auth = getAuth();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, retry: 1, refetchOnWindowFocus: false },
  },
});

export default function App() {
  const { setUser, setLoading } = useUserStore();
  const [fontsLoaded] = useFonts({
    "BakerScript": require("@/assets/fonts/BakerScript.ttf"),
    "DeathRattle": require("@/assets/fonts/DeathRattleBB.otf"),
    "Thrasher": require("@/assets/fonts/ThrasherFlames.ttf"),
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      if (fontsLoaded) SplashScreen.hideAsync();
    });
    return () => unsub();
  }, [fontsLoaded, setUser, setLoading]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={SKATE}>
          <SafeAreaProvider>
            <StatusBar style="light" backgroundColor={SKATE.colors.ink} />
            <RootNavigator />
          </SafeAreaProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
