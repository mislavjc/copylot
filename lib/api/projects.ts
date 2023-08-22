import { getCurrentUser } from 'lib/auth';

import prisma from 'db/prisma';

export const getProjects = async () => {
  const user = await getCurrentUser();

  return await prisma.project.findMany({
    where: {
      organizationId: user?.organizationId!,
    },
    include: {
      _count: {
        select: {
          experiments: true,
          promptLibraries: true,
          toneDescriptions: true,
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
  });
};
