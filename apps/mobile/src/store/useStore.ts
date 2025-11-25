import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createAuthSlice } from './slices/authSlice';
import { GlobalState } from './types';

export const useStore = create<GlobalState>()(
  devtools(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    { name: 'skatehubba-global-store' }
  )
);

export const useAuth = () => useStore((state) => ({
  user: state.user,
  loading: state.loading,
  error: state.error,
  init: state.initAuthListener,
  signInWithGoogle: state.signInWithGoogle,
  signOut: state.signOut,
}));
