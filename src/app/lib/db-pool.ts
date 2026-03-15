import postgres from 'postgres';

// Pooled connection for regular API queries
const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export default sql;
