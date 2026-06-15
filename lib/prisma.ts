import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const connectionString = process.env.DATABASE_URL || process.env.NEXT_PUBLIC_BUILD_DB_URL;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: connectionString,
  } as any);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
