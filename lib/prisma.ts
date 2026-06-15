import { Pool } from "pg";

declare global {
  // Prevent multiple Pool instances during Next.js dev hot-reload
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
}

if (!global._pgPool) {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "[db] DATABASE_URL environment variable is not set. " +
        "Add it to your .env.local (dev) and Vercel Environment Variables (production)."
    );
  }

  global._pgPool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    // max:1 is critical for Vercel serverless — each function invocation is
    // short-lived, so we never need more than 1 connection per instance.
    // Higher values exhaust Supabase free-tier's 60-connection limit fast.
    max: 1,
    idleTimeoutMillis: 0,       // release immediately when idle
    connectionTimeoutMillis: 10_000,
  });
}

// Always defined — throws above if DATABASE_URL is missing
export const pool = global._pgPool as Pool;