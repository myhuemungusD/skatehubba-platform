// src/validations.ts
import { z } from "zod";
var NewSubscriberInput = z.object({
  firstName: z.string().optional().transform((v) => v?.trim() || null),
  email: z.string().email().transform((v) => v.trim().toLowerCase()),
  isActive: z.boolean().optional()
});
var SubscriberSchema = NewSubscriberInput.extend({
  id: z.string(),
  isActive: z.boolean(),
  createdAt: z.date()
});
var usernameSchema = z.string().min(3, "Username must be at least 3 characters").max(30, "Username must be less than 30 characters").regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, hyphens, and underscores");
var passwordSchema = z.string().min(8, "Password must be at least 8 characters").max(128, "Password too long").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number");
var paymentAmountSchema = z.number().min(0.5, "Amount must be at least $0.50").max(1e4, "Amount cannot exceed $10,000");
var sanitizedStringSchema = z.string().trim().max(1e3, "String too long").transform((str) => str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ""));
var registerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: passwordSchema,
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100)
});
var loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required")
});
var verifyEmailSchema = z.object({
  token: z.string().min(1, "Verification token is required")
});
var forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address")
});
var resetPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  password: passwordSchema
});

export {
  NewSubscriberInput,
  SubscriberSchema,
  usernameSchema,
  passwordSchema,
  paymentAmountSchema,
  sanitizedStringSchema,
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema
};
//# sourceMappingURL=chunk-WSMML4PR.js.map