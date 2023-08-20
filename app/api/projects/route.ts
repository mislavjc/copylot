import { getServerUser } from 'lib/auth';

import prisma from 'db/prisma';

export const POST = async (request: Request) => {
  const { name, url } = await request.json();

  const user = await getServerUser();

  if (!user) {
    return {
      status: 401,
      body: {
        message: 'Unauthorized',
      },
    };
  }

  const prismaUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!prismaUser) {
    return {
      status: 401,
      body: {
        message: 'Unauthorized',
      },
    };
  }

  const project = await prisma.project.create({
    data: {
      name,
      url,
      organization: {
        connect: {
          id: prismaUser.organizationId!,
        },
      },
    },
  });

  return new Response(JSON.stringify({ url: project.url }), {
    headers: { 'content-type': 'application/json' },
  });
};
