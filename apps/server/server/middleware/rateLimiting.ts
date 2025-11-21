import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'redis';

// Create Redis client for distributed rate limiting (optional - falls back to memory)
let redisClient: any = null;
let store: any = null;

try {
  if (process.env.REDIS_URL) {
    redisClient = Redis.createClient({ url: process.env.REDIS_URL });
    redisClient.connect().catch(() => console.warn('Redis rate limit store unavailable'));
    
    store = new RedisStore({
      client: redisClient,
      prefix: 'rl:',
      sendCommand: (...args: any[]) => redisClient.sendCommand(args),
    });
  }
} catch (error) {
  console.warn('Rate limit Redis initialization skipped:', (error as any).message);
}

// Global rate limit: 1000 requests per 15 minutes
export const globalLimiter = rateLimit({
  store,
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => process.env.NODE_ENV === 'development',
  keyGenerator: (req) => req.ip || req.socket.remoteAddress || 'unknown',
});

// Strict rate limit for authentication: 5 attempts per 15 minutes
export const authLimiter = rateLimit({
  store,
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  keyGenerator: (req) => `${req.ip}:${req.body?.email || 'unknown'}`,
});

// API endpoint limiter: 100 requests per minute
export const apiLimiter = rateLimit({
  store,
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: 'Too many API requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip || req.socket.remoteAddress || 'unknown',
});

// Subscription endpoint: 3 requests per 24 hours (prevent spam)
export const subscriptionLimiter = rateLimit({
  store,
  windowMs: 24 * 60 * 60 * 1000,
  max: 3,
  message: 'Subscription limit exceeded. Try again in 24 hours.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => `${req.ip}:${req.body?.email || 'unknown'}`,
});
