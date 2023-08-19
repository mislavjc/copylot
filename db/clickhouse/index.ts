import { createClient } from '@clickhouse/client';

import env from 'lib/env';

export const client = createClient({
  host: env.CLICKHOUSE_HOST,
  password: env.CLICKHOUSE_PASSWORD,
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

interface SessionsAndViewsGroupedByWebsiteIdRow {
  sessions: string;
  views: string;
  date: string;
}

export const sessionsAndViewsGroupedByWebsiteId = async (
  website_id: string,
): Promise<SessionsAndViewsGroupedByWebsiteIdRow[]> => {
  const decodedUrl = decodeURIComponent(website_id);

  const result = await client.query({
    query: /* sql */ `
      SELECT count(DISTINCT session_id) AS sessions, 
        count(*) AS views,
        date(created_at) as date
      FROM ${TABLES.SESSIONS}
      WHERE website_id = '${decodedUrl}'
      GROUP BY date
    `,
    format: 'JSONEachRow',
  });

  return await result.json();
};

interface SessionsAndViewsGroupedByCountryRow {
  sessions: string;
  views: string;
  country: string;
}

export const sessionsAndViewsGroupedByCountry = async (
  website_id: string,
): Promise<SessionsAndViewsGroupedByCountryRow[]> => {
  const decodedUrl = decodeURIComponent(website_id);

  const result = await client.query({
    query: /* sql */ `
      SELECT count(DISTINCT session_id) AS sessions,
        count(*) AS views,
        country
      FROM ${TABLES.SESSIONS}
      WHERE website_id = '${decodedUrl}'
      GROUP BY country
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

interface Event {
  website_id: string;
  session_id: string;
  event_id: string;
  url_path: string;
  event_name: string;
  event_key: string;
  event_value: string;
  created_at: string;
}

export const insertEvent = async ({
  website_id,
  session_id,
  event_id,
  url_path,
  event_name,
  event_key,
  event_value,
  created_at,
}: Event) => {
  await client.insert({
    table: TABLES.EVENTS,
    values: [
      {
        website_id,
        session_id,
        event_id,
        url_path,
        event_name,
        event_key,
        event_value,
        created_at,
      },
    ],
    format: 'JSONEachRow',
  });
};

export interface VariationStatsByExperimentIdRow {
  event_value: string;
  event_name: string;
  count: string;
}

export const getVariationStatsByExperimentId = async (
  experiment_id: string,
): Promise<VariationStatsByExperimentIdRow[]> => {
  const result = await client.query({
    query: /* sql */ `
      SELECT event_value, event_name, count(*) as count
      FROM ${TABLES.EVENTS}
      WHERE event_key = '${experiment_id}'
      GROUP BY event_value, event_name
      ORDER BY count DESC
    `,
    format: 'JSONEachRow',
  });

  return await result.json();
};
