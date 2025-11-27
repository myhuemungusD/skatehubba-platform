import { GoogleGenerativeAI } from "@google/generative-ai";
import { Pool } from "@neondatabase/serverless";
import { users } from "@skatehubba/db";
import * as dayjs from "dayjs";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { defineSecret } from "firebase-functions/params";
import {
  onCall,
  onDocumentCreated,
  onDocumentUpdated,
} from "firebase-functions/v2/firestore";
import { onSchedule } from "firebase-functions/v2/scheduler";

admin.initializeApp();
const db = admin.firestore();
const storage = admin.storage();

const genAI = new GoogleGenerativeAI(defineSecret("GEMINI_KEY").value!);
const databaseUrl = defineSecret("DATABASE_URL");

const systemPrompt = `You are Heshur, an old-soul skate guru. Gritty but kind. Offer specific skate advice, spot tips, trick progressions. No toxicity. Always steer back to skating.`;

// ⚡️ TRIGGER: Runs automatically when a user signs up in the App
export const onUserCreate = functions.auth.user().onCreate(async (user) => {
  const client = new Pool({ connectionString: databaseUrl.value() });
  const sqlDb = drizzle(client);

  try {
    await sqlDb.insert(users).values({
      id: user.uid, // KEEP THIS SAME ID! Critical for joins later.
      email: user.email || `${user.uid}@placeholder.com`,
      displayName: user.displayName || `skater_${user.uid.slice(0, 5)}`,
      createdAt: new Date(),
      stance: "regular", // Default value
    });
    console.log(`✅ Synced user ${user.uid} to Postgres`);
  } catch (error) {
    console.error("❌ Failed to sync user:", error);
    // In a real pro app, you'd send this to Sentry/Datadog
  }
});

export const heshurChat = onCall(async (request) => {
  if (!request.auth) throw new Error("Unauthenticated");
  const { message } = request.data;
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(
    systemPrompt + "\nUser: " + message,
  );
  return { reply: result.response.text() };
});

