import express from 'express';
import { db, eq, and, sql } from '../db';
import { skateGames, users } from '@skatehubba/db';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Create a new SKATE game
router.post('/', async (req, res) => {
  try {
    const { trickVideoUrl, opponentHandle } = req.body;
    // In a real app, we'd get the user ID from the auth token
    // For now, we'll assume it's passed in the body or header for testing
    // or use a mock user if not authenticated (but we should be authenticated)
    
    // Mock auth for now - in production use req.user.id
    const challengerId = req.headers['x-user-id'] as string; 
    
    if (!challengerId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    let opponentId = null;
    if (opponentHandle) {
      // Find opponent by handle (assuming handle is stored in users table, maybe displayName or a new field)
      // The schema has displayName, let's use that or email for now
      const [opponent] = await db.select().from(users).where(eq(users.displayName, opponentHandle));
      if (opponent) {
        opponentId = opponent.id;
      }
    }

    const [game] = await db.insert(skateGames).values({
      challengerId,
      opponentId,
      status: 'pending',
      letters: { challenger: '', opponent: '' },
      currentTurnId: challengerId, // Initially challenger's turn to wait for opponent? Or just set state.
      currentTurnType: 'setTrick',
      currentTrickVideoUrl: trickVideoUrl,
      rounds: [{
        setBy: challengerId,
        trickVideoUrl,
        attempts: []
      }],
    }).returning();

    res.status(201).json(game);
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({ error: 'Failed to create game' });
  }
});

// Get game by ID
router.get('/:id', async (req, res) => {
  try {
    const [game] = await db.select().from(skateGames).where(eq(skateGames.id, req.params.id));
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({ error: 'Failed to fetch game' });
  }
});

// Join game
router.post('/:id/join', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] as string;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const [game] = await db.select().from(skateGames).where(eq(skateGames.id, req.params.id));
    if (!game) return res.status(404).json({ error: 'Game not found' });

    if (game.opponentId && game.opponentId !== userId) {
      return res.status(403).json({ error: 'Game is full' });
    }

    // If joining, and trick is already set, it becomes the joiner's turn to match
    const updatedGame = await db.update(skateGames)
      .set({
        opponentId: userId,
        status: 'active',
        currentTurnId: userId,
        currentTurnType: 'attemptMatch'
      })
      .where(eq(skateGames.id, req.params.id))
      .returning();

    res.json(updatedGame[0]);
  } catch (error) {
    console.error('Error joining game:', error);
    res.status(500).json({ error: 'Failed to join game' });
  }
});

// Submit turn (attempt match, judge, etc.)
router.post('/:id/turn', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] as string;
    const { action, videoUrl, judgment } = req.body; // action: 'attempt', 'judge', 'set'
    
    const [game] = await db.select().from(skateGames).where(eq(skateGames.id, req.params.id));
    if (!game) return res.status(404).json({ error: 'Game not found' });

    // Basic state machine logic
    let updates: any = {};
    const rounds = game.rounds as any[];

    if (action === 'attempt') {
      // User is attempting to match the current trick
      updates = {
        pendingAttemptVideoUrl: videoUrl,
        currentTurnType: 'judgeAttempt',
        // Turn passes back to the person who set the trick to judge it
        currentTurnId: game.currentTurnId === game.challengerId ? game.opponentId : game.challengerId
      };
      // Actually, if I am attempting, the other person set it. So turn goes to them to judge.
      // If I am challenger, opponent set it. If I attempt, turn goes to opponent to judge.
      // Wait, if I am challenger, and it's my turn to attempt, then opponent must have set it.
      // So currentTurnId was ME. Now it becomes OPPONENT.
      const otherPlayerId = userId === game.challengerId ? game.opponentId : game.challengerId;
      updates.currentTurnId = otherPlayerId;

    } else if (action === 'judge') {
      // User is judging the attempt
      const isLanded = judgment === 'landed';
      const currentRound = rounds[rounds.length - 1];
      
      // Add attempt to history
      currentRound.attempts.push({
        uid: userId === game.challengerId ? game.opponentId : game.challengerId, // The person who attempted
        videoUrl: game.pendingAttemptVideoUrl,
        result: judgment,
        judgedAt: new Date().toISOString()
      });

      if (isLanded) {
        // Match successful. Control stays with the person who set the trick?
        // No, in SKATE, if you match, the setter sets again?
        // Actually, usually:
        // A sets. B matches. A sets again.
        // A sets. B misses. B gets letter. A sets again.
        // A misses setting. B sets.
        
        // Wait, if I judged "landed", it means they matched.
        // So I (the setter) set again.
        updates = {
          currentTurnType: 'setTrick',
          pendingAttemptVideoUrl: null,
          currentTrickVideoUrl: null, // Clear for new trick
          // currentTurnId stays with ME (the judge/setter)
        };
      } else {
        // Match failed (Bailed).
        // Attempter gets a letter.
        const attempterId = userId === game.challengerId ? game.opponentId : game.challengerId;
        const isAttempterChallenger = attempterId === game.challengerId;
        
        const letters = game.letters as { challenger: string, opponent: string };
        const currentLetters = isAttempterChallenger ? letters.challenger : letters.opponent;
        const nextLetter = "SKATE"[currentLetters.length];
        
        const newLetters = {
          ...letters,
          [isAttempterChallenger ? 'challenger' : 'opponent']: currentLetters + nextLetter
        };

        updates = {
          letters: newLetters,
          currentTurnType: 'setTrick',
          pendingAttemptVideoUrl: null,
          currentTrickVideoUrl: null,
          // Setter sets again? Yes, usually.
        };

        // Check Game Over
        if ((currentLetters + nextLetter).length >= 5) {
          updates.status = 'completed';
          updates.winnerId = userId; // The judge (setter) wins
          
          // Update stats
          // Winner gets a win
          await db.execute(sql`
            UPDATE users 
            SET stats = jsonb_set(
              COALESCE(stats, '{"skateWins": 0, "skateLosses": 0}'::jsonb), 
              '{skateWins}', 
              (COALESCE(stats->>'skateWins', '0')::int + 1)::text::jsonb
            )
            WHERE id = ${userId}
          `);

          // Loser gets a loss
          await db.execute(sql`
            UPDATE users 
            SET stats = jsonb_set(
              COALESCE(stats, '{"skateWins": 0, "skateLosses": 0}'::jsonb), 
              '{skateLosses}', 
              (COALESCE(stats->>'skateLosses', '0')::int + 1)::text::jsonb
            )
            WHERE id = ${attempterId}
          `);
        }
      }
      updates.rounds = rounds;

    } else if (action === 'set') {
      // User is setting a new trick
      updates = {
        currentTrickVideoUrl: videoUrl,
        currentTurnType: 'attemptMatch',
        // Turn passes to other player to match
        currentTurnId: userId === game.challengerId ? game.opponentId : game.challengerId,
        rounds: [...rounds, {
          setBy: userId,
          trickVideoUrl: videoUrl,
          attempts: []
        }]
      };
    }

    const [updated] = await db.update(skateGames)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(skateGames.id, req.params.id))
      .returning();

    res.json(updated);
  } catch (error) {
    console.error('Error processing turn:', error);
    res.status(500).json({ error: 'Failed to process turn' });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    // Query users sorted by stats->>'skateWins' descending
    // Note: JSONB querying syntax depends on dialect, but Drizzle has helpers or raw SQL
    const leaderboard = await db.select({
      id: users.id,
      displayName: users.displayName,
      stats: users.stats
    })
    .from(users)
    .orderBy(sql`${users.stats}->>'skateWins' DESC`)
    .limit(50);

    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

export default router;
