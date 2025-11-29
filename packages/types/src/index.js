"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionSchema = exports.QuestSchema = exports.DifficultySchema = exports.QuestTypeSchema = exports.ItemSchema = exports.RaritySchema = exports.ItemTypeSchema = exports.CheckInSchema = exports.ChallengeSchema = exports.SpotSchema = exports.TrickSchema = exports.GameSchema = exports.GameStatusSchema = exports.UserSchema = exports.StanceSchema = void 0;
const zod_1 = require("zod");
// --- SKATER PROFILE ---
exports.StanceSchema = zod_1.z.enum(["regular", "goofy"]);
exports.UserSchema = zod_1.z.object({
    uid: zod_1.z.string(),
    username: zod_1.z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/, "No special chars"),
    email: zod_1.z.string().email(),
    photoURL: zod_1.z.string().url().optional(),
    stance: exports.StanceSchema.default("regular"),
    bio: zod_1.z.string().max(140).optional(),
    location: zod_1.z.object({
        latitude: zod_1.z.number(),
        longitude: zod_1.z.number(),
        city: zod_1.z.string().optional(),
    }).optional(),
    stats: zod_1.z.object({
        wins: zod_1.z.number().int().default(0),
        losses: zod_1.z.number().int().default(0),
        rank: zod_1.z.number().int().default(1000), // Elo rating
    }).default({}),
    createdAt: zod_1.z.string().datetime(), // ISO String
    updatedAt: zod_1.z.string().datetime(),
});
// --- GAME ---
exports.GameStatusSchema = zod_1.z.enum(["pending", "active", "completed", "forfeit"]);
exports.GameSchema = zod_1.z.object({
    id: zod_1.z.string(),
    hostId: zod_1.z.string(),
    opponentId: zod_1.z.string().optional(),
    status: exports.GameStatusSchema.default("pending"),
    letters: zod_1.z.object({
        host: zod_1.z.string().default(""),
        opponent: zod_1.z.string().default(""),
    }).default({ host: "", opponent: "" }),
    currentTurn: zod_1.z.string(), // uid of current player
    winnerId: zod_1.z.string().optional(),
    createdAt: zod_1.z.string().datetime(),
    updatedAt: zod_1.z.string().datetime(),
});
// --- TRICK ---
exports.TrickSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    difficulty: zod_1.z.enum(["easy", "medium", "hard", "pro"]),
    points: zod_1.z.number().int().positive(),
    description: zod_1.z.string().optional(),
});
// --- SPOTS & CHALLENGES (Restored) ---
exports.SpotSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    geo: zod_1.z.object({
        lat: zod_1.z.number(),
        lng: zod_1.z.number(),
    }),
    createdAt: zod_1.z.string().datetime(),
    createdBy: zod_1.z.string(),
});
exports.ChallengeSchema = zod_1.z.object({
    id: zod_1.z.string(),
    createdBy: zod_1.z.string(),
    status: zod_1.z.enum(["pending", "accepted", "completed", "expired"]),
    rules: zod_1.z.object({
        oneTake: zod_1.z.boolean(),
        durationSec: zod_1.z.number(),
    }),
    clipA: zod_1.z.string(),
    clipB: zod_1.z.string().optional(),
    ts: zod_1.z.string().datetime(),
});
exports.CheckInSchema = zod_1.z.object({
    id: zod_1.z.string(),
    uid: zod_1.z.string(),
    spotId: zod_1.z.string(),
    ts: zod_1.z.string().datetime(),
    proofVideoUrl: zod_1.z.string().nullable(),
});
// ── RPG / INVENTORY SYSTEM ──────────────────────────────────────────────────
exports.ItemTypeSchema = zod_1.z.enum(["DECK", "TRUCKS", "WHEELS", "CLOTHING", "STICKER"]);
exports.RaritySchema = zod_1.z.enum(["COMMON", "RARE", "EPIC", "LEGENDARY"]);
exports.ItemSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    type: exports.ItemTypeSchema,
    rarity: exports.RaritySchema,
    image_url: zod_1.z.string().url(),
    stats: zod_1.z.object({
        pop: zod_1.z.number().optional(),
        durability: zod_1.z.number().optional(),
        style: zod_1.z.number().optional(),
    }).optional(),
});
// ── QUEST / SESSION SYSTEM ──────────────────────────────────────────────────
exports.QuestTypeSchema = zod_1.z.enum(["SPOT_CHECK", "TRICK_BATTLE", "FILM_CLIP"]);
exports.DifficultySchema = zod_1.z.enum(["EASY", "MEDIUM", "HARD", "GNARLY"]);
exports.QuestSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    location: zod_1.z.object({
        name: zod_1.z.string(),
        lat: zod_1.z.number(),
        lng: zod_1.z.number(),
    }),
    type: exports.QuestTypeSchema,
    difficulty: exports.DifficultySchema,
    reward: zod_1.z.object({
        gold: zod_1.z.number().int().positive(),
        xp: zod_1.z.number().int().positive(),
        item_id: zod_1.z.string().uuid().optional(),
    }),
    expires_at: zod_1.z.number(), // Unix timestamp
});
// ── ACTIVE SESSION ──────────────────────────────────────────────────────────
exports.SessionSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    host_id: zod_1.z.string(),
    quest_id: zod_1.z.string().uuid(),
    status: zod_1.z.enum(["ACTIVE", "COMPLETED", "FAILED"]),
    start_time: zod_1.z.number(), // Unix timestamp
    clips: zod_1.z.array(zod_1.z.string().url()).default([]), // URLs to uploaded footy
});
//# sourceMappingURL=index.js.map