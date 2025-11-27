import validator from "validator";
import { z } from "zod";

/**
 * Centralized Zod validation schemas for all API routes
 * Single source of truth for input validation
 */

export const sanitizeString = (str: string): string => {
  const sanitized = validator.escape(str.trim());
  return sanitized.replace(/['\\';|*%<>{}[\]()]/g, "");
};

export const SubscribeSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .max(255, "Email too long")
    .transform((e) => e.toLowerCase()),
  firstName: z
    .string()
    .min(1, "First name required if provided")
    .max(100, "First name too long")
    .optional()
    .nullable()
    .transform((val) => (val ? sanitizeString(val) : null)),
});

export type SubscribeInput = z.infer<typeof SubscribeSchema>;

export const FeedbackSchema = z.object({
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message cannot exceed 5000 characters")
    .transform(sanitizeString),
  type: z
    .enum(["bug", "feature", "general", "other"])
    .optional()
    .default("general"),
  email: z
    .string()
    .email("Invalid email format")
    .max(255, "Email too long")
    .optional()
    .nullable(),
});

export type FeedbackInput = z.infer<typeof FeedbackSchema>;

export const validateRequest =
  (schema: z.ZodSchema) => (req: any, res: any, next: any) => {
    try {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          ok: false,
          error: "Invalid request data",
          details: result.error.errors.map((e) => ({
            path: e.path.join("."),
            message: e.message,
          })),
          requestId: req.id,
        });
      }
      req.validatedBody = result.data;
      next();
    } catch (error) {
      res.status(500).json({
        ok: false,
        error: "Validation error",
        requestId: req.id,
      });
    }
  };
