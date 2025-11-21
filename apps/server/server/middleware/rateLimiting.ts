import rateLimit from 'express-rate-limit';

// Memory-based store (default - Redis is optional for distributed deployments)
export let store: any = null;

// Initialize Redis store if configured - call this during server startup
export async function initializeRateLimitStore() {
  try {
    if (process.env.REDIS_URL) {
      const RedisStore = (await import('rate-limit-redis')).default;
      const { createClient } = await import('redis');
      
      const redisClient = createClient({ url: process.env.REDIS_URL });
      await redisClient.connect();
      
      store = new RedisStore({
        sendCommand: (args: string[]) => redisClient.sendCommand(args),
        prefix: 'rl:',
      });
      
      console.log('✓ Redis rate limit store initialized');
    }
  } catch (error) {
    console.warn('⚠️ Redis rate limit store unavailable, using memory store:', (error as any).message);
    store = null;
  }
}

// Global rate limit: 1000 requests per 15 minutes
export const globalLimiter = rateLimit({
  store: () => store,
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
  store: () => store,
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
  store: () => store,
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: 'Too many API requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip || req.socket.remoteAddress || 'unknown',
});

// Subscription endpoint: 3 requests per 24 hours (prevent spam)
export const subscriptionLimiter = rateLimit({
  store: () => store,
  windowMs: 24 * 60 * 60 * 1000,
  max: 3,
  message: 'Subscription limit exceeded. Try again in 24 hours.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => `${req.ip}:${req.body?.email || 'unknown'}`,
});
