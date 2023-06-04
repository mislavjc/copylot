import prisma from '@/db/prisma';
import { getRandomData } from '@/lib/utils';

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
