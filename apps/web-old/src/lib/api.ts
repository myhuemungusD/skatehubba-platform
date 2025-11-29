/**
 * API Client Configuration for SkateHubba Web App
 * Connects to Express API backend
 */

import { getAuth } from "firebase/auth";

// API URL Configuration
// Development: localhost:8000
// Production: Your deployed Autoscale URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * Make authenticated API request
 * Automatically includes Firebase Auth token in headers
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const auth = getAuth();
  const token = await auth.currentUser?.getIdToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add auth token if user is signed in
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Merge with provided headers
  if (options.headers) {
    Object.assign(headers, options.headers);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: "Request failed",
    }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

/**
 * API Methods - Add your endpoints here
 */
export const api = {
  // Auth & Profile
  getProfile: () => apiRequest("/api/profile"),
  updateProfile: (data: any) =>
    apiRequest("/api/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Spots
  getSpots: () => apiRequest("/api/spots"),
  getSpot: (id: string) => apiRequest(`/api/spots/${id}`),
  createSpot: (data: any) =>
    apiRequest("/api/spots", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Challenges
  getChallenges: () => apiRequest("/api/challenges"),
  createChallenge: (data: any) =>
    apiRequest("/api/challenges", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Leaderboard
  getLeaderboard: () => apiRequest("/api/leaderboard"),

  // Tutorial
  getTutorialSteps: () => apiRequest("/api/tutorial/steps"),

  // Subscribe (no auth required)
  subscribe: (email: string) =>
    fetch(`${API_URL}/api/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).then((r) => r.json()),
};

export default api;
