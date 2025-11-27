/**
 * JudgeTypes.ts
 *
 * Defines the contract for the Judging System.
 * Re-exports core types from v2-core-loop to ensure consistency.
 */

import type { Submission, VoteType } from "./v2-core-loop";

export type { Submission, VoteType };

export interface JudgeQueueState {
  queue: Submission[];
  isLoading: boolean;
  error: string | null;
}

export interface JudgeActions {
  fetchQueue: () => Promise<void>;
  submitVote: (submissionId: string, vote: VoteType) => Promise<void>;
}
