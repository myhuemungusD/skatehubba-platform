// Fullstack TypeScript wrapper - launches both frontend and backend
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverPath = path.join(__dirname, "index.js");
const tsxBinary = path.resolve(
  __dirname,
  "../../../node_modules/tsx/dist/cli.mjs",
);

console.log("🔄 Starting SkateHubba fullstack application...");
console.log("🌐 Unified Server (Frontend + API): http://localhost:8000");

// Start unified server on port 8000 with tsx to handle TypeScript
// This server includes both the API and Vite middleware for the frontend
const apiServer = spawn("node", [tsxBinary, serverPath], {
  stdio: "pipe",
  env: { ...process.env, NODE_ENV: "development", PORT: "8000" },
});

// No separate Vite server needed - it's integrated into the API server
const viteServer = null;

// Output handling with clear labels
apiServer.stdout?.on("data", (data) => {
  process.stdout.write(`${data}`);
});
apiServer.stderr?.on("data", (data) => {
  process.stderr.write(`${data}`);
});

// Handle process exits
apiServer.on("exit", (code) => {
  console.log(`\n🛑 Server exited with code ${code}`);
  process.exit(code || 0);
});

// Handle startup errors
apiServer.on("error", (error) => {
  console.error("❌ Failed to start server:", error);
  process.exit(1);
});

// Graceful shutdown handlers
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down fullstack application...");
  apiServer.kill("SIGINT");
});

process.on("SIGTERM", () => {
  console.log("\n🛑 Shutting down fullstack application...");
  apiServer.kill("SIGTERM");
});
