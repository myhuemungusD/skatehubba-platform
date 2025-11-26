import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type VoteType = 'LANDED' | 'LETTER' | 'DISPUTE';

export interface JudgingState {
  landedVotes: number;
  letterVotes: number;
  disputeVotes: number;
  judgesVoted: string[];
}

export interface Submission {
  id: string;
  userId: string;
  challengeId: string;
  gameLength: 'SKATE' | 'SK8';
  videoURL: string;
  status: 'PENDING' | 'RESOLVED' | 'DISPUTE';
  submittedAt: FirebaseFirestoreTypes.Timestamp;
  judging: JudgingState;
}