'use server';

import { cookies } from 'next/headers';
import { decode, encode } from 'next-auth/jwt';

import prisma from 'db/prisma';

export const createOrganization = async (name: string) => {
  const cookieStore = cookies();

  const token = cookieStore.get('next-auth.session-token');

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

  cookieStore.set('next-auth.session-token', encoded);
};
