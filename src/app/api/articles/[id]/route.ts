import sql from '@/app/lib/db-pool';

type Params = { params: Promise<{ id: string }> };

// GET /api/articles/[id] — get a single article
export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const result = await sql`
      SELECT * FROM articles WHERE id = ${id}
    `;
    if (!result.length) {
      return Response.json({ error: 'Article not found' }, { status: 404 });
    }
    return Response.json(result[0]);
  } catch (error) {
    console.error('GET /api/articles/[id] error:', error);
    return Response.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}

// PATCH /api/articles/[id] — update an article
export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const { title, body } = await req.json();

    if (!title && !body) {
      return Response.json({ error: 'At least one of title or body is required' }, { status: 400 });
    }

    const current = await sql`SELECT * FROM articles WHERE id = ${id}`;
    if (!current.length) {
      return Response.json({ error: 'Article not found' }, { status: 404 });
    }

    const result = await sql`
      UPDATE articles
      SET
        title = ${title ?? current[0].title},
        body  = ${body  ?? current[0].body}
      WHERE id = ${id}
      RETURNING *
    `;
    return Response.json(result[0]);
  } catch (error) {
    console.error('PATCH /api/articles/[id] error:', error);
    return Response.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

// DELETE /api/articles/[id] — delete an article
export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const result = await sql`
      DELETE FROM articles WHERE id = ${id} RETURNING *
    `;
    if (!result.length) {
      return Response.json({ error: 'Article not found' }, { status: 404 });
    }
    return Response.json({ message: 'Article deleted successfully', article: result[0] });
  } catch (error) {
    console.error('DELETE /api/articles/[id] error:', error);
    return Response.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}
