"use client";

import { Card, Form, Button } from "react-bootstrap";

export default function SecurityPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-brand-dark">Security</h1>
      <Card className="shadow-sm mb-4">
        <Card.Header as="h5">Change Password</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="currentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter current password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Card className="shadow-sm">
        <Card.Header as="h5">Two-Factor Authentication</Card.Header>
        <Card.Body>
          <p className="text-gray-600">
            Two-factor authentication adds an extra layer of security to your
            account.
          </p>
          <Button variant="outline-primary">Enable 2FA</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
