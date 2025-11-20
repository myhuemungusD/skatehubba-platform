import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider as GoogleAuthProviderClass } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, getDoc, setDoc, serverTimestamp as serverTimestampFunc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

// Firebase Config for SkateHubba (sk8hub-d7806)
// Set these in .env file (see .env.example)
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "sk8hub-d7806.firebaseapp.com",
  projectId: "sk8hub-d7806",
  storageBucket: "sk8hub-d7806.firebasestorage.app",
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

// Validate required config
if (!firebaseConfig.apiKey || !firebaseConfig.messagingSenderId || !firebaseConfig.appId) {
  throw new Error(
    'Missing Firebase configuration. Please add EXPO_PUBLIC_FIREBASE_API_KEY, ' +
    'EXPO_PUBLIC_FIREBASE_SENDER_ID, and EXPO_PUBLIC_FIREBASE_APP_ID to your .env file. ' +
    'Get these from Firebase Console → Project Settings → Web App'
  );
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const GoogleAuthProvider = GoogleAuthProviderClass;

// Firestore helpers
export { collection, addDoc, doc, getDoc, setDoc };
export const serverTimestamp = serverTimestampFunc;

// Storage helpers
export const ref = storageRef;
export { uploadBytes, getDownloadURL };
