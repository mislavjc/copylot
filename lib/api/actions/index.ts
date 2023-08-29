'use server';

import { Prisma } from '@prisma/client/edge';
import { revalidatePath } from 'next/cache';

import { getProjectByUrl } from 'lib/api/projects';

import prisma from 'db/prisma';

const basePath = '/[project]/dashboard';

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

  revalidatePath(`${basePath}/prompt-library`);
  revalidatePath(basePath);
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

  revalidatePath(`${basePath}/prompt-library`);
  revalidatePath(basePath);
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

  revalidatePath(`${basePath}/experiments`);
  revalidatePath(basePath);

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

  revalidatePath(`${basePath}/experiments/[experimentId]`);

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

  revalidatePath('/projects');
};
