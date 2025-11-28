import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  type App,
  cert,
  initializeApp as initializeAdminApp,
} from "firebase-admin/app";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import { getFirestore as getAdminFirestore } from "firebase-admin/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY!,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.FIREBASE_PROJECT_ID!,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.FIREBASE_APP_ID!,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error(
    "Firebase configuration missing. Please set FIREBASE_API_KEY, FIREBASE_PROJECT_ID, and other required environment variables.",
  );
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

let adminApp: App | null = null;

export function getAdminApp(): App | null {
  if (!adminApp && typeof window === "undefined") {
    const adminKey = process.env.FIREBASE_ADMIN_KEY;

    if (!adminKey) {
      throw new Error(
        "FIREBASE_ADMIN_KEY environment variable is required for Firebase Admin SDK. Please set it in Replit Secrets.",
      );
    }

    try {
      const serviceAccount = JSON.parse(adminKey);
      adminApp = initializeAdminApp({
        credential: cert(serviceAccount),
        projectId: process.env.FIREBASE_PROJECT_ID,
      });
    } catch (error) {
      throw new Error(
        `Failed to initialize Firebase Admin: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }
  return adminApp;
}

export const adminAuth = () => {
  const app = getAdminApp();
  if (!app) throw new Error("Firebase Admin not initialized");
  return getAdminAuth(app);
};

export const adminDb = () => {
  const app = getAdminApp();
  if (!app) throw new Error("Firebase Admin not initialized");
  return getAdminFirestore(app);
};

export * from "./functions";
