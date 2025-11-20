import React, { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '../lib/auth';
import { Text, View, StyleSheet } from 'react-native';
import { SKATE } from '../theme';
import * as Linking from 'expo-linking';

const queryClient = new QueryClient();

function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading, init } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    const unsubscribe = init();
    return unsubscribe;
  }, [init]);

  useEffect(() => {
    if (loading || hasNavigated) return;

    const currentSegment = segments[0] ?? '';
    const inAuthRoute = currentSegment === 'sign-in' || currentSegment === 'index' || currentSegment === '';
    const inProtectedRoute = currentSegment === 'map' || currentSegment === '(tabs)';

    if (!user && inProtectedRoute) {
      console.log('🔒 No user, redirecting to sign-in from:', currentSegment);
      router.replace('/sign-in');
      setHasNavigated(true);
    } else if (user && inAuthRoute) {
      console.log('✅ User authenticated, redirecting to map from:', currentSegment);
      router.replace('/map');
      setHasNavigated(true);
    }
  }, [user, loading, segments, router, hasNavigated]);

  useEffect(() => {
    if (!loading) {
      setHasNavigated(false);
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading sesh...</Text>
      </View>
    );
  }

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthGate>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="closet/index" options={{ headerShown: false }} />
          <Stack.Screen name="challenge/new" options={{ headerShown: false }} />
        </Stack>
      </AuthGate>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: SKATE.colors.ink,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: SKATE.colors.neon,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
