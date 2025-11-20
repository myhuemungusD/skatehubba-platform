import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { auth, GoogleAuthProvider } from './firebase';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';

const WEB_CLIENT_ID = '665573979824-6ntr58d7ue2vtrit3ob6ukn9u6kcmmju.apps.googleusercontent.com';

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

interface AuthState {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
  error: string | null;
  init: () => () => void;
  signInWithGoogle: () => Promise<FirebaseAuthTypes.User | null>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      loading: true,
      error: null,
      
      init: () => {
        const unsubscribe = auth().onAuthStateChanged((user) => {
          set({ user, loading: false, error: null });
          if (user) {
            console.log('🔥 Auth: Google user synced', user.uid);
          } else {
            console.log('🔥 Auth: Signed out');
          }
        });
        return unsubscribe;
      },
      
      signInWithGoogle: async () => {
        try {
          set({ loading: true, error: null });
          
          await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
          const userInfo = await GoogleSignin.signIn();
          
          if (!userInfo.idToken) {
            throw new Error('No ID token received from Google');
          }
          
          const { idToken, accessToken } = await GoogleSignin.getTokens();
          const googleCredential = GoogleAuthProvider.credential(idToken, accessToken);
          const userCredential = await auth().signInWithCredential(googleCredential);
          
          set({ user: userCredential.user, loading: false });
          return userCredential.user;
        } catch (error: any) {
          let errorMessage = 'Failed to sign in with Google';
          
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            errorMessage = 'Google sign-in cancelled';
            console.log('Google sign-in cancelled by user');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            errorMessage = 'Sign in already in progress';
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            errorMessage = 'Play Services not available or outdated';
          } else {
            console.error('Google auth error:', error);
          }
          
          set({ loading: false, error: errorMessage });
          throw Object.assign(error, { message: errorMessage });
        }
      },
      
      signOut: async () => {
        try {
          set({ loading: true });
          await GoogleSignin.signOut();
          await auth().signOut();
          set({ user: null, loading: false });
        } catch (error) {
          console.error('Sign out error:', error);
          set({ loading: false });
        }
      },
    }),
    { name: 'skatehubba-auth' }
  )
);

export function useAuthListener() {
  const init = useAuthStore((s) => s.init);
  
  return () => {
    const unsub = init();
    return unsub;
  };
}
