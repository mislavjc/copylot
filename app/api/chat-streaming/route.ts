import env from "@/lib/env";

export const runtime = 'edge';

const createCompletion = async (prompt: string) => {
  const config = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    stream: true,
  };

  return fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    body: JSON.stringify(config),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
  });
};

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const completion = await createCompletion(prompt);

  return new Response(completion.body, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
