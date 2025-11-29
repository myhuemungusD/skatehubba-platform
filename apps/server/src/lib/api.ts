import express from 'express';
import { questsRouter } from './quests';

export const router = express.Router();

router.get('/health', async (req, res) => {
  try {
    res.json({ status: 'healthy', service: 'skatehubba-api' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'DB unreachable' });
  }
});

router.get('/', (req, res) => {
  res.json({ message: 'SkateHubba API', version: '1.0.0' });
});

// Mount quest/session routes
router.use('/quests', questsRouter);
