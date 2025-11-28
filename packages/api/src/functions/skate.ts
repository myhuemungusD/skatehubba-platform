import { onCall, HttpsError } from "firebase-functions/v2/https";
import { db } from "./db";
import { SkateGame, User } from "@skatehubba/types";
import * as admin from "firebase-admin";

export const createSkateGame = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User must be logged in");
  }

  const { uid } = request.auth;
  const { trickVideoUrl, opponentHandle } = request.data;

  if (!trickVideoUrl) {
    throw new HttpsError("invalid-argument", "Trick video URL is required");
  }

  try {
    let opponentId: string | null = null;

    if (opponentHandle) {
      const usersRef = db.collection("users");
      const snapshot = await usersRef.where("handle", "==", opponentHandle).limit(1).get();
      
      if (!snapshot.empty) {
        opponentId = snapshot.docs[0].id;
      } else {
          // Optional: throw error if opponent specified but not found?
          // For now, we'll just leave it null or maybe throw?
          // The original code just left it null if not found (or maybe didn't handle it well).
          // Let's throw to be helpful.
          throw new HttpsError("not-found", `Opponent with handle ${opponentHandle} not found`);
      }
    }

    const newGameRef = db.collection("skate_games").doc();
    const now = new Date().toISOString();

    const newGame: SkateGame = {
      id: newGameRef.id,
      challengerId: uid,
      opponentId: opponentId,
      status: "pending",
      letters: {
        challenger: "",
        opponent: "",
      },
      currentTurnId: uid,
      currentTurnType: "setTrick",
      currentTrickVideoUrl: trickVideoUrl,
      rounds: [
        {
          setBy: uid,
          trickVideoUrl: trickVideoUrl,
          attempts: [],
        },
      ],
      createdAt: now,
      updatedAt: now,
    };

    await newGameRef.set(newGame);

    return { game: newGame };
  } catch (error) {
    console.error("Error creating game:", error);
    if (error instanceof HttpsError) throw error;
    throw new HttpsError("internal", "Failed to create game");
  }
});

export const getSkateGame = onCall(async (request) => {
    // Auth optional? Usually yes for viewing.
    const { gameId } = request.data;
    if (!gameId) throw new HttpsError("invalid-argument", "Game ID is required");

    const gameDoc = await db.collection("skate_games").doc(gameId).get();
    if (!gameDoc.exists) {
        throw new HttpsError("not-found", "Game not found");
    }

    return { game: gameDoc.data() as SkateGame };
});

export const joinSkateGame = onCall(async (request) => {
    if (!request.auth) {
        throw new HttpsError("unauthenticated", "User must be logged in");
    }
    const { uid } = request.auth;
    const { gameId } = request.data;

    if (!gameId) throw new HttpsError("invalid-argument", "Game ID is required");

    const gameRef = db.collection("skate_games").doc(gameId);

    try {
        await db.runTransaction(async (t) => {
            const gameDoc = await t.get(gameRef);
            if (!gameDoc.exists) {
                throw new HttpsError("not-found", "Game not found");
            }

            const game = gameDoc.data() as SkateGame;

            if (game.opponentId && game.opponentId !== uid) {
                throw new HttpsError("failed-precondition", "Game is full");
            }

            if (game.challengerId === uid) {
                 throw new HttpsError("failed-precondition", "Cannot join your own game");
            }

            // Update game
            t.update(gameRef, {
                opponentId: uid,
                status: game.status === "pending" ? "active" : game.status, // Or whatever logic
                updatedAt: new Date().toISOString()
            });
        });

        return { success: true };
    } catch (error) {
        console.error("Error joining game:", error);
        if (error instanceof HttpsError) throw error;
        throw new HttpsError("internal", "Failed to join game");
    }
});
