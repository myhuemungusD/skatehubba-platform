import { z } from 'zod';

/**
 * Hype level classification for trick analysis
 */
export const HypeLevelSchema = z.enum(['Chill', 'Steez', 'Gnarly']);
export type HypeLevel = z.infer<typeof HypeLevelSchema>;

/**
 * Structured output schema for Heshur AI trick analysis
 */
export const AnalysisSchema = z.object({
  /** Overall trick score from 1-10 */
  trickScore: z.number().min(1).max(10),
  /** Hype level classification */
  hypeLevel: HypeLevelSchema,
  /** Array of exactly 3 specific technical tips */
  technicalFeedback: z.array(z.string()).length(3),
  /** Style analysis commentary */
  styleAnalysis: z.string(),
});

export type Analysis = z.infer<typeof AnalysisSchema>;
