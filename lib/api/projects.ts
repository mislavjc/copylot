import { getCurrentUser } from 'lib/auth';

import prisma from 'db/prisma';

export const getProjects = async () => {
  const user = await getCurrentUser();

  if (!user?.organizationId) {
    return [];
  }

  return await prisma.project.findMany({
    where: {
      organizationId: user?.organizationId,
    },
    include: {
      _count: {
        select: {
          experiments: true,
        },
      },
    },
  });
};

export const getProjectByUrl = async (url: string) => {
  return await prisma.project.findFirst({
    where: {
      url,
    },
    include: {
      toneDescription: true,
    },
  });
};

export const getProjectDataByUrl = async (url: string) => {
  return await prisma.project.findFirst({
    where: {
      url,
    },
    include: {
      toneDescription: true,
      _count: {
        select: {
          experiments: true,
          promptLibraries: true,
        },
      },
    },
  });
};
