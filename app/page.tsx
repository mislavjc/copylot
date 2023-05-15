import { User } from '@/components/user';

export const metadata = {
  title: 'Home',
  description: 'Home page',
};

const HomePage = () => {
  return (
    <div>
      <main className="flex flex-col items-center min-h-screen">
        {/* @ts-ignore  */}
        <User />
        <button data-event="Hero CTA click" data-event-key="hero">
          Testing click events
        </button>
      </main>
    </div>
  );
};

export default HomePage;
