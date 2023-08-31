import { ReactNode } from 'react';
import { StaticImageData } from 'next/image';
import Link from 'next/link';

import { Button } from 'ui/button';

import { Icons } from 'components/icons';

import { getVariation } from 'lib/api/variations';

import ChatImg from 'public/@index/chat.webp';
import ExperimentImg from 'public/@index/experiment.webp';
import ProjectsImg from 'public/@index/projects.webp';
import SettingsImg from 'public/@index/settings.webp';
import StatsImg from 'public/@index/stats.webp';

interface HeroExperimentInput {
  titleExperimentId: string;
  descriptionExperimentId: string;
  image: {
    src: StaticImageData;
    alt: string;
  };
  ctaExperimentId: string;
}

interface Experiment {
  titleExperimentId: string;
  descriptionExperimentId: string;
  ctaExperimentId: string;
  icon?: ReactNode;
  image: {
    src: StaticImageData;
    alt: string;
  };
}

export const getVariationData = async (experimentId: string) => {
  const variation = await getVariation(experimentId);
  return {
    value: variation.value,
    variationId: variation.id,
    experimentId,
  };
};

interface CTAElement {
  experimentId: string;
  variationId: string;
  value: string;
}

export const createCTAElement = ({
  experimentId,
  variationId,
  value,
}: CTAElement) => (
  <Link href="/projects">
    <Button data-experiment={experimentId} data-variation={variationId}>
      {value}
    </Button>
  </Link>
);

export const fetchHeroData = async (experiment: HeroExperimentInput) => {
  const [titleData, descriptionData, ctaData] = await Promise.all([
    getVariationData(experiment.titleExperimentId),
    getVariationData(experiment.descriptionExperimentId),
    getVariationData(experiment.ctaExperimentId),
  ]);

  return {
    title: titleData,
    description: descriptionData,
    image: experiment.image,
    cta: createCTAElement({
      experimentId: experiment.ctaExperimentId,
      variationId: ctaData.variationId,
      value: ctaData.value,
    }),
  };
};

export const fetchFeatures = async (experiments: Experiment[]) => {
  const features = await Promise.all(
    experiments.map(async (experiment) => {
      const [titleData, descriptionData, ctaData] = await Promise.all([
        getVariationData(experiment.titleExperimentId),
        getVariationData(experiment.descriptionExperimentId),
        getVariationData(experiment.ctaExperimentId),
      ]);

      return {
        title: titleData,
        description: descriptionData,
        cta: createCTAElement({
          experimentId: experiment.ctaExperimentId,
          variationId: ctaData.variationId,
          value: ctaData.value,
        }),
        icon: experiment.icon,
        image: experiment.image,
      };
    }),
  );

  return features;
};

export const heroInfo = {
  titleExperimentId: 'clly5oxf00000tp0g2vnk2b2q',
  descriptionExperimentId: 'clly63cou0003tp0gzmprb65g',
  ctaExperimentId: 'clly64emz0002mi0h14chxjhw',
  image: {
    src: ExperimentImg,
    alt: 'Advanced testing interface of Copylot',
  },
};

export const experiments: Experiment[] = [
  {
    titleExperimentId: 'clly67eah0003mi0hh15n4ql5',
    descriptionExperimentId: 'clly68riq0008tp0gq0qqhj4o',
    ctaExperimentId: 'clly6abyd0006mi0huzvwg64o',
    icon: <Icons.experiments />,
    image: {
      src: StatsImg,
      alt: 'Copylot stats',
    },
  },
  {
    titleExperimentId: 'clly6bky10002ll0hg7z3gym1',
    descriptionExperimentId: 'clly6cft20009mi0h70uy7k0v',
    ctaExperimentId: 'clly6dh140005ll0hfj041c72',
    icon: <Icons.bot />,
    image: {
      src: ChatImg,
      alt: 'Copylot chat interface',
    },
  },
  {
    titleExperimentId: 'clly6f500000ami0hkak517xl',
    descriptionExperimentId: 'clly6rs510000ll0h5cfq82o1',
    ctaExperimentId: 'clly75osu000imi0hqvmead2x',
    icon: <Icons.settings />,
    image: {
      src: SettingsImg,
      alt: 'Copylot settings interface',
    },
  },
  {
    titleExperimentId: 'clly76szv000lmi0hwq8hy2uc',
    descriptionExperimentId: 'clly7851t000omi0hdla43p96',
    ctaExperimentId: 'clly78z6q0003ll0hgyezttea',
    icon: <Icons.folders />,
    image: {
      src: ProjectsImg,
      alt: 'Copylot project management',
    },
  },
];
