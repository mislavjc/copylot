import Link from 'next/link';

import { Button } from 'ui/button';

import { Feature, FeatureProps } from 'components/@index/feature';
import { Hero } from 'components/@index/hero';
import { Navbar } from 'components/@navbar/navbar';
import { Icons } from 'components/icons';

import { getVariation } from 'lib/api/variations';

import ChatImg from 'public/@index/chat.webp';
import ExperimentImg from 'public/@index/experiment.webp';
import ProjectsImg from 'public/@index/projects.webp';
import SettingsImg from 'public/@index/settings.webp';
import StatsImg from 'public/@index/stats.webp';

export const metadata = {
  title: 'Home',
  description: 'Home page',
};

const experimentId = 'clhpdqoye0000qy0h7c6501po';

const HomePage = () => {
  // const variation = await getVariation(experimentId);

  return (
    <>
      <Navbar />
      <main>
        <Hero
          title="Unleash the Power of Precision Testing"
          description="With Copylot, you don’t just A/B test your content – you refine it. Dive deep into the nuances of your copy to discover what truly resonates with your audience."
          image={{
            src: ExperimentImg,
            alt: 'Advanced testing interface of Copylot',
          }}
          cta={
            <Link href="/projects">
              <Button>Experience Precision — Try for Free</Button>
            </Link>
          }
        />

        <div className="flex flex-col gap-16 p-8">
          {features.map((feature, index) => (
            <Feature {...feature} key={index} reversed={index % 2 !== 0} />
          ))}
        </div>
      </main>
    </>
  );
};

export default HomePage;

const features: FeatureProps[] = [
  {
    title: 'Deep Dive into Performance Analytics',
    description:
      'Unlock the power of realtime analytics for your website. Keep tabs on your performance metrics without the hassle of getting cookie consents every time.',
    icon: <Icons.experiments />,
    image: {
      src: StatsImg,
      alt: 'Copylot stats',
    },
    cta: (
      <Link href="/projects">
        <Button>View Your Analytics</Button>
      </Link>
    ),
  },
  {
    title: 'Interactive Data Conversations',
    description:
      'Why just view data when you can converse with it? Pose questions to your data and gain insightful answers in mere seconds. Make data-driven decisions effortlessly.',
    icon: <Icons.bot />,
    image: {
      src: ChatImg,
      alt: 'Copylot chat interface',
    },
    cta: (
      <Link href="/projects">
        <Button>Start a Data Conversation</Button>
      </Link>
    ),
  },
  {
    title: 'Infuse Personality into Your Copy',
    description:
      'Our advanced AI ensures that your copy is not just accurate but also vibrant. Tailor the tone, style, and vibe to resonate with your audience perfectly.',
    icon: <Icons.settings />,
    image: {
      src: SettingsImg,
      alt: 'Copylot settings interface',
    },
    cta: (
      <Link href="/projects">
        <Button>Personalize Your Copy</Button>
      </Link>
    ),
  },
  {
    title: 'Streamlined Project Management',
    description:
      'Juggling multiple projects? No problem. Seamlessly create, manage, and track multiple projects within your organization for a fluid workflow.',
    icon: <Icons.folders />,
    image: {
      src: ProjectsImg,
      alt: 'Copylot project management',
    },
    cta: (
      <Link href="/projects">
        <Button>Manage Your Projects</Button>
      </Link>
    ),
  },
];
