import { Navbar } from '@/components/@navbar/navbar';
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
        <button data-event="Hero CTA click" data-event-key="hero">
          Testing click events
        </button>
      </main>
    </div>
  );
}
