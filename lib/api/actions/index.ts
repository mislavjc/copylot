'use server';

import { Prisma } from '@prisma/client/edge';
import prisma from 'db/prisma';
import { revalidateTag } from 'next/cache';

import { getProjectByUrl } from 'lib/api/projects';

export const addPromptToLibrary = async (
  projectId: string,
  data: Prisma.PromptLibraryCreateWithoutProjectInput,
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
  data: Prisma.PromptLibraryUpdateInput,
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
  data: Prisma.ExperimentCreateWithoutProjectInput,
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

export const createVariation = async (
  experimentId: string,
  data: Prisma.VariationCreateWithoutExperimentInput,
) => {
  const variation = await prisma.variation.create({
    data: {
      ...data,
      experiment: {
        connect: {
          id: experimentId,
        },
      },
    },
  });

  revalidateTag('variation');

  return variation;
};

export const updateProject = async (
  projectId: string,
  data: Prisma.ProjectUpdateInput,
) => {
  await prisma.project.update({
    where: {
      id: projectId,
    },
    data,
  });

  revalidateTag('projects');
};
