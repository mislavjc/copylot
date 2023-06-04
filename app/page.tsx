import { getVariation } from "@/lib/api/variations";

export const metadata = {
  title: 'Home',
  description: 'Home page',
};

const experimentId = 'clhpdqoye0000qy0h7c6501po';


const HomePage = async () => {
  const variation = await getVariation(experimentId);

  return (
    <div>
      <main className="flex flex-col items-center min-h-screen">
        <button data-variation={variation.id} data-experiment={experimentId}>
          Testing click events
        </button>
        <h1 data-variation={variation.id} data-experiment={experimentId}>
          {variation.value}
        </h1>
      </main>
    </div>
  );
};

export default HomePage;
