import rateLimit from 'express-rate-limit';
import type { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Rate limit configuration for expensive AI endpoints
 * Policy: 5 requests per user (IP address) per 10 seconds
 */
export const heshurRateLimiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 5, // 5 requests per window
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  keyGenerator: (req: Request): string => {
    // Use IP address as the key for rate limiting
    const forwarded = req.headers['x-forwarded-for'];
    const ip = typeof forwarded === 'string'
      ? forwarded.split(',')[0]?.trim()
      : req.socket.remoteAddress;
    return ip ?? 'unknown';
  },
  handler: (_req: Request, res: Response): void => {
    res.status(429).json({
      error: 'Too Many Requests',
      message: 'You have exceeded the rate limit. Please wait before making another request.',
      retryAfter: 10,
    });
  },
});

/**
 * Higher-order function to wrap API handlers with rate limiting
 * @param limiter - The rate limiter to apply
 * @returns A middleware function that applies rate limiting
 */
export function withRateLimit(
  limiter: ReturnType<typeof rateLimit>
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    limiter(req, res, next);
  };
}
