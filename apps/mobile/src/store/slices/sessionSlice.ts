import type { StateCreator } from "zustand";
import type { Session, Quest } from "@skatehubba/types";
import type { GlobalState } from "../types";
import { getClient } from "../../../lib/client";

export interface SessionSlice {
  currentSession: Session | null;
  currentQuest: Quest | null;
  activeSessions: Session[];
  loading: boolean;
  error: string | null;
  apiError: string | null;

  startSession: (questId: string) => Promise<Session>;
  updateSessionClips: (sessionId: string, clipUrl: string) => Promise<void>;
  endSession: (sessionId: string, status: "COMPLETED" | "FAILED") => Promise<void>;
  refreshSession: (sessionId: string) => Promise<void>;
  startSessionPolling: () => void;
  stopSessionPolling: () => void;
  
  /**
   * @deprecated Use refreshSession and startSessionPolling instead.
   * Direct Firestore access bypasses backend authentication.
   */
  listenToSessions?: (userId: string) => () => void;
}

// Polling interval in milliseconds (7 seconds for balance between real-time and performance)
const POLLING_INTERVAL_MS = 7000;

// Retry configuration for exponential backoff
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY_MS = 1000;
const MAX_RETRY_DELAY_MS = 10000;

// Store polling interval ID outside of Zustand state
// This prevents unnecessary re-renders and ensures cleanup works correctly
// Using ReturnType for cross-platform compatibility (React Native uses number, Node uses NodeJS.Timeout)
let pollingIntervalId: ReturnType<typeof setInterval> | null = null;

/**
 * Custom error class to indicate retry exhaustion
 */
export class RetryExhaustedError extends Error {
  public readonly isRetryExhausted = true;
  public readonly originalError: Error;
  
  constructor(message: string, originalError: Error) {
    super(message);
    this.name = 'RetryExhaustedError';
    this.originalError = originalError;
  }
}

/**
 * Retry helper with exponential backoff
 */
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries: number = MAX_RETRIES,
  delay: number = INITIAL_RETRY_DELAY_MS,
  context: string = "operation"
): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    // Don't retry on authentication errors or client errors (4xx)
    const isClientError = error?.code?.startsWith?.('4') || 
                          error?.message?.toLowerCase()?.includes('auth') ||
                          error?.message?.toLowerCase()?.includes('permission');
    
    if (retries <= 0) {
      console.error(`[SessionSlice] ${context} failed after retries exhausted:`, error);
      throw new RetryExhaustedError(
        `${context} failed after ${MAX_RETRIES} retries. Please try again.`,
        error
      );
    }
    
    if (isClientError) {
      console.error(`[SessionSlice] ${context} failed with client error:`, error);
      throw error;
    }

    const nextDelay = Math.min(delay * 2, MAX_RETRY_DELAY_MS);
    const jitter = Math.random() * 200; // Add jitter to prevent thundering herd
    
    console.warn(
      `[SessionSlice] ${context} failed, retrying in ${delay}ms... (${retries} retries left)`,
      error
    );

    await new Promise(resolve => setTimeout(resolve, delay + jitter));
    return retryWithBackoff(fn, retries - 1, nextDelay, context);
  }
}

