/**
 * DEPRECATED: See apps/server/server/index.js for current production routes
 * This file contains legacy route definitions kept for reference only
 */

import crypto from "crypto";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import validator from "validator";
import type { z } from "zod";
import { env } from "./config/env";

// Security validation functions
export const sanitizeString = (str: string): string => {
  const sanitized = validator.escape(str.trim());
  return sanitized.replace(/['\\';|*%<>{}[\]()]/g, "");
};

export const validateId = (id: string): boolean => {
  return validator.isInt(id, { min: 1 }) && validator.isLength(id, { max: 20 });
};

export const validateUserId = (userId: string): boolean => {
  return (
    validator.isLength(userId, { min: 1, max: 100 }) &&
    validator.matches(userId, /^[a-zA-Z0-9_-]+$/)
  );
};

// Per-user rate limiting store
const userRateLimits = new Map();

export const createUserRateLimit = (
  userId: string,
  maxRequests: number,
  windowMs: number,
) => {
  const now = Date.now();
  const userKey = `${userId}_${Math.floor(now / windowMs)}`;

  if (!userRateLimits.has(userKey)) {
    userRateLimits.set(userKey, 0);
    setTimeout(() => userRateLimits.delete(userKey), windowMs);
  }

  const count = (userRateLimits.get(userKey) || 0) + 1;
  userRateLimits.set(userKey, count);

  return count <= maxRequests;
};

// Admin API key middleware with timing attack protection
export const requireApiKey = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const apiKey =
    req.headers["x-api-key"] ||
    req.headers["authorization"]?.replace("Bearer ", "");

  if (!env.ADMIN_API_KEY) {
    return res.status(500).json({ error: "Admin API key not configured" });
  }

  if (
    !apiKey ||
    typeof apiKey !== "string" ||
    apiKey.length !== env.ADMIN_API_KEY.length
  ) {
    return res.status(401).json({ error: "Invalid or missing API key" });
  }

  const providedKey = Buffer.from(apiKey, "utf8");
  const validKey = Buffer.from(env.ADMIN_API_KEY, "utf8");

  if (!crypto.timingSafeEqual(providedKey, validKey)) {
    return res.status(401).json({ error: "Invalid or missing API key" });
  }

  next();
};

// Request validation middleware
export const validateRequest =
  (schema: z.ZodSchema) =>
  (
    req: Request & { validatedBody?: any },
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          error: "Invalid request data",
          details: result.error.errors,
        });
      }
      req.validatedBody = result.data;
      next();
    } catch (error) {
      res.status(400).json({ error: "Request validation failed" });
    }
  };

export default {
  sanitizeString,
  validateId,
  validateUserId,
  requireApiKey,
  validateRequest,
};
