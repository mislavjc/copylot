import { createClient } from '@clickhouse/client';

export const client = createClient({
  host: process.env.CLICKHOUSE_HOST,
  password: process.env.CLICKHOUSE_PASSWORD,
});

enum TABLES {
  SESSIONS = 'sessions',
  EVENTS = 'events',
}

interface SessionsAndViewsByWebsiteIdRow {
  website_id: string;
  sessions: string;
  views: string;
}

export const sessionsAndViewsByWebsiteId = async (): Promise<
  SessionsAndViewsByWebsiteIdRow[]
> => {
  const result = await client.query({
    query: /* sql */ `
      SELECT website_id,
        count(DISTINCT session_id) AS sessions, 
        count(*) AS views
      FROM ${TABLES.SESSIONS}
      GROUP BY website_id
      ORDER BY count(*) DESC
    `,
    format: 'JSONEachRow',
  });

  return await result.json();
};

interface Session {
  session_id: string;
  website_id: string;
  hostname: string;
  browser: string;
  os: string;
  device: string;
  screen: string;
  language: string;
  country: string;
  city: string;
  region: string;
  url_path: string;
  url_query: string;
  referrer_path: string;
  referrer_query: string;
  referrer_domain: string;
  page_title: string;
  event_name: string;
  created_at: string;
}

export const insertSession = async ({
  session_id,
  website_id,
  hostname,
  browser,
  os,
  device,
  screen,
  language,
  country,
  city,
  region,
  url_path,
  url_query,
  referrer_path,
  referrer_query,
  referrer_domain,
  page_title,
  event_name,
  created_at,
}: Session): Promise<void> => {
  await client.insert({
    table: TABLES.SESSIONS,
    values: [
      {
        session_id,
        website_id,
        hostname,
        browser,
        os,
        device,
        screen,
        language,
        country,
        region,
        city,
        url_path,
        url_query,
        referrer_path,
        referrer_query,
        referrer_domain,
        page_title,
        event_name,
        created_at,
      },
    ],
    format: 'JSONEachRow',
  });
};
