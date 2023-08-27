import { z } from 'zod';

export const toneSchema = z.object({
  tone: z.string(),
  formalityLevel: z.string(),
  vocabularyPreferences: z.string(),
  targetAudience: z.string(),
  culturalNuances: z.string(),
  sentenceLengthPreference: z.string(),
  brandValues: z.string(),
  desiredCTA: z.string(),
  USPs: z.string(),
});
