import { onCall, HttpsError } from "firebase-functions/v2/https";
import { db } from "./db";
import { Spot } from "@skatehubba/types";
import * as admin from "firebase-admin";

export const createSpot = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User must be logged in");
  }

  const { name, geo } = request.data;
  if (!name || !geo || typeof geo.lat !== 'number' || typeof geo.lng !== 'number') {
      throw new HttpsError("invalid-argument", "Invalid spot data");
  }

  const newSpotRef = db.collection("spots").doc();
  const now = new Date(); // Use Date object for Firestore timestamp compatibility if needed, or string. 
  // The type definition says Date, but over the wire it's usually string. 
  // Firestore stores Timestamps.
  // Let's stick to ISO strings for the API response, but Firestore might want Timestamps.
  // The Spot type in types/index.ts says `createdAt: z.date()`.
  
  const newSpot: any = { // Use any to bypass strict type check for Firestore write
    id: newSpotRef.id,
    name,
    geo,
    createdBy: request.auth.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    // Add lat/lng at root for geospatial queries if needed
    latitude: geo.lat,
    longitude: geo.lng
  };

  await newSpotRef.set(newSpot);

  return { spot: { ...newSpot, createdAt: now.toISOString() } };
});

export const getSpots = onCall(async (request) => {
    // Optional bounds
    const { minLat, maxLat, minLng, maxLng } = request.data;
    
    let query: admin.firestore.Query = db.collection("spots");

    if (minLat && maxLat && minLng && maxLng) {
        // Simple bounding box query
        // Note: Firestore can only range filter on one field. 
        // We might need Geohashing for real implementation.
        // For now, let's just return all or limit.
        // Or filter in memory if dataset is small.
        // Or use `latitude` range and filter longitude in client/server.
        query = query.where("latitude", ">=", minLat).where("latitude", "<=", maxLat);
    }

    const snapshot = await query.limit(100).get();
    const spots = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            ...data,
            createdAt: data.createdAt?.toDate?.() || new Date(), // Handle Firestore Timestamp
        };
    });

    // Filter longitude manually if needed
    const filteredSpots = (minLng && maxLng) 
        ? spots.filter((s: any) => s.longitude >= minLng && s.longitude <= maxLng)
        : spots;

    return { spots: filteredSpots };
});

export const getSpot = onCall(async (request) => {
    const { spotId } = request.data;
    if (!spotId) throw new HttpsError("invalid-argument", "Spot ID required");

    const doc = await db.collection("spots").doc(spotId).get();
    if (!doc.exists) throw new HttpsError("not-found", "Spot not found");

    const data = doc.data();
    return { spot: { ...data, createdAt: data?.createdAt?.toDate?.() || new Date() } };
});
