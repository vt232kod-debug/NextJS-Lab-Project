import Link from "next/link";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "force-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default async function ArticlesPage() {
  const posts = await getPosts();
  const displayedPosts = posts.slice(0, 20);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-brand-dark">Articles</h1>
      <div className="grid grid-cols-1 md-screen:grid-cols-2 lg-screen:grid-cols-3 gap-4">
        {displayedPosts.map((post) => (
          <Link
            key={post.id}
            href={`/articles/${post.id}`}
            className="block no-underline"
          >
            <div className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow bg-white">
              <span className="text-xs text-brand font-semibold uppercase tracking-wide">
                Post #{post.id}
              </span>
              <h2 className="text-lg font-semibold mt-1 mb-2 text-gray-900 capitalize">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-2">
                {post.body}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
