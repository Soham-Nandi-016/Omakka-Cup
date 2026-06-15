import { Pool } from "pg";

const CONNECTION_STRING =
  "postgresql://postgres:OssOmakkaCup2026!@db.hksgtclthnehcoqkplpb.supabase.co:5432/postgres";

declare global {
  // Prevent multiple Pool instances in dev hot-reload
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
}

if (!global._pgPool) {
  global._pgPool = new Pool({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false },
  });
}

export const pool = global._pgPool;