import sql from '@/app/lib/db';
import { articles } from '@/app/lib/placeholder-data';
import bcrypt from 'bcryptjs';

async function seedUsers() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(255),
      email      VARCHAR(255) UNIQUE NOT NULL,
      password   VARCHAR(255),
      image      TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  // Ensure columns exist for tables created before this script
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS name VARCHAR(255)`;
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS password VARCHAR(255)`;
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS image TEXT`;
  // Allow NULL password for OAuth users
  await sql`ALTER TABLE users ALTER COLUMN password DROP NOT NULL`;

  const passwordHash = await bcrypt.hash('password123', 10);
  await sql`
    INSERT INTO users (email, name, password)
    VALUES ('admin@example.com', 'Admin User', ${passwordHash})
    ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password;
  `;
}

async function seedArticles() {
  await sql`
    CREATE TABLE IF NOT EXISTS articles (
      id        SERIAL PRIMARY KEY,
      user_id   INT NOT NULL,
      title     VARCHAR(255) NOT NULL,
      body      TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  const inserted = await Promise.all(
    articles.map(
      (article) => sql`
        INSERT INTO articles (user_id, title, body)
        VALUES (${article.user_id}, ${article.title}, ${article.body})
        ON CONFLICT DO NOTHING;
      `,
    ),
  );

  return inserted;
}

export async function GET() {
  try {
    await seedUsers();
    await seedArticles();
    return Response.json({ message: 'Database seeded successfully!' });
  } catch (error) {
    console.error('Seed error:', error);
    return Response.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}
