import { Router } from 'express';
import { db } from '../db';
import { skateChallenges } from '@skatehubba/db';
import { eq } from 'drizzle-orm';

export const challengesRouter = Router();

challengesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const challenge = await db.query.skateChallenges.findFirst({
    where: eq(skateChallenges.id, parseInt(id)),
  });
  res.json(challenge);
});

challengesRouter.post('/', async (req, res) => {
  const newChallenge = await db.insert(skateChallenges).values(req.body).returning();
  res.json(newChallenge[0]);
});
