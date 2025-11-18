import { pgTable, text, timestamp, jsonb, boolean, integer, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  displayName: text('display_name'),
  photoURL: text('photo_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
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
