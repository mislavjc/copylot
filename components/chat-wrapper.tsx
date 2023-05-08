import { getServerSession } from 'next-auth';
import { Chat } from './chat';
import { authOptions } from '@/lib/auth';
import redis from '@/db/redis';
import { ChatStream } from '@/lib/openai';

const getChatHistory = async () => {
  const session = await getServerSession(authOptions);

  return (await redis.json.get(session?.user.id!)) as ChatStream[] | null;
};

export const ChatWrapper = async () => {
  const chatHistory = await getChatHistory();

  return <Chat history={chatHistory || []} />;
};
