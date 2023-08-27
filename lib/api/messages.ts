import prisma from 'db/prisma';

export const getMessages = async (experimentId: string) => {
  return await prisma.message.findMany({
    where: {
      experimentId,
    },
  });
};
