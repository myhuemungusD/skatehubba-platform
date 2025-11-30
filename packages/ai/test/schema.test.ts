import { AnalysisSchema, HypeLevelSchema, type Analysis } from '../src/schema';

describe('Analysis Schema', () => {
  test('validates correct analysis object', () => {
    const validAnalysis: Analysis = {
      trickScore: 7,
      hypeLevel: 'Steez',
      technicalFeedback: [
        'Keep your shoulders parallel to the board',
        'Pop harder for more height',
        'Commit to the catch',
      ],
      styleAnalysis: 'Looking clean with a natural flow. The catch could be more tweaked.',
    };

    const result = AnalysisSchema.safeParse(validAnalysis);
    expect(result.success).toBe(true);
  });

  test('rejects trickScore outside 1-10 range', () => {
    const invalidLow = {
      trickScore: 0,
      hypeLevel: 'Chill',
      technicalFeedback: ['tip1', 'tip2', 'tip3'],
      styleAnalysis: 'test',
    };

    const invalidHigh = {
      trickScore: 11,
      hypeLevel: 'Chill',
      technicalFeedback: ['tip1', 'tip2', 'tip3'],
      styleAnalysis: 'test',
    };

    expect(AnalysisSchema.safeParse(invalidLow).success).toBe(false);
    expect(AnalysisSchema.safeParse(invalidHigh).success).toBe(false);
  });

  test('rejects invalid hype level', () => {
    const invalid = {
      trickScore: 5,
      hypeLevel: 'Invalid',
      technicalFeedback: ['tip1', 'tip2', 'tip3'],
      styleAnalysis: 'test',
    };

    expect(AnalysisSchema.safeParse(invalid).success).toBe(false);
  });

  test('requires exactly 3 technical feedback items', () => {
    const tooFew = {
      trickScore: 5,
      hypeLevel: 'Chill',
      technicalFeedback: ['tip1', 'tip2'],
      styleAnalysis: 'test',
    };

    const tooMany = {
      trickScore: 5,
      hypeLevel: 'Chill',
      technicalFeedback: ['tip1', 'tip2', 'tip3', 'tip4'],
      styleAnalysis: 'test',
    };

    expect(AnalysisSchema.safeParse(tooFew).success).toBe(false);
    expect(AnalysisSchema.safeParse(tooMany).success).toBe(false);
  });
});

describe('HypeLevel Schema', () => {
  test('accepts valid hype levels', () => {
    expect(HypeLevelSchema.safeParse('Chill').success).toBe(true);
    expect(HypeLevelSchema.safeParse('Steez').success).toBe(true);
    expect(HypeLevelSchema.safeParse('Gnarly').success).toBe(true);
  });

  test('rejects invalid hype levels', () => {
    expect(HypeLevelSchema.safeParse('CHILL').success).toBe(false);
    expect(HypeLevelSchema.safeParse('cool').success).toBe(false);
    expect(HypeLevelSchema.safeParse('').success).toBe(false);
  });
});
