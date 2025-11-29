import { Router, Request, Response } from 'express';
import { randomUUID } from 'crypto';
import type { Quest, Session } from '@skatehubba/types';
import { db, admin } from './firebase';
import { requireAuth, optionalAuth, AuthenticatedRequest } from '../middleware/auth';
import {
  validateRequest,
  NearbyQuestsSchema,
  CreateSessionSchema,
  ClipUrlSchema,
  SessionStatusSchema,
} from './validation';

export const questsRouter: Router = Router();

const questsCollection = db.collection('quests');
const sessionsCollection = db.collection('sessions');

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const seedQuests = async (): Promise<void> => {
  try {
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

    const quest1Doc = await questsCollection.doc(quest1.id).get();
    if (!quest1Doc.exists) {
      await questsCollection.doc(quest1.id).set(quest1);
      console.log('Seeded quest:', quest1.title);
    }

    const quest2Doc = await questsCollection.doc(quest2.id).get();
    if (!quest2Doc.exists) {
      await questsCollection.doc(quest2.id).set(quest2);
      console.log('Seeded quest:', quest2.title);
    }
  } catch (error: any) {
    console.warn('⚠️  Unable to seed quests - Firestore database may not be initialized yet.');
    console.warn('   Create a Firestore database in Firebase Console to enable quest seeding.');
    console.warn('   Error details:', error.message || error);
  }
};

let seedPromise: Promise<void> | null = null;

export const initializeQuests = async (): Promise<void> => {
  if (!seedPromise) {
    seedPromise = seedQuests();
  }
  await seedPromise;
};

// GET /quests
questsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const snapshot = await questsCollection.get();
    const questList: Quest[] = snapshot.docs.map((doc) => doc.data() as Quest);
    res.json({ quests: questList });
  } catch (err) {
    console.error('Error fetching quests:', err);
    res.status(500).json({ error: 'Failed to fetch quests' });
  }
});

// GET /quests/:id
questsRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const doc = await questsCollection.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Quest not found' });
    }
    const quest = doc.data() as Quest;
    res.json({ quest });
  } catch (err) {
    console.error('Error fetching quest:', err);
    res.status(500).json({ error: 'Failed to fetch quest' });
  }
});

// POST /quests/nearby - optional auth for future personalization
questsRouter.post(
  '/nearby',
  optionalAuth,
  validateRequest(NearbyQuestsSchema),
  async (req: Request, res: Response) => {
    try {
      const { lat, lng, radiusKm } = req.body;

      const snapshot = await questsCollection.get();
      const allQuests: Quest[] = snapshot.docs.map((doc) => doc.data() as Quest);

      const nearbyQuests = allQuests.filter((q) => {
        const distance = calculateDistance(lat, lng, q.location.lat, q.location.lng);
        return distance <= radiusKm;
      });

      res.json({ quests: nearbyQuests });
    } catch (err) {
      console.error('Error fetching nearby quests:', err);
      res.status(500).json({ error: 'Failed to fetch nearby quests' });
    }
  }
);

// POST /sessions - REQUIRES AUTH
questsRouter.post(
  '/sessions',
  requireAuth,
  validateRequest(CreateSessionSchema),
  async (req: Request, res: Response) => {
    try {
      const authReq = req as AuthenticatedRequest;
      const { questId } = req.body;

      // Verify quest exists
      const questDoc = await questsCollection.doc(questId).get();
      if (!questDoc.exists) {
        console.error(`Quest not found: ${questId}, user: ${authReq.user.uid}`);
        return res.status(404).json({ error: 'Quest not found' });
      }

      const quest = questDoc.data() as Quest;

      // Check if quest is expired
      const currentTime = Math.floor(Date.now() / 1000);
      if (quest.expires_at <= currentTime) {
        console.error(
          `Quest expired: ${questId}, expired_at: ${quest.expires_at}, current: ${currentTime}, user: ${authReq.user.uid}`
        );
        return res.status(400).json({ error: 'Quest has expired' });
      }

      // Check for existing active session for this user and quest
      const existingSessionsSnapshot = await sessionsCollection
        .where('host_id', '==', authReq.user.uid)
        .where('quest_id', '==', questId)
        .where('status', '==', 'ACTIVE')
        .get();

      if (!existingSessionsSnapshot.empty) {
        const existingSession = existingSessionsSnapshot.docs[0].data() as Session;
        console.error(
          `Active session already exists: ${existingSession.id}, quest: ${questId}, user: ${authReq.user.uid}`
        );
        return res.status(409).json({
          error: 'Active session already exists for this quest',
          existingSession: existingSession,
        });
      }

      // Create new session
      const sessionId = randomUUID();
      const session: Session = {
        id: sessionId,
        host_id: authReq.user.uid,
        quest_id: questId,
        status: 'ACTIVE',
        start_time: currentTime,
        clips: [],
      };

      await sessionsCollection.doc(sessionId).set(session);
      console.log(`Session created: ${sessionId}, quest: ${questId}, user: ${authReq.user.uid}`);
      res.json({ session });
    } catch (err) {
      console.error('Error creating session:', err);
      res.status(500).json({ error: 'Failed to create session' });
    }
  }
);

