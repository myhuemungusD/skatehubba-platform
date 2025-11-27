import Redis from 'ioredis';
import { env } from './config/env';

// Initialize Redis client
// In production, use REDIS_URL from environment variables
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

redis.on('connect', () => {
  console.log('✅ Connected to Redis');
});

export const GAME_KEY_PREFIX = 'game:';
export const GAME_EXPIRY = 60 * 60 * 24; // 24 hours

export const getGameFromRedis = async (gameId: string) => {
  const data = await redis.get(`${GAME_KEY_PREFIX}${gameId}`);
  return data ? JSON.parse(data) : null;
};

export const saveGameToRedis = async (gameId: string, gameState: any) => {
  await redis.set(
    `${GAME_KEY_PREFIX}${gameId}`,
    JSON.stringify(gameState),
    'EX',
    GAME_EXPIRY
  );
};

export const deleteGameFromRedis = async (gameId: string) => {
  await redis.del(`${GAME_KEY_PREFIX}${gameId}`);
};
