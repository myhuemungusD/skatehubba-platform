import {
  type Challenge,
  type CheckIn,
  type SkateGame,
  type Spot,
} from "@skatehubba/types";
import { type Functions, httpsCallable } from "firebase/functions";

export class SkateHubbaClient {
  private functions: Functions;

  constructor(functions: Functions) {
    this.functions = functions;
  }

  /**
   * "The Pop" - A generic wrapper to handle the httpsCallable boilerplate safely.
   * Prevents "Sketchy Landings" by enforcing return types.
   */
  private async call<TRequest, TResponse>(
    name: string,
    data?: TRequest
  ): Promise<TResponse> {
    const fn = httpsCallable<TRequest, TResponse>(this.functions, name);
    const result = await fn(data);
    return result.data;
  }

  // Use properties instead of getters to prevent "Speed Wobble" (re-renders)
  public readonly spots = {
    list: async (params?: Record<string, unknown>) => {
      const res = await this.call<
        Record<string, unknown> | undefined,
        { spots: Spot[] }
      >("getSpots", params || {});
      return res.spots;
    },
    get: async (id: string) => {
      const res = await this.call<{ spotId: string }, { spot: Spot }>(
        "getSpot",
        { spotId: id }
      );
      return res.spot;
    },
    create: async (data: Omit<Spot, "id" | "createdAt" | "createdBy">) => {
      const res = await this.call<
        Omit<Spot, "id" | "createdAt" | "createdBy">,
        { spot: Spot }
      >("createSpot", data);
      return res.spot;
    },
  };

  public readonly challenges = {
    list: async () => {
      const res = await this.call<void, { challenges: Challenge[] }>(
        "getChallenges"
      );
      return res.challenges;
    },
    create: async (data: Omit<Challenge, "id" | "ts">) => {
      const res = await this.call<
        Omit<Challenge, "id" | "ts">,
        { challenge: Challenge }
      >("createChallenge", data);
      return res.challenge;
    },
  };

  public readonly checkins = {
    create: async (data: Omit<CheckIn, "id" | "ts">) => {
      const res = await this.call<
        Omit<CheckIn, "id" | "ts">,
        { checkin: CheckIn }
      >("createCheckin", data);
      return res.checkin;
    },
  };

  public readonly skate = {
    create: async (data: { trickVideoUrl: string; opponentHandle?: string }) => {
      const res = await this.call<
        { trickVideoUrl: string; opponentHandle?: string },
        { game: SkateGame }
      >("createSkateGame", data);
      return res.game;
    },
    get: async (id: string) => {
      const res = await this.call<{ gameId: string }, { game: SkateGame }>(
        "getSkateGame",
        { gameId: id }
      );
      return res.game;
    },
    join: async (id: string) => {
      const res = await this.call<{ gameId: string }, { game: SkateGame }>(
        "joinSkateGame",
        { gameId: id }
      );
      return res.game;
    },
  };
}

export const createClient = (functions: Functions) =>
  new SkateHubbaClient(functions);
