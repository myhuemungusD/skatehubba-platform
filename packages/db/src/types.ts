import { Timestamp } from '@google-cloud/firestore';

export type Stance = 'regular' | 'goofy';
export type ItemType = 'top' | 'bottom' | 'deck' | 'hardware';
export type ChallengeStatus = 'pending' | 'active' | 'completed';
export type GameStatus = 'pending' | 'active' | 'completed';
export type TurnType = 'setTrick' | 'attemptMatch';
export type SessionStatus = 'active' | 'completed' | 'abandoned';
export type QuestStatus = 'available' | 'locked' | 'completed';
export type QuestType = 'daily' | 'weekly' | 'milestone' | 'achievement';

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface VideoClip {
  url: string;
  duration: number;
  ts: Timestamp;
}

export interface ChallengeRules {
  oneTake: boolean;
  durationSec: number;
}

export interface GameLetters {
  challenger: string;
  opponent: string;
}

export interface User {
  uid: string;
  handle: string;
  email?: string;
  stance: Stance;
  hubbaBucks?: number;
  xp?: number;
  level?: number;
  avatarUrl?: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export interface Challenge {
  id: string;
  createdBy: string;
  opponent: string;
  rules: ChallengeRules;
  clipA: VideoClip;
  clipB?: VideoClip;
  status: ChallengeStatus;
  winner?: string;
  deadline?: Timestamp;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export interface Spot {
  id: string;
  name: string;
  description?: string;
  geo: GeoPoint;
  difficulty?: string;
  imageUrl?: string;
  tags?: string[];
  createdBy?: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export interface CheckIn {
  id: string;
  uid: string;
  spotId: string;
  proofVideoUrl: string;
  geo: GeoPoint;
  createdAt: Timestamp;
}

export interface Wallet {
  uid: string;
  balance: number;
  transactions?: Transaction[];
  updatedAt: Timestamp;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'earn' | 'spend';
  description: string;
  timestamp: Timestamp;
}

export interface ClosetItem {
  id: string;
  type: ItemType;
  brand: string;
  name?: string;
  imageUrl?: string;
  rarity?: string;
  equipped?: boolean;
  purchasedAt: Timestamp;
}

export interface SkateGame {
  id: string;
  challengerUid: string;
  opponentUid: string;
  status: GameStatus;
  letters: GameLetters;
  currentTurnUid?: string;
  currentTurnType: TurnType;
  currentTrickVideoUrl?: string;
  pendingAttemptVideoUrl?: string;
  winnerUid?: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: QuestType;
  status: QuestStatus;
  requirements: QuestRequirement[];
  rewards: QuestReward;
  expiresAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export interface QuestRequirement {
  type: string;
  target: number;
  current?: number;
}

export interface QuestReward {
  xp: number;
  gold: number;
  items?: string[];
  badges?: string[];
}

export interface Session {
  id: string;
  userId: string;
  questId: string;
  status: SessionStatus;
  progress: Record<string, number>;
  startedAt: Timestamp;
  completedAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Referral {
  id: string;
  referrerId: string;
  referredUserId: string;
  code: string;
  rewardClaimed: boolean;
  createdAt: Timestamp;
  claimedAt?: Timestamp;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirement?: string;
  createdAt: Timestamp;
}

export interface UserBadge {
  userId: string;
  badgeId: string;
  earnedAt: Timestamp;
  displayed?: boolean;
}
