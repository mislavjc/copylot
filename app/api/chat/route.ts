import { OpenAIStream, StreamingTextResponse } from 'ai';
import { revalidatePath } from 'next/cache';
import OpenAI from 'openai';

import { checkRateLimit } from 'lib/ratelimit';

import prisma from 'db/prisma';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

const chatRevalidatePath =
  '/[project]/dashboard/[experiments]/[experimentId]/chat';

export async function POST(req: Request) {
  const rateLimitResult = await checkRateLimit(req, 20, '1h');

  if (rateLimitResult.response) {
    return rateLimitResult.response;
  }

  const { messages, systemPrompt, experimentId } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      ...messages,
    ],
  });

  const stream = OpenAIStream(response, {
    onStart: async () => {
      await prisma.message.create({
        data: {
          content: messages[messages.length - 1].content,
          role: 'user',
          experimentId,
        },
      });

      revalidatePath(chatRevalidatePath, 'page');
    },
    onCompletion: async (completion) => {
      await prisma.message.create({
        data: {
          content: completion,
          role: 'assistant',
          experimentId,
        },
      });

      revalidatePath(chatRevalidatePath, 'page');
    },
  });

  return new StreamingTextResponse(stream);
}
