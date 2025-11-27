/**
 * API Client Configuration for SkateHubba Admin Panel
 * Connects to Express API backend
 */

// API URL Configuration
// Development: localhost:8000
// Production: Your deployed Autoscale URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Make authenticated API request
 * Admin endpoints require Firebase Auth token with admin role
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  // TODO: Add Firebase Auth integration for admin
  // const auth = getAuth()
  // const token = await auth.currentUser?.getIdToken()

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Add admin auth token when Firebase is integrated
  // if (token) {
  //   headers['Authorization'] = `Bearer ${token}`
  // }

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
 * Admin API Methods - Full platform management
 */
export const adminApi = {
  // Dashboard Stats
  getStats: () => apiRequest("/api/admin/stats"),
  getRecentActivity: () => apiRequest("/api/admin/activity"),

  // Spot Management
  getAllSpots: () => apiRequest("/api/admin/spots"),
  approveSpot: (id: string) =>
    apiRequest(`/api/admin/spots/${id}/approve`, { method: "POST" }),
  deleteSpot: (id: string) =>
    apiRequest(`/api/admin/spots/${id}`, { method: "DELETE" }),

  // Stream Moderation
  getPendingStreams: () => apiRequest("/api/admin/streams/pending"),
  approveStream: (id: string) =>
    apiRequest(`/api/admin/streams/${id}/approve`, { method: "POST" }),
  rejectStream: (id: string) =>
    apiRequest(`/api/admin/streams/${id}/reject`, { method: "POST" }),

  // User Management
  getAllUsers: () => apiRequest("/api/admin/users"),
  banUser: (id: string, reason: string) =>
    apiRequest(`/api/admin/users/${id}/ban`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    }),
  unbanUser: (id: string) =>
    apiRequest(`/api/admin/users/${id}/unban`, { method: "POST" }),
  verifyProUser: (id: string) =>
    apiRequest(`/api/admin/users/${id}/verify`, { method: "POST" }),

  // Clip Moderation
  getFlaggedClips: () => apiRequest("/api/admin/clips/flagged"),
  approveClip: (id: string) =>
    apiRequest(`/api/admin/clips/${id}/approve`, { method: "POST" }),
  deleteClip: (id: string) =>
    apiRequest(`/api/admin/clips/${id}`, { method: "DELETE" }),

  // Events
  getAllEvents: () => apiRequest("/api/admin/events"),
  createEvent: (data: any) =>
    apiRequest("/api/admin/events", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateEvent: (id: string, data: any) =>
    apiRequest(`/api/admin/events/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Marketplace
  getAllProducts: () => apiRequest("/api/admin/marketplace"),
  updateProduct: (id: string, data: any) =>
    apiRequest(`/api/admin/marketplace/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Analytics
  getAnalytics: (timeframe: string) =>
    apiRequest(`/api/admin/analytics?timeframe=${timeframe}`),

  // Announcements
  createAnnouncement: (data: any) =>
    apiRequest("/api/admin/announcements", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

export default adminApi;
