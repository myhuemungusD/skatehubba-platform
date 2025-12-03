import { pgTable, serial, text, timestamp, integer, boolean, jsonb, doublePrecision } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase UID
  handle: text('handle').notNull().unique(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  stance: text('stance').default('regular'),
  level: integer('level').default(1),
  xp: integer('xp').default(0),
  avatar: jsonb('avatar').default({}),
  stats: jsonb('stats').default({}),
});

export const spots = pgTable('spots', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  creatorId: integer('creator_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

export const checkins = pgTable('checkins', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  spotId: integer('spot_id').references(() => spots.id),
  timestamp: timestamp('timestamp').defaultNow(),
});

export const skateChallenges = pgTable('skate_challenges', {
  id: serial('id').primaryKey(),
  creatorId: integer('creator_id').references(() => users.id),
  opponentId: integer('opponent_id').references(() => users.id),
  status: text('status').default('pending'),
  currentTurn: integer('current_turn').references(() => users.id),
  lettersCreator: text('letters_creator').default(''),
  lettersOpponent: text('letters_opponent').default(''),
  createdAt: timestamp('created_at').defaultNow(),
});

export const trickAttempts = pgTable('trick_attempts', {
  id: serial('id').primaryKey(),
  challengeId: integer('challenge_id').references(() => skateChallenges.id),
  userId: integer('user_id').references(() => users.id),
  trickName: text('trick_name'),
  videoUrl: text('video_url'),
  landed: boolean('landed').default(false),
  timestamp: timestamp('timestamp').defaultNow(),
});

export const inventory = pgTable('inventory', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  itemId: text('item_id').notNull(),
  acquiredAt: timestamp('acquired_at').defaultNow(),
});

export const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  type: text('type').notNull(),
  message: text('message').notNull(),
  read: boolean('read').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});
