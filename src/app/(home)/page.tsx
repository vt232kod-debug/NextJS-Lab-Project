"use client";

import Link from "next/link";
import { Button } from "react-bootstrap";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-brand-light to-white">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-brand-dark mb-4 tracking-tight">
          Articles Hub
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Browse, create, and manage your favorite articles. Built with Next.js,
          TailwindCSS, and React-Bootstrap.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/articles">
            <Button variant="primary" size="lg" className="px-8">
              Browse Articles
            </Button>
          </Link>
          <Link href="/articles/create">
            <Button variant="outline-secondary" size="lg" className="px-8">
              Create Article
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
