
import { pgTable, text, timestamp, uuid, integer, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  firebaseUid: text('firebase_uid').notNull().unique(),
  username: text('username').notNull().unique(),
  email: text('email').notNull(),
  hubbaBucks: integer('hubba_bucks').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export const spots = pgTable('spots', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  latitude: text('latitude').notNull(),
  longitude: text('longitude').notNull(),
  difficulty: text('difficulty'),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export const challenges = pgTable('challenges', {
  id: uuid('id').primaryKey().defaultRandom(),
  createdBy: uuid('created_by').references(() => users.id),
  opponentId: uuid('opponent_id').references(() => users.id),
  status: text('status').notNull(), // pending, active, completed
  clipAUrl: text('clip_a_url'),
  clipBUrl: text('clip_b_url'),
  createdAt: timestamp('created_at').defaultNow(),
});
