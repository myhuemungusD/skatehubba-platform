import type { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

// Middleware to handle validation errors
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      error: "Validation failed",
      details: errors.array().map((err) => ({
        field: err.type === "field" ? (err as any).path : "unknown",
        message: err.msg,
      })),
      requestId: (req as any).id,
    });
  }
  next();
};

// Email validation chain
export const validateEmail = () => [
  body("email")
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage("Email must be less than 255 characters"),
];

// Password validation chain (strong password)
export const validatePassword = () => [
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*]/)
    .withMessage(
      "Password must contain at least one special character (!@#$%^&*)",
    ),
];

// Subscription validation
export const validateSubscription = () => [
  ...validateEmail(),
  body("firstName")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("First name must be less than 100 characters")
    .matches(/^[a-zA-Z\s'-]*$/)
    .withMessage(
      "First name can only contain letters, spaces, hyphens, and apostrophes",
    ),
];

// Feedback validation
export const validateFeedback = () => [
  body("message")
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage("Feedback must be between 10 and 5000 characters"),
  body("type")
    .optional()
    .isIn(["bug", "feature", "general", "other"])
    .withMessage("Feedback type must be one of: bug, feature, general, other"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Valid email is required if provided"),
];
