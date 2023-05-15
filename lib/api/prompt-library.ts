import prisma from '@/db/prisma';

import { getProjectByUrl } from './projects';

export const getPromptLibraty = async (projectUrl: string) => {
  const project = await getProjectByUrl(projectUrl);

  return await prisma.promptLibrary.findMany({
    where: {
      projectId: project?.id,
    },
  });
};
