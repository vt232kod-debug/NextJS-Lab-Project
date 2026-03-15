import { signOut } from '@/auth';

export default function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/login' });
      }}
    >
      <button
        type="submit"
        className="text-sm text-white/80 hover:text-white border border-[#e8883a]/50 rounded-lg px-3 py-1 hover:border-[#e8883a] hover:bg-[#e8883a]/20 transition-all duration-300"
      >
        Sign Out
      </button>
    </form>
  );
}
