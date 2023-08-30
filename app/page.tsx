import Link from 'next/link';

import { Button } from 'ui/button';

import { Hero } from 'components/@index/hero';
import { Navbar } from 'components/@navbar/navbar';

import { getVariation } from 'lib/api/variations';

import ExperimentImg from 'public/@index/experiment.webp';
import StatsImg from 'public/@index/stats.webp';

export const metadata = {
  title: 'Home',
  description: 'Home page',
};

const experimentId = 'clhpdqoye0000qy0h7c6501po';

const HomePage = async () => {
  const variation = await getVariation(experimentId);

  return (
    <>
      <Navbar />
      <main>
        <Hero
          title="A/B testing made easy"
          description="Copylot is a tool that helps you run A/B tests on your copy."
          image={{
            src: ExperimentImg,
            alt: 'Copylot stats',
          }}
          cta={
            <Link href="/projects">
              <Button>Try for free</Button>
            </Link>
          }
        />
      </main>
    </>
  );
};

export default HomePage;
