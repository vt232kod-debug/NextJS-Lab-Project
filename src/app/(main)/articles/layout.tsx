import Link from "next/link";

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className="bg-gray-100 rounded-lg p-1 mb-4">
        <ul className="flex gap-1 list-none m-0 p-0">
          <li>
            <Link
              href="/articles"
              className="text-gray-700 hover:bg-gray-200 px-4 py-2 rounded text-sm no-underline inline-block"
            >
              All Articles
            </Link>
          </li>
          <li>
            <Link
              href="/articles/favorite"
              className="text-gray-700 hover:bg-gray-200 px-4 py-2 rounded text-sm no-underline inline-block"
            >
              Favorites
            </Link>
          </li>
          <li>
            <Link
              href="/articles/create"
              className="text-gray-700 hover:bg-gray-200 px-4 py-2 rounded text-sm no-underline inline-block"
            >
              Create
            </Link>
          </li>
        </ul>
      </nav>
      <div>{children}</div>
    </div>
  );
}
