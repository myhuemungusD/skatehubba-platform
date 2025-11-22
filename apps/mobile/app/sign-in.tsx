import { useState } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet, Image, Linking } from 'react-native';
import { useAuthStore } from '../lib/auth';
import { useRouter } from 'expo-router';
import { SKATE } from '../theme';
import { statusCodes } from '@react-native-google-signin/google-signin';

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, user } = useAuthStore();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      router.replace('/map');
    } catch (error: any) {
      if (error.code !== statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Ollie fail', error.message || 'Google sign-in borked');
      }
    } finally {
      setLoading(false);
    }
  };

  const openPolicy = (type: 'terms' | 'privacy') => {
    const url = type === 'terms' 
      ? 'https://skatehubba.com/terms' 
      : 'https://skatehubba.com/privacy';
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Could not open link');
    });
  };

  if (user) return null;

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>SkateHubba™</Text>
        <Text style={styles.tagline}>Skate. Connect. Shred.</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.googleButton, loading && styles.buttonDisabled]}
          onPress={handleGoogleSignIn}
          disabled={loading}
        >
          <Text style={styles.googleIcon}>G</Text>
          <Text style={styles.googleButtonText}>
            {loading ? 'Connecting...' : 'Sign in with Google'}
          </Text>
        </TouchableOpacity>

        <View style={styles.policyContainer}>
          <Text style={styles.privacyText}>By signing in, you agree to our </Text>
          <TouchableOpacity onPress={() => openPolicy('terms')}>
            <Text style={[styles.privacyText, styles.linkText]}>Terms of Service</Text>
          </TouchableOpacity>
          <Text style={styles.privacyText}> and </Text>
          <TouchableOpacity onPress={() => openPolicy('privacy')}>
            <Text style={[styles.privacyText, styles.linkText]}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SKATE.colors.ink,
    padding: 20,
    justifyContent: 'space-between',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    color: SKATE.colors.neon,
    fontSize: 48,
    fontWeight: '900',
    marginBottom: 8,
  },
  tagline: {
    color: SKATE.colors.paper,
    fontSize: 18,
    opacity: 0.8,
  },
  buttonContainer: {
    paddingBottom: 40,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  googleIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 12,
    color: '#4285F4',
  },
  googleButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  policyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  privacyText: {
    color: SKATE.colors.paper,
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.6,
  },
  linkText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
