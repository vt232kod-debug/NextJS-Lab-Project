import { auth } from '@/auth';
import sql from '@/app/lib/db-pool';
import bcrypt from 'bcryptjs';

// PATCH /api/users/me — update display name
export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name } = await request.json();
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return Response.json({ error: 'Name is required' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO users (email, name)
      VALUES (${session.user.email}, ${name.trim()})
      ON CONFLICT (email) DO UPDATE
        SET name = EXCLUDED.name
      RETURNING id, email, name, image
    `;
    return Response.json(result[0]);
  } catch (error) {
    console.error('PATCH /api/users/me error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: msg }, { status: 500 });
  }
}

// PUT /api/users/me — change password
export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword } = await request.json();
    if (!currentPassword || !newPassword) {
      return Response.json(
        { error: 'currentPassword and newPassword are required' },
        { status: 400 },
      );
    }
    if (typeof newPassword !== 'string' || newPassword.length < 6) {
      return Response.json(
        { error: 'New password must be at least 6 characters' },
        { status: 400 },
      );
    }

    const rows = await sql`
      SELECT password FROM users WHERE email = ${session.user.email}
    `;
    const user = rows[0];

    if (!user?.password) {
      return Response.json(
        { error: 'Password change is not available for OAuth accounts' },
        { status: 400 },
      );
    }

    const valid = await bcrypt.compare(currentPassword, user.password as string);
    if (!valid) {
      return Response.json({ error: 'Current password is incorrect' }, { status: 400 });
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    await sql`
      UPDATE users SET password = ${newHash} WHERE email = ${session.user.email}
    `;
    return Response.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('PUT /api/users/me error:', error);
    return Response.json({ error: 'Failed to change password' }, { status: 500 });
  }
}
