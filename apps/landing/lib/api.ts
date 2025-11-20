/**
 * API Client Configuration for SkateHubba Landing Page
 * Connects to Express API backend
 */

// API URL Configuration
// Development: localhost:8000
// Production: Your deployed Autoscale URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

/**
 * Make API request (no auth needed for landing page)
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: 'Request failed',
    }))
    throw new Error(error.error || `HTTP ${response.status}`)
  }

  return response.json()
}

/**
 * Landing Page API Methods
 */
export const api = {
  // Email subscription for marketing
  subscribe: (email: string) =>
    apiRequest('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  // Submit feedback
  submitFeedback: (data: { name: string; email: string; message: string }) =>
    apiRequest('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
}

export default api
