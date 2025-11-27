import { z } from "zod";

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
  status: z.enum(["pending", "accepted", "completed", "expired"]),
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

export type SkateLetter = "S" | "K" | "A" | "T" | "E";
export type TurnType = "setTrick" | "attemptMatch" | "judgeAttempt";

export interface SkateGame {
  id: string;
  challengerId: string;
  opponentId: string | null;
  status: "pending" | "active" | "completed" | "forfeit";
  letters: {
    challenger: string;
    opponent: string;
  };
  currentTurnId: string;
  currentTurnType: TurnType;
  currentTrickVideoUrl: string | null;
  pendingAttemptVideoUrl?: string | null;
  rounds: {
    setBy: string;
    trickVideoUrl: string;
    attempts: {
      uid: string;
      videoUrl: string;
      result: "landed" | "bailed" | "pending";
      judgedAt?: string;
    }[];
  }[];
  winnerId?: string | null;
  createdAt: string; // API returns ISO string
  updatedAt: string;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  handle: string;
  stance: "regular" | "goofy";
  sponsors: string[];
  stats: {
    wins: number;
    losses: number;
  };
  board: {
    deck: string;
    trucks?: string;
    wheels?: string;
  };
  avatarUrl?: string;
}

export interface Item {
  id: string;
  type: "deck" | "top" | "bottom" | "shoes";
  name: string;
  equipped: boolean;
  price?: number;
  imageUrl?: string;
}
