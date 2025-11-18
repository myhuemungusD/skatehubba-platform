import { z } from 'zod';

export const SpotSchema = z.object({
  id: z.string(),
  name: z.string(),
  geo: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  createdAt: z.date(),
  createdBy: z.string(),
});

export const ChallengeSchema = z.object({
  id: z.string(),
  createdBy: z.string(),
  status: z.enum(['pending', 'accepted', 'completed', 'expired']),
  rules: z.object({
    oneTake: z.boolean(),
    durationSec: z.number(),
  }),
  clipA: z.string(),
  clipB: z.string().optional(),
  ts: z.date(),
});

export const CheckInSchema = z.object({
  id: z.string(),
  uid: z.string(),
  spotId: z.string(),
  ts: z.date(),
  proofVideoUrl: z.string().nullable(),
});

export type Spot = z.infer<typeof SpotSchema>;
export type Challenge = z.infer<typeof ChallengeSchema>;
export type CheckIn = z.infer<typeof CheckInSchema>;

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}
