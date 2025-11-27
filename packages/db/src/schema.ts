import { relations } from "drizzle-orm";
import {
  boolean,
  geometry,
  index,
  integer,
  json,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const challengeStatusEnum = pgEnum("challenge_status", [
  "pending",
  "active",
  "completed",
  "disputed",
]);
export const feedbackStatusEnum = pgEnum("feedback_status", [
  "new",
  "in-progress",
  "resolved",
  "closed",
]);
export const skateGameStatusEnum = pgEnum("skate_game_status", [
  "pending",
  "in-progress",
  "completed",
  "cancelled",
]);
export const spotTypeEnum = pgEnum("spot_type", [
  "street",
  "park",
  "diy",
  "gap",
]);

export const users = pgTable(
  "users",
  {
    // 1. PRIMARY KEY: Use the Firebase UID (varchar) as the primary key.
    // This is the canonical ID that Firebase issues.
    id: varchar("id", { length: 128 }).primaryKey(),

    // 2. Auth Details (Maintained by Firebase, but stored for server checks)
    email: text("email").notNull().unique(),
    username: text("username").unique(),

    // Basic Profile Fields
    displayName: text("display_name"),
    photoURL: text("photo_url"),
    firstName: varchar("first_name", { length: 256 }),
    lastName: varchar("last_name", { length: 256 }),
    profileImageUrl: varchar("profile_image_url", { length: 1024 }),
    city: text("city"),
    stance: text("stance", { enum: ["regular", "goofy"] }).default("regular"),
    bio: text("bio"),

    // Onboarding & Stats remain the same
    onboardingCompleted: boolean("onboarding_completed").default(false),
    currentTutorialStep: integer("current_tutorial_step").default(0),
    stats: jsonb("stats")
      .$type<{
        skateWins: number;
        skateLosses: number;
      }>()
      .default({ skateWins: 0, skateLosses: 0 }),

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: index("users_email_idx").on(table.email),
  }),
);

export const spots = pgTable(
  "spots",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description"),

    // ⚡️ THE PRO MOVE: PostGIS Geometry Column
    // type: 'point' -> It's a single dot on the map
    // srid: 4326    -> The standard GPS coordinate system (WGS 84)
    location: geometry("location", {
      type: "point",
      mode: "xy",
      srid: 4326,
    }).notNull(),

    // Skater Specific Data
    bustFactor: integer("bust_factor").default(0), // 0 = Chill, 10 = Instant Kickout
    hasLights: boolean("has_lights").default(false), // For night sessions
    spotType: spotTypeEnum("spot_type").notNull(),

    // Rich Media & Metadata
    images: jsonb("images").$type<string[]>().default([]),
    tags: jsonb("tags").$type<string[]>().default([]),

    createdBy: varchar("created_by", { length: 128 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      // 1. Crucial Index for User Lookups
      createdByIdx: index("spots_created_by_idx").on(table.createdBy),

      // 2. Optimization for Range Queries (e.g., finding spots in a square bounding box)
      // 🚀 SPATIAL INDEX: This makes map searches 1000x faster
      spatialIndex: index("spatial_idx").using("gist", table.location),
    };
  },
);

export const spotsRelations = relations(spots, ({ one }) => ({
  author: one(users, {
    fields: [spots.createdBy],
    references: [users.id],
  }),
}));

export const challenges = pgTable(
  "challenges",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdBy: varchar("created_by", { length: 128 })
      .notNull()
      .references(() => users.id),
    status: challengeStatusEnum("status").notNull().default("pending"),
    rules: jsonb("rules").notNull(),
    clipA: text("clip_a").notNull(),
    clipB: text("clip_b"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    createdByIdx: index("challenges_created_by_idx").on(table.createdBy),
  }),
);

export const checkIns = pgTable(
  "check_ins",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    uid: varchar("uid", { length: 128 })
      .notNull()
      .references(() => users.id),
    spotId: uuid("spot_id")
      .notNull()
      .references(() => spots.id),
    proofVideoUrl: text("proof_video_url"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    spotIdIdx: index("checkins_spot_id_idx").on(table.spotId),
  }),
);

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
      type: "tap" | "swipe" | "drag";
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

export const userProgress = pgTable(
  "user_progress",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 128 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
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
  },
  (table) => ({
    userIdIdx: index("user_progress_user_id_idx").on(table.userId),
  }),
);

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
  paymentIntentId: varchar("payment_intent_id", { length: 255 })
    .notNull()
    .unique(),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// customUsers and authSessions tables removed

export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id"),
  userEmail: varchar("user_email", { length: 255 }),
  type: varchar("type", { length: 50 }).notNull(),
  message: text("message").notNull(),
  status: feedbackStatusEnum("status").notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const skateGames = pgTable(
  "skate_games",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    challengerId: varchar("challenger_id", { length: 128 })
      .notNull()
      .references(() => users.id),
    opponentId: varchar("opponent_id", { length: 128 }).references(
      () => users.id,
      { onDelete: "set null" },
    ),
    winnerId: varchar("winner_id", { length: 128 }).references(() => users.id, {
      onDelete: "set null",
    }),
    status: skateGameStatusEnum("status").notNull().default("pending"),
    letters: jsonb("letters")
      .notNull()
      .$type<{
        challenger: string;
        opponent: string;
      }>()
      .default({ challenger: "", opponent: "" }),
    firestoreGameRef: varchar("firestore_game_ref", { length: 255 }),
    finalGameData: jsonb("final_game_data").$type<{
      totalRounds: number;
      trickHistory: Array<string>;
    }>(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      statusIdx: index("skate_games_status_idx").on(table.status),
    };
  },
);

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
// CustomUser and AuthSession types removed
export type Feedback = typeof feedback.$inferSelect;
export type InsertFeedback = typeof insertFeedbackSchema._type;
export type SkateGame = typeof skateGames.$inferSelect;
export type InsertSkateGame = typeof insertSkateGameSchema._type;
