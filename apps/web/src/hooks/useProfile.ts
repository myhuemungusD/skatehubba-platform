import { useQuery } from "@tanstack/react-query";
import { getAuth } from "firebase/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const auth = getAuth();
      const token = await auth.currentUser?.getIdToken();
      
      if (!token) {
        throw new Error("Not authenticated");
      }

      const res = await fetch(`${API_URL}/api/profile`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({ error: "Failed to fetch profile" }));
        throw new Error(error.error || "Failed to fetch profile");
      }

      return res.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: false, // Don't auto-fetch, wait for user to be signed in
  });
}
