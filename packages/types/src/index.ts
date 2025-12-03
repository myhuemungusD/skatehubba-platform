import { z } from 'zod';

/* -------------------------------------------------
   1. CORE ENUMS
------------------------------------------------- */
export const StanceSchema = z.enum(['regular', 'goofy']);
export type Stance = z.infer<typeof StanceSchema>;

export const RaritySchema = z.enum(['common', 'rare', 'epic', 'legendary']);
export type Rarity = z.infer<typeof RaritySchema>;

/* -------------------------------------------------
   2.5. NEW TYPES (Alignment)
------------------------------------------------- */
export const TrickAttemptSchema = z.object({
  id: z.string(),
  challengeId: z.string(),
  userId: z.string(),
  trickName: z.string(),
  videoUrl: z.string().url(),
  landed: z.boolean(),
  timestamp: z.number(),
});
export type TrickAttempt = z.infer<typeof TrickAttemptSchema>;

export const LeaderboardEntrySchema = z.object({
  userId: z.string(),
  handle: z.string(),
  score: z.number(),
  rank: z.number(),
  avatarUrl: z.string().optional(),
});
export type LeaderboardEntry = z.infer<typeof LeaderboardEntrySchema>;

export const CheckInSchema = z.object({
  id: z.string(),
  userId: z.string(),
  spotId: z.string(),
  timestamp: z.number(),
});
export type CheckIn = z.infer<typeof CheckInSchema>;

export const NotificationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.enum(['challenge_invite', 'turn_notification', 'level_up']),
  message: z.string(),
  read: z.boolean(),
  createdAt: z.number(),
});
export type Notification = z.infer<typeof NotificationSchema>;

/* -------------------------------------------------
   2. AVATAR ITEM
------------------------------------------------- */
export const AvatarItemSchema = z.object({
  id: z.string().min(3),
  type: z.enum(['outfit', 'deck', 'shoes', 'hat', 'buddy']),
  name: z.string().min(1),
  rarity: RaritySchema,
  imageUrl: z.string().url(),
  tradable: z.boolean(),
  acquiredAt: z.number().optional(),
});
export type AvatarItem = z.infer<typeof AvatarItemSchema>;

/* -------------------------------------------------
   3. USER STATS
------------------------------------------------- */
export const UserStatsSchema = z.object({
  wins: z.number().int().min(0),
  losses: z.number().int().min(0),
  checkIns: z.number().int().min(0),
  hubbaBucks: z.number().int().min(0),
  distanceSkated: z.number().min(0).default(0),
  rank: z.number().int().min(1).optional(),
});
export type UserStats = z.infer<typeof UserStatsSchema>;

/* -------------------------------------------------
   4. EQUIPPED AVATAR
------------------------------------------------- */
export const UserAvatarSchema = z.object({
  outfit: z.string().min(1),
  deck: z.string().min(1),
  shoes: z.string().min(1),
  hat: z.string().min(1),
  buddy: z.string().min(1).optional(),
});
export type UserAvatar = z.infer<typeof UserAvatarSchema>;

/* -------------------------------------------------
   5. FULL USER PROFILE (THE ONE SOURCE OF TRUTH)
------------------------------------------------- */
export const UserProfileSchema = z.object({
  uid: z.string().min(1),
  handle: z.string().min(3).max(20).trim(),
  username: z.string().optional(),
  photoURL: z.string().url().optional(),
  stance: StanceSchema,
  level: z.number().int().min(1).default(1),
  xp: z.number().int().min(0).default(0),
  maxXp: z.number().int().min(100),
  sponsors: z.array(z.string().min(1)),
  badges: z.array(z.string().url()),
  stats: UserStatsSchema,
  avatar: UserAvatarSchema,
  items: z.array(AvatarItemSchema),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

/* -------------------------------------------------
   6. SPOT
------------------------------------------------- */
export const SpotSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  latitude: z.number(),
  longitude: z.number(),
  imageUrl: z.string().url().optional(),
  rating: z.number().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
});
export type Spot = z.infer<typeof SpotSchema>;

/* -------------------------------------------------
   7. CHALLENGE
------------------------------------------------- */
export const ChallengeSchema = z.object({
  id: z.string(),
  creatorId: z.string(),
  opponentId: z.string().optional(),
  trickId: z.string().optional(),
  status: z.enum(['pending', 'accepted', 'declined', 'completed']),
  videoUrl: z.string().url().optional(),
  createdAt: z.number(),
  rules: z.object({
    oneTake: z.boolean().optional(),
    durationSec: z.number().optional(),
  }),
});
export type SkateChallenge = z.infer<typeof ChallengeSchema>;
export type Challenge = SkateChallenge; // Alias for backward compatibility

/* -------------------------------------------------
   8. CHECK-IN
------------------------------------------------- */
export const CheckInSchema = z.object({
  id: z.string(),
  userId: z.string(),
  spotId: z.string(),
  timestamp: z.number(),
  imageUrl: z.string().url().optional(),
});
export type CheckIn = z.infer<typeof CheckInSchema>;

/* -------------------------------------------------
   9. SKATE GAME
------------------------------------------------- */
export const SkateGameSchema = z.object({
  id: z.string(),
  player1Id: z.string(),
  player2Id: z.string(),
  currentTurn: z.string(),
  letters: z.record(z.string(), z.number()), // e.g. { player1: 0, player2: 1 } where 1 = S
  status: z.enum(['active', 'completed']),
});
export type SkateGame = z.infer<typeof SkateGameSchema>;
