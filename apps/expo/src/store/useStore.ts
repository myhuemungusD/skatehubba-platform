import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createAuthSlice } from "./slices/authSlice";
import { createSessionSlice } from "./slices/sessionSlice";
import type { GlobalState } from "./types";

export const useStore = create<GlobalState>()(
  devtools(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createSessionSlice(...a),
    }),
    { name: "skatehubba-global-store" },
  ),
);

export const useAuth = () =>
  useStore((state) => ({
    user: state.user,
    loading: state.loading,
    error: state.error,
    init: state.initAuthListener,
    signInWithGoogle: state.signInWithGoogle,
    signOut: state.signOut,
  }));

export const useSession = () =>
  useStore((state) => ({
    currentSession: state.currentSession,
    currentQuest: state.currentQuest,
    activeSessions: state.activeSessions,
    loading: state.loading,
    error: state.error,
    apiError: state.apiError,
    startSession: state.startSession,
    updateSessionClips: state.updateSessionClips,
    endSession: state.endSession,
    refreshSession: state.refreshSession,
    startSessionPolling: state.startSessionPolling,
    stopSessionPolling: state.stopSessionPolling,
    listenToSessions: state.listenToSessions,
  }));
