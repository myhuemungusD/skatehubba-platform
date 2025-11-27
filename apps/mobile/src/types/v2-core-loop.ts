/**
 * V2 Core Loop Type Definitions
 *
 * These types define the data model for the new judging system,
 * enforcing the "no re-dos" rule and structured judge voting.
 */

import type { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

// --- Game Length Options ---
export type GameLength = "SKATE" | "SK8";

// --- Submission Status ---
export type SubmissionStatus = "PENDING" | "RESOLVED" | "DISPUTE";

// --- Vote Types ---
export type VoteType = "LANDED" | "LETTER" | "DISPUTE";

// --- Resolved Outcomes ---
export type ResolvedOutcome = "LANDED" | "LETTER" | null;

// --- Judging Votes Structure ---
export interface JudgingVotes {
  /** Count of LANDED votes (resolution threshold: >= 3) */
  landedVotes: number;
  /** Count of LETTER votes (resolution threshold: >= 3) */
  letterVotes: number;
  /** Count of DISPUTE votes (tracked but doesn't auto-resolve at MVP) */
  disputeVotes: number;
  /** Array of judge user IDs who have already voted */
  judgesVoted: string[];
}

// --- Submission Document Structure ---
export interface Submission {
  /** Firestore document ID */
  id: string;
  /** ID of the user who submitted the video */
  userId: string;
  /** ID of the challenge this submission is for */
  challengeId: string;
  /** Game length selected: 'SKATE' or 'SK8' */
  gameLength: GameLength;
  /** Public URL of the transcoded 15-second video */
  videoURL: string;
  /** Current status in the judging process */
  status: SubmissionStatus;
  /** Voting data tracking judge decisions */
  judging: JudgingVotes;
  /** Final outcome once resolved (null if still pending) */
  resolvedOutcome: ResolvedOutcome;
  /** Timestamp when the submission was created */
  submittedAt: FirebaseFirestoreTypes.Timestamp;
  /** Duration of the recorded video in seconds */
  duration?: number;
}

// --- User Document Extensions ---
export interface UserCooldown {
  /** Timestamp until which the user must wait before attempting again */
  cooldownUntil?: FirebaseFirestoreTypes.Timestamp;
  /** Flag indicating if the user has judge privileges */
  isJudge?: boolean;
}

// Extended User type (combines with existing user schema)
export interface V2User extends UserCooldown {
  uid: string;
  handle: string;
  stance: "regular" | "goofy";
  // ... other existing user fields
}

// --- Submission Creation Payload ---
export interface CreateSubmissionPayload {
  challengeId: string;
  gameLength: GameLength;
  videoURL: string;
  duration: number;
}

// --- Judge Vote Payload ---
export interface JudgeVotePayload {
  submissionId: string;
  vote: VoteType;
}

// --- Constants ---
export const MAX_RECORDING_SECONDS = 15;
export const COOLDOWN_HOURS = 24;
export const RESOLUTION_THRESHOLD = 3;
