import { z } from 'zod';

const urlRegex = /^(www|([a-z0-9]+(-[a-z0-9]+)*))\.[a-z]{2,}(\.[a-z]{2,})?$/;

const urlValidation = z.string().refine((url) => urlRegex.test(url), {
  message: 'URL must be in the format www.domain.com or subdomain.domain.com',
});

export const projectFormCreateSchema = z.object({
  name: z.string(),
  url: urlValidation,
});
