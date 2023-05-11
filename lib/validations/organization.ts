import { z } from 'zod';

export const organizationFormCreateSchema = z.object({
  name: z.string(),
});
