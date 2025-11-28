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

// --- Migrated from packages/db/src/validations.ts ---

export const NewSubscriberInput = z.object({
  firstName: z
    .string()
    .optional()
    .transform((v) => v?.trim() || null),
  email: z
    .string()
    .email()
    .transform((v) => v.trim().toLowerCase()),
  isActive: z.boolean().optional(),
});
export type NewSubscriberInput = z.infer<typeof NewSubscriberInput>;

export const SubscriberSchema = NewSubscriberInput.extend({
  id: z.string(),
  isActive: z.boolean(),
  createdAt: z.date(),
});
export type SubscriberData = z.infer<typeof SubscriberSchema>;

export const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(30, "Username must be less than 30 characters")
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    "Username can only contain letters, numbers, hyphens, and underscores",
  );

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password too long")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  );

export const paymentAmountSchema = z
  .number()
  .min(0.5, "Amount must be at least $0.50")
  .max(10000, "Amount cannot exceed $10,000");

export const sanitizedStringSchema = z
  .string()
  .trim()
  .max(1000, "String too long")
  .transform((str) =>
    (str as string).replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      "",
    ),
  );

export const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: passwordSchema,
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const verifyEmailSchema = z.object({
  token: z.string().min(1, "Verification token is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  password: passwordSchema,
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
