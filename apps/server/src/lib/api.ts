import express, { Router } from 'express';
import { questsRouter } from './quests';
import { stickerRouter } from '../routes/sticker';
import { referralsRouter } from '../routes/referrals';
import { heshurRouter } from '../routes/heshur';

export const router: Router = express.Router();

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

// Mount sticker generation route
router.use('/sticker', stickerRouter);

// Mount referrals routes
router.use('/referrals', referralsRouter);

// Mount Heshur AI routes (rate limited)
router.use('/heshur', heshurRouter);
