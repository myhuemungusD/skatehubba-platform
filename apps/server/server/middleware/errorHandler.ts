import type { NextFunction, Request, Response } from "express";

export interface StandardError {
  code: string;
  message: string;
  statusCode: number;
  details?: any;
}

export class APIError extends Error implements StandardError {
  code: string;
  statusCode: number;
  details?: any;

  constructor(
    code: string,
    message: string,
    statusCode: number = 500,
    details?: any,
  ) {
    super(message);
    this.name = "APIError";
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

// Common API errors
export const Errors = {
  VALIDATION_ERROR: (details?: any) =>
    new APIError("VALIDATION_ERROR", "Request validation failed", 400, details),

  UNAUTHORIZED: (message = "Unauthorized") =>
    new APIError("UNAUTHORIZED", message, 401),

  FORBIDDEN: (message = "Forbidden") => new APIError("FORBIDDEN", message, 403),

  NOT_FOUND: (resource = "Resource") =>
    new APIError("NOT_FOUND", `${resource} not found`, 404),

  CONFLICT: (message = "Conflict") => new APIError("CONFLICT", message, 409),

  RATE_LIMITED: () => new APIError("RATE_LIMITED", "Too many requests", 429),

  SERVICE_UNAVAILABLE: (service = "Service") =>
    new APIError(
      "SERVICE_UNAVAILABLE",
      `${service} temporarily unavailable`,
      503,
    ),

  INTERNAL_ERROR: (message = "Internal server error") =>
    new APIError("INTERNAL_ERROR", message, 500),
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const isDev = process.env.NODE_ENV === "development";
  const requestId = (req as any).id;

  // Log the error
  console.error(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      level: "error",
      requestId,
      error: {
        code: err.code || "UNKNOWN",
        message: err.message,
        stack: isDev ? err.stack : undefined,
      },
    }),
  );

  // Determine status code and response
  const statusCode = err.statusCode || 500;
  const response = {
    ok: false,
    error: {
      code: err.code || "INTERNAL_ERROR",
      message: isDev ? err.message : "Internal server error",
      ...(isDev && err.details && { details: err.details }),
    },
    requestId,
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(response);
};

// Request timeout middleware (30 seconds)
export const requestTimeout = (timeout = 30000) => {
  return (req: Request, res: Response, next: NextFunction) => {
    res.setTimeout(timeout, () => {
      res.status(408).json({
        ok: false,
        error: {
          code: "REQUEST_TIMEOUT",
          message: "Request timeout",
        },
        requestId: (req as any).id,
      });
    });
    next();
  };
};
