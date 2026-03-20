"use client";

import useSWR from "swr";
import Link from "next/link";
import { Article } from "@/app/lib/definitions";

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`API error: ${r.status}`);
    return r.json();
  });

export default function ArticlesPage() {
  const { data: articles, error, isLoading } = useSWR<Article[]>(
    "/api/articles",
    fetcher
  );

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6 text-white">Articles</h1>
        <p className="text-white/50">Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6 text-white">Articles</h1>
        <p className="text-red-500">Failed to load articles.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Articles</h1>
        <Link
          href="/articles/create"
          className="bg-[#e8883a] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#d4762e] transition-all duration-300 no-underline"
        >
          + New Article
        </Link>
      </div>
      <div className="grid grid-cols-1 md-screen:grid-cols-2 lg-screen:grid-cols-3 gap-4">
        {articles?.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.id}`}
            className="block no-underline"
          >
            <div className="border border-[#7a6b5a] rounded-xl p-4 hover:shadow-lg transition-all duration-300 bg-[#3d352b] hover:border-[#e8883a]">
              <span className="text-xs text-[#e8883a] font-semibold uppercase tracking-wide">
                Article #{article.id}
              </span>
              <h2 className="text-lg font-semibold mt-1 mb-2 text-white capitalize">
                {article.title}
              </h2>
              <p className="text-sm text-white/60 line-clamp-2">
                {article.body}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
