// packages/utils/src/types/skate.ts
import { Timestamp } from 'firebase/firestore';

export type SkateLetter = 'S' | 'K' | 'A' | 'T' | 'E';
export type TurnType = 'setTrick' | 'attemptMatch' | 'judgeAttempt';

export interface SkateGame {
  id: string;
  challengerUid: string;
  opponentUid: string;
  status: 'pending' | 'active' | 'completed' | 'forfeit';
  letters: {
    challenger: string; // e.g. "", "S", "SK", "SKA", "SKAT" — max 4 letters
    opponent: string;
  };
  currentTurnUid: string;
  currentTurnType: TurnType;
  currentTrickVideoUrl: string | null;
  pendingAttemptVideoUrl?: string;
  rounds: {
    setBy: string;
    trickVideoUrl: string;
    attempts: {
      uid: string;
      videoUrl: string;
      result: 'landed' | 'bailed' | 'pending';
      judgedAt?: Timestamp;
    }[];
  }[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  winnerUid?: string;
}
