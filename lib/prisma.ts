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
    // Conservative pool sizing — Supabase free tier has a 60-connection limit
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });
}

// Always defined — throws above if DATABASE_URL is missing
export const pool = global._pgPool as Pool;