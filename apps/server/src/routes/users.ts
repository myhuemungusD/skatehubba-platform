import { Router } from 'express';
import { db } from '../db';
import { users } from '@skatehubba/db';
import { eq } from 'drizzle-orm';

export const usersRouter = Router();

usersRouter.get('/:uid', async (req, res) => {
  const { uid } = req.params;
  const user = await db.query.users.findFirst({
    where: eq(users.uid, uid),
  });
  res.json(user);
});

usersRouter.post('/', async (req, res) => {
  const newUser = await db.insert(users).values(req.body).returning();
  res.json(newUser[0]);
});
