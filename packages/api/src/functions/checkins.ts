import { onCall, HttpsError } from "firebase-functions/v2/https";
import { db } from "./db";
import { CheckIn } from "@skatehubba/types";
import * as admin from "firebase-admin";

export const createCheckin = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User must be logged in");
  }

  const { spotId, proofVideoUrl } = request.data;
  if (!spotId) throw new HttpsError("invalid-argument", "Spot ID required");

  const newRef = db.collection("checkins").doc();
  const now = new Date();

  const newCheckin: any = {
      id: newRef.id,
      uid: request.auth.uid,
      spotId,
      proofVideoUrl: proofVideoUrl || null,
      ts: admin.firestore.FieldValue.serverTimestamp()
  };

  await newRef.set(newCheckin);

  return { checkin: { ...newCheckin, ts: now.toISOString() } };
});
