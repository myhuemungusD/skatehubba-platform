import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
import { z } from "zod";

// 1. Load Environment Variables
// Ensure environment variables are loaded for Drizzle Kit to access them.
// Pointing to the root .env file from packages/db
dotenv.config({ path: "../../.env" });

// 2. Validate Environment Variables using Zod
// This is the senior-level addition: validate required secrets early!
const envSchema = z.object({
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL string"),
});

// Parse the environment variables, which will throw an error if validation fails.
// This prevents silent failures or misleading errors during migration.
const env = envSchema.parse(process.env);

export default defineConfig({
  // --- Core Configuration ---

  // 1. Specifies the location of your database schema definition file(s).
  // This points to the single source of truth for your DB structure.
  schema: "./src/schema.ts",

  // 2. Specifies the output directory for generated migration files.
  out: "./drizzle",

  // 3. The database type used in your project.
  dialect: "postgresql",

  // 4. Database connection credentials for Drizzle Kit.
  dbCredentials: {
    // Safely use the validated DATABASE_URL from the parsed environment object.
    url: env.DATABASE_URL,
  },

  // --- Advanced Options (Senior Standards) ---

  // 5. Strict Mode: Ensures migrations are safer by checking for
  // potential issues like schema drift. Highly recommended.
  strict: true,

  // 6. Verbose Output: Prints detailed information about the Drizzle Kit
  // process, useful for debugging complex schema changes.
  verbose: true,

  // 7. Schema Filtering (Optional, but good for cleanliness)
  // If you use multiple schemas/prefixes, this keeps Drizzle Kit focused.
  // tablesFilter: ["skatehubba_*"],
});
