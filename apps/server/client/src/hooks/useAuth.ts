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

  return {
    user,
    isLoading,
    isAuthenticated: !!user && !!user.emailVerified,
  };
}