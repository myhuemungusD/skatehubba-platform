// infra/firebase/functions/src/turnProcessor.ts

import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { z } from "zod";
import type { SkateChallenge } from "../../../../packages/utils/src/types"; // Adjust import path as needed based on monorepo structure

const db = admin.firestore();

const TurnSchema = z.object({
  challengeId: z.string(),
  action: z.enum(["SET", "ATTEMPT", "JUDGE"]),
  clipUrl: z.string().optional(),
  result: z.enum(["LANDED", "FAILED"]).optional(),
});

export const processTurn = functions.https.onCall(async (request) => {
  if (!request.auth)
    throw new functions.https.HttpsError("unauthenticated", "Log in, bro.");

  const { challengeId, action, clipUrl, result } = TurnSchema.parse(
    request.data,
  );
  const uid = request.auth.uid;

  return db.runTransaction(async (transaction) => {
    const challengeRef = db.doc(`challenges/${challengeId}`);
    const snap = await transaction.get(challengeRef);
    if (!snap.exists)
      throw new functions.https.HttpsError("not-found", "Challenge gone.");

    const c = snap.data() as SkateChallenge;
    if (!c.players.includes(uid))
      throw new functions.https.HttpsError(
        "permission-denied",
        "Not your game.",
      );

    const opponentUid = c.players.find((p) => p !== uid)!;

    // === ACTION: SET (invent trick) ===
    if (action === "SET") {
      if (c.status !== "active" || c.currentSetter !== uid)
        throw new functions.https.HttpsError(
          "failed-precondition",
          "Not your turn to set.",
        );

      transaction.update(challengeRef, {
        currentTrick: { url: clipUrl!, setterUid: uid, ts: Date.now() },
        pendingAttempt: admin.firestore.FieldValue.delete(),
        status: "active",
        currentSetter: opponentUid, // switch turn
        turnExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        clipHistory: admin.firestore.FieldValue.arrayUnion({
          url: clipUrl!,
          uid,
          ts: Date.now(),
          type: "set" as const,
        }),
        updatedAt: admin.firestore.Timestamp.now(),
      });
    }

    // === ACTION: ATTEMPT (reply) ===
    else if (action === "ATTEMPT") {
      if (c.status !== "active" || c.currentSetter !== uid || !c.currentTrick)
        throw new functions.https.HttpsError(
          "failed-precondition",
          "No trick to land.",
        );

      transaction.update(challengeRef, {
        status: "judging",
        pendingAttempt: { url: clipUrl!, attempterUid: uid, ts: Date.now() },
        clipHistory: admin.firestore.FieldValue.arrayUnion({
          url: clipUrl!,
          uid,
          ts: Date.now(),
          type: "attempt" as const,
        }),
        updatedAt: admin.firestore.Timestamp.now(),
      });
    }

    // === ACTION: JUDGE (only setter can judge) ===
    else if (action === "JUDGE") {
      if (c.status !== "judging" || c.currentTrick?.setterUid !== uid)
        throw new functions.https.HttpsError(
          "permission-denied",
          "Only setter judges.",
        );

      const attempt = c.pendingAttempt!;
      const landed = result === "LANDED";

      const newLetters = { ...c.letters };
      if (!landed) {
        const current = newLetters[attempt.attempterUid] || "";
        newLetters[attempt.attempterUid] =
          current + "SKATE".charAt(current.length);
      }

      const winner =
        newLetters[attempt.attempterUid]?.length === 5
          ? c.currentTrick?.setterUid
          : undefined;

      transaction.update(challengeRef, {
        status: winner ? "finished" : "active",
        winner,
        letters: newLetters,
        currentSetter: landed
          ? attempt.attempterUid
          : c.currentTrick?.setterUid, // winner sets next
        currentTrick: landed ? null : c.currentTrick,
        pendingAttempt: admin.firestore.FieldValue.delete(),
        clipHistory: admin.firestore.FieldValue.arrayUnion({
          ...c.clipHistory[c.clipHistory.length - 1],
          landed,
        }),
        updatedAt: admin.firestore.Timestamp.now(),
      });

      // Award Hubba Bucks
      if (winner) {
        const walletRef = db.doc(`wallets/${winner}`);
        transaction.update(walletRef, {
          hubbaBucks: admin.firestore.FieldValue.increment(50),
          updatedAt: admin.firestore.Timestamp.now(),
        });
      }
    }

    return { success: true };
  });
});
