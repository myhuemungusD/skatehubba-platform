import type { Spot } from "@skatehubba/types";
import { getClient } from "../../lib/client";

// Define the required interface for fetching a list of spots
export interface SpotListParams {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
  // Optional: limit?: number; offset?: number;
}

export const spotsApi = {
  /**
   * Retrieves a filtered list of spots based on geospatial parameters.
   * Enforces parameters for scalable fetching (no more 'fetch all').
   */
  getSpots: async (params: SpotListParams, signal?: AbortSignal) => {
    const client = await getClient();
    // The underlying client.spots.list() must be updated to accept params and signal
    return client.spots.list(params as any);
  },

  /**
   * Retrieves a single spot by ID.
   */
  getSpot: async (id: string, signal?: AbortSignal) => {
    const client = await getClient();
    return client.spots.get(id);
  },

  /**
   * Creates a new spot. No signal needed for mutations.
   */
  createSpot: async (data: Omit<Spot, "id" | "createdAt" | "createdBy">) => {
    const client = await getClient();
    // Rationale: The data contract is enforced here.
    return client.spots.create(data);
  },
};
