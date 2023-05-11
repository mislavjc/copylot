import prisma from '@/db/prisma';

export const POST = async (request: Request) => {
  const { name, url, organizationId } = await request.json();

  const project = await prisma.project.create({
    data: {
      name,
      url,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });

  return new Response(JSON.stringify({ id: project.id }), {
    headers: { 'content-type': 'application/json' },
  });
};
