import { Client } from '@planetscale/database';
import { PrismaPlanetScale } from '@prisma/adapter-planetscale';
import { PrismaClient } from '@prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;

const client = new Client({ url: connectionString })
const adapter = new PrismaPlanetScale(client);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
