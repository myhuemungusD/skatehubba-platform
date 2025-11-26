/**
 * useJudgeQueue.ts
 * 
 * Logic Layer for the Judge View.
 * Handles fetching the submission queue and optimistic updates for voting.
 */

import { useState, useEffect, useCallback } from 'react';
import { Submission, VoteType } from '../types/v2-core-loop';
import { getPendingSubmissions, submitJudgeVote } from '../services/V2SubmissionService';

export const useJudgeQueue = () => {
  const [queue, setQueue] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch the initial queue of pending submissions.
   */
  const fetchQueue = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const submissions = await getPendingSubmissions(50); // Fetch batch of 50
      setQueue(submissions);
    } catch (err: any) {
      console.error('Error fetching judge queue:', err);
      setError('Failed to load submissions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Submit a vote for a submission.
   * Uses optimistic updates to immediately remove the item from the UI.
   */
  const handleVote = useCallback(async (submissionId: string, vote: VoteType) => {
    // 1. Optimistic Update: Remove from queue immediately
    setQueue(currentQueue => currentQueue.filter(sub => sub.id !== submissionId));

    // 2. Perform the actual API call in the background
    try {
      await submitJudgeVote(submissionId, vote);
      console.log(`Vote ${vote} confirmed for ${submissionId}`);
    } catch (err) {
      console.error('Vote failed:', err);
      // Note: In a robust production app, we might want to rollback the optimistic update here
      // or show a toast notification. For MVP, we prioritize the "flow".
      alert('Vote failed to record. Please check your connection.');
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchQueue();
  }, [fetchQueue]);

  return {
    queue,
    isLoading,
    error,
    fetchQueue,
    submitVote: handleVote,
  };
};
