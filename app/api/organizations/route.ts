import prisma from '@/db/prisma';
import { getCurrentUser } from '@/lib/auth';

export const POST = async (request: Request) => {
  const { name } = await request.json();

  const user = await getCurrentUser();

  if (!user) {
    return new Response(JSON.stringify({ error: 'Not logged in' }), {
      headers: { 'content-type': 'application/json' },
    });
  }

  const organization = await prisma.organization.create({
    data: {
      name,
    },
  });

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      organizationId: organization.id,
    },
  });

  return new Response(JSON.stringify({ id: organization.id }), {
    headers: { 'content-type': 'application/json' },
  });
};
