import { onCall, HttpsError } from "firebase-functions/v2/https";
import { db } from "./db";
import { User } from "@skatehubba/types";

export const getProfile = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User must be logged in");
  }

  const { uid, token } = request.auth;
  const { email, name, picture } = token;

  try {
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      if (!email) {
        throw new HttpsError(
          "invalid-argument",
          "Email is required to create a profile"
        );
      }

      const newUser: User = {
        uid: uid,
        email: email,
        displayName: name || email.split("@")[0] || "Skater",
        photoURL: picture || undefined,
        handle: email.split("@")[0] || "skater", // Default handle
        stance: "regular", // Default
        sponsors: [],
        stats: {
          wins: 0,
          losses: 0,
        },
        board: {
          deck: "Standard",
        },
      };

      // Add timestamps if needed, but User type might not have them or they are separate
      // The User interface in types/index.ts doesn't have createdAt/updatedAt in the definition I saw earlier?
      // Let's check the type definition again if needed, but for now this matches the structure.
      // Wait, I saw the User interface earlier.
      /*
      export interface User {
        uid: string;
        email: string;
        displayName?: string;
        photoURL?: string;
        handle: string;
        stance: "regular" | "goofy";
        sponsors: string[];
        stats: { wins: number; losses: number; };
        board: { deck: string; trucks?: string; wheels?: string; };
        avatarUrl?: string;
      }
      */
      
      await userRef.set(newUser);
      console.log(`✨ Auto-created profile for new user: ${uid} (${email})`);
      return { user: newUser };
    }

    return { user: userDoc.data() as User };
  } catch (error) {
    console.error("❌ Profile fetch error:", error);
    throw new HttpsError("internal", "Failed to fetch profile");
  }
});
