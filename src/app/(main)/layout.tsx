import Link from "next/link";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-900 text-white sticky top-0 z-50">
        <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 h-14">
          <Link href="/" className="text-xl font-bold text-white no-underline">
            Articles Hub
          </Link>
          <ul className="flex gap-1 list-none m-0 p-0">
            <li>
              <Link
                href="/articles"
                className="text-gray-300 hover:text-white px-3 py-2 rounded text-sm no-underline"
              >
                Articles
              </Link>
            </li>
            <li>
              <Link
                href="/profile/settings"
                className="text-gray-300 hover:text-white px-3 py-2 rounded text-sm no-underline"
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                href="/profile/security"
                className="text-gray-300 hover:text-white px-3 py-2 rounded text-sm no-underline"
              >
                Security
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        {children}
      </main>
      <footer className="text-center py-4 text-sm text-gray-500 border-t border-gray-200">
        © 2026 Articles Hub
      </footer>
    </div>
  );
}
