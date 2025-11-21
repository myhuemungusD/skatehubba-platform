import pino from "pino";
import pinoHttp from "pino-http";
import { v4 as uuidv4 } from "uuid";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Centralized pino logger configuration
 * All logs are structured JSON with request correlation
 */
export const logger = pino({
  level: isDev ? "debug" : "info",
  transport: isDev
    ? { target: "pino-pretty", options: { colorize: true } }
    : undefined,
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "req.body.password",
      "res.headers['set-cookie']",
    ],
    remove: true,
  },
  base: {
    env: process.env.NODE_ENV,
    service: "skatehubba-api",
    version: "2.0.0",
  },
});

/**
 * Express middleware for request logging
 * Automatically correlates all logs with request ID
 */
export const httpLogger = pinoHttp({
  logger,
  genReqId: (req) => req.id || req.headers['x-request-id'] || uuidv4(),
  serializers: {
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
  // Log errors with full context
  customErrorMessage: (req, res, error) => {
    return `${req.method} ${req.url} - ${res.statusCode}`;
  },
  customLogLevel: (req, res) => {
    if (res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
});

export default logger;
