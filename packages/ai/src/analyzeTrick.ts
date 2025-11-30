import { type HeshurClientOptions, createHeshurClient } from './client';
import type { Analysis } from './schema';

let defaultClient: ReturnType<typeof createHeshurClient> | null = null;

/**
 * Get or create the default Heshur client instance
 * Uses environment variable OPENAI_API_KEY for authentication
 */
function getDefaultClient(): ReturnType<typeof createHeshurClient> {
  if (!defaultClient) {
    defaultClient = createHeshurClient();
  }
  return defaultClient;
}

/**
 * Analyze a skateboard trick and return structured feedback
 *
 * This is a convenience function that uses a shared client instance.
 * For more control, use `createHeshurClient()` directly.
 *
 * @param trickName - Name of the trick being performed (e.g., "kickflip", "heelflip")
 * @param notes - Additional context or observations about the attempt
 * @param options - Optional client configuration
 * @returns Structured analysis with score, hype level, technical feedback, and style analysis
 *
 * @example
 * ```typescript
 * const analysis = await analyzeTrick(
 *   "kickflip",
 *   "Good pop but the board didn't flip all the way"
 * );
 * console.log(analysis.trickScore); // 5
 * console.log(analysis.hypeLevel); // "Steez"
 * console.log(analysis.technicalFeedback); // ["Flick harder...", ...]
 * ```
 */
export async function analyzeTrick(
  trickName: string,
  notes: string,
  options?: HeshurClientOptions
): Promise<Analysis> {
  const client = options ? createHeshurClient(options) : getDefaultClient();
  return client.analyzeTrick(trickName, notes);
}
