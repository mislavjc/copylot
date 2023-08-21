import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';

import { checkRateLimit } from 'lib/ratelimit';

export const runtime = 'edge';

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
});

const openai = new OpenAIApi(apiConfig);

export async function POST(req: Request) {
  const rateLimitResult = await checkRateLimit(req, 20, '1h');

  if (rateLimitResult.response) {
    return rateLimitResult.response;
  }

  const { prompt } = await req.json();

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [{ role: 'user', content: prompt }],
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
