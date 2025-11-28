import { onCall, HttpsError } from "firebase-functions/v2/https";
import { db } from "./db";
import { Challenge } from "@skatehubba/types";
import * as admin from "firebase-admin";

export const createChallenge = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User must be logged in");
  }

  const { rules, clipA } = request.data;
  
  const newRef = db.collection("challenges").doc();
  const now = new Date();

  const newChallenge: any = {
      id: newRef.id,
      createdBy: request.auth.uid,
      status: "pending",
      rules: rules || { oneTake: true, durationSec: 30 },
      clipA: clipA,
      ts: admin.firestore.FieldValue.serverTimestamp()
  };

  await newRef.set(newChallenge);
  
  return { challenge: { ...newChallenge, ts: now.toISOString() } };
});

export const getChallenges = onCall(async (request) => {
    const snapshot = await db.collection("challenges")
        .orderBy("ts", "desc")
        .limit(20)
        .get();
    
    const challenges = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            ...data,
            ts: data.ts?.toDate?.() || new Date()
        };
    });

    return { challenges };
});
