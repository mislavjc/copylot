import { ChatWrapper } from '@/components/chat-wrapper';
import { ClientFetch } from '@/components/clientfetch';
import { User } from '@/components/user';

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      {/* @ts-ignore  */}
      <User />
      <ClientFetch />
      {/* @ts-ignore  */}
      <ChatWrapper />
    </main>
  );
}
