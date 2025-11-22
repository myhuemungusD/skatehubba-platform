import { pgTable, text, serial, integer, boolean, timestamp, json, jsonb, varchar, uuid, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { sql } from "drizzle-orm";

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  displayName: text('display_name'),
  photoURL: text('photo_url'),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  onboardingCompleted: boolean("onboarding_completed").default(false),
  currentTutorialStep: integer("current_tutorial_step").default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const spots = pgTable('spots', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  geo: jsonb('geo').notNull(),
  createdBy: uuid('created_by').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const challenges = pgTable('challenges', {
  id: uuid('id').primaryKey().defaultRandom(),
  createdBy: uuid('created_by').notNull().references(() => users.id),
  status: text('status').notNull(),
  rules: jsonb('rules').notNull(),
  clipA: text('clip_a').notNull(),
  clipB: text('clip_b'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const checkIns = pgTable('check_ins', {
  id: uuid('id').primaryKey().defaultRandom(),
  uid: uuid('uid').notNull().references(() => users.id),
  spotId: uuid('spot_id').notNull().references(() => spots.id),
  proofVideoUrl: text('proof_video_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: json("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => ({
    expireIdx: index("IDX_session_expire").on(table.expire),
  }),
);

export const tutorialSteps = pgTable("tutorial_steps", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  content: json("content").$type<{
    videoUrl?: string;
    interactiveElements?: Array<{
      type: 'tap' | 'swipe' | 'drag';
      target: string;
      instruction: string;
    }>;
    challengeData?: {
      action: string;
      expectedResult: string;
    };
  }>(),
  order: integer("order").notNull(),
  isActive: boolean("is_active").default(true),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  stepId: integer("step_id").notNull(),
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
  timeSpent: integer("time_spent"),
  interactionData: json("interaction_data").$type<{
    taps?: number;
    swipes?: number;
    mistakes?: number;
    helpUsed?: boolean;
  }>(),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  firstName: text("first_name"),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  amount: integer("amount").notNull(),
  paymentIntentId: varchar("payment_intent_id", { length: 255 }).notNull().unique(),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const customUsers = pgTable("custom_users", {
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
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const authSessions = pgTable("auth_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => customUsers.id, { onDelete: 'cascade' }),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id"),
  userEmail: varchar("user_email", { length: 255 }),
  type: varchar("type", { length: 50 }).notNull(),
  message: text("message").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const skateGames = pgTable('skate_games', {
  id: uuid('id').primaryKey().defaultRandom(),
  challengerId: uuid('challenger_id').notNull().references(() => users.id),
  opponentId: uuid('opponent_id').references(() => users.id),
  status: text('status').notNull().default('pending'), // pending, active, completed, forfeit
  letters: jsonb('letters').notNull().$type<{
    challenger: string;
    opponent: string;
  }>().default({ challenger: '', opponent: '' }),
  currentTurnId: uuid('current_turn_id').notNull().references(() => users.id),
  currentTurnType: text('current_turn_type').notNull(), // setTrick, attemptMatch, judgeAttempt
  currentTrickVideoUrl: text('current_trick_video_url'),
  pendingAttemptVideoUrl: text('pending_attempt_video_url'),
  rounds: jsonb('rounds').notNull().$type<Array<{
    setBy: string;
    trickVideoUrl: string;
    attempts: Array<{
      uid: string;
      videoUrl: string;
      result: 'landed' | 'bailed' | 'pending';
      judgedAt?: string;
    }>;
  }>>().default([]),
  winnerId: uuid('winner_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const insertTutorialStepSchema = createInsertSchema(tutorialSteps).omit({
  id: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  completedAt: true,
});

export const updateUserProgressSchema = createInsertSchema(userProgress).pick({
  completed: true,
  timeSpent: true,
  interactionData: true,
});

export const insertSubscriberSchema = createInsertSchema(subscribers).omit({
  id: true,
  createdAt: true,
});

export const insertDonationSchema = createInsertSchema(donations);

export const insertFeedbackSchema = createInsertSchema(feedback).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertSkateGameSchema = createInsertSchema(skateGames).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type User = typeof users.$inferSelect;
export type UpsertUser = typeof users.$inferInsert;
export type Spot = typeof spots.$inferSelect;
export type InsertSpot = typeof spots.$inferInsert;
export type Challenge = typeof challenges.$inferSelect;
export type InsertChallenge = typeof challenges.$inferInsert;
export type CheckIn = typeof checkIns.$inferSelect;
export type InsertCheckIn = typeof checkIns.$inferInsert;
export type TutorialStep = typeof tutorialSteps.$inferSelect;
export type InsertTutorialStep = typeof insertTutorialStepSchema._type;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = typeof insertUserProgressSchema._type;
export type UpdateUserProgress = typeof updateUserProgressSchema._type;
export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = typeof insertSubscriberSchema._type;
export type Donation = typeof donations.$inferSelect;
export type InsertDonation = typeof insertDonationSchema._type;
export type CustomUser = typeof customUsers.$inferSelect;
export type InsertCustomUser = typeof customUsers.$inferInsert;
export type AuthSession = typeof authSessions.$inferSelect;
export type InsertAuthSession = typeof authSessions.$inferInsert;
export type Feedback = typeof feedback.$inferSelect;
export type InsertFeedback = typeof insertFeedbackSchema._type;
export type SkateGame = typeof skateGames.$inferSelect;
export type InsertSkateGame = typeof insertSkateGameSchema._type;
