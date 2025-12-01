import { Router, type Router as RouterType } from 'express';
import { z } from 'zod';
import { analyzeTrick } from '@skatehubba/ai';
import { heshurRateLimiter } from '../middleware/rateLimit';

export const heshurRouter: RouterType = Router();

/**
 * Request body schema for trick analysis
 */
const AnalyzeTrickRequestSchema = z.object({
  trickName: z.string().min(1, 'Trick name is required').max(100),
  notes: z.string().max(500).default(''),
});

/**
 * POST /api/heshur/analyze
 * Analyze a skateboard trick using Heshur AI
 *
 * Rate Limited: 5 requests per IP per 10 seconds
 */
heshurRouter.post('/analyze', heshurRateLimiter, async (req, res) => {
  try {
    // Validate request body
    const parseResult = AnalyzeTrickRequestSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        error: 'Invalid Request',
        message: 'Invalid request body',
        details: parseResult.error.issues,
      });
      return;
    }

    const { trickName, notes } = parseResult.data;

    // Call Heshur AI for analysis
    const analysis = await analyzeTrick(trickName, notes);

    res.json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    // Handle OpenAI API errors
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        res.status(503).json({
          error: 'Service Unavailable',
          message: 'AI service is not configured. Please contact support.',
        });
        return;
      }
    }

    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to analyze trick. Please try again later.',
    });
  }
});
