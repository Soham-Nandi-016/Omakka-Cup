import { Pool } from "pg";

// Changed to use the official Supabase transaction/session pooler domain
const CONNECTION_STRING =
  "postgresql://postgres.hksgtclthnehcoqkplpb:OssOmakkaCup2026!@aws-0-ap-south-1.pooler.supabase.com:5432/postgres";

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