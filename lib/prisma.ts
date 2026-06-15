import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const connectionString = "postgresql://postgres:OssOmakkaCup2026!@db.hksgtclthnehcoqkplpb.supabase.co:5432/postgres";

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
    datasources: {
      db: {
        url: connectionString,
      },
    },
  } as any);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;