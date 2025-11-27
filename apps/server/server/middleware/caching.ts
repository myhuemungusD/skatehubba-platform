import type { NextFunction, Request, Response } from "express";

interface CacheEntry {
  data: any;
  timestamp: number;
  ttl: number;
}

const cache = new Map<string, CacheEntry>();

// Clean expired cache entries every 5 minutes
setInterval(
  () => {
    const now = Date.now();
    let cleaned = 0;

    for (const [key, entry] of cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        cache.delete(key);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      console.log(`🧹 Cleaned ${cleaned} expired cache entries`);
    }
  },
  5 * 60 * 1000,
);

export const cacheMiddleware = (ttlSeconds = 300) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "GET") {
      return next();
    }

    const cacheKey = `${req.method}:${req.path}:${JSON.stringify(req.query)}`;
    const cached = cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      res.setHeader("X-Cache", "HIT");
      return res.json(cached.data);
    }

    // Override res.json to cache the response
    const originalJson = res.json.bind(res);
    res.json = (data: any) => {
      if (res.statusCode === 200) {
        cache.set(cacheKey, {
          data,
          timestamp: Date.now(),
          ttl: ttlSeconds * 1000,
        });
        res.setHeader("X-Cache", "MISS");
        res.setHeader("Cache-Control", `public, max-age=${ttlSeconds}`);
      }
      return originalJson(data);
    };

    next();
  };
};

export const clearCache = (pattern?: string) => {
  if (!pattern) {
    cache.clear();
    console.log("🧹 Cache cleared");
    return;
  }

  let cleared = 0;
  for (const key of cache.keys()) {
    if (key.includes(pattern)) {
      cache.delete(key);
      cleared++;
    }
  }

  console.log(`🧹 Cleared ${cleared} cache entries matching ${pattern}`);
};

export const cacheStats = () => {
  const now = Date.now();
  let validEntries = 0;

  for (const entry of cache.values()) {
    if (now - entry.timestamp < entry.ttl) {
      validEntries++;
    }
  }

  return {
    totalEntries: cache.size,
    validEntries,
    invalidEntries: cache.size - validEntries,
  };
};
