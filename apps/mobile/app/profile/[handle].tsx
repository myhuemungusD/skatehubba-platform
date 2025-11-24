import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import ProfileScreen from '../../src/screens/ProfileScreen';

export default function ProfileRoute() {
  // This grabs the "handle" from the URL (e.g., "Hesher_92")
  // Later, we will pass this to the ProfileScreen to fetch real data.
  const { handle } = useLocalSearchParams();

  return (
    <>
      {/* Hide the default navigation bar so our custom Image Header shines */}
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Render the UI we just built */}
      <ProfileScreen />
    </>
  );
}
