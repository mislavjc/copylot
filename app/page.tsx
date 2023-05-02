import Image from 'next/image';
import { Inter } from 'next/font/google';
import { ClientFetch } from '@/components/clientfetch';
import { DbStats } from '@/components/dbstats';

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen p-24">
      <ClientFetch />
      {/* @ts-ignore */}
      <DbStats />
    </main>
  );
}
