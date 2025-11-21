import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "@skatehubba/db";
import { eq, and, or, sql } from 'drizzle-orm';
import { env } from './config/env';

const sqlClient = neon(env.DATABASE_URL);
export const db = drizzle(sqlClient, { schema });

// Export drizzle utilities for use in other modules
export { eq, and, or, sql };

export async function initializeDatabase() {
  try {
    console.log("🗄️  Initializing database...");

    // Test database connection first
    await db.select().from(schema.tutorialSteps).limit(1);
    console.log("✅ Database connection successful");

    // Check if tutorial steps exist
    const existingSteps = await db.select().from(schema.tutorialSteps).limit(1);

    if (existingSteps.length === 0) {
      console.log("📚 Seeding tutorial steps...");
      const defaultSteps = [
        {
          title: "Welcome to SkateHubba",
          description: "Learn the basics of navigating the skate community",
          type: "intro" as const,
          content: { 
            text: "Welcome to SkateHubba! Tap anywhere to check out spots, join challenges, and connect with skaters worldwide." 
          },
          order: 1,
          isActive: true
        },
        {
          title: "Find Skate Spots",
          description: "Discover and check-in to nearby skate spots",
          type: "feature" as const,
          content: { 
            text: "Use the map to find skate spots near you. Check in within 30m to unlock tricks and earn rewards!" 
          },
          order: 2,
          isActive: true
        },
        {
          title: "Join S.K.A.T.E. Challenges",
          description: "Compete in one-take video challenges",
          type: "feature" as const,
          content: { 
            text: "Challenge friends to a game of S.K.A.T.E.! Record your trick, send it, and see if they can match it." 
          },
          order: 3,
          isActive: true
        }
      ];
      for (const step of defaultSteps) {
        await db.insert(schema.tutorialSteps).values(step);
      }
      console.log("✅ Tutorial steps seeded successfully");
    } else {
      console.log("✅ Tutorial steps already initialized");
    }
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    if (env.NODE_ENV !== 'production') {
      throw error;
    }
  }
}

// Health check for readiness probes
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await db.select().from(schema.tutorialSteps).limit(1);
    return true;
  } catch (error) {
    console.error("❌ Database health check failed:", error);
    return false;
  }
}
