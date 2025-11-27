import { spots } from "@skatehubba/db";
import express from "express";
import { z } from "zod";
import { db, sql } from "../db";

const router = express.Router();

// Validation schema for creating a spot
const createSpotSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  spotType: z.enum(["street", "park", "diy", "gap"]),
  bustFactor: z.number().min(0).max(10).default(0),
  hasLights: z.boolean().default(false),
  images: z.array(z.string().url()).optional(),
  tags: z.array(z.string()).optional(),
});

// Helper to convert DB rows to GeoJSON FeatureCollection
const toGeoJSON = (rows: any[]) => ({
  type: "FeatureCollection",
  features: rows.map((row) => ({
    type: "Feature",
    id: row.id,
    geometry: {
      type: "Point",
      coordinates: [row.longitude, row.latitude], // GeoJSON is [lng, lat]
    },
    properties: {
      name: row.name,
      description: row.description,
      spotType: row.spotType,
      bustFactor: row.bustFactor,
      hasLights: row.hasLights,
      images: row.images,
      tags: row.tags,
      createdBy: row.createdBy,
      createdAt: row.createdAt,
    },
  })),
});

// GET /api/spots/bounds
// Find spots within a viewport (Bounding Box)
// Query: minLat, maxLat, minLng, maxLng
router.get("/bounds", async (req, res) => {
  try {
    const { minLat, maxLat, minLng, maxLng } = req.query;

    if (!minLat || !maxLat || !minLng || !maxLng) {
      return res.status(400).json({ error: "Missing bounding box parameters" });
    }

    // ⚡️ PostGIS Magic: ST_MakeEnvelope
    // Efficiently finds everything inside the map screen
    const spotsInBounds = await db
      .select({
        ...spots,
        // Extract lat/lng from geometry for the JSON response
        latitude: sql<number>`ST_Y(${spots.location}::geometry)`,
        longitude: sql<number>`ST_X(${spots.location}::geometry)`,
      })
      .from(spots)
      .where(
        sql`${spots.location} && ST_MakeEnvelope(
        ${parseFloat(minLng as string)}, 
        ${parseFloat(minLat as string)}, 
        ${parseFloat(maxLng as string)}, 
        ${parseFloat(maxLat as string)}, 
        4326
      )`,
      );

    res.json(toGeoJSON(spotsInBounds));
  } catch (error) {
    console.error("Error finding spots in bounds:", error);
    res.status(500).json({ error: "Failed to fetch spots" });
  }
});

// GET /api/spots/nearby
// Find spots within X meters of a location
router.get("/nearby", async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: "Missing lat or lng parameters" });
    }

    const userLat = parseFloat(lat as string);
    const userLng = parseFloat(lng as string);
    const searchRadius = parseInt(radius as string, 10) || 5000; // Default 5km

    // ⚡️ PostGIS Magic: ST_DWithin
    // Finds points within 'searchRadius' meters of the user's location
    const nearbySpots = await db
      .select({
        ...spots,
        latitude: sql<number>`ST_Y(${spots.location}::geometry)`,
        longitude: sql<number>`ST_X(${spots.location}::geometry)`,
      })
      .from(spots)
      .where(
        sql`ST_DWithin(
        ${spots.location}, 
        ST_SetSRID(ST_MakePoint(${userLng}, ${userLat}), 4326), 
        ${searchRadius}
      )`,
      );

    res.json(toGeoJSON(nearbySpots));
  } catch (error) {
    console.error("Error finding nearby spots:", error);
    res.status(500).json({ error: "Failed to fetch spots" });
  }
});

// POST /api/spots
// Create a new spot
router.post("/", async (req, res) => {
  try {
    // Mock auth - in production use req.user.id
    const userId = req.headers["x-user-id"] as string;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const validation = createSpotSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors });
    }

    const {
      name,
      description,
      latitude,
      longitude,
      spotType,
      bustFactor,
      hasLights,
      images,
      tags,
    } = validation.data;

    // Insert with PostGIS point creation
    const [newSpot] = await db
      .insert(spots)
      .values({
        name,
        description,
        spotType,
        bustFactor,
        hasLights,
        images: images || [],
        tags: tags || [],
        createdBy: userId,
        // Create the geometry point from lat/lng
        location: sql`ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)`,
      })
      .returning();

    // Return the new spot in GeoJSON format for consistency
    res.status(201).json(
      toGeoJSON([
        {
          ...newSpot,
          latitude,
          longitude,
        },
      ]),
    );
  } catch (error) {
    console.error("Error creating spot:", error);
    res.status(500).json({ error: "Failed to create spot" });
  }
});

export default router;
