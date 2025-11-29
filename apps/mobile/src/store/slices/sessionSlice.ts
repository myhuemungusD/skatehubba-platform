import type { StateCreator } from "zustand";
import type { Session, Quest } from "@skatehubba/types";
import type { GlobalState } from "../types";
import { db } from "../../lib/firebase";
import { collection, onSnapshot, query, where, doc, updateDoc } from "firebase/firestore";

export interface SessionSlice {
  currentSession: Session | null;
  currentQuest: Quest | null;
  activeSessions: Session[];
  loading: boolean;
  error: string | null;

  startSession: (questId: string) => Promise<void>;
  updateSessionClips: (sessionId: string, clipUrl: string) => Promise<void>;
  endSession: (sessionId: string, status: "COMPLETED" | "FAILED") => Promise<void>;
  listenToSessions: (userId: string) => () => void;
}

export const createSessionSlice: StateCreator<GlobalState, [], [], SessionSlice> = (set, get) => ({
  currentSession: null,
  currentQuest: null,
  activeSessions: [],
  loading: false,
  error: null,

  startSession: async (questId: string) => {
    set((state) => ({ ...state, loading: true, error: null }));
    try {
      const user = get().user;
      if (!user) throw new Error("User not authenticated");

      const newSession: Session = {
        id: crypto.randomUUID?.() || `session-${Date.now()}`,
        host_id: user.uid,
        quest_id: questId,
        status: "ACTIVE",
        start_time: Math.floor(Date.now() / 1000),
        clips: [],
      };

      // TODO: Persist to Firestore via Cloud Function
      set((state) => ({
        ...state,
        currentSession: newSession,
        loading: false,
      }));
    } catch (error: any) {
      set((state) => ({
        ...state,
        loading: false,
        error: error.message || "Failed to start session",
      }));
      throw error;
    }
  },

  updateSessionClips: async (sessionId: string, clipUrl: string) => {
    try {
      const session = get().currentSession;
      if (!session || session.id !== sessionId) return;

      const updatedClips = [...session.clips, clipUrl];
      set((state) => ({
        ...state,
        currentSession: { ...session, clips: updatedClips },
      }));

      // TODO: Sync to Firestore
    } catch (error) {
      console.error("Failed to update clips:", error);
    }
  },

  endSession: async (sessionId: string, status: "COMPLETED" | "FAILED") => {
    try {
      set((state) => ({
        ...state,
        currentSession: state.currentSession
          ? { ...state.currentSession, status }
          : null,
      }));

      // TODO: Sync to Firestore
    } catch (error) {
      console.error("Failed to end session:", error);
    }
  },

  listenToSessions: (userId: string) => {
    const q = query(collection(db, "sessions"), where("host_id", "==", userId));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const sessions = snapshot.docs.map((doc) => doc.data() as Session);
        set((state) => ({ ...state, activeSessions: sessions }));
      },
      (error) => {
        console.error("Error listening to sessions:", error);
        set((state) => ({ ...state, error: error.message }));
      },
    );

    return unsubscribe;
  },
});
