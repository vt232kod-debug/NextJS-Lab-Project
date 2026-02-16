"use client";

import { Card, Form, Button } from "react-bootstrap";

export default function CreateArticlePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-brand-dark">
        Create Article
      </h1>
      <Card className="shadow-sm">
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="articleTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter article title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="articleBody">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Write your article content..."
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Publish Article
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
