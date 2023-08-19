export const GET = async (request: Request) => {
  return new Response(
    JSON.stringify({
      status: 'ok',
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    },
  );
};
