import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import sql from '@/app/lib/db-pool';
import ProfileSettingsForm from '@/components/ProfileSettingsForm';

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.email) redirect('/login');

  const rows = await sql`
    SELECT id, email, name FROM users WHERE email = ${session.user.email}
  `;
  const user = rows[0];

  return (
    <ProfileSettingsForm
      initialName={user?.name ?? session.user.name ?? ''}
      email={user?.email ?? session.user.email ?? ''}
    />
  );
}
