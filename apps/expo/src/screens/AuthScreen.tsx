import React from 'react';
import { View } from 'react-native';
import { YStack, Text, Button, Theme } from 'tamagui';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function AuthScreen() {
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const credential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, credential);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Theme name="dark">
      <YStack f={1} bg="#102027" jc="center" ai="center" px="$4">
        <Text color="#FFD700" fontSize={48} fontWeight="900" mb="$8">
          SKATEHUBBA
        </Text>
        <Button onPress={handleGoogleSignIn} bg="#FF9100" color="#fff" px="$8" py="$4">
          <Text fontWeight="bold" fontSize={16}>Sign In</Text>
        </Button>
      </YStack>
    </Theme>
  );
}
