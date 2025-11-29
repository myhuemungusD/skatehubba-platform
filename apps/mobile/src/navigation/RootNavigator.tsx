import React, { useEffect, useState } from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { View, ActivityIndicator } from 'react-native';

// Screens
import AuthScreen from '../screens/AuthScreen';
import DashboardScreen from '../screens/AvatarScreen'; // Lobby (Avatar/Dashboard)
import MapScreen from '../screens/MapScreen'; // World Map
import ProfileScreen from '../screens/ProfileScreen'; 
import CameraScreen from '../screens/CameraScreen'; // Camera/Recording

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF9100" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        {user ? (
          // ── APP STACK (Signed In) ─────────────────────────────────────────
          <Stack.Group>
            {/* Dashboard is the Lobby */}
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Map" component={MapScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Camera" component={CameraScreen} />
          </Stack.Group>
        ) : (
          // ── AUTH STACK (Guest) ───────────────────────────────────────────
          <Stack.Screen name="Auth" component={AuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
