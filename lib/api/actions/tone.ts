'use server';

import { Prisma } from '@prisma/client/edge';
import { revalidatePath } from 'next/cache';

import prisma from 'db/prisma';

export const createToneDescription = async (
  projectId: string,
  data: Prisma.ToneDescriptionCreateWithoutProjectInput,
) => {
  await prisma.toneDescription.create({
    data: {
      ...data,
      project: {
        connect: {
          id: projectId,
        },
      },
    },
  });

  revalidatePath('/[project]/dashboard/settings');
  revalidatePath('/[project]/dashboard');
};

export const updateToneDescription = async (
  id: string,
  data: Prisma.ToneDescriptionUpdateInput,
) => {
  await prisma.toneDescription.update({
    where: {
      id,
    },
    data,
  });

  revalidatePath('/[project]/dashboard/settings');
  revalidatePath('/[project]/dashboard');
};
