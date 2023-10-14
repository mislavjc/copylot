import { Ratelimit } from '@upstash/ratelimit';

import redis from 'db/redis';

type Unit = 'ms' | 's' | 'm' | 'h' | 'd';
type Duration = `${number} ${Unit}` | `${number}${Unit}`;

export const checkRateLimit = async (
  req: Request,
  maxRequests: number,
  timeWindowSeconds: Duration,
) => {
  if (
    process.env.KV_REST_API_URL &&
    process.env.KV_REST_API_TOKEN &&
    process.env.VERCEL
  ) {
    const ip = req.headers.get('x-forwarded-for');
    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(maxRequests, timeWindowSeconds),
    });

    const { success, limit, reset, remaining } = await ratelimit.limit(
      `ratelimit_${ip}`,
    );

    if (!success) {
      return {
        response: new Response(
          'You have reached your request limit for the next hour.',
          {
            status: 429,
            headers: {
              'X-RateLimit-Limit': limit.toString(),
              'X-RateLimit-Remaining': remaining.toString(),
              'X-RateLimit-Reset': reset.toString(),
            },
          },
        ),
        limit,
        reset,
        remaining,
      };
    }
  }

  return {
    response: null,
    limit: 0,
    reset: 0,
    remaining: 0,
  };
};
