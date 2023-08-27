import prisma from 'db/prisma';

export const getToneByProjectId = async (projectId: string) => {
  return await prisma.toneDescription.findFirst({
    where: {
      projectId,
    },
  });
};