// POST /sessions/:id/clips - REQUIRES AUTH
questsRouter.post(
  '/sessions/:id/clips',
  requireAuth,
  validateRequest(ClipUrlSchema),
  async (req: Request, res: Response) => {
    try {
      const authReq = req as AuthenticatedRequest;
      const { clipUrl } = req.body;
      const sessionId = req.params.id;

      const sessionDoc = await sessionsCollection.doc(sessionId).get();

      if (!sessionDoc.exists) {
        console.error(`Session not found: ${sessionId}, user: ${authReq.user.uid}`);
        return res.status(404).json({ error: 'Session not found' });
      }

      const session = sessionDoc.data() as Session;

      if (session.host_id !== authReq.user.uid) {
        console.error(
          `Unauthorized clip addition: session ${sessionId}, owner: ${session.host_id}, attempted by: ${authReq.user.uid}`
        );
        return res.status(403).json({ error: 'Unauthorized: You can only add clips to your own sessions' });
      }

      // Use arrayUnion to avoid race conditions with concurrent updates
      await sessionsCollection.doc(sessionId).update({
        clips: admin.firestore.FieldValue.arrayUnion(clipUrl),
      });

      // Fetch updated session
      const updatedDoc = await sessionsCollection.doc(sessionId).get();
      const updatedSession = updatedDoc.data() as Session;

      console.log(`Clip added to session: ${sessionId}, user: ${authReq.user.uid}, clipUrl: ${clipUrl}`);
      res.json({ session: updatedSession });
    } catch (err) {
      console.error(`Error updating session clips: session ${req.params.id}, user: ${(req as AuthenticatedRequest).user?.uid}`, err);
      res.status(500).json({ error: 'Failed to update session' });
    }
  }
);

// POST /sessions/:id/complete - REQUIRES AUTH
questsRouter.post(
  '/sessions/:id/complete',
  requireAuth,
  validateRequest(SessionStatusSchema),
  async (req: Request, res: Response) => {
    try {
      const authReq = req as AuthenticatedRequest;
      const { status } = req.body;
      const sessionId = req.params.id;
      const sessionRef = sessionsCollection.doc(sessionId);

      // Use transaction to ensure atomic status update
      const updatedSession = await db.runTransaction(async (transaction) => {
        const sessionDoc = await transaction.get(sessionRef);

        if (!sessionDoc.exists) {
          throw new Error('SESSION_NOT_FOUND');
        }

        const session = sessionDoc.data() as Session;

        if (session.host_id !== authReq.user.uid) {
          throw new Error('UNAUTHORIZED');
        }

        // Check if session is already completed or failed
        if (session.status === 'COMPLETED' || session.status === 'FAILED') {
          throw new Error('SESSION_ALREADY_FINALIZED');
        }

        // Update status atomically
        transaction.update(sessionRef, { status });

        return { ...session, status };
      });

      console.log(`Session completed: ${sessionId}, user: ${authReq.user.uid}, status: ${status}`);
      res.json({ session: updatedSession });
    } catch (err) {
      const sessionId = req.params.id;
      const uid = (req as AuthenticatedRequest).user?.uid;

      if (err instanceof Error) {
        if (err.message === 'SESSION_NOT_FOUND') {
          console.error(`Session not found: ${sessionId}, user: ${uid}`);
          return res.status(404).json({ error: 'Session not found' });
        }
        if (err.message === 'UNAUTHORIZED') {
          console.error(`Unauthorized session completion: ${sessionId}, user: ${uid}`);
          return res.status(403).json({ error: 'Unauthorized: You can only complete your own sessions' });
        }
        if (err.message === 'SESSION_ALREADY_FINALIZED') {
          console.error(`Session already finalized: ${sessionId}, user: ${uid}`);
          return res.status(400).json({ error: 'Session has already been completed or failed' });
        }
      }

      console.error(`Error completing session: ${sessionId}, user: ${uid}`, err);
      res.status(500).json({ error: 'Failed to complete session' });
    }
  }
);
