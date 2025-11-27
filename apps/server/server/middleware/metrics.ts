import type { NextFunction, Request, Response } from "express";

interface RequestMetrics {
  method: string;
  path: string;
  statusCode: number;
  duration: number;
  timestamp: string;
  requestId: string;
}

const metrics: RequestMetrics[] = [];
const maxMetrics = 10000; // Keep last N requests

export const metricsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const startTime = Date.now();

  // Override res.json to capture metrics
  const originalJson = res.json.bind(res);
  res.json = (data: any) => {
    const duration = Date.now() - startTime;

    metrics.push({
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration,
      timestamp: new Date().toISOString(),
      requestId: (req as any).id,
    });

    if (metrics.length > maxMetrics) {
      metrics.shift();
    }

    // Add duration header
    res.setHeader("X-Response-Time", `${duration}ms`);

    return originalJson(data);
  };

  next();
};

export const getMetrics = () => {
  const total = metrics.length;
  const avgDuration =
    metrics.length > 0
      ? metrics.reduce((sum, m) => sum + m.duration, 0) / metrics.length
      : 0;

  const byPath = metrics.reduce(
    (acc, m) => {
      if (!acc[m.path]) {
        acc[m.path] = { count: 0, totalDuration: 0, avgDuration: 0 };
      }
      acc[m.path].count++;
      acc[m.path].totalDuration += m.duration;
      acc[m.path].avgDuration = acc[m.path].totalDuration / acc[m.path].count;
      return acc;
    },
    {} as Record<string, any>,
  );

  const slowRequests = metrics
    .sort((a, b) => b.duration - a.duration)
    .slice(0, 10);

  return {
    total,
    avgDuration: Math.round(avgDuration),
    slowRequests,
    byPath,
  };
};

export const metricsEndpoint = (req: Request, res: Response) => {
  if (
    process.env.NODE_ENV === "production" &&
    req.headers["x-metrics-token"] !== process.env.METRICS_TOKEN
  ) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }

  res.json({
    ok: true,
    metrics: getMetrics(),
    timestamp: new Date().toISOString(),
  });
};
