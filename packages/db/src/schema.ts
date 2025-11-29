import { z } from 'zod';

export const StanceSchema = z.enum(['regular', 'goofy']);
export const ItemTypeSchema = z.enum(['top', 'bottom', 'deck', 'hardware']);
export const ChallengeStatusSchema = z.enum(['pending', 'active', 'completed']);
export const GameStatusSchema = z.enum(['pending', 'active', 'completed']);
export const TurnTypeSchema = z.enum(['setTrick', 'attemptMatch']);
export const SessionStatusSchema = z.enum(['active', 'completed', 'abandoned']);
export const QuestStatusSchema = z.enum(['available', 'locked', 'completed']);
export const QuestTypeSchema = z.enum(['daily', 'weekly', 'milestone', 'achievement']);
export const BadgeRaritySchema = z.enum(['common', 'rare', 'epic', 'legendary']);

export const GeoPointSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

export const VideoClipSchema = z.object({
  url: z.string().regex(/^gs:\/\/.*/),
  duration: z.number().max(15),
  ts: z.any(),
});

export const ChallengeRulesSchema = z.object({
  oneTake: z.boolean(),
  durationSec: z.number().positive(),
});

export const GameLettersSchema = z.object({
  challenger: z.string(),
  opponent: z.string(),
});

export const UserSchema = z.object({
  uid: z.string().min(1),
  handle: z.string().min(1).max(20),
  email: z.string().email().optional(),
  stance: StanceSchema,
  hubbaBucks: z.number().int().nonnegative().optional().default(0),
  xp: z.number().int().nonnegative().optional().default(0),
  level: z.number().int().positive().optional().default(1),
  avatarUrl: z.string().url().optional(),
  referralCode: z.string().optional(),
  referredBy: z.string().optional(),
  createdAt: z.any(),
  updatedAt: z.any().optional(),
});

export const ChallengeSchema = z.object({
  id: z.string(),
  createdBy: z.string(),
  opponent: z.string(),
  rules: ChallengeRulesSchema,
  clipA: VideoClipSchema,
  clipB: VideoClipSchema.optional(),
  status: ChallengeStatusSchema,
  winner: z.string().optional(),
  deadline: z.any().optional(),
  createdAt: z.any(),
  updatedAt: z.any().optional(),
});

export const SpotSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
  geo: GeoPointSchema,
  difficulty: z.string().optional(),
  imageUrl: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  createdBy: z.string().optional(),
  createdAt: z.any(),
  updatedAt: z.any().optional(),
});

export const CheckInSchema = z.object({
  id: z.string(),
  uid: z.string(),
  spotId: z.string(),
  proofVideoUrl: z.string().url(),
  geo: GeoPointSchema,
  createdAt: z.any(),
});

export const TransactionSchema = z.object({
  id: z.string(),
  amount: z.number(),
  type: z.enum(['earn', 'spend']),
  description: z.string(),
  timestamp: z.any(),
});

export const WalletSchema = z.object({
  uid: z.string(),
  balance: z.number().nonnegative(),
  transactions: z.array(TransactionSchema).optional(),
  updatedAt: z.any(),
});

export const ClosetItemSchema = z.object({
  id: z.string(),
  type: ItemTypeSchema,
  brand: z.string().min(1),
  name: z.string().optional(),
  imageUrl: z.string().url().optional(),
  rarity: z.string().optional(),
  equipped: z.boolean().optional(),
  purchasedAt: z.any(),
});

export const SkateGameSchema = z.object({
  id: z.string(),
  challengerUid: z.string(),
  opponentUid: z.string(),
  status: GameStatusSchema,
  letters: GameLettersSchema,
  currentTurnUid: z.string().optional(),
  currentTurnType: TurnTypeSchema,
  currentTrickVideoUrl: z.string().url().optional(),
  pendingAttemptVideoUrl: z.string().url().optional(),
  winnerUid: z.string().optional(),
  createdAt: z.any(),
  updatedAt: z.any().optional(),
});

export const QuestRequirementSchema = z.object({
  type: z.string(),
  target: z.number().positive(),
  current: z.number().nonnegative().optional(),
});

export const QuestRewardSchema = z.object({
  xp: z.number().nonnegative(),
  gold: z.number().nonnegative(),
  items: z.array(z.string()).optional(),
  badges: z.array(z.string()).optional(),
});

export const QuestSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string(),
  type: QuestTypeSchema,
  status: QuestStatusSchema,
  requirements: z.array(QuestRequirementSchema),
  rewards: QuestRewardSchema,
  expiresAt: z.any().optional(),
  createdAt: z.any(),
  updatedAt: z.any().optional(),
});

export const SessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  questId: z.string(),
  status: SessionStatusSchema,
  progress: z.record(z.string(), z.number()),
  startedAt: z.any(),
  completedAt: z.any().optional(),
  updatedAt: z.any().optional(),
});

export const ReferralSchema = z.object({
  id: z.string(),
  referrerId: z.string(),
  referredEmail: z.string().email(),
  referredUserId: z.string().nullable(),
  createdAt: z.any(),
  completed: z.boolean().default(false),
});

export const BadgeSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string(),
  imageUrl: z.string().url().optional(),
  rarity: BadgeRaritySchema,
  requirement: z.string().optional(),
  createdAt: z.any(),
});

export const UserBadgeSchema = z.object({
  userId: z.string(),
  badgeId: z.string(),
  earnedAt: z.any(),
  displayed: z.boolean().optional(),
});
