import type { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

// Request ID middleware for distributed tracing
export function requestIdMiddleware(
  req: Request & { id?: string },
  res: Response,
  next: NextFunction,
) {
  const requestId = (req.headers["x-request-id"] as string) || uuidv4();
  req.id = requestId;
  res.setHeader("X-Request-ID", requestId);
  next();
}

// Add version headers
export function versionHeaderMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.setHeader("X-API-Version", "1.0.0");
  res.setHeader("X-Build-Time", new Date().toISOString());
  next();
}

// Graceful shutdown tracking
export class GracefulShutdown {
  private isShuttingDown = false;
  private activeConnections = new Set<Request>();

  trackConnection(req: Request) {
    this.activeConnections.add(req);
    req.on("close", () => this.activeConnections.delete(req));
  }

  initiateShutdown() {
    this.isShuttingDown = true;
    console.log(
      `⏱️  Graceful shutdown initiated. Active connections: ${this.activeConnections.size}`,
    );
  }

  isShutdown() {
    return this.isShuttingDown;
  }

  async waitForConnections(timeoutMs = 30000): Promise<void> {
    const startTime = Date.now();
    while (
      this.activeConnections.size > 0 &&
      Date.now() - startTime < timeoutMs
    ) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    if (this.activeConnections.size > 0) {
      console.warn(
        `⚠️  Forcing shutdown with ${this.activeConnections.size} active connections`,
      );
    }
  }
}

export const gracefulShutdown = new GracefulShutdown();

// Rejection handler middleware
export function rejectionHandler(err: Error) {
  console.error("❌ Unhandled rejection:", err);
  process.exit(1);
}
