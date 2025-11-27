// vite.config.ts (Final Version)

import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// Define the port your Express API server runs on (CRITICAL ASSUMPTION)
// This is often 3001 if the client defaults to 3000
const API_SERVER_PORT = 3001;

// Base directory resolver for node:url import compatibility
const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // 1. Plugins
  plugins: [react()],

  // 2. Project Structure
  root: "client",
  publicDir: "public",

  // 3. Development Server Configuration
  server: {
    host: "0.0.0.0",
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    allowedHosts: true,
    strictPort: true, // Fail if port is already in use

    // CRITICAL: Proxy API requests to your Express backend
    proxy: {
      "/api": {
        target: `http://localhost:${API_SERVER_PORT}`,
        changeOrigin: true,
        secure: false, // Set to true if Express API uses HTTPS
        ws: true, // Enable WebSocket proxying for real-time features (like games)
      },
    },
  },

  // 4. Build Configuration
  build: {
    outDir: "dist/client", // Using a dedicated client folder is clearer
    emptyOutDir: true,
    sourcemap: true,
    // Note: The Express server will serve files from this location
  },

  // 5. Path Aliases (Ensures clean imports)
  resolve: {
    alias: {
      // @: Resolves to the client's source directory (e.g., '@/components/...')
      "@": path.resolve(dirname, "./client/src"),
      // @shared: Resolves to the shared type directory (e.g., '@/shared/schema')
      "@shared": path.resolve(dirname, "./shared"),
    },
  },

  // 6. Preview (Staging/Production Test)
  preview: {
    host: "0.0.0.0",
    port: 3000,
  },
});
