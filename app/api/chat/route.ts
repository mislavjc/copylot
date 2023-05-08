import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

import redis from '@/db/redis';

export const POST = async (request: Request) => {
  const { chat } = await request.json();

  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response('Unauthorized', {
      status: 401,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  }

  const exists = await redis.exists(session.user.id);

  if (exists) {
    redis.json.arrappend(session.user.id, '$', ...chat);
  } else {
    redis.json.set(session.user.id, '$', chat);
  }

  return new Response(JSON.stringify({ prompt: 'Hi' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};
