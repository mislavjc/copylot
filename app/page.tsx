import { ClientFetch } from '@/components/clientfetch';
import { DbStats } from '@/components/dbstats';
import { User } from '@/components/user';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen p-24">
      <ClientFetch />
      {/* @ts-ignore */}
      <DbStats />
      {/* @ts-ignore */}
      <User />
    </main>
  );
}
