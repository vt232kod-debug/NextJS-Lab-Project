"use client";

import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";

export default function SecurityPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/users/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to change password");

      setStatus("success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white">Security</h1>
      <Card className="shadow-sm mb-4 bg-[#3d352b] border-[#7a6b5a] text-white">
        <Card.Header as="h5">Change Password</Card.Header>
        <Card.Body>
          {status === "success" && (
            <div className="mb-3 text-sm text-green-400 bg-green-900/30 border border-green-800 rounded-lg p-3">
              Password updated successfully!
            </div>
          )}
          {status === "error" && (
            <div className="mb-3 text-sm text-red-400 bg-red-900/30 border border-red-800 rounded-lg p-3">
              {error}
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="currentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password (min 6 chars)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              style={{ backgroundColor: '#e8883a', borderColor: '#e8883a' }}
              type="submit"
              disabled={status === "loading"}
              className="hover:opacity-90 transition-all duration-300"
            >
              {status === "loading" ? "Updating…" : "Update Password"}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card className="shadow-sm bg-[#3d352b] border-[#7a6b5a] text-white">
        <Card.Header as="h5">Connected Providers</Card.Header>
        <Card.Body>
          <p className="text-white/60 text-sm">
            You can also sign in using Google or GitHub OAuth. If you signed
            in via OAuth, password change is not available.
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}
