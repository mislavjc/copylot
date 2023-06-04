import redis from '@/db/redis';
import { getServerUser } from '@/lib/auth';
import { ChatStream } from '@/lib/openai';

import { Chat } from './chat';

const getChatHistory = async () => {
  const user = await getServerUser();

  return (await redis.json.get(user?.id!)) as ChatStream[] | null;
};

export const ChatWrapper = async () => {
  const chatHistory = await getChatHistory();

  return <Chat history={chatHistory || []} />;
};
