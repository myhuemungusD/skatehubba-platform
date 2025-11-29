// apps/mobile/src/types/schema.ts

// --- 1. THE USER (Profile & Stats) ---
export interface UserProfile {
  uid: string; // Unique ID from Auth
  username: string; // "Hesher_92"
  stance: "Regular" | "Goofy";
  avatarUrl: string; // URL to image
  level: number; // e.g. 42
  xp: number; // e.g. 8450

  // The "Trading Card" Stats
  stats: {
    skateWins: number;
    spotsOwned: number;
    dayStreak: number;
  };

  // Gamification
  badges: string[]; // IDs of badges like 'kickflip_master'
  gear: {
    deck: string; // "Blind Reaper Reissue"
    trucks: string;
    wheels: string;
  };
}

// --- 2. THE SPOT (Map Markers) ---
export interface SkateSpot {
  id: string;
  name: string; // "El Toro High School"
  description: string; // "The legendary 20 stair."
  location: {
    latitude: number;
    longitude: number;
  };
  type: "Street" | "Park" | "DIY";
  difficulty: "Easy" | "Medium" | "Pro" | "Gnarly";

  // Social: Who is currently skating here?
  checkedInUsers: string[]; // List of User UIDs

  // Media
  imageUrl: string;
}

// --- 3. THE GAME (S.K.A.T.E. Session) ---
export interface GameSession {
  id: string;
  status: "WAITING" | "ACTIVE" | "FINISHED";
  spotId?: string; // Where is this happening?

  players: {
    p1: { uid: string; letters: string[] }; // Letters they HAVE (e.g. ["S", "K"])
    p2: { uid: string; letters: string[] };
  };

  turn: string; // UID of whose turn it is
  currentTrick?: string; // "Kickflip" (Optional, if we track specific tricks)
  winner?: string; // UID of winner
  createdAt: number; // Timestamp
}
