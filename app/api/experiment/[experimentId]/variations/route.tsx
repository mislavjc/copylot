import prisma from '@/db/prisma';

export const GET = async (
  _request: Request,
  context: {
    params: {
      experimentId: string;
    };
  }
) => {
  const { experimentId } = context.params;

  const variations = await prisma.variation.findMany({
    where: {
      experimentId,
    },
  });

  const randomVariation =
    variations[Math.floor(Math.random() * variations.length)];

  return new Response(
    JSON.stringify({
      status: 'ok',
      data: {
        id: randomVariation.id,
        value: randomVariation.value,
      },
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    }
  );
};
