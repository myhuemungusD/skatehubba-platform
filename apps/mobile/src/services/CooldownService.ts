/**
 * Cooldown Management Service
 *
 * Handles setting and checking user cooldowns for the "no re-dos" rule.
 * When a user deletes their attempt, they must wait 24 hours before
 * trying the same challenge again.
 */

import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { COOLDOWN_HOURS } from "../types/v2-core-loop";

/**
 * Set a cooldown period for the current user.
 * This prevents them from re-attempting a challenge for the specified duration.
 *
 * @param userId - The ID of the user to set the cooldown for
 * @param challengeId - The ID of the challenge (for potential future per-challenge cooldowns)
 * @returns Promise that resolves when the cooldown is set
 */
export const setCooldown = async (
  userId: string,
  _challengeId?: string,
): Promise<void> => {
  const cooldownTimestamp = firestore.Timestamp.fromMillis(
    Date.now() + COOLDOWN_HOURS * 60 * 60 * 1000, // Now + 24 hours in milliseconds
  );

  try {
    await firestore().collection("users").doc(userId).update({
      cooldownUntil: cooldownTimestamp,
    });

    console.log(
      `User ${userId} cooldown set. No re-dos until ${new Date(cooldownTimestamp.toMillis()).toISOString()}`,
    );
  } catch (error) {
    console.error("Error setting cooldown:", error);
    throw new Error("Failed to set cooldown period");
  }
};

/**
 * Check if the current user is currently in a cooldown period.
 *
 * @param userId - The ID of the user to check
 * @returns Promise that resolves to true if user is on cooldown, false otherwise
 */
export const isUserOnCooldown = async (userId: string): Promise<boolean> => {
  try {
    const userDoc = await firestore().collection("users").doc(userId).get();

    if (!userDoc.exists) {
      return false;
    }

    const userData = userDoc.data();

    if (!userData?.cooldownUntil) {
      return false;
    }

    const cooldownUntil = userData.cooldownUntil as FirebaseFirestoreTypes.Timestamp;
    const now = firestore.Timestamp.now();

    return cooldownUntil.toMillis() > now.toMillis();
  } catch (error) {
    console.error("Error checking cooldown status:", error);
    throw new Error("Failed to check cooldown status");
  }
};

/**
 * Get the remaining cooldown time in milliseconds.
 *
 * @param userId - The ID of the user to check
 * @returns Promise that resolves to milliseconds remaining, or 0 if no cooldown
 */
export const getCooldownRemaining = async (userId: string): Promise<number> => {
  try {
    const userDoc = await firestore().collection("users").doc(userId).get();

    if (!userDoc.exists) {
      return 0;
    }

    const userData = userDoc.data();

    if (!userData?.cooldownUntil) {
      return 0;
    }

    const cooldownUntil = userData.cooldownUntil as FirebaseFirestoreTypes.Timestamp;
    const now = firestore.Timestamp.now();
    const remaining = cooldownUntil.toMillis() - now.toMillis();

    return remaining > 0 ? remaining : 0;
  } catch (error) {
    console.error("Error getting cooldown remaining:", error);
    throw new Error("Failed to get cooldown remaining time");
  }
};

/**
 * Clear the cooldown for a user (admin/debug use only).
 *
 * @param userId - The ID of the user to clear cooldown for
 * @returns Promise that resolves when the cooldown is cleared
 */
export const clearCooldown = async (userId: string): Promise<void> => {
  try {
    await firestore().collection("users").doc(userId).update({
      cooldownUntil: firestore.FieldValue.delete(),
    });

    console.log(`User ${userId} cooldown cleared.`);
  } catch (error) {
    console.error("Error clearing cooldown:", error);
    throw new Error("Failed to clear cooldown");
  }
};

/**
 * Format cooldown remaining time into a human-readable string.
 *
 * @param milliseconds - Time remaining in milliseconds
 * @returns Formatted string like "23h 45m" or "45m 30s"
 */
export const formatCooldownTime = (milliseconds: number): string => {
  if (milliseconds <= 0) {
    return "Ready";
  }

  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  } else if (minutes > 0) {
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    return `${seconds}s`;
  }
};
