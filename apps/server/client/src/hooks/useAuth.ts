import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { listenToAuth, checkRedirectResult } from "../lib/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for redirect result on mount (for Google Sign-In redirect)
    checkRedirectResult().catch((error) => {
      console.error('Failed to process redirect:', error);
    });

    const unsubscribe = listenToAuth((firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Check if user is authenticated
  // Google/OAuth users don't need email verification (already verified by provider)
  // Email/password users need to verify their email
  const isAuthenticated = user ? (
    // If user signed in with OAuth provider (Google, etc.), they're automatically verified
    user.providerData.some(provider => provider.providerId !== 'password') ||
    // If email/password, require email verification
    user.emailVerified
  ) : false;

  return {
    user,
    isLoading,
    isAuthenticated,
  };
}