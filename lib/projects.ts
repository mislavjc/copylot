import prisma from '@/db/prisma';

import { getCurrentUser } from './auth';

export const getProjects = async () => {
  const user = await getCurrentUser();

  return await prisma.project.findMany({
    where: {
      organizationId: user?.organizationId,
    },
  });
};
