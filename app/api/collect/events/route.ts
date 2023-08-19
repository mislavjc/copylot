import { createHash } from 'crypto';
import { insertEvent } from 'db/clickhouse';
import isbot from 'isbot';
import { NextResponse, userAgent } from 'next/server';

import { getGeoData } from 'lib/utils';

export async function POST(request: Request) {
  const geoData = getGeoData(request);

  const agent = userAgent(request);

  if (isbot(agent.ua)) {
    return NextResponse.json({
      message: 'No data collected',
    });
  }

  const { ip } = geoData;

  const { event, url } = await request.json();

  const { pathname, host: hostname } = new URL(url);

  const { event_name, event_key, event_value } = event;

  const dailySalt = new Date().getDate().toString();

  const dateTime = new Date()
    .toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '');

  const hashedUserId = createHash('sha256')
    .update(dailySalt + hostname + ip + JSON.stringify(agent))
    .digest('hex');

  const hashedEventId = createHash('sha256').digest('hex');

  await insertEvent({
    website_id: hostname,
    session_id: hashedUserId,
    event_id: hashedEventId,
    url_path: pathname,
    event_name,
    event_key: event_key ?? hashedEventId,
    event_value,
    created_at: dateTime,
  });

  return NextResponse.json({
    message: 'Data collected',
  });
}
