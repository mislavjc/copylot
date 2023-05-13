import { ClientFetch } from '@/components/clientfetch';
import { Navbar } from '@/components/navbar/Navbar';
import { User } from '@/components/user';
import { navbarConfig } from '@/config/navbar';

export default function Home() {
  return (
    <div>
      {/* @ts-ignore */}
      <Navbar config={navbarConfig.mainNav} />
      <main className="flex flex-col items-center min-h-screen">
        {/* @ts-ignore  */}
        <User />
        <ClientFetch />
      </main>
    </div>
  );
}
