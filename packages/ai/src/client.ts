import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { type Analysis, AnalysisSchema } from './schema';

/**
 * Configuration options for the Heshur AI client
 */
export interface HeshurClientOptions {
  /** OpenAI API key. Defaults to OPENAI_API_KEY environment variable */
  apiKey?: string;
  /** OpenAI model to use. Defaults to gpt-4o */
  model?: string;
}

/**
 * Heshur AI - The AI Skate Coach
 * Provides structured trick analysis using OpenAI's structured outputs
 */
export class HeshurClient {
  private readonly openai: OpenAI;
  private readonly model: string;

  constructor(options: HeshurClientOptions = {}) {
    this.openai = new OpenAI({
      apiKey: options.apiKey,
    });
    this.model = options.model ?? 'gpt-4o';
  }

  /**
   * Analyze a skateboard trick and return structured feedback
   * @param trickName - Name of the trick being performed (e.g., "kickflip", "heelflip")
   * @param notes - Additional context or observations about the attempt
   * @returns Structured analysis with score, hype level, technical feedback, and style analysis
   */
  async analyzeTrick(trickName: string, notes: string): Promise<Analysis> {
    const completion = await this.openai.beta.chat.completions.parse({
      model: this.model,
      messages: [
        {
          role: 'system',
          content: `You are Heshur, an expert AI skate coach with deep knowledge of skateboarding techniques, style, and culture. Analyze the trick attempt and provide constructive feedback. Be authentic to skate culture - use appropriate terminology and keep the vibe real.

When scoring:
- 1-3: Needs work, basic fundamentals missing
- 4-6: Solid attempt, getting there
- 7-8: Clean execution, looking good
- 9-10: Absolutely dialed, pro-level steez

Hype levels:
- Chill: Casual session vibes, learning mode
- Steez: Looking stylish, got that flow
- Gnarly: Going big, pushing limits

Technical feedback should be specific, actionable tips that will help improve the trick.`,
        },
        {
          role: 'user',
          content: `Analyze this trick attempt:
Trick: ${trickName}
Notes: ${notes}`,
        },
      ],
      response_format: zodResponseFormat(AnalysisSchema, 'trick_analysis'),
    });

    const analysis = completion.choices[0]?.message.parsed;

    if (!analysis) {
      throw new Error('Failed to parse trick analysis response');
    }

    return analysis;
  }
}

/**
 * Create a new Heshur AI client instance
 * @param options - Configuration options
 * @returns HeshurClient instance
 */
export function createHeshurClient(options: HeshurClientOptions = {}): HeshurClient {
  return new HeshurClient(options);
}
