import { NextResponse, userAgent } from 'next/server';
import { createHash } from 'crypto';

import { client } from '@/db/clickhouse';
import { getGeoData } from '@/lib/utils';

export async function POST(request: Request) {
  const geoData = getGeoData(request);

  const agent = userAgent(request);

  if (!agent || agent.isBot) {
    return NextResponse.json({
      message: 'No data collected',
    });
  }

  const {
    browser: { name: browser },
    os: { name: os },
    device: { type: device },
  } = agent;

  const { ip, country, region, city } = geoData;

  const { event, url, referrer } = await request.json();

  const { pathname, host: hostname } = new URL(url);

  const { event_name, screen_size, page_title } = event;

  const { referrer_domain, referrer_path, referrer_query } = referrer;

  const dailySalt = new Date().getDate().toString();

  const hashedUserId = createHash('sha256')
    .update(dailySalt + hostname + ip + JSON.stringify(agent))
    .digest('hex');

  await client.insert({
    table: 'sessions',
    values: [
      {
        session_id: createHash('sha256'),
        user_id: hashedUserId,
        website_id: hostname,
        hostname,
        browser,
        os,
        device,
        screen: screen_size,
        language: request.headers.get('accept-language'),
        country,
        region,
        city,
        url_path: pathname,
        url_query: url.searchParams.toString(),
        referrer_path,
        referrer_query,
        referrer_domain,
        page_title,
        event_name,
      },
    ],
  });

  const resultSet = await client.query({
    query: 'SELECT * FROM sessions',
    format: 'JSONEachRow',
  });

  const dataset = await resultSet.json();

  return NextResponse.json({
    dataset,
    geoData,
  });
}
