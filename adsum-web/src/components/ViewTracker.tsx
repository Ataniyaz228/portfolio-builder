'use client';

import { useEffect } from 'react';

export default function ViewTracker({ username }: { username: string }) {
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
    const token = typeof window !== 'undefined' ? localStorage.getItem('adsum_token') : null;

    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    fetch(`${baseUrl}/users/${username}/track-view`, {
      method: 'POST',
      headers,
    }).catch(() => {
      // Silently fail — view tracking is non-critical
    });
  }, [username]);

  return null;
}
