import sql from '@/app/lib/db-pool';

// GET /api/articles — list all articles
export async function GET() {
  try {
    const articles = await sql`
      SELECT * FROM articles ORDER BY created_at DESC
    `;
    return Response.json(articles);
  } catch (error) {
    console.error('GET /api/articles error:', error);
    return Response.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

// POST /api/articles — create a new article
export async function POST(request: Request) {
  try {
    const { user_id, title, body } = await request.json();

    if (!title || !body) {
      return Response.json({ error: 'title and body are required' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO articles (user_id, title, body)
      VALUES (${user_id ?? 1}, ${title}, ${body})
      RETURNING *
    `;
    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error('POST /api/articles error:', error);
    return Response.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
