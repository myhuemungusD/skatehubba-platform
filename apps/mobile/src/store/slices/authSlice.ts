import { StateCreator } from 'zustand';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import type { User } from 'firebase/auth';
import { auth, GoogleAuthProvider } from '../../../lib/firebase';
import { onAuthStateChanged, signInWithCredential, signOut } from 'firebase/auth';
import type { GlobalState } from '../types';

const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

if (WEB_CLIENT_ID) {
  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });
} else {
    console.error("WEB_CLIENT_ID (EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID) is not set!");
}

export interface AuthSlice {
  user: User | null;
  loading: boolean;
  error: string | null;
  
  initAuthListener: () => () => void;
  signInWithGoogle: () => Promise<User | null>;
  signOut: () => Promise<void>;
}

export const createAuthSlice: StateCreator<
  GlobalState,
  [],
  [],
  AuthSlice
> = (set, get, api) => ({
  user: null,
  loading: true,
  error: null,

  initAuthListener: () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      set((state: GlobalState) => ({ 
        ...state,
        user, 
        loading: false, 
        error: null 
      }));
      if (user) {
        console.log('🔥 Auth: Google user synced', user.uid);
      } else {
        console.log('🔥 Auth: Signed out');
      }
    });
    return unsubscribe;
  },

  signInWithGoogle: async () => {
    set((state: GlobalState) => ({ ...state, loading: true, error: null }));
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      
      // Fix for GoogleSignin type issue
      const idToken = userInfo.data?.idToken || (userInfo as any).idToken;
      
      if (!idToken) {
        throw new Error('No ID token received from Google');
      }
      
      const { accessToken } = await GoogleSignin.getTokens();
      const googleCredential = GoogleAuthProvider.credential(idToken, accessToken);
      
      const userCredential = await signInWithCredential(auth, googleCredential);
      
      set((state: GlobalState) => ({ 
        ...state,
        user: userCredential.user, 
        loading: false 
      }));
      return userCredential.user;
    } catch (error: any) {
      let errorMessage = 'Failed to sign in with Google';
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        errorMessage = 'Google sign-in cancelled';
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        errorMessage = 'Play Services not available or outdated';
      }
      
      set((state: GlobalState) => ({ ...state, loading: false, error: errorMessage }));
      throw new Error(errorMessage);
    }
  },

  signOut: async () => {
    try {
      set((state: GlobalState) => ({ ...state, loading: true }));
      await GoogleSignin.signOut();
      await signOut(auth);
      set((state: GlobalState) => ({ ...state, user: null, loading: false }));
    } catch (error) {
      console.error('Sign out error:', error);
      set((state: GlobalState) => ({ ...state, loading: false }));
    }
  },
});
