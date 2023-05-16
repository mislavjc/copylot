'use server';

import { Prisma } from '@prisma/client/edge';
import { revalidateTag } from 'next/cache';

import prisma from '@/db/prisma';
import { getProjectByUrl } from '@/lib/api/projects';

export const addPromptToLibrary = async (
  projectId: string,
  data: Prisma.PromptLibraryCreateWithoutProjectInput
) => {
  await prisma.promptLibrary.create({
    data: {
      ...data,
      project: {
        connect: {
          id: projectId,
        },
      },
    },
  });

  revalidateTag('prompt-library');
};

export const updatePromptInLibrary = async (
  promptId: string,
  data: Prisma.PromptLibraryUpdateInput
) => {
  await prisma.promptLibrary.update({
    where: {
      id: promptId,
    },
    data,
  });

  revalidateTag('prompt-library');
};

export const createExperiment = async (
  projectUrl: string,
  data: Prisma.ExperimentCreateWithoutProjectInput
) => {
  const project = await getProjectByUrl(projectUrl);

  if (!project) {
    throw new Error('Project not found');
  }

  const experiment = await prisma.experiment.create({
    data: {
      ...data,
      project: {
        connect: {
          id: project.id,
        },
      },
    },
  });

  revalidateTag('experiments');

  return experiment;
};