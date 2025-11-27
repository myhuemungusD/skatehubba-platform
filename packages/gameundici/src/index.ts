export type LetterState = "S" | "K" | "A" | "T" | "E" | null;

export interface GameState {
  playerA: LetterState[];
  playerB: LetterState[];
  currentTurn: "A" | "B";
  winner?: "A" | "B" | "draw";
}

export function initializeGame(): GameState {
  return {
    playerA: [],
    playerB: [],
    currentTurn: "A",
  };
}

export function addLetter(state: GameState, player: "A" | "B"): GameState {
  const letters: LetterState[] = ["S", "K", "A", "T", "E"];
  const playerKey = player === "A" ? "playerA" : "playerB";
  const currentLetters = state[playerKey];

  if (currentLetters.length >= 5) {
    return state;
  }

  const newLetters = [...currentLetters, letters[currentLetters.length]];
  const newState = {
    ...state,
    [playerKey]: newLetters,
  };

  if (newLetters.length === 5) {
    newState.winner = player === "A" ? "B" : "A";
  }

  return newState;
}

export function switchTurn(state: GameState): GameState {
  return {
    ...state,
    currentTurn: state.currentTurn === "A" ? "B" : "A",
  };
}

export function checkWinner(state: GameState): "A" | "B" | "draw" | null {
  if (state.playerA.length === 5) return "B";
  if (state.playerB.length === 5) return "A";
  return null;
}

export type GameAction =
  | { type: "LAND_TRICK"; player: "A" | "B" }
  | { type: "MISS_TRICK"; player: "A" | "B" }
  | { type: "RESET" };

export function reduceGame(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "LAND_TRICK":
      // Logic: If you land, you keep turn (if setting) or survive (if copying)
      // For this basic engine, we'll just switch turn for now
      return switchTurn(state);
    case "MISS_TRICK":
      // Logic: If you miss, you might get a letter
      // We'll add a letter to the player who missed
      const stateWithLetter = addLetter(state, action.player);
      return switchTurn(stateWithLetter);
    case "RESET":
      return initializeGame();
    default:
      return state;
  }
}
