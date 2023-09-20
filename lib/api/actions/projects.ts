'use server';

import { Prisma } from '@prisma/client/edge';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { decode } from 'next-auth/jwt';

import { cookieName } from 'lib/auth';

import prisma from 'db/prisma';

export const createProject = async (
  data: Prisma.ProjectCreateWithoutOrganizationInput,
) => {
  const cookieStore = cookies();

  const token = cookieStore.get(cookieName);

  const decoded = await decode({
    token: token?.value,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  if (!decoded) {
    throw new Error('Token not decoded');
  }

  const organizationId = decoded?.organizationId;

  if (!organizationId) {
    throw new Error('Organization not found');
  }

  const project = await prisma.project.create({
    data: {
      ...data,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });

  revalidatePath('/projects', 'page');

  return project;
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

  revalidatePath('/projects', 'page');
};
