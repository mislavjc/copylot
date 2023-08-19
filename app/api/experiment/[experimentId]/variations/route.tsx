import { getVariation } from 'lib/api/variations';

export const runtime = 'edge';

export const GET = async (
  _request: Request,
  context: {
    params: {
      experimentId: string;
    };
  },
) => {
  const { experimentId } = context.params;

  const variation = await getVariation(experimentId);

  return new Response(
    JSON.stringify({
      status: 'ok',
      data: {
        id: variation.id,
        value: variation.value,
      },
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    },
  );
};
