export type { User, Session, Account, AuthConfig } from "./types";

export {
  createNextAuthConfig,
  getServerSession,
} from "./next-auth";

export {
  configureExpoAuth,
  signInWithGoogle,
  signOut,
  getCurrentUser,
  onAuthStateChanged,
  getAuth,
  getFirestore,
} from "./expo-auth";

export { FirestoreAdapter } from "./firestore-adapter";
