import { z } from 'zod';

/* -------------------------------------------------
   1. CORE ENUMS
------------------------------------------------- */
export const StanceSchema = z.enum(['regular', 'goofy']);
export type Stance = z.infer<typeof StanceSchema>;

export const RaritySchema = z.enum(['common', 'rare', 'epic', 'legendary']);
export type Rarity = z.infer<typeof RaritySchema>;

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
   6. RE-EXPORT FOR CLEAN IMPORTS
------------------------------------------------- */
export {
  StanceSchema,
  RaritySchema,
  AvatarItemSchema,
  UserStatsSchema,
  UserAvatarSchema,
  UserProfileSchema,
};
