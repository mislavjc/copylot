import { Chat } from '@/components/chat';
import { ClientFetch } from '@/components/clientfetch';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <ClientFetch />
      <Chat />
    </main>
  );
}
