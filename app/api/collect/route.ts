import { createHash } from 'crypto';
import isbot from 'isbot';
import { NextResponse, userAgent } from 'next/server';

import { getGeoData } from 'lib/utils';

import { insertSession } from 'db/clickhouse';

export async function POST(request: Request) {
  const geoData = getGeoData(request);

  const agent = userAgent(request);

  if (isbot(agent.ua)) {
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

  const dateTime = new Date()
    .toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '');

  const hashedUserId = createHash('sha256')
    .update(dailySalt + hostname + ip + JSON.stringify(agent))
    .digest('hex');

  await insertSession({
    session_id: hashedUserId,
    website_id: hostname,
    hostname,
    browser: browser ?? '',
    os: os ?? '',
    device: device ?? '',
    screen: screen_size,
    language: request.headers.get('accept-language') || 'en',
    country,
    region,
    city,
    url_path: pathname,
    url_query: url.searchParams,
    referrer_path,
    referrer_query,
    referrer_domain,
    page_title,
    event_name,
    created_at: dateTime,
  });

  return NextResponse.json({
    message: 'Data collected',
  });
}
