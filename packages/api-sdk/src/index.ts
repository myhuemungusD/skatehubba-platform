import {
  type LoginInput,
  loginSchema,
  type RegisterInput,
  registerSchema,
} from "@skatehubba/db";
import type {
  Challenge,
  CheckIn,
  SkateGame,
  Spot,
  User,
} from "@skatehubba/types";
import axios, { type AxiosInstance } from "axios";

export class SkateHubbaClient {
  private client: AxiosInstance;

  constructor(baseURL: string, token?: string) {
    this.client = axios.create({
      baseURL,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  setToken(token: string) {
    this.client.defaults.headers.Authorization = `Bearer ${token}`;
  }

  get auth() {
    return {
      login: async (data: LoginInput) => {
        // Runtime validation
        loginSchema.parse(data);
        return this.post<{ token: string; user: User }>("/auth/login", data);
      },
      register: async (data: RegisterInput) => {
        registerSchema.parse(data);
        return this.post<{ token: string; user: User }>("/auth/register", data);
      },
      me: () => this.get<User>("/auth/me"),
    };
  }

  get spots() {
    return {
      list: (params?: any, signal?: AbortSignal) =>
        this.get<Spot[]>("/spots", { params, signal }),
      get: (id: string, signal?: AbortSignal) =>
        this.get<Spot>(`/spots/${id}`, { signal }),
      create: (data: Omit<Spot, "id" | "createdAt" | "createdBy">) =>
        this.post<Spot>("/spots", data),
    };
  }

  get challenges() {
    return {
      list: () => this.get<Challenge[]>("/challenges"),
      create: (data: Omit<Challenge, "id" | "ts">) =>
        this.post<Challenge>("/challenges", data),
    };
  }

  get checkins() {
    return {
      create: (data: Omit<CheckIn, "id" | "ts">) =>
        this.post<CheckIn>("/checkins", data),
    };
  }

  get skate() {
    return {
      create: (data: { trickVideoUrl: string; opponentHandle?: string }) =>
        this.post<SkateGame>("/skate/games", data),
      get: (id: string) => this.get<SkateGame>(`/skate/games/${id}`),
      join: (id: string) => this.post<SkateGame>(`/skate/games/${id}/join`, {}),
      turn: (
        id: string,
        data: {
          action: "attempt" | "judge" | "set";
          videoUrl?: string;
          judgment?: "landed" | "bailed";
        },
      ) => this.post<SkateGame>(`/skate/games/${id}/turn`, data),
      leaderboard: () => this.get<User[]>("/skate/games/leaderboard"),
    };
  }

  // Generic helpers
  private async get<T>(url: string, config?: any): Promise<T> {
    const res = await this.client.get<T>(url, config);
    return res.data;
  }

  private async post<T>(url: string, data: any): Promise<T> {
    const res = await this.client.post<T>(url, data);
    return res.data;
  }
}

// Singleton instance for easy import
export const createClient = (url: string, token?: string) =>
  new SkateHubbaClient(url, token);
