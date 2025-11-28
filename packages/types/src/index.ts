import { z } from "zod";

// --- SKATER PROFILE ---
export const StanceSchema = z.enum(["regular", "goofy"]);
export type Stance = z.infer<typeof StanceSchema>;

export const UserSchema = z.object({
  uid: z.string(),
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/, "No special chars"),
  email: z.string().email(),
  photoURL: z.string().url().optional(),
  stance: StanceSchema.default("regular"),
  bio: z.string().max(140).optional(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
    city: z.string().optional(),
  }).optional(),
  stats: z.object({
    wins: z.number().int().default(0),
    losses: z.number().int().default(0),
    rank: z.number().int().default(1000), // Elo rating
  }).default({}),
  createdAt: z.string().datetime(), // ISO String
  updatedAt: z.string().datetime(),
});
export type User = z.infer<typeof UserSchema>;

// --- GAME ---
export const GameStatusSchema = z.enum(["pending", "active", "completed", "forfeit"]);
export type GameStatus = z.infer<typeof GameStatusSchema>;

export const GameSchema = z.object({
  id: z.string(),
  hostId: z.string(),
  opponentId: z.string().optional(),
  status: GameStatusSchema.default("pending"),
  letters: z.object({
    host: z.string().default(""),
    opponent: z.string().default(""),
  }).default({ host: "", opponent: "" }),
  currentTurn: z.string(), // uid of current player
  winnerId: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Game = z.infer<typeof GameSchema>;

// --- TRICK ---
export const TrickSchema = z.object({
  id: z.string(),
  name: z.string(),
  difficulty: z.enum(["easy", "medium", "hard", "pro"]),
  points: z.number().int().positive(),
  description: z.string().optional(),
});
export type Trick = z.infer<typeof TrickSchema>;

// --- SPOTS & CHALLENGES (Restored) ---
export const SpotSchema = z.object({
  id: z.string(),
  name: z.string(),
  geo: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  createdAt: z.string().datetime(),
  createdBy: z.string(),
});
export type Spot = z.infer<typeof SpotSchema>;

export const ChallengeSchema = z.object({
  id: z.string(),
  createdBy: z.string(),
  status: z.enum(["pending", "accepted", "completed", "expired"]),
  rules: z.object({
    oneTake: z.boolean(),
    durationSec: z.number(),
  }),
  clipA: z.string(),
  clipB: z.string().optional(),
  ts: z.string().datetime(),
});
export type Challenge = z.infer<typeof ChallengeSchema>;

export const CheckInSchema = z.object({
  id: z.string(),
  uid: z.string(),
  spotId: z.string(),
  ts: z.string().datetime(),
  proofVideoUrl: z.string().nullable(),
});
export type CheckIn = z.infer<typeof CheckInSchema>;

// Alias for backward compatibility
export type SkateGame = Game;
