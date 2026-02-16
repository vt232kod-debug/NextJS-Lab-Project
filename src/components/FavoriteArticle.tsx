import Link from "next/link";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function getPost(id: number): Promise<Post> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    { cache: "force-cache" }
  );
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

export default async function FavoriteArticle({ id }: { id: number }) {
  const post = await getPost(id);

  return (
    <Link href={`/articles/${post.id}`} className="block no-underline">
      <div className="bg-white rounded-xl p-5 shadow-md border-l-4 border-brand hover:shadow-lg transition-shadow h-full">
        <span className="text-xs text-brand font-semibold uppercase tracking-wide">
          Favorite #{post.id}
        </span>
        <h3 className="text-lg font-bold mt-2 mb-3 capitalize text-gray-900 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-4">
          {post.body}
        </p>
      </div>
    </Link>
  );
}
