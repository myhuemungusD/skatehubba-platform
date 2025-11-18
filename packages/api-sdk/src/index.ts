import axios, { AxiosInstance } from 'axios';
import type { Spot, Challenge, CheckIn, User } from '@skatehubba/types';

export class SkateHubbaClient {
  private client: AxiosInstance;

  constructor(baseURL: string, apiKey?: string) {
    this.client = axios.create({
      baseURL,
      headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {},
    });
  }

  async getSpots(): Promise<Spot[]> {
    const { data } = await this.client.get('/spots');
    return data;
  }

  async getSpot(id: string): Promise<Spot> {
    const { data } = await this.client.get(`/spots/${id}`);
    return data;
  }

  async createSpot(spot: Omit<Spot, 'id' | 'createdAt'>): Promise<Spot> {
    const { data } = await this.client.post('/spots', spot);
    return data;
  }

  async getChallenges(): Promise<Challenge[]> {
    const { data } = await this.client.get('/challenges');
    return data;
  }

  async createChallenge(challenge: Omit<Challenge, 'id' | 'ts'>): Promise<Challenge> {
    const { data } = await this.client.post('/challenges', challenge);
    return data;
  }

  async checkIn(checkIn: Omit<CheckIn, 'id' | 'ts'>): Promise<CheckIn> {
    const { data } = await this.client.post('/checkins', checkIn);
    return data;
  }

  async getCurrentUser(): Promise<User> {
    const { data } = await this.client.get('/auth/me');
    return data;
  }
}

export const createClient = (baseURL: string, apiKey?: string) => 
  new SkateHubbaClient(baseURL, apiKey);
