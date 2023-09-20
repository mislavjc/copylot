'use server';

import { Prisma } from '@prisma/client/edge';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { decode, encode } from 'next-auth/jwt';

import { cookieName, cookieOptions } from 'lib/auth';

import prisma from 'db/prisma';

export const createOrganization = async (name: string) => {
  const cookieStore = cookies();

  const token = cookieStore.get(cookieName);

  const decoded = await decode({
    token: token?.value,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  if (!decoded) {
    throw new Error('Token not decoded');
  }

  const organization = await prisma.organization.create({
    data: {
      name,
    },
  });

  await prisma.user.update({
    where: {
      id: decoded?.id,
    },
    data: {
      organizationId: organization.id,
    },
  });

  const updatedPayload = {
    ...decoded!,
    organizationId: organization.id,
  };

  const encoded = await encode({
    token: updatedPayload,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  cookieStore.set(cookieName, encoded, cookieOptions);
};

export const updateOrganization = async (
  id: string,
  data: Prisma.OrganizationUpdateInput,
) => {
  await prisma.organization.update({
    where: {
      id,
    },
    data,
  });

  revalidatePath('/organization', 'page');
};
