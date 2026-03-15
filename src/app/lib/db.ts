import postgres from 'postgres';

// Use unpooled connection for migrations/seed, pooled for regular queries
const sql = postgres(
  process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL!,
  { ssl: 'require' },
);

export default sql;
