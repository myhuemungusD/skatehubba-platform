/**
 * Refactored V2 Submission Service
 * Optimized for Scale and UX Flow
 */

import auth from "@react-native-firebase/auth";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { VoteType } from "../types/JudgeTypes";
import {
  RESOLUTION_THRESHOLD,
  ResolvedOutcome,
  Submission,
  SubmissionStatus,
} from "../types/v2-core-loop";

// ADDED: A limit for disputes so clips don't live forever
const DISPUTE_THRESHOLD = 5;

export const submitJudgeVote = async (
  submissionId: string,
  vote: VoteType,
): Promise<void> => {
  const judgeId = auth().currentUser?.uid;
  if (!judgeId) throw new Error("Judge must be authenticated");

  const submissionRef = firestore().collection("submissions").doc(submissionId);
  await firestore().runTransaction(
    async (transaction: FirebaseFirestoreTypes.Transaction) => {
      const submissionDoc = await transaction.get(submissionRef);
      if (!submissionDoc.exists) throw new Error("Submission does not exist");

      const data = submissionDoc.data() as Submission;

      // SAFETY: Prevent user from judging their own clip
      if (data.userId === judgeId) {
        throw new Error(
          "You cannot judge your own clips. That's posuer style.",
        );
      }

      if (data.judging.judgesVoted.includes(judgeId)) {
        throw new Error("Judge has already voted on this submission");
      }

      const newJudging = { ...data.judging };
      let newStatus: SubmissionStatus = "PENDING";
      let resolvedOutcome: ResolvedOutcome = null;

      // Update counters
      if (vote === "LANDED") newJudging.landedVotes++;
      else if (vote === "LETTER") newJudging.letterVotes++;
      else if (vote === "DISPUTE") newJudging.disputeVotes++;

      newJudging.judgesVoted.push(judgeId);

      // RESOLUTION LOGIC
      if (newJudging.landedVotes >= RESOLUTION_THRESHOLD) {
        newStatus = "RESOLVED";
        resolvedOutcome = "LANDED";
      } else if (newJudging.letterVotes >= RESOLUTION_THRESHOLD) {
        newStatus = "RESOLVED";
        resolvedOutcome = "LETTER";
      } else if (newJudging.disputeVotes >= DISPUTE_THRESHOLD) {
        // FIX: Move disputes out of the main queue
        newStatus = "UNDER_REVIEW";
        resolvedOutcome = null; // Needs manual review
      }

      transaction.update(submissionRef, {
        judging: newJudging,
        status: newStatus,
        resolvedOutcome: resolvedOutcome,
      });
    },
  );
};

/**
 * Optimized Fetcher
 * Solves the "Seeing clips I already voted on" problem.
 */
export const getPendingSubmissions = async (
  limit: number = 50,
  lastDoc?: any, // Added for pagination
): Promise<Submission[]> => {
  const currentUserId = auth().currentUser?.uid;

  try {
    // 1. Fetch slightly more than needed to account for client-side filtering
    let query = firestore()
      .collection("submissions")
      .where("status", "==", "PENDING")
      .orderBy("submittedAt", "asc");

    if (lastDoc) query = query.startAfter(lastDoc);

    // Fetch a batch (e.g., 20)
    const snapshot = await query.limit(limit).get();

    const submissions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Submission[];

    // 2. Client-side Filter: Remove clips this user created OR already voted on
    // Note: In a massive scale app, we would solve this by keeping a
    // separate 'unseen_submissions' collection per user, but for now, this works.
    const filteredSubmissions = submissions.filter((sub) => {
      const isMyClip = sub.userId === currentUserId;
      const alreadyVoted = sub.judging.judgesVoted.includes(
        currentUserId || "",
      );
      return !isMyClip && !alreadyVoted;
    });

    return filteredSubmissions;
  } catch (error) {
    console.error("Error fetching pending submissions:", error);
    throw new Error("Failed to fetch pending submissions");
  }
};
