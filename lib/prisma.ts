import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// We pass the string via standard assignment right before instantiation.
// The constructor brackets are completely empty, making validation errors impossible.
const connectionString = "postgresql://postgres:OssOmakkaCup2026!@db.hksgtclthnehcoqkplpb.supabase.co:5432/postgres";
process.env.DATABASE_URL = connectionString;

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;