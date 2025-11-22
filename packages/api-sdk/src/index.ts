import axios, { AxiosInstance } from 'axios';
import { z } from 'zod';
import { 
  loginSchema, 
  registerSchema, 
  type LoginInput, 
  type RegisterInput 
} from '@skatehubba/db/validations';
import type { 
  Spot, 
  Challenge, 
  CheckIn, 
  User,
  SkateGame
} from '@skatehubba/types';

export class SkateHubbaClient {
  private client: AxiosInstance;

  constructor(baseURL: string, token?: string) {
    this.client = axios.create({
      baseURL,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  setToken(token: string) {
    this.client.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  get auth() {
    return {
      login: async (data: LoginInput) => {
        // Runtime validation
        loginSchema.parse(data); 
        return this.post<{ token: string; user: User }>('/auth/login', data);
      },
      register: async (data: RegisterInput) => {
        registerSchema.parse(data);
        return this.post<{ token: string; user: User }>('/auth/register', data);
      },
      me: () => this.get<User>('/auth/me'),
    };
  }

  get spots() {
    return {
      list: () => this.get<Spot[]>('/spots'),
      get: (id: string) => this.get<Spot>(`/spots/${id}`),
      create: (data: Omit<Spot, 'id' | 'createdAt' | 'createdBy'>) => 
        this.post<Spot>('/spots', data),
    };
  }

  get challenges() {
    return {
      list: () => this.get<Challenge[]>('/challenges'),
      create: (data: Omit<Challenge, 'id' | 'ts'>) => 
        this.post<Challenge>('/challenges', data),
    };
  }

  get checkins() {
    return {
      create: (data: Omit<CheckIn, 'id' | 'ts'>) => 
        this.post<CheckIn>('/checkins', data),
    };
  }

  get skate() {
    return {
      create: (data: { trickVideoUrl: string; opponentHandle?: string }) =>
        this.post<SkateGame>('/skate/games', data),
      get: (id: string) => this.get<SkateGame>(`/skate/games/${id}`),
      join: (id: string) => this.post<SkateGame>(`/skate/games/${id}/join`, {}),
      turn: (id: string, data: { action: 'attempt' | 'judge' | 'set'; videoUrl?: string; judgment?: 'landed' | 'bailed' }) =>
        this.post<SkateGame>(`/skate/games/${id}/turn`, data),
    };
  }

  // Generic helpers
  private async get<T>(url: string): Promise<T> {
    const res = await this.client.get<T>(url);
    return res.data;
  }

  private async post<T>(url: string, data: any): Promise<T> {
    const res = await this.client.post<T>(url, data);
    return res.data;
  }
}

// Singleton instance for easy import
export const createClient = (url: string, token?: string) => new SkateHubbaClient(url, token);

