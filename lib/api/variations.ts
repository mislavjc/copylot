import { getRandomData } from 'lib/utils';

import prisma from 'db/prisma';

export const getVariation = async (experimentId: string) => {
  const variations = await prisma.variation.findMany({
    where: {
      experimentId,
    },
  });

  const randomVariation = getRandomData(variations);

  return {
    id: randomVariation.id,
    value: randomVariation.value,
  };
};
