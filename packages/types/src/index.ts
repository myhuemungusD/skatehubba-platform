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

// ── RPG / INVENTORY SYSTEM ──────────────────────────────────────────────────
export const ItemTypeSchema = z.enum(["DECK", "TRUCKS", "WHEELS", "CLOTHING", "STICKER"]);
export type ItemType = z.infer<typeof ItemTypeSchema>;

export const RaritySchema = z.enum(["COMMON", "RARE", "EPIC", "LEGENDARY"]);
export type Rarity = z.infer<typeof RaritySchema>;

export const ItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: ItemTypeSchema,
  rarity: RaritySchema,
  image_url: z.string().url(),
  stats: z.object({
    pop: z.number().optional(),
    durability: z.number().optional(),
    style: z.number().optional(),
  }).optional(),
});
export type Item = z.infer<typeof ItemSchema>;

// ── QUEST / SESSION SYSTEM ──────────────────────────────────────────────────
export const QuestTypeSchema = z.enum(["SPOT_CHECK", "TRICK_BATTLE", "FILM_CLIP"]);
export type QuestType = z.infer<typeof QuestTypeSchema>;

export const DifficultySchema = z.enum(["EASY", "MEDIUM", "HARD", "GNARLY"]);
export type Difficulty = z.infer<typeof DifficultySchema>;

export const QuestSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  location: z.object({
    name: z.string(),
    lat: z.number(),
    lng: z.number(),
  }),
  type: QuestTypeSchema,
  difficulty: DifficultySchema,
  reward: z.object({
    gold: z.number().int().positive(),
    xp: z.number().int().positive(),
    item_id: z.string().uuid().optional(),
  }),
  expires_at: z.number(), // Unix timestamp
});
export type Quest = z.infer<typeof QuestSchema>;

// ── ACTIVE SESSION ──────────────────────────────────────────────────────────
export const SessionSchema = z.object({
  id: z.string().uuid(),
  host_id: z.string(),
  quest_id: z.string().uuid(),
  status: z.enum(["ACTIVE", "COMPLETED", "FAILED"]),
  start_time: z.number(), // Unix timestamp
  clips: z.array(z.string().url()).default([]), // URLs to uploaded footy
});
export type Session = z.infer<typeof SessionSchema>;
