"use client";

import useSWR from "swr";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Article } from "@/app/lib/definitions";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: article, error, isLoading } = useSWR<Article>(
    `/api/articles/${id}`,
    fetcher
  );

  async function handleDelete() {
    if (!confirm("Delete this article?")) return;
    await fetch(`/api/articles/${id}`, { method: "DELETE" });
    router.push("/articles");
    router.refresh();
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto">
        <Link href="/articles" className="text-brand hover:underline mb-4 inline-block">
          ← Back to Articles
        </Link>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 animate-pulse">
          <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
          <div className="h-8 w-3/4 bg-gray-200 rounded mb-4" />
          <div className="h-4 w-full bg-gray-200 rounded mb-2" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-3xl mx-auto">
        <Link href="/articles" className="text-brand hover:underline mb-4 inline-block">
          ← Back to Articles
        </Link>
        <p className="text-red-500">Article not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        href="/articles"
        className="text-brand hover:underline mb-4 inline-block"
      >
        ← Back to Articles
      </Link>
      <article className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs text-brand font-semibold uppercase tracking-wide">
            Article #{article.id} · User #{article.user_id}
          </span>
          <button
            onClick={handleDelete}
            className="text-xs text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
        <h1 className="text-3xl font-bold mt-2 mb-4 capitalize text-gray-900">
          {article.title}
        </h1>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {article.body}
        </p>
        <p className="text-xs text-gray-400 mt-4">
          Created: {new Date(article.created_at).toLocaleString()}
        </p>
      </article>
    </div>
  );
}

