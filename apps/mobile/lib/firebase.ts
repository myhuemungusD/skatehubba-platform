import { getApp, getApps, initializeApp } from "firebase/app";
import {
  GoogleAuthProvider as GoogleAuthProviderClass,
  getAuth,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp as serverTimestampFunc,
  setDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

// 1. Your web-compatible configuration
// (Ensure these variables are in your .env file)
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// 2. Initialize Firebase (Singleton Pattern)
// This prevents "Firebase App named '[DEFAULT]' already exists" crashes
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 3. Export Auth for use in your hooks
export const auth = getAuth(app);

// Preserve existing exports for app compatibility
export const db = getFirestore(app);
export const storage = getStorage(app);
export const GoogleAuthProvider = GoogleAuthProviderClass;

// Firestore helpers
export { collection, addDoc, doc, getDoc, setDoc };
export const serverTimestamp = serverTimestampFunc;

// Storage helpers
export const ref = storageRef;
export { uploadBytes, getDownloadURL };
