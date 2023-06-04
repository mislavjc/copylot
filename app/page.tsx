export const metadata = {
  title: 'Home',
  description: 'Home page',
};

const experimentId = 'clhpdqoye0000qy0h7c6501po';

const getVariation = async () => {
  const variation = await fetch(
    `${process.env.NEXTAUTH_URL || `https://${process.env.VERCEL_URL}`}/api/experiment/${experimentId}/variations`,
    {
      next: {
        revalidate: 1,
      },
    }
  );

  const variationData = await variation.json().then(({ data }) => data);

  return variationData as {
    id: string;
    value: string;
  };
};

const HomePage = async () => {
  const variation = await getVariation();

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
