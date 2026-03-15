import postgres from 'postgres';

// Pooled connection for regular API queries
// prepare: false is required for Neon PgBouncer (pooled) connections
const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require', prepare: false });

export default sql;
