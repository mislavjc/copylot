import prisma from '@/db/prisma';
import { getCurrentUser } from '@/lib/auth';

export const getProjects = async () => {
  const user = await getCurrentUser();

  return await prisma.project.findMany({
    where: {
      organizationId: user?.organizationId,
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
