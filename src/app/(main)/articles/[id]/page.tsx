import Link from "next/link";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

async function getPost(id: string): Promise<Post> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

async function getComments(id: string): Promise<Comment[]> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
}

export async function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({ id: String(i + 1) }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [post, comments] = await Promise.all([getPost(id), getComments(id)]);

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        href="/articles"
        className="text-brand hover:underline mb-4 inline-block"
      >
        ← Back to Articles
      </Link>
      <article className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
        <span className="text-xs text-brand font-semibold uppercase tracking-wide">
          Post #{post.id} · User #{post.userId}
        </span>
        <h1 className="text-3xl font-bold mt-2 mb-4 capitalize text-gray-900">
          {post.title}
        </h1>
        <p className="text-gray-700 leading-relaxed">
          {post.body}
        </p>
      </article>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          Comments ({comments.length})
        </h2>
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-50 rounded-lg p-4 border border-gray-100"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <strong className="text-gray-900 capitalize">
                  {comment.name}
                </strong>
                <span className="text-xs text-gray-500">{comment.email}</span>
              </div>
              <p className="text-sm text-gray-600">
                {comment.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
