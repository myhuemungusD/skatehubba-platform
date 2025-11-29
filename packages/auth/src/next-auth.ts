import { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { initializeApp, getApps, getApp } from "firebase/app";
import { FirestoreAdapter } from "./firestore-adapter";
import type { AuthConfig } from "./types";

export function createNextAuthConfig(config: AuthConfig): NextAuthConfig {
  const app = !getApps().length
    ? initializeApp(config.firebaseConfig)
    : getApp();

  return {
    adapter: FirestoreAdapter(app),
    providers: [
      Google({
        clientId: config.googleClientId!,
        clientSecret: config.googleClientSecret!,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
          },
        },
      }),
    ],
    session: {
      strategy: "database",
    },
    callbacks: {
      async session({ session, user }) {
        if (session.user) {
          session.user.id = user.id;
        }
        return session;
      },
    },
    pages: {
      signIn: "/sign-in",
      error: "/auth/error",
    },
  };
}

export type { Session } from "next-auth";
