import admin from "firebase-admin";
import { env } from "./config/env";

if (!admin.apps.length) {
  try {
    const hasKey = !!env.FIREBASE_ADMIN_KEY;

    if (!hasKey) {
      if (env.NODE_ENV === "production") {
        throw new Error("FIREBASE_ADMIN_KEY is required in production");
      }
      console.log(
        "⚠️  Firebase Admin SDK not initialized (FIREBASE_ADMIN_KEY missing in dev mode)",
      );
    } else {
      const serviceAccount = JSON.parse(env.FIREBASE_ADMIN_KEY!);

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: env.VITE_FIREBASE_PROJECT_ID || serviceAccount.project_id,
      });
      console.log("✅ Firebase Admin SDK initialized");
    }
  } catch (error) {
    console.error("❌ Firebase Admin initialization failed:", error);
    if (env.NODE_ENV === "production") {
      throw error;
    }
  }
}

export { admin };