export const voteOnChallenge = onCall(async (request) => {
  if (!request.auth) throw new Error("Unauthenticated");

  const { challengeId, vote } = request.data;

  if (!challengeId || !vote) {
    throw new Error("Missing challengeId or vote");
  }

  const challengeRef = db.doc(`challenges/${challengeId}`);
  const challengeDoc = await challengeRef.get();
  const challengeData = challengeDoc.data();

  if (!challengeDoc.exists || !challengeData) {
    throw new Error("Challenge not found");
  }

  if (challengeData.status !== "active") {
    throw new Error("Challenge must be active to vote");
  }

  if (
    request.auth.uid !== challengeData.createdBy &&
    request.auth.uid !== challengeData.opponent
  ) {
    throw new Error("Only participants can vote");
  }

  if (vote !== challengeData.createdBy && vote !== challengeData.opponent) {
    throw new Error("Vote must be for a participant");
  }

  if (request.auth.uid === vote) {
    throw new Error("Cannot vote for yourself");
  }

  const voteRef = db.doc(`challenges/${challengeId}/votes/${request.auth.uid}`);
  await voteRef.set({
    voter: request.auth.uid,
    vote: vote,
    votedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  const votesSnapshot = await db
    .collection(`challenges/${challengeId}/votes`)
    .get();

  if (votesSnapshot.size === 2) {
    const votes = votesSnapshot.docs.map((doc) => doc.data().vote);
    const voteCount: Record<string, number> = {};
    votes.forEach((v) => {
      voteCount[v as string] = (voteCount[v as string] || 0) + 1;
    });

    const winner = Object.keys(voteCount).reduce((a, b) =>
      voteCount[a] > voteCount[b] ? a : b,
    );

    await challengeRef.update({
      status: "completed",
      winner: winner,
      adjudicatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(
      `Challenge ${challengeId} completed via voting - ${winner} wins`,
    );
  }

  return { success: true, votesReceived: votesSnapshot.size };
});

export const onChallengeCreate = onDocumentCreated(
  "challenges/{challengeId}",
  async (event) => {
    const data = event.data?.data();
    if (!data) return;

    try {
      const clipAPath = data.clipA?.url?.replace(
        "gs://sk8hub-d7806.firebasestorage.app/",
        "",
      );
      if (clipAPath) {
        const file = storage
          .bucket("sk8hub-d7806.firebasestorage.app")
          .file(clipAPath);
        const [metadata] = await file.getMetadata();
        const duration = Number(metadata.metadata?.duration || 0);

        if (duration > 15) {
          console.warn(
            `Challenge ${event.params.challengeId} has invalid clip duration: ${duration}s`,
          );
          await event.data?.ref.delete();
          return;
        }
      }

      await event.data?.ref.update({
        deadline: admin.firestore.Timestamp.fromDate(
          dayjs().add(24, "hour").toDate(),
        ),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`Challenge created: ${event.params.challengeId}`);
    } catch (error) {
      console.error("Error processing challenge creation:", error);
    }
  },
);

export const onChallengeUpdate = onDocumentUpdated(
  "challenges/{challengeId}",
  async (event) => {
    const before = event.data?.before.data();
    const after = event.data?.after.data();

    if (!after || before?.clipB || !after.clipB) return;

    try {
      const clipBPath = after.clipB?.url?.replace(
        "gs://sk8hub-d7806.firebasestorage.app/",
        "",
      );
      if (clipBPath) {
        const file = storage
          .bucket("sk8hub-d7806.firebasestorage.app")
          .file(clipBPath);
        const [metadata] = await file.getMetadata();
        const duration = Number(metadata.metadata?.duration || 0);

        if (duration > 15) {
          console.warn(
            `Challenge ${event.params.challengeId} reply has invalid duration: ${duration}s`,
          );
          await event.data?.after.ref.update({
            clipB: admin.firestore.FieldValue.delete(),
          });
          return;
        }
      }

      await event.data?.after.ref.update({
        status: "active",
      });

      console.log(
        `Challenge ${event.params.challengeId} now active - both clips submitted`,
      );
    } catch (error) {
      console.error("Error processing challenge update:", error);
    }
  },
);

export const checkChallengeTimeouts = onSchedule(
  "every 60 minutes",
  async () => {
    try {
      const now = admin.firestore.Timestamp.now();
      const expired = await db
        .collection("challenges")
        .where("status", "==", "pending")
        .where("deadline", "<", now)
        .get();

      const updates = expired.docs.map((doc) =>
        doc.ref.update({
          status: "forfeit",
          winner: doc.data().createdBy,
        }),
      );

      await Promise.all(updates);
      console.log(`Processed ${expired.size} expired challenges`);
    } catch (error) {
      console.error("Error checking challenge timeouts:", error);
    }
  },
);

export const rotateBounties = onSchedule("0 0 * * *", async () => {
  try {
    const spots = await db.collection("spots").get();
    const tricks = [
      "ollie",
      "kickflip",
      "heelflip",
      "360 flip",
      "hardflip",
      "varial flip",
      "nollie",
      "fakie",
    ];

    const updates = spots.docs.map((spot) => {
      const randomTricks = tricks
        .sort(() => Math.random() - 0.5)
        .slice(0, 2)
        .map((trick) => ({
          trick,
          reward: Math.floor(Math.random() * 300) + 100,
          expires: admin.firestore.Timestamp.fromDate(
            dayjs().add(7, "day").toDate(),
          ),
        }));

      return spot.ref.update({ activeBounties: randomTricks });
    });

    await Promise.all(updates);
    console.log(`Rotated bounties for ${spots.size} spots`);
  } catch (error) {
    console.error("Error rotating bounties:", error);
  }
});

export const onCheckinCreate = onDocumentCreated(
  "checkins/{checkinId}",
  async (event) => {
    const data = event.data?.data();
    if (!data) return;

    try {
      const spotDoc = await db.doc(`spots/${data.spotId}`).get();
      const spotData = spotDoc.data();

      if (!spotData) return;

      const walletRef = db.doc(`wallets/${data.uid}`);
      const walletDoc = await walletRef.get();

      const baseReward = 50;
      const totalReward = baseReward;

      if (walletDoc.exists) {
        await walletRef.update({
          hubbaBucks: admin.firestore.FieldValue.increment(totalReward),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          transactions: admin.firestore.FieldValue.arrayUnion({
            amount: totalReward,
            type: "checkin",
            ref: data.spotId,
            ts: admin.firestore.FieldValue.serverTimestamp(),
          }),
        });
      } else {
        await walletRef.set({
          hubbaBucks: totalReward,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          transactions: [
            {
              amount: totalReward,
              type: "checkin",
              ref: data.spotId,
              ts: admin.firestore.FieldValue.serverTimestamp(),
            },
          ],
        });
      }

      console.log(
        `Awarded ${totalReward} Hubba Bucks to ${data.uid} for check-in at ${data.spotId}`,
      );
    } catch (error) {
      console.error("Error awarding bounty:", error);
    }
  },
);

export const onChallengeComplete = onDocumentUpdated(
  "challenges/{challengeId}",
  async (event) => {
    const before = event.data?.before.data();
    const after = event.data?.after.data();

    if (
      !after ||
      before?.status === "completed" ||
      after.status !== "completed" ||
      !after.winner
    )
      return;

    try {
      const reward = 200;
      const winnerRef = db.doc(`wallets/${after.winner}`);
      const winnerDoc = await winnerRef.get();

      if (winnerDoc.exists) {
        await winnerRef.update({
          hubbaBucks: admin.firestore.FieldValue.increment(reward),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          transactions: admin.firestore.FieldValue.arrayUnion({
            amount: reward,
            type: "win",
            ref: event.params.challengeId,
            ts: admin.firestore.FieldValue.serverTimestamp(),
          }),
        });
      } else {
        await winnerRef.set({
          hubbaBucks: reward,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          transactions: [
            {
              amount: reward,
              type: "win",
              ref: event.params.challengeId,
              ts: admin.firestore.FieldValue.serverTimestamp(),
            },
          ],
        });
      }

      const loserUid =
        after.winner === after.createdBy ? after.opponent : after.createdBy;
      const loserRef = db.doc(`users/${loserUid}`);
      const winnerUserRef = db.doc(`users/${after.winner}`);

      await Promise.all([
        loserRef.update({
          "stats.losses": admin.firestore.FieldValue.increment(1),
        }),
        winnerUserRef.update({
          "stats.wins": admin.firestore.FieldValue.increment(1),
          "stats.points": admin.firestore.FieldValue.increment(reward),
        }),
      ]);

      console.log(
        `Challenge ${event.params.challengeId} completed - ${after.winner} wins ${reward} Hubba Bucks`,
      );
    } catch (error) {
      console.error("Error processing challenge completion:", error);
    }
  },
);