export const createSessionSlice: StateCreator<GlobalState, [], [], SessionSlice> = (set, get) => ({
  currentSession: null,
  currentQuest: null,
  activeSessions: [],
  loading: false,
  error: null,
  apiError: null,

  startSession: async (questId: string) => {
    set((state) => ({ ...state, loading: true, error: null, apiError: null }));
    
    try {
      const user = get().user;
      if (!user) {
        throw new Error("User not authenticated");
      }

      console.log("[SessionSlice] Creating session on server for quest:", questId);

      // Step 1: Create session on server - get canonical server-generated UUID
      const createResult = await retryWithBackoff(
        async () => {
          const client = await getClient();
          return await client.sessions.create(questId);
        },
        MAX_RETRIES,
        INITIAL_RETRY_DELAY_MS,
        `startSession(${questId})`
      );

      const serverSessionId = createResult.session.id;
      console.log("[SessionSlice] Server created session:", serverSessionId);

      // Step 2: Verify session exists by refreshing from server
      // This is the ONLY place we set currentSession - from verified server data
      // If this fails (404), state will be cleared by refreshSession error handling
      console.log("[SessionSlice] Verifying session exists on server");
      await get().refreshSession(serverSessionId);

      // Step 3: Verify session was successfully set by refreshSession
      const verifiedSession = get().currentSession;
      if (!verifiedSession || verifiedSession.id !== serverSessionId) {
        // Session refresh failed or returned 404
        console.error("[SessionSlice] Session verification failed - session not found on server");
        
        set((state) => ({
          ...state,
          currentSession: null,
          currentQuest: null,
          loading: false,
          error: "Session not found on server after creation",
          apiError: "Session not found on server after creation",
        }));
        
        throw new Error("Session not found on server after creation (404)");
      }

      console.log("[SessionSlice] Session verified and synchronized with server");

      // Step 4: Complete loading and start polling
      set((state) => ({
        ...state,
        loading: false,
        error: null,
        apiError: null,
      }));

      // Auto-start polling when session is created
      get().startSessionPolling();

      return verifiedSession;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to start session";
      console.error("[SessionSlice] startSession error:", {
        questId,
        error: errorMessage,
        stack: error.stack,
      });

      // Ensure state is completely cleared on any error
      set((state) => ({
        ...state,
        currentSession: null,
        currentQuest: null,
        loading: false,
        error: errorMessage,
        apiError: errorMessage,
      }));
      
      throw error;
    }
  },

  updateSessionClips: async (sessionId: string, clipUrl: string) => {
    set((state) => ({ ...state, apiError: null }));
    
    try {
      const session = get().currentSession;
      if (!session || session.id !== sessionId) {
        console.warn("[SessionSlice] updateSessionClips: session mismatch", {
          currentSessionId: session?.id,
          requestedSessionId: sessionId,
        });
        return;
      }

      const result = await retryWithBackoff(
        async () => {
          const client = await getClient();
          return await client.sessions.updateClips(sessionId, [clipUrl]);
        },
        MAX_RETRIES,
        INITIAL_RETRY_DELAY_MS,
        `updateSessionClips(${sessionId})`
      );

      set((state) => ({
        ...state,
        currentSession: result.session,
        apiError: null,
      }));
    } catch (error: any) {
      const errorMessage = error.message || "Failed to update clips";
      console.error("[SessionSlice] updateSessionClips error:", {
        sessionId,
        clipUrl,
        error: errorMessage,
      });

      set((state) => ({
        ...state,
        apiError: errorMessage,
      }));
      
      throw error;
    }
  },

  endSession: async (sessionId: string, status: "COMPLETED" | "FAILED") => {
    set((state) => ({ ...state, apiError: null }));
    
    try {
      await retryWithBackoff(
        async () => {
          const client = await getClient();
          return await client.sessions.complete(sessionId, status);
        },
        MAX_RETRIES,
        INITIAL_RETRY_DELAY_MS,
        `endSession(${sessionId}, ${status})`
      );

      // Stop polling when session ends
      get().stopSessionPolling();

      set((state) => ({
        ...state,
        currentSession: null,
        currentQuest: null,
        error: null,
        apiError: null,
      }));
    } catch (error: any) {
      const errorMessage = error.message || "Failed to end session";
      console.error("[SessionSlice] endSession error:", {
        sessionId,
        status,
        error: errorMessage,
      });

      set((state) => ({
        ...state,
        apiError: errorMessage,
      }));
      
      throw error;
    }
  },

  refreshSession: async (sessionId: string) => {
    try {
      const result = await retryWithBackoff(
        async () => {
          const client = await getClient();
          return await client.sessions.get(sessionId);
        },
        2, // Fewer retries for polling to avoid blocking
        INITIAL_RETRY_DELAY_MS,
        `refreshSession(${sessionId})`
      );

      const currentSession = get().currentSession;
      const currentQuest = get().currentQuest;
      
      // Update if this is the active session OR if we're initializing (currentSession is null)
      // This allows refreshSession to work both for polling and initial session creation
      const shouldUpdate = !currentSession || currentSession.id === sessionId;
      
      if (shouldUpdate) {
        const sessionQuestId = result.session.quest_id;
        const isSessionCompleted = result.session.status === "COMPLETED" || result.session.status === "FAILED";
        
        // If session is completed/failed, clear quest (no longer needed)
        if (isSessionCompleted) {
          console.log("[SessionSlice] Session completed/failed, clearing quest");
          set((state) => ({
            ...state,
            currentSession: result.session,
            currentQuest: null,
            apiError: null,
          }));
          
          // Auto-stop polling
          get().stopSessionPolling();
          return;
        }
        
        // Check if we need to fetch/update quest
        const needsQuestUpdate = sessionQuestId && sessionQuestId !== currentQuest?.id;
        
        if (needsQuestUpdate) {
          console.log("[SessionSlice] Quest needs update:", {
            oldQuestId: currentQuest?.id,
            newQuestId: sessionQuestId,
          });
          
          try {
            // Fetch the quest from backend
            const client = await getClient();
            const questResult = await client.quests.get(sessionQuestId);
            
            // Update both session and quest atomically
            set((state) => ({
              ...state,
              currentSession: result.session,
              currentQuest: questResult.quest,
              apiError: null,
            }));
            
            console.log("[SessionSlice] Quest hydrated successfully:", questResult.quest.title);
          } catch (questError: any) {
            const is404 = questError?.message?.includes('404') || questError?.message?.toLowerCase()?.includes('not found');
            
            console.warn("[SessionSlice] Failed to fetch quest:", {
              questId: sessionQuestId,
              error: questError.message,
              is404,
            });
            
            // Quest no longer exists (404) or is inaccessible
            // Update session but clear quest to prevent stale state
            set((state) => ({
              ...state,
              currentSession: result.session,
              currentQuest: null,
              apiError: is404 
                ? `Quest ${sessionQuestId} no longer exists` 
                : `Failed to load quest: ${questError.message}`,
            }));
          }
        } else if (!sessionQuestId) {
          // Session has no quest_id - clear currentQuest to prevent desync
          console.log("[SessionSlice] Session has no quest_id, clearing quest");
          set((state) => ({
            ...state,
            currentSession: result.session,
            currentQuest: null,
            apiError: null,
          }));
        } else {
          // Quest is already correct, just update session
          set((state) => ({
            ...state,
            currentSession: result.session,
            apiError: null,
          }));
        }
      } else {
        console.log("[SessionSlice] Ignoring refresh for inactive session:", {
          requestedId: sessionId,
          currentId: currentSession?.id,
        });
      }
    } catch (error: any) {
      const is404 = error?.message?.includes('404') || error?.message?.toLowerCase()?.includes('not found');
      const errorMessage = error.message || "Failed to refresh session";
      
      console.error("[SessionSlice] refreshSession error:", {
        sessionId,
        error: errorMessage,
        is404,
      });

      // CRITICAL: Clear both currentSession and currentQuest on failure
      // Don't leave stale session data when polling fails
      set((state) => ({
        ...state,
        currentSession: null,
        currentQuest: null,
        apiError: is404 
          ? `Session ${sessionId} not found on server. Please start a new session.`
          : `Failed to refresh session: ${errorMessage}. Please try again.`,
      }));
      
      // Stop polling when session no longer exists
      if (is404) {
        console.log("[SessionSlice] Session not found (404), stopping polling");
        get().stopSessionPolling();
      }
    }
  },

  startSessionPolling: () => {
    // Clear any existing polling interval
    get().stopSessionPolling();

    console.log("[SessionSlice] Starting session polling");

    pollingIntervalId = setInterval(() => {
      const currentSession = get().currentSession;
      
      if (!currentSession) {
        console.log("[SessionSlice] No active session, stopping polling");
        get().stopSessionPolling();
        return;
      }

      // Don't poll if session is already completed
      if (currentSession.status === "COMPLETED" || currentSession.status === "FAILED") {
        console.log("[SessionSlice] Session already completed, stopping polling");
        get().stopSessionPolling();
        return;
      }

      // Refresh the session data
      get().refreshSession(currentSession.id);
    }, POLLING_INTERVAL_MS);
  },

  stopSessionPolling: () => {
    if (pollingIntervalId) {
      console.log("[SessionSlice] Stopping session polling");
      clearInterval(pollingIntervalId);
      pollingIntervalId = null;
    }
  },
});
