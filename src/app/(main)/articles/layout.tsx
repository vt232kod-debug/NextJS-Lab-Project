import NavLink from "@/components/NavLink";

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
            <NavLink
              href="/articles"
              className="text-gray-700 hover:bg-gray-200 px-4 py-2 rounded text-sm no-underline inline-block"
              activeClassName="!bg-blue-600 !text-white"
              exact
            >
              All Articles
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/articles/favorite"
              className="text-gray-700 hover:bg-gray-200 px-4 py-2 rounded text-sm no-underline inline-block"
              activeClassName="!bg-blue-600 !text-white"
            >
              Favorites
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/articles/create"
              className="text-gray-700 hover:bg-gray-200 px-4 py-2 rounded text-sm no-underline inline-block"
              activeClassName="!bg-blue-600 !text-white"
            >
              Create
            </NavLink>
          </li>
        </ul>
      </nav>
      <div>{children}</div>
    </div>
  );
}
