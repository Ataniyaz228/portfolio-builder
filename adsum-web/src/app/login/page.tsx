'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(formData);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  const inputClass = "w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-foreground/10 transition-all font-medium placeholder:text-muted/50 text-foreground";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
        <div className="w-8 h-8 rounded-xl bg-sidebar flex items-center justify-center text-white">
          <Sparkles className="w-4 h-4" />
        </div>
        Adsum.
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface p-8 sm:p-10 rounded-2xl border border-border shadow-elevated"
      >
        <h2 className="text-2xl font-bold mb-1 tracking-tight">Welcome back</h2>
        <p className="text-muted mb-8 text-sm">Sign in to manage your professional portfolio.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">{error}</div>}
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted uppercase tracking-wide">Username</label>
            <input type="text" required className={inputClass} placeholder="e.g. johndoe"
              value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-muted uppercase tracking-wide">Password</label>
              <Link href="#" className="text-xs text-muted hover:text-foreground transition-colors">Forgot?</Link>
            </div>
            <input type="password" required className={inputClass} placeholder="••••••••"
              value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button type="submit" disabled={isLoading}
            className="w-full mt-4 bg-foreground text-surface py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 group"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
            {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-muted">
          Don&apos;t have an account? <Link href="/register" className="text-foreground hover:underline font-semibold">Create one</Link>
        </p>
      </motion.div>
    </div>
  );
}
