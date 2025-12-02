import { Router } from 'express';
import { db } from '../db';
import { profiles, users } from '@skatehubba/db';
import { desc, eq } from 'drizzle-orm';

export const leaderboardRouter = Router();

leaderboardRouter.get('/', async (req, res) => {
  const leaderboard = await db
    .select({
      handle: users.handle,
      xp: profiles.xp,
      level: profiles.level,
    })
    .from(profiles)
    .leftJoin(users, eq(profiles.userId, users.id))
    .orderBy(desc(profiles.xp))
    .limit(50);
    
  res.json(leaderboard);
});
