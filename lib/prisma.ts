import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const connectionString = "postgresql://postgres:OssOmakkaCup2026!@db.hksgtclthnehcoqkplpb.supabase.co:5432/postgres";

if (!global.prisma) {
  global.prisma = new PrismaClient({
    log: ["query"],
    datasourceUrl: connectionString,
  } as any);
}

export const prisma = global.prisma;