import prisma from 'db/prisma';

import { getProjectByUrl } from './projects';

export const getExperiments = async (projectUrl: string) => {
  const project = await getProjectByUrl(projectUrl);

  return await prisma.experiment.findMany({
    where: {
      projectId: project?.id,
    },
  });
};

export const getExperiment = async (experimentId: string) => {
  return await prisma.experiment.findUnique({
    where: {
      id: experimentId,
    },
    include: {
      variations: true,
    },
  });
};
