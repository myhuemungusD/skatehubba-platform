import { Router } from 'express';
import { db } from '../db';
import { spots } from '@skatehubba/db';

export const spotsRouter = Router();

spotsRouter.get('/', async (req, res) => {
  const allSpots = await db.query.spots.findMany();
  res.json(allSpots);
});

spotsRouter.post('/', async (req, res) => {
  const newSpot = await db.insert(spots).values(req.body).returning();
  res.json(newSpot[0]);
});
