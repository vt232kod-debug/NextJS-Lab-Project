'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Form, Button } from 'react-bootstrap';

interface Props {
  initialName: string;
  email: string;
}

export default function ProfileSettingsForm({ initialName, email }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const res = await fetch('/api/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Failed to save');
      }

      setStatus('success');
      router.refresh();
    } catch (err: unknown) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white">Profile Settings</h1>
      <Card className="shadow-sm bg-[#3d352b] border-[#7a6b5a] text-white">
        <Card.Body>
          {status === 'success' && (
            <div className="mb-3 text-sm text-green-400 bg-green-900/30 border border-green-800 rounded-lg p-3">
              Profile updated successfully!
            </div>
          )}
          {status === 'error' && (
            <div className="mb-3 text-sm text-red-400 bg-red-900/30 border border-red-800 rounded-lg p-3">
              {error}
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="displayName">
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} disabled readOnly />
              <Form.Text className="text-white/50">Email cannot be changed here.</Form.Text>
            </Form.Group>
            <Button
              style={{ backgroundColor: '#e8883a', borderColor: '#e8883a' }}
              type="submit"
              disabled={status === 'loading'}
              className="hover:opacity-90 transition-all duration-300"
            >
              {status === 'loading' ? 'Saving…' : 'Save Changes'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
