// src/schema.ts
import { pgTable, text, serial, integer, boolean, timestamp, json, jsonb, varchar, uuid, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { sql } from "drizzle-orm";
var users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  displayName: text("display_name"),
  photoURL: text("photo_url"),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  onboardingCompleted: boolean("onboarding_completed").default(false),
  currentTutorialStep: integer("current_tutorial_step").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var spots = pgTable("spots", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  geo: jsonb("geo").notNull(),
  createdBy: uuid("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var challenges = pgTable("challenges", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdBy: uuid("created_by").notNull().references(() => users.id),
  status: text("status").notNull(),
  rules: jsonb("rules").notNull(),
  clipA: text("clip_a").notNull(),
  clipB: text("clip_b"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var checkIns = pgTable("check_ins", {
  id: uuid("id").primaryKey().defaultRandom(),
  uid: uuid("uid").notNull().references(() => users.id),
  spotId: uuid("spot_id").notNull().references(() => spots.id),
  proofVideoUrl: text("proof_video_url"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: json("sess").notNull(),
    expire: timestamp("expire").notNull()
  },
  (table) => ({
    expireIdx: index("IDX_session_expire").on(table.expire)
  })
);
var tutorialSteps = pgTable("tutorial_steps", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  content: json("content").$type(),
  order: integer("order").notNull(),
  isActive: boolean("is_active").default(true)
});
var userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  stepId: integer("step_id").notNull(),
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
  timeSpent: integer("time_spent"),
  interactionData: json("interaction_data").$type()
});
var subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  firstName: text("first_name"),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  isActive: boolean("is_active").default(true)
});
var donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  amount: integer("amount").notNull(),
  paymentIntentId: varchar("payment_intent_id", { length: 255 }).notNull().unique(),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
});
var customUsers = pgTable("custom_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  firebaseUid: varchar("firebase_uid", { length: 128 }).unique(),
  isEmailVerified: boolean("is_email_verified").default(false),
  emailVerificationToken: varchar("email_verification_token", { length: 255 }),
  emailVerificationExpires: timestamp("email_verification_expires"),
  resetPasswordToken: varchar("reset_password_token", { length: 255 }),
  resetPasswordExpires: timestamp("reset_password_expires"),
  isActive: boolean("is_active").default(true),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var authSessions = pgTable("auth_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => customUsers.id, { onDelete: "cascade" }),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id"),
  userEmail: varchar("user_email", { length: 255 }),
  type: varchar("type", { length: 50 }).notNull(),
  message: text("message").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertTutorialStepSchema = createInsertSchema(tutorialSteps).omit({
  id: true
});
var insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  completedAt: true
});
var updateUserProgressSchema = createInsertSchema(userProgress).pick({
  completed: true,
  timeSpent: true,
  interactionData: true
});
var insertSubscriberSchema = createInsertSchema(subscribers).omit({
  id: true,
  createdAt: true
});
var insertDonationSchema = createInsertSchema(donations);
var insertFeedbackSchema = createInsertSchema(feedback).omit({
  id: true,
  createdAt: true,
  status: true
});

export {
  users,
  spots,
  challenges,
  checkIns,
  sessions,
  tutorialSteps,
  userProgress,
  subscribers,
  donations,
  customUsers,
  authSessions,
  feedback,
  insertTutorialStepSchema,
  insertUserProgressSchema,
  updateUserProgressSchema,
  insertSubscriberSchema,
  insertDonationSchema,
  insertFeedbackSchema
};
//# sourceMappingURL=chunk-UAWGGFDL.js.map