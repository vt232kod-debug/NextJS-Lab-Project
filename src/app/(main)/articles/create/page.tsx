"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Form, Button } from "react-bootstrap";

export default function CreateArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, user_id: 1 }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to create article");
      }

      router.push("/articles");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Create Article
      </h1>
      <Card className="shadow-sm bg-[#3d352b] border-[#7a6b5a] text-white">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-3 text-sm text-red-400 bg-red-900/30 border border-red-800 rounded-lg p-3">
                {error}
              </div>
            )}
            <Form.Group className="mb-3" controlId="articleTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter article title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="articleBody">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Write your article content..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              style={{ backgroundColor: '#e8883a', borderColor: '#e8883a' }}
              type="submit"
              disabled={loading}
              className="hover:opacity-90 transition-all duration-300"
            >
              {loading ? "Publishing..." : "Publish Article"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
