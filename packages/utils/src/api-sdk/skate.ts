import { 
  collection, addDoc, doc, updateDoc, 
  serverTimestamp, Timestamp, getDoc, getFirestore 
} from 'firebase/firestore';
import { SkateGame, SkateLetter, TurnType } from '../types/skate';

// --- CONSTANTS ---
const MAX_LETTERS = 5; // S-K-A-T-E
const LETTER_SEQUENCE = ["", "S", "SK", "SKA", "SKAT", "SKATE"];

// --- PURE LOGIC HELPERS (The "Brain") ---
// Calculates the next letter for a player (e.g., "SK" -> "SKA")
const getNextLetters = (current: string): string => {
  const len = current.length;
  return len < MAX_LETTERS ? LETTER_SEQUENCE[len + 1] : current;
};

// --- SDK ACTIONS ---

/**
 * 1. CREATE CHALLENGE
 * Offense sets the first trick.
 */
export const createSkateChallenge = async (
  challengerUid: string, 
  trickVideoUrl: string
): Promise<string> => {
  const db = getFirestore();
  const gameData: Omit<SkateGame, 'id'> = {
    challengerUid,
    opponentUid: "", // Open challenge initially
    status: 'pending',
    letters: { challenger: "", opponent: "" },
    currentTurnUid: challengerUid,
    currentTurnType: 'setTrick',
    currentTrickVideoUrl: trickVideoUrl,
    rounds: [{
      setBy: challengerUid,
      trickVideoUrl,
      attempts: []
    }],
    createdAt: serverTimestamp() as Timestamp,
    updatedAt: serverTimestamp() as Timestamp,
  };

  const ref = await addDoc(collection(db, 'skate_games'), gameData);
  return ref.id;
};

/**
 * 2. ACCEPT CHALLENGE
 * Opponent joins an open game.
 */
export const joinSkateChallenge = async (gameId: string, opponentUid: string) => {
  const db = getFirestore();
  const ref = doc(db, 'skate_games', gameId);
  await updateDoc(ref, {
    opponentUid,
    status: 'active',
    currentTurnUid: opponentUid, // Opponent must match the first trick immediately
    currentTurnType: 'attemptMatch',
    updatedAt: serverTimestamp(),
  });
};

/**
 * 3. SUBMIT TURN RESULT (The Core Loop)
 * This handles: Landing, Bailing, Giving Letters, Swapping Turns, Declaring Winners.
 */
export const submitTurnResult = async (
  game: SkateGame, 
  userUid: string, 
  result: 'landed' | 'bailed',
  videoUrl?: string // Required if setting a trick or attempting match
) => {
  const db = getFirestore();
  const gameRef = doc(db, 'skate_games', game.id);
  const updates: any = { updatedAt: serverTimestamp() };

  // A. OFFENSE SETTING A TRICK
  if (game.currentTurnType === 'setTrick') {
    if (result === 'landed') {
      if (!videoUrl) throw new Error("Video required to set trick");
      
      // Trick set! Opponent must now match it.
      updates.currentTrickVideoUrl = videoUrl;
      updates.currentTurnUid = game.opponentUid === userUid ? game.challengerUid : game.opponentUid;
      updates.currentTurnType = 'attemptMatch';
      // In a full production app, we would push to the 'rounds' array here too
      
    } else {
      // Offense bailed on their own set? Turn passes. No letters.
      updates.currentTurnUid = game.opponentUid === userUid ? game.challengerUid : game.opponentUid;
      updates.currentTurnType = 'setTrick'; // Other player gets to set now
      updates.currentTrickVideoUrl = null;
    }
  }

  // B. DEFENSE ATTEMPTING TO MATCH
  else if (game.currentTurnType === 'attemptMatch' || game.currentTurnType === 'judgeAttempt') {
    // Logic: Did the defender land the match?
    if (result === 'landed') {
      // Street Rules: If you match, you get to set the next trick.
      updates.currentTurnUid = userUid; 
      updates.currentTurnType = 'setTrick'; 
      updates.currentTrickVideoUrl = null;
      updates.pendingAttemptVideoUrl = null;
      
    } else {
      // Defender MISSED. They get a letter.
      const isChallenger = userUid === game.challengerUid;
      const currentLetters = isChallenger ? game.letters.challenger : game.letters.opponent;
      const newLetters = getNextLetters(currentLetters);
      
      updates[`letters.${isChallenger ? 'challenger' : 'opponent'}`] = newLetters;
      
      // CHECK GAME OVER
      if (newLetters === "SKATE") {
        updates.status = 'completed';
        updates.winnerUid = isChallenger ? game.opponentUid : game.challengerUid;
      } else {
        // Game continues. Turn passes to the other player to Set.
        updates.currentTurnUid = isChallenger ? game.opponentUid : game.challengerUid;
        updates.currentTurnType = 'setTrick';
        updates.currentTrickVideoUrl = null;
      }
    }
  }

  await updateDoc(gameRef, updates);
};
