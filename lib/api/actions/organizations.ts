'use server';

import { Prisma } from '@prisma/client/edge';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { decode, encode } from 'next-auth/jwt';

import prisma from 'db/prisma';

const sessionCookieName = '__Secure-next-auth.session-token';

export const createOrganization = async (name: string) => {
  const cookieStore = cookies();

  const token = cookieStore.get(sessionCookieName);

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

  cookieStore.set(sessionCookieName, encoded, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: true,
  });
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

  revalidatePath('/organization');
};
