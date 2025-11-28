import {
  type Challenge,
  type CheckIn,
  type SkateGame,
  type Spot,
  type User,
} from "@skatehubba/types";
import { Functions, httpsCallable } from "firebase/functions";

export class SkateHubbaClient {
  private functions: Functions;

  constructor(functions: Functions) {
    this.functions = functions;
  }

  get spots() {
    return {
      list: async (params?: any, signal?: AbortSignal) => {
        const fn = httpsCallable(this.functions, "getSpots");
        const res = await fn(params || {});
        return (res.data as any).spots as Spot[];
      },
      get: async (id: string, signal?: AbortSignal) => {
        const fn = httpsCallable(this.functions, "getSpot");
        const res = await fn({ spotId: id });
        return (res.data as any).spot as Spot;
      },
      create: async (data: Omit<Spot, "id" | "createdAt" | "createdBy">) => {
        const fn = httpsCallable(this.functions, "createSpot");
        const res = await fn(data);
        return (res.data as any).spot as Spot;
      },
    };
  }

  get challenges() {
    return {
      list: async () => {
        const fn = httpsCallable(this.functions, "getChallenges");
        const res = await fn();
        return (res.data as any).challenges as Challenge[];
      },
      create: async (data: Omit<Challenge, "id" | "ts">) => {
        const fn = httpsCallable(this.functions, "createChallenge");
        const res = await fn(data);
        return (res.data as any).challenge as Challenge;
      },
    };
  }

  get checkins() {
    return {
      create: async (data: Omit<CheckIn, "id" | "ts">) => {
        const fn = httpsCallable(this.functions, "createCheckin");
        const res = await fn(data);
        return (res.data as any).checkin as CheckIn;
      },
    };
  }

  get skate() {
    return {
      create: async (data: { trickVideoUrl: string; opponentHandle?: string }) => {
        const fn = httpsCallable(this.functions, "createSkateGame");
        const res = await fn(data);
        return (res.data as any).game as SkateGame;
      },
      get: async (id: string) => {
        const fn = httpsCallable(this.functions, "getSkateGame");
        const res = await fn({ gameId: id });
        return (res.data as any).game as SkateGame;
      },
      join: async (id: string) => {
        const fn = httpsCallable(this.functions, "joinSkateGame");
        const res = await fn({ gameId: id });
        return (res.data as any).game as SkateGame;
      },
    };
  }
}

export const createClient = (functions: Functions) => new SkateHubbaClient(functions);
