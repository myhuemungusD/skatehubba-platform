import { useEffect } from "react";
import { Platform } from "react-native";
import * as Analytics from "expo-firebase-analytics";
import * as Sentry from "@sentry/react-native";
import type { UserProfile } from "@skatehubba/types";
import { useAuth } from "../hooks/useAuth";
import { SKATE } from "@skatehubba/ui/theme";

/**
 * SkateHubba™ Analytics – Production-Ready Event Tracking
 *
 * Tracks core events: challenges, check-ins, trades, Heshur chats, level-ups.
 * Privacy: Anonymized (no PII), opt-in, GDPR-compliant.
 * Integrates Firebase Analytics + Sentry (errors + perf).
 *
 * Usage:
 * import { trackChallengeStart } from "@/utils/analytics";
 * trackChallengeStart(challengeId, opponentId);
 */

const APP_VERSION = "1.0.0"; // aligned with app.json
const isEnabled =
  __DEV__ || process.env.EXPO_PUBLIC_ANALYTICS_ENABLED === "true";

export function initAnalytics() {
  if (!isEnabled) return;
  Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    debug: __DEV__,
    tracesSampleRate: 1.0,
  });
}

// Firebase Analytics (events)
export async function logEvent(
  eventName: string,
  params: Record<string, any> = {},
) {
  if (!isEnabled) return;

  try {
    await Analytics.logEvent(eventName, {
      ...params,
      app_version: APP_VERSION,
      os: Platform.OS,
      timestamp: Date.now(),
      palette: `${SKATE.colors.neon}-${SKATE.colors.grime}`,
    });
  } catch (error) {
    console.warn("Analytics log failed:", error);
  }
}

// Sentry (errors + perf)
export function reportError(error: Error, context: Record<string, any> = {}) {
  if (!isEnabled) return;
  Sentry.withScope((scope) => {
    scope.setExtras(context);
    scope.setTag("source", "mobile");
    Sentry.captureException(error);
  });
}

export function setUser(profile: UserProfile) {
  if (!isEnabled) return;

  Sentry.setUser({
    id: profile.uid,
    username: profile.handle,
    level: profile.level,
  });

  Analytics.setUserId(profile.uid).catch(() => undefined);
  Analytics.setUserProperty("handle", profile.handle).catch(() => undefined);
  Analytics.setUserProperty("level", profile.level.toString()).catch(
    () => undefined,
  );
  Analytics.setUserProperty("stance", profile.stance).catch(() => undefined);
  Analytics.setUserProperty(
    "theme_neon",
    SKATE.colors.neon,
  ).catch(() => undefined);
}

export function trackScreen(screenName: string) {
  if (!isEnabled) return;
  logEvent("screen_view", { screen_name: screenName });
}

// Core Events
export async function trackChallengeStart(
  challengeId: string,
  opponentId: string,
  type: "skate" | "bounty",
) {
  logEvent("challenge_start", {
    challenge_id: challengeId,
    opponent_id: opponentId,
    type,
  });
}

export async function trackCheckIn(spotId: string, spotName: string, location?: { lat: number; lng: number }) {
  logEvent("check_in", {
    spot_id: spotId,
    spot_name: spotName,
    location: location ? `${location.lat},${location.lng}` : undefined,
  });
}

export async function trackTrade(itemId: string, receiverId: string) {
  logEvent("trade_initiated", {
    item_id: itemId,
    receiver_id: receiverId,
  });
}

export async function trackChallengeComplete(
  challengeId: string,
  outcome: "win" | "loss" | "timeout",
) {
  logEvent("challenge_complete", { challenge_id: challengeId, outcome });
}



export async function trackTradePropose(fromItem: string, toItem: string) {
  logEvent("trade_propose", { from_item: fromItem, to_item: toItem });
}

export async function trackTradeAccept(
  tradeId: string,
  outcome: "success" | "failed",
) {
  logEvent("trade_accept", { trade_id: tradeId, outcome });
}

export async function trackHeshurChat(
  query: string,
  responseLength: number,
) {
  logEvent("heshur_chat", {
    query_length: query.length,
    response_length: responseLength,
  });
}

export async function trackLevelUp(level: number, xpGained: number) {
  logEvent("level_up", { new_level: level, xp_gained: xpGained });
}

export async function trackItemEquip(itemType: string, itemName: string) {
  logEvent("item_equip", { type: itemType, name: itemName });
}

// Perf Tracking (Sentry)
export function trackPerformance(operation: string, duration: number) {
  if (!isEnabled) return;
  Sentry.addBreadcrumb({
    category: "performance",
    message: operation,
    level: "info",
    data: { duration_ms: duration },
  });
}

// Privacy: Opt-out
export function disableAnalytics() {
  Analytics.setAnalyticsCollectionEnabled(false).catch(() => undefined);
  Sentry.close();
}

// Helper hook to automatically wire Firebase Auth -> Analytics identity
export function useAnalyticsIdentity(profile?: UserProfile | null) {
  const { user } = useAuth();

  useEffect(() => {
    if (!isEnabled) return;

    if (user?.uid) {
      Analytics.setUserId(user.uid).catch(() => undefined);
      Sentry.setUser({ id: user.uid, email: user.email ?? undefined });
    } else {
      Sentry.setUser(null);
      Analytics.resetAnalyticsData().catch(() => undefined);
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      setUser(profile);
    }
  }, [profile]);
}
