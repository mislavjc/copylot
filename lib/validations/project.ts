import { z } from 'zod';

export const projectFormCreateSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});
