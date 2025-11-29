import { z } from "zod";
export declare const StanceSchema: z.ZodEnum<["regular", "goofy"]>;
export type Stance = z.infer<typeof StanceSchema>;
export declare const UserSchema: z.ZodObject<{
    uid: z.ZodString;
    username: z.ZodString;
    email: z.ZodString;
    photoURL: z.ZodOptional<z.ZodString>;
    stance: z.ZodDefault<z.ZodEnum<["regular", "goofy"]>>;
    bio: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
        city: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        latitude: number;
        longitude: number;
        city?: string | undefined;
    }, {
        latitude: number;
        longitude: number;
        city?: string | undefined;
    }>>;
    stats: z.ZodDefault<z.ZodObject<{
        wins: z.ZodDefault<z.ZodNumber>;
        losses: z.ZodDefault<z.ZodNumber>;
        rank: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        wins: number;
        losses: number;
        rank: number;
    }, {
        wins?: number | undefined;
        losses?: number | undefined;
        rank?: number | undefined;
    }>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    uid: string;
    username: string;
    email: string;
    stance: "regular" | "goofy";
    stats: {
        wins: number;
        losses: number;
        rank: number;
    };
    createdAt: string;
    updatedAt: string;
    photoURL?: string | undefined;
    bio?: string | undefined;
    location?: {
        latitude: number;
        longitude: number;
        city?: string | undefined;
    } | undefined;
}, {
    uid: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    photoURL?: string | undefined;
    stance?: "regular" | "goofy" | undefined;
    bio?: string | undefined;
    location?: {
        latitude: number;
        longitude: number;
        city?: string | undefined;
    } | undefined;
    stats?: {
        wins?: number | undefined;
        losses?: number | undefined;
        rank?: number | undefined;
    } | undefined;
}>;
export type User = z.infer<typeof UserSchema>;
export declare const GameStatusSchema: z.ZodEnum<["pending", "active", "completed", "forfeit"]>;
export type GameStatus = z.infer<typeof GameStatusSchema>;
export declare const GameSchema: z.ZodObject<{
    id: z.ZodString;
    hostId: z.ZodString;
    opponentId: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["pending", "active", "completed", "forfeit"]>>;
    letters: z.ZodDefault<z.ZodObject<{
        host: z.ZodDefault<z.ZodString>;
        opponent: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        host: string;
        opponent: string;
    }, {
        host?: string | undefined;
        opponent?: string | undefined;
    }>>;
    currentTurn: z.ZodString;
    winnerId: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "pending" | "active" | "completed" | "forfeit";
    createdAt: string;
    updatedAt: string;
    id: string;
    hostId: string;
    letters: {
        host: string;
        opponent: string;
    };
    currentTurn: string;
    opponentId?: string | undefined;
    winnerId?: string | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    id: string;
    hostId: string;
    currentTurn: string;
    status?: "pending" | "active" | "completed" | "forfeit" | undefined;
    opponentId?: string | undefined;
    letters?: {
        host?: string | undefined;
        opponent?: string | undefined;
    } | undefined;
    winnerId?: string | undefined;
}>;
export type Game = z.infer<typeof GameSchema>;
export declare const TrickSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    difficulty: z.ZodEnum<["easy", "medium", "hard", "pro"]>;
    points: z.ZodNumber;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    difficulty: "easy" | "medium" | "hard" | "pro";
    points: number;
    description?: string | undefined;
}, {
    id: string;
    name: string;
    difficulty: "easy" | "medium" | "hard" | "pro";
    points: number;
    description?: string | undefined;
}>;
export type Trick = z.infer<typeof TrickSchema>;
export declare const SpotSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    geo: z.ZodObject<{
        lat: z.ZodNumber;
        lng: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        lat: number;
        lng: number;
    }, {
        lat: number;
        lng: number;
    }>;
    createdAt: z.ZodString;
    createdBy: z.ZodString;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    id: string;
    name: string;
    geo: {
        lat: number;
        lng: number;
    };
    createdBy: string;
}, {
    createdAt: string;
    id: string;
    name: string;
    geo: {
        lat: number;
        lng: number;
    };
    createdBy: string;
}>;
export type Spot = z.infer<typeof SpotSchema>;
export declare const ChallengeSchema: z.ZodObject<{
    id: z.ZodString;
    createdBy: z.ZodString;
    status: z.ZodEnum<["pending", "accepted", "completed", "expired"]>;
    rules: z.ZodObject<{
        oneTake: z.ZodBoolean;
        durationSec: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        oneTake: boolean;
        durationSec: number;
    }, {
        oneTake: boolean;
        durationSec: number;
    }>;
    clipA: z.ZodString;
    clipB: z.ZodOptional<z.ZodString>;
    ts: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "pending" | "completed" | "accepted" | "expired";
    id: string;
    createdBy: string;
    rules: {
        oneTake: boolean;
        durationSec: number;
    };
    clipA: string;
    ts: string;
    clipB?: string | undefined;
}, {
    status: "pending" | "completed" | "accepted" | "expired";
    id: string;
    createdBy: string;
    rules: {
        oneTake: boolean;
        durationSec: number;
    };
    clipA: string;
    ts: string;
    clipB?: string | undefined;
}>;
export type Challenge = z.infer<typeof ChallengeSchema>;
export declare const CheckInSchema: z.ZodObject<{
    id: z.ZodString;
    uid: z.ZodString;
    spotId: z.ZodString;
    ts: z.ZodString;
    proofVideoUrl: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    uid: string;
    id: string;
    ts: string;
    spotId: string;
    proofVideoUrl: string | null;
}, {
    uid: string;
    id: string;
    ts: string;
    spotId: string;
    proofVideoUrl: string | null;
}>;
export type CheckIn = z.infer<typeof CheckInSchema>;
export type SkateGame = Game;
export declare const ItemTypeSchema: z.ZodEnum<["DECK", "TRUCKS", "WHEELS", "CLOTHING", "STICKER"]>;
export type ItemType = z.infer<typeof ItemTypeSchema>;
export declare const RaritySchema: z.ZodEnum<["COMMON", "RARE", "EPIC", "LEGENDARY"]>;
export type Rarity = z.infer<typeof RaritySchema>;
export declare const ItemSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    type: z.ZodEnum<["DECK", "TRUCKS", "WHEELS", "CLOTHING", "STICKER"]>;
    rarity: z.ZodEnum<["COMMON", "RARE", "EPIC", "LEGENDARY"]>;
    image_url: z.ZodString;
    stats: z.ZodOptional<z.ZodObject<{
        pop: z.ZodOptional<z.ZodNumber>;
        durability: z.ZodOptional<z.ZodNumber>;
        style: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        pop?: number | undefined;
        durability?: number | undefined;
        style?: number | undefined;
    }, {
        pop?: number | undefined;
        durability?: number | undefined;
        style?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    type: "DECK" | "TRUCKS" | "WHEELS" | "CLOTHING" | "STICKER";
    id: string;
    name: string;
    rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
    image_url: string;
    stats?: {
        pop?: number | undefined;
        durability?: number | undefined;
        style?: number | undefined;
    } | undefined;
}, {
    type: "DECK" | "TRUCKS" | "WHEELS" | "CLOTHING" | "STICKER";
    id: string;
    name: string;
    rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
    image_url: string;
    stats?: {
        pop?: number | undefined;
        durability?: number | undefined;
        style?: number | undefined;
    } | undefined;
}>;
export type Item = z.infer<typeof ItemSchema>;
export declare const QuestTypeSchema: z.ZodEnum<["SPOT_CHECK", "TRICK_BATTLE", "FILM_CLIP"]>;
export type QuestType = z.infer<typeof QuestTypeSchema>;
export declare const DifficultySchema: z.ZodEnum<["EASY", "MEDIUM", "HARD", "GNARLY"]>;
export type Difficulty = z.infer<typeof DifficultySchema>;
export declare const QuestSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    location: z.ZodObject<{
        name: z.ZodString;
        lat: z.ZodNumber;
        lng: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        lat: number;
        lng: number;
    }, {
        name: string;
        lat: number;
        lng: number;
    }>;
    type: z.ZodEnum<["SPOT_CHECK", "TRICK_BATTLE", "FILM_CLIP"]>;
    difficulty: z.ZodEnum<["EASY", "MEDIUM", "HARD", "GNARLY"]>;
    reward: z.ZodObject<{
        gold: z.ZodNumber;
        xp: z.ZodNumber;
        item_id: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        gold: number;
        xp: number;
        item_id?: string | undefined;
    }, {
        gold: number;
        xp: number;
        item_id?: string | undefined;
    }>;
    expires_at: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "SPOT_CHECK" | "TRICK_BATTLE" | "FILM_CLIP";
    location: {
        name: string;
        lat: number;
        lng: number;
    };
    id: string;
    difficulty: "EASY" | "MEDIUM" | "HARD" | "GNARLY";
    description: string;
    title: string;
    reward: {
        gold: number;
        xp: number;
        item_id?: string | undefined;
    };
    expires_at: number;
}, {
    type: "SPOT_CHECK" | "TRICK_BATTLE" | "FILM_CLIP";
    location: {
        name: string;
        lat: number;
        lng: number;
    };
    id: string;
    difficulty: "EASY" | "MEDIUM" | "HARD" | "GNARLY";
    description: string;
    title: string;
    reward: {
        gold: number;
        xp: number;
        item_id?: string | undefined;
    };
    expires_at: number;
}>;
export type Quest = z.infer<typeof QuestSchema>;
export declare const SessionSchema: z.ZodObject<{
    id: z.ZodString;
    host_id: z.ZodString;
    quest_id: z.ZodString;
    status: z.ZodEnum<["ACTIVE", "COMPLETED", "FAILED"]>;
    start_time: z.ZodNumber;
    clips: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    status: "ACTIVE" | "COMPLETED" | "FAILED";
    id: string;
    host_id: string;
    quest_id: string;
    start_time: number;
    clips: string[];
}, {
    status: "ACTIVE" | "COMPLETED" | "FAILED";
    id: string;
    host_id: string;
    quest_id: string;
    start_time: number;
    clips?: string[] | undefined;
}>;
export type Session = z.infer<typeof SessionSchema>;
