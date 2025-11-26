/**
 * V2 Submission Service
 * 
 * Handles creating submissions and the judge voting workflow.
 * Implements atomic transactions to ensure vote integrity.
 */

import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  Submission,
  CreateSubmissionPayload,
  VoteType,
  RESOLUTION_THRESHOLD,
  SubmissionStatus,
  ResolvedOutcome,
} from '../types/v2-core-loop';

/**
 * Create a new submission for judging.
 * This will be blocked by Firestore rules if the user is on cooldown.
 * 
 * @param payload - The submission data
 * @returns Promise that resolves to the created submission ID
 */
export const createSubmission = async (
  payload: CreateSubmissionPayload
): Promise<string> => {
  const userId = auth().currentUser?.uid;
  
  if (!userId) {
    throw new Error('User must be authenticated to create submission');
  }

  try {
    const submissionData = {
      userId,
      challengeId: payload.challengeId,
      gameLength: payload.gameLength,
      videoURL: payload.videoURL,
      duration: payload.duration,
      status: 'PENDING' as SubmissionStatus,
      judging: {
        landedVotes: 0,
        letterVotes: 0,
        disputeVotes: 0,
        judgesVoted: [],
      },
      resolvedOutcome: null,
      submittedAt: firestore.Timestamp.now(),
    };

    const docRef = await firestore()
      .collection('submissions')
      .add(submissionData);

    console.log(`Submission created: ${docRef.id}`);
    return docRef.id;
  } catch (error: unknown) {
    const firebaseError = error as { code?: string; message?: string };
    // Check if error is due to cooldown (Firestore rules rejection)
    if (firebaseError.code === 'permission-denied') {
      throw new Error('Cannot submit: You are currently on cooldown. Please wait before trying again.');
    }
    console.error('Error creating submission:', error);
    throw new Error('Failed to create submission');
  }
};

/**
 * Submit a judge vote using an atomic transaction.
 * This ensures that vote counts are accurate even with concurrent judges.
 * 
 * @param submissionId - The ID of the submission to vote on
 * @param vote - The type of vote: LANDED, LETTER, or DISPUTE
 * @returns Promise that resolves when the vote is recorded
 */
export const submitJudgeVote = async (
  submissionId: string,
  vote: VoteType
): Promise<void> => {
  const judgeId = auth().currentUser?.uid;

  if (!judgeId) {
    throw new Error('Judge must be authenticated');
  }

  const submissionRef = firestore().collection('submissions').doc(submissionId);

  try {
    await firestore().runTransaction(async (transaction: FirebaseFirestoreTypes.Transaction) => {
      // 1. Get the current state of the submission
      const submissionDoc = await transaction.get(submissionRef);
      
      if (!submissionDoc.exists) {
        throw new Error('Submission does not exist');
      }

      const data = submissionDoc.data() as Submission;

      // 2. Validate voting eligibility
      if (data.judging.judgesVoted.includes(judgeId)) {
        throw new Error('Judge has already voted on this submission');
      }

      if (data.status !== 'PENDING') {
        throw new Error('Submission is no longer pending');
      }

      // 3. Prepare the update
      const newJudging = { ...data.judging };
      let newStatus: SubmissionStatus = 'PENDING';
      let resolvedOutcome: ResolvedOutcome = null;

      // Increment the correct vote counter
      if (vote === 'LANDED') {
        newJudging.landedVotes++;
      } else if (vote === 'LETTER') {
        newJudging.letterVotes++;
      } else if (vote === 'DISPUTE') {
        newJudging.disputeVotes++;
      }

      // Add the judge to the voted list
      newJudging.judgesVoted.push(judgeId);

      // 4. Check for resolution (3 votes threshold)
      if (newJudging.landedVotes >= RESOLUTION_THRESHOLD) {
        newStatus = 'RESOLVED';
        resolvedOutcome = 'LANDED';
      } else if (newJudging.letterVotes >= RESOLUTION_THRESHOLD) {
        newStatus = 'RESOLVED';
        resolvedOutcome = 'LETTER';
      }

      // Note: DISPUTE votes are tracked but do not auto-resolve at MVP.
      // If a submission receives 3+ DISPUTE votes, it remains PENDING
      // until we implement a manual review process.

      // 5. Commit the transaction
      transaction.update(submissionRef, {
        judging: newJudging,
        status: newStatus,
        resolvedOutcome: resolvedOutcome,
      });

      console.log(`Vote of ${vote} submitted for ${submissionId} by judge ${judgeId}`);
    });
  } catch (error: unknown) {
    const firebaseError = error as { code?: string; message?: string };
    if (firebaseError.message?.includes('already voted')) {
      throw error;
    }
    if (firebaseError.code === 'permission-denied') {
      throw new Error('You do not have permission to vote on submissions. Judge access required.');
    }
    console.error('Transaction failed:', error);
    throw new Error('Failed to submit vote');
  }
};

/**
 * Get all pending submissions for the judge queue.
 * 
 * @param limit - Maximum number of submissions to fetch (default: 50)
 * @returns Promise that resolves to array of pending submissions
 */
export const getPendingSubmissions = async (
  limit: number = 50
): Promise<Submission[]> => {
  try {
    const snapshot = await firestore()
      .collection('submissions')
      .where('status', '==', 'PENDING')
      .orderBy('submittedAt', 'asc') // FIFO queue
      .limit(limit)
      .get();

    return snapshot.docs.map((doc: FirebaseFirestoreTypes.QueryDocumentSnapshot) => ({
      id: doc.id,
      ...doc.data(),
    })) as Submission[];
  } catch (error) {
    console.error('Error fetching pending submissions:', error);
    throw new Error('Failed to fetch pending submissions');
  }
};

/**
 * Get a specific submission by ID.
 * 
 * @param submissionId - The ID of the submission to fetch
 * @returns Promise that resolves to the submission or null if not found
 */
export const getSubmission = async (
  submissionId: string
): Promise<Submission | null> => {
  try {
    const doc = await firestore()
      .collection('submissions')
      .doc(submissionId)
      .get();

    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      ...doc.data(),
    } as Submission;
  } catch (error) {
    console.error('Error fetching submission:', error);
    throw new Error('Failed to fetch submission');
  }
};

/**
 * Get all submissions for a specific user.
 * 
 * @param userId - The ID of the user
 * @returns Promise that resolves to array of user submissions
 */
export const getUserSubmissions = async (userId: string): Promise<Submission[]> => {
  try {
    const snapshot = await firestore()
      .collection('submissions')
      .where('userId', '==', userId)
      .orderBy('submittedAt', 'desc')
      .get();

    return snapshot.docs.map((doc: FirebaseFirestoreTypes.QueryDocumentSnapshot) => ({
      id: doc.id,
      ...doc.data(),
    })) as Submission[];
  } catch (error) {
    console.error('Error fetching user submissions:', error);
    throw new Error('Failed to fetch user submissions');
  }
};

/**
 * Check if the current user is a designated judge.
 * 
 * @returns Promise that resolves to true if user is a judge
 */
export const isCurrentUserJudge = async (): Promise<boolean> => {
  const userId = auth().currentUser?.uid;
  
  if (!userId) {
    return false;
  }

  try {
    const userDoc = await firestore()
      .collection('users')
      .doc(userId)
      .get();

    if (!userDoc.exists) {
      return false;
    }

    const userData = userDoc.data();
    return userData?.isJudge === true;
  } catch (error) {
    console.error('Error checking judge status:', error);
    return false;
  }
};
