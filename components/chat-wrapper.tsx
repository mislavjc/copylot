import { getServerSession } from 'next-auth';

import redis from '@/db/redis';
import { authOptions } from '@/lib/auth';
import { ChatStream } from '@/lib/openai';

import { Chat } from './chat';

const getChatHistory = async () => {
  const session = await getServerSession(authOptions);

  return (await redis.json.get(session?.user.id!)) as ChatStream[] | null;
};

export const ChatWrapper = async () => {
  const chatHistory = await getChatHistory();

  return <Chat history={chatHistory || []} />;
};
