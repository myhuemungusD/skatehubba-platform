import { Router } from 'express';
import type { Quest, Session } from '@skatehubba/types';

export const questsRouter = Router();

// In-memory stores (replace with Firestore in production)
const quests: Map<string, Quest> = new Map();
const sessions: Map<string, Session> = new Map();

// Seed quests
const seedQuests = () => {
  const quest1: Quest = {
    id: '550e8400-e29b-41d4-a716-446655440001',
    title: 'Manual at Market',
    description: 'Land a manual down Market Street',
    location: { name: 'Market & 3rd', lat: 37.7896, lng: -122.3972 },
    type: 'FILM_CLIP',
    difficulty: 'MEDIUM',
    reward: { gold: 100, xp: 250 },
    expires_at: Math.floor(Date.now() / 1000) + 86400,
  };

  const quest2: Quest = {
    id: '550e8400-e29b-41d4-a716-446655440002',
    title: 'Kickflip the Embarcadero',
    description: 'Land a kickflip at the Embarcadero steps',
    location: { name: 'Embarcadero', lat: 37.791, lng: -122.3948 },
    type: 'TRICK_BATTLE',
    difficulty: 'HARD',
    reward: { gold: 250, xp: 500 },
    expires_at: Math.floor(Date.now() / 1000) + 86400,
  };

  quests.set(quest1.id, quest1);
  quests.set(quest2.id, quest2);
};

seedQuests();

// GET /quests
questsRouter.get('/', (req, res) => {
  try {
    const questList = Array.from(quests.values());
    res.json({ quests: questList });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quests' });
  }
});

// GET /quests/:id
questsRouter.get('/:id', (req, res) => {
  try {
    const quest = quests.get(req.params.id);
    if (!quest) {
      return res.status(404).json({ error: 'Quest not found' });
    }
    res.json({ quest });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quest' });
  }
});

// POST /quests/nearby
questsRouter.post('/nearby', (req, res) => {
  try {
    const { lat, lng, radiusKm = 5 } = req.body;

    const nearbyQuests = Array.from(quests.values()).filter((q) => {
      const distance = Math.sqrt(
        Math.pow(q.location.lat - lat, 2) + Math.pow(q.location.lng - lng, 2),
      );
      return distance <= radiusKm * 0.01; // Rough approximation
    });

    res.json({ quests: nearbyQuests });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch nearby quests' });
  }
});

// POST /sessions
questsRouter.post('/sessions', (req, res) => {
  try {
    const { userId, questId } = req.body;

    if (!quests.has(questId)) {
      return res.status(404).json({ error: 'Quest not found' });
    }

    const sessionId = `session-${Date.now()}`;
    const session: Session = {
      id: sessionId,
      host_id: userId,
      quest_id: questId,
      status: 'ACTIVE',
      start_time: Math.floor(Date.now() / 1000),
      clips: [],
    };

    sessions.set(sessionId, session);
    res.json({ session });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create session' });
  }
});

// POST /sessions/:id/clips
questsRouter.post('/sessions/:id/clips', (req, res) => {
  try {
    const { clipUrl } = req.body;
    const session = sessions.get(req.params.id);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    session.clips.push(clipUrl);
    sessions.set(req.params.id, session);

    res.json({ session });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update session' });
  }
});

// POST /sessions/:id/complete
questsRouter.post('/sessions/:id/complete', (req, res) => {
  try {
    const { status } = req.body;
    const session = sessions.get(req.params.id);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    session.status = status || 'COMPLETED';
    sessions.set(req.params.id, session);

    res.json({ session });
  } catch (err) {
    res.status(500).json({ error: 'Failed to complete session' });
  }
});
