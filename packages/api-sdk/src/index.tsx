import React, { createContext, useContext, useMemo } from "react";
import { type Functions, httpsCallable, getFunctions } from "firebase/functions";
import { getApp } from "firebase/app";
import type {
  Challenge,
  CheckIn,
  SkateGame,
  Spot,
} from "@skatehubba/types";

// ==========================================
// 1. THE CLIENT (The Engine)
// ==========================================

export class SkateHubbaClient {
  constructor(private functions: Functions) {}

  /**
   * Generic wrapper to handle strictly typed Cloud Function calls.
   * Prevents "as any" casting and standardizes error handling.
   */
  private async call<Res, Req = unknown>(name: string, data?: Req): Promise<Res> {
    const fn = httpsCallable<Req, Res>(this.functions, name);
    try {
      const response = await fn(data as Req);
      return response.data;
    } catch (error) {
      console.error(`[SkateHubba API] Error calling ${name}:`, error);
      throw error;
    }
  }

  // --- SPOTS ---
  public readonly spots = {
    list: (params?: Record<string, unknown>) =>
      this.call<{ spots: Spot[] }>("getSpots", params),

    get: (id: string) =>
      this.call<{ spot: Spot }, { spotId: string }>("getSpot", { spotId: id }),

    create: (data: Omit<Spot, "id" | "createdAt" | "createdBy">) =>
      this.call<{ spot: Spot }>("createSpot", data),
  };

  // --- CHALLENGES (Video Submissions) ---
  public readonly challenges = {
    list: () =>
      this.call<{ challenges: Challenge[] }>("getChallenges"),

    create: (data: Omit<Challenge, "id" | "ts">) =>
      this.call<{ challenge: Challenge }>("createChallenge", data),
  };

  // --- CHECK-INS (Geo-fencing) ---
  public readonly checkins = {
    create: (data: Omit<CheckIn, "id" | "ts">) =>
      this.call<{ checkin: CheckIn }>("createCheckin", data),
  };

  // --- GAME OF S.K.A.T.E. ---
  public readonly skate = {
    create: (data: { trickVideoUrl: string; opponentHandle?: string }) =>
      this.call<{ game: SkateGame }>("createSkateGame", data),

    get: (id: string) =>
      this.call<{ game: SkateGame }, { gameId: string }>("getSkateGame", { gameId: id }),

    join: (id: string) =>
      this.call<{ game: SkateGame }, { gameId: string }>("joinSkateGame", { gameId: id }),
  };
}

export const createClient = (functions: Functions) => new SkateHubbaClient(functions);

// ==========================================
// 2. THE REACT CONTEXT (The Glue)
// ==========================================

const SkateHubbaContext = createContext<SkateHubbaClient | null>(null);

/**
 * Wraps your application to provide API access.
 * Automatically connects to Firebase Functions.
 */
export function SkateHubbaProvider({
  children,
  region = "us-central1",
}: {
  children: React.ReactNode;
  region?: string;
}) {
  const client = useMemo(() => {
    // 1. Get the initialized Firebase App
    const app = getApp(); 
    // 2. Get the Functions instance
    const functions = getFunctions(app, region);
    
    // 3. (Optional) Connect to Emulator if strictly in Dev Mode
    // if (__DEV__) {
    //   connectFunctionsEmulator(functions, "localhost", 5001);
    // }

    return createClient(functions);
  }, [region]);

  return (
    <SkateHubbaContext.Provider value={client}>
      {children}
    </SkateHubbaContext.Provider>
  );
}

/**
 * Hook to access the SkateHubba API client.
 */
export function useSkateHubba(): SkateHubbaClient {
  const client = useContext(SkateHubbaContext);
  if (!client) {
    throw new Error("useSkateHubba must be used within a SkateHubbaProvider");
  }
  return client;
}