import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

import { checkRateLimit } from 'lib/ratelimit';

export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const rateLimitResult = await checkRateLimit(req, 20, '1h');

  if (rateLimitResult.response) {
    return rateLimitResult.response;
  }

  const { prompt, systemPrompt } = await req.json();

  console.log({
    prompt,
    systemPrompt,
  });

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
