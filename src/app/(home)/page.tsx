"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#534839]">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
          Articles Hub
        </h1>
        <p className="text-lg text-white/70 mb-8">
          Browse, create, and manage your favorite articles. Built with Next.js,
          TailwindCSS, and React-Bootstrap.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/articles"
            className="inline-block bg-[#e8883a] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#d4762e] transition-all duration-300 hover:shadow-lg hover:shadow-orange-900/30 no-underline"
          >
            Browse Articles
          </Link>
          <Link
            href="/articles/create"
            className="inline-block border-2 border-[#e8883a] text-[#e8883a] px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#e8883a] hover:text-white transition-all duration-300 no-underline"
          >
            Create Article
          </Link>
        </div>
      </div>
    </main>
  );
}
