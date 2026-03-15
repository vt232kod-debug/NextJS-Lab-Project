import sql from '@/app/lib/db';
import { articles } from '@/app/lib/placeholder-data';

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
    await seedArticles();
    return Response.json({ message: 'Database seeded successfully!' });
  } catch (error) {
    console.error('Seed error:', error);
    return Response.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}
