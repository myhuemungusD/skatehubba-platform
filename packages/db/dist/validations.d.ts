import { z } from 'zod';

declare const NewSubscriberInput: z.ZodObject<{
    firstName: z.ZodEffects<z.ZodOptional<z.ZodString>, string | null, string | undefined>;
    email: z.ZodEffects<z.ZodString, string, string>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    email: string;
    firstName: string | null;
    isActive?: boolean | undefined;
}, {
    email: string;
    firstName?: string | undefined;
    isActive?: boolean | undefined;
}>;
type NewSubscriberInput = z.infer<typeof NewSubscriberInput>;
declare const SubscriberSchema: z.ZodObject<{
    firstName: z.ZodEffects<z.ZodOptional<z.ZodString>, string | null, string | undefined>;
    email: z.ZodEffects<z.ZodString, string, string>;
} & {
    id: z.ZodString;
    isActive: z.ZodBoolean;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    email: string;
    firstName: string | null;
    createdAt: Date;
    isActive: boolean;
}, {
    id: string;
    email: string;
    createdAt: Date;
    isActive: boolean;
    firstName?: string | undefined;
}>;
type SubscriberData = z.infer<typeof SubscriberSchema>;
declare const usernameSchema: z.ZodString;
declare const passwordSchema: z.ZodString;
declare const paymentAmountSchema: z.ZodNumber;
declare const sanitizedStringSchema: z.ZodEffects<z.ZodString, string, string>;
declare const registerSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}, {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}>;
declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
declare const verifyEmailSchema: z.ZodObject<{
    token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    token: string;
}, {
    token: string;
}>;
declare const forgotPasswordSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
declare const resetPasswordSchema: z.ZodObject<{
    token: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    token: string;
    password: string;
}, {
    token: string;
    password: string;
}>;
type RegisterInput = z.infer<typeof registerSchema>;
type LoginInput = z.infer<typeof loginSchema>;
type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export { type ForgotPasswordInput, type LoginInput, NewSubscriberInput, type RegisterInput, type ResetPasswordInput, type SubscriberData, SubscriberSchema, type VerifyEmailInput, forgotPasswordSchema, loginSchema, passwordSchema, paymentAmountSchema, registerSchema, resetPasswordSchema, sanitizedStringSchema, usernameSchema, verifyEmailSchema };
