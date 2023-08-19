import { z } from 'zod';

const envSchema = z.object({
  CLICKHOUSE_HOST: z.string().url(),
  CLICKHOUSE_USER: z.string(),
  CLICKHOUSE_PASSWORD: z.string(),
  GOOGLE_ID: z.string(),
  GOOGLE_SECRET: z.string(),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url().optional(),
  SMTP_USER: z.string(),
  SMTP_PASSWORD: z.string(),
  SMTP_FROM: z.string().email(),
  AWS_SES_REGION: z.string(),
  OPENAI_API_KEY: z.string().optional(),
  UPSTASH_URL: z.string().url(),
  UPSTASH_TOKEN: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
