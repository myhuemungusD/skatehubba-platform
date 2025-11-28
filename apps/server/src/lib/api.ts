import express from 'express';

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
