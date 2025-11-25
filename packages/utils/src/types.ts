// packages/utils/src/types.ts
export interface SkateChallenge {
  id: string;
  players: [string, string]; // sorted [uidA, uidB]
  status: 'pending' | 'active' | 'judging' | 'finished';
  gameType: 'skate';

  // Letters: '' → 'S' → 'SK' → 'SKA' → 'SKAT' → 'SKATE' = dead
  letters: Record<string, string>; // uid → 'SKA'

  // Current trick to land (set by currentSetter)
  currentTrick: {
    url: string;
    setterUid: string;
    ts: number;
  } | null;

  // Attempt awaiting judgment (only in 'judging')
  pendingAttempt?: {
    url: string;
    attempterUid: string;
    ts: number;
  };

  // Whose turn to set (null = waiting for first set)
  currentSetter: string | null;

  // 24h from last set
  turnExpiresAt: number;

  // Full history (optional, for replay)
  clipHistory: Array<{
    url: string;
    uid: string;
    ts: number;
    type: 'set' | 'attempt';
    landed?: boolean;
  }>;

  winner?: string;
  createdAt: number;
  updatedAt: number;
}
