import { createClient } from '@clickhouse/client';

export const client = createClient({
  host: process.env.CLICKHOUSE_HOST,
  password: process.env.CLICKHOUSE_PASSWORD,
});
