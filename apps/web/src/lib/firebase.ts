import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Singleton pattern to avoid initializing twice in Next.js
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const functions = getFunctions(app);

// Initialize App Check (Client-Side Only)
if (typeof window !== "undefined") {
  // self.FIREBASE_APPCHECK_DEBUG_TOKEN = true; // Uncomment for local dev testing if needed
  
  initializeAppCheck(app, {
    // 🟢 YOUR KEY IS HERE 🟢
    provider: new ReCaptchaV3Provider("6Lfl8-krAAAAALbkfVVyE0x8Ke2d0U9QnSecBgVK"),
    isTokenAutoRefreshEnabled: true,
  });
}

export { app, db, auth, storage, functions }
