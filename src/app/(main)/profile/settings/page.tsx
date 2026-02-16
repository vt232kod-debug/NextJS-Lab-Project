"use client";

import { Card, Form, Button } from "react-bootstrap";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-brand-dark">
        Profile Settings
      </h1>
      <Card className="shadow-sm">
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="displayName">
              <Form.Label>Display Name</Form.Label>
              <Form.Control type="text" placeholder="John Doe" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="john@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="bio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Tell us about yourself..."
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
