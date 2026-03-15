import postgres from 'postgres';

// Use unpooled connection for migrations/seed, pooled for regular queries
// prepare: false is required for Neon PgBouncer (pooled) connections
const sql = postgres(
  process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL!,
  { ssl: 'require', prepare: false },
);

export default sql;
