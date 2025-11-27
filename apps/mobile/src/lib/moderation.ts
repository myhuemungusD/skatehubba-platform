import firestore from "@react-native-firebase/firestore";
import { db } from "./firebase";

export async function reportContent(
  reporterUid: string,
  contentId: string,
  contentType: "skate_game" | "video" | "user",
  reason: string,
  reportedUserId?: string,
) {
  try {
    await db.collection("reports").add({
      reporterUid,
      contentId,
      contentType,
      reason,
      reportedUserId,
      status: "pending",
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Error reporting content:", error);
    throw error;
  }
}

export async function blockUser(blockerUid: string, blockedUid: string) {
  try {
    // Add to a subcollection of blocked users for the blocker
    await db.collection("users").doc(blockerUid).collection("blocked").doc(blockedUid).set({
      blockedUid,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Error blocking user:", error);
    throw error;
  }
}
