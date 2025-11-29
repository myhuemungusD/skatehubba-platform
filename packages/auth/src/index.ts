export type { User, Session, Account, AuthConfig } from "./types.js";

export {
  createNextAuthConfig,
} from "./next-auth.js";

export type { Session as NextAuthSession } from "./next-auth.js";

export {
  configureExpoAuth,
  signInWithGoogle,
  signOut,
  getCurrentUser,
  onAuthStateChanged,
  getAuth,
  getFirestore,
} from "./expo-auth.js";

export { FirestoreAdapter } from "./firestore-adapter.js";
