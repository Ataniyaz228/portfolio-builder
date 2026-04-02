'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, UserPlus, Eye, EyeOff, Code2, Palette, GraduationCap, Briefcase, CheckCircle2, Globe, Zap, Shield } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

/* ─── Password Strength ─── */
function getPasswordStrength(pass: string) {
  let score = 0;
  if (pass.length >= 6) score++;
  if (pass.length >= 10) score++;
  if (/[A-Z]/.test(pass)) score++;
  if (/[0-9]/.test(pass)) score++;
  if (/[^A-Za-z0-9]/.test(pass)) score++;
  if (score <= 1) return { level: 'weak', label: 'Weak', cls: 'strength-weak' };
  if (score <= 2) return { level: 'fair', label: 'Fair', cls: 'strength-fair' };
  if (score <= 3) return { level: 'good', label: 'Good', cls: 'strength-good' };
  return { level: 'strong', label: 'Strong', cls: 'strength-strong' };
}

/* ─── Rotating Features Panel ─── */
function RotatingFeatures() {
  const [idx, setIdx] = useState(0);
  const features = [
    { icon: Zap, title: 'Instant Portfolio Generation', desc: 'Enter your data and get a stunning, SEO-optimized portfolio in under 60 seconds.' },
    { icon: Globe, title: 'Your Personal Domain', desc: 'Get a clean, memorable URL like adsum.com/u/yourname — ready to share anywhere.' },
    { icon: Shield, title: 'Enterprise-Grade', desc: 'Built on Next.js & NestJS. Server-rendered, secure, and blazing fast.' },
    { icon: Code2, title: 'Developer First', desc: 'Designed by developers, for developers. Clean code, modern stack, no bloat.' },
  ];

  useEffect(() => {
    const interval = setInterval(() => setIdx(i => (i + 1) % features.length), 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="relative h-48 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mb-4">
            {(() => { const Icon = features[idx].icon; return <Icon className="w-6 h-6 text-white" />; })()}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{features[idx].title}</h3>
          <p className="text-white/60 text-sm leading-relaxed">{features[idx].desc}</p>
        </motion.div>
      </AnimatePresence>
      {/* Dots */}
      <div className="absolute bottom-0 flex gap-2">
        {features.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-white w-6' : 'bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Browser Preview Frame ─── */
function BrowserPreview({ username }: { username: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-black/20 backdrop-blur">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
        </div>
        <div className="flex-1 text-center">
          <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-md bg-white/5 text-[11px] text-white/50 font-mono">
            <Globe className="w-2.5 h-2.5" />
            adsum.com/u/<span className="text-white font-semibold">{username || 'yourname'}</span>
          </div>
        </div>
      </div>
      {/* Preview content */}
      <div className="p-4 space-y-2">
        <div className="h-3 w-1/2 bg-white/10 rounded" />
        <div className="h-2 w-full bg-white/5 rounded" />
        <div className="h-2 w-3/4 bg-white/5 rounded" />
        <div className="flex gap-1.5 mt-3">
          {['React', 'Node', 'TS'].map(t => (
            <span key={t} className="px-2 py-0.5 text-[9px] rounded bg-white/5 text-white/40">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════ */
/*         REGISTER PAGE              */
/* ═══════════════════════════════════ */
export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({ username: '', email: '', full_name: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const passwordStrength = useMemo(() => getPasswordStrength(formData.password), [formData.password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await register(formData);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create account');
    }
  };

  const inputClass = (field: string) =>
    `w-full bg-background border rounded-xl px-4 py-3 focus:outline-none transition-all duration-300 font-medium placeholder:text-muted/40 text-foreground ${
      focusedField === field
        ? 'border-foreground/30 shadow-[0_0_0_3px_rgba(26,26,46,0.06)]'
        : 'border-border'
    }`;

  return (
    <div className="min-h-screen flex bg-background">
      {/* ── Left Panel ── */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] bg-sidebar relative overflow-hidden flex-col justify-between p-12">
        {/* Mesh overlay */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        {/* Floating orbs */}
        <div className="absolute top-[20%] right-[-10%] w-64 h-64 rounded-full bg-white/[0.02] blur-3xl animate-float" />
        <div className="absolute bottom-[10%] left-[-5%] w-48 h-48 rounded-full bg-white/[0.03] blur-3xl animate-float-delayed" />

        <div className="relative z-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 text-xl font-bold tracking-tighter text-white mb-16">
            <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            Adsum.
          </Link>

          {/* Rotating features */}
          <RotatingFeatures />
        </div>

        <div className="relative z-10 space-y-6">
          {/* Browser preview */}
          <BrowserPreview username={formData.username} />

          {/* Testimonial */}
          <div className="flex items-center gap-3 mt-6">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 text-xs font-bold">AC</div>
            <div>
              <p className="text-white/80 text-sm">&ldquo;Set up my portfolio in 2 minutes flat.&rdquo;</p>
              <p className="text-white/40 text-xs mt-0.5">Alex Chen, Full-Stack Developer</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel (Form) ── */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 relative">
        {/* Mobile logo */}
        <Link href="/" className="lg:hidden absolute top-6 left-6 flex items-center gap-2 text-lg font-bold tracking-tighter">
          <div className="w-8 h-8 rounded-xl bg-sidebar flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          Adsum.
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface text-xs font-semibold uppercase tracking-widest text-muted mb-5 shadow-soft">
              <UserPlus className="w-3 h-3" /> Create Account
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground mb-1">Join Adsum</h2>
            <p className="text-muted text-sm">Build your professional portfolio in under a minute.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl overflow-hidden"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase tracking-wide">Full Name</label>
              <input
                type="text" required
                className={inputClass('full_name')}
                placeholder="John Doe"
                value={formData.full_name}
                onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                onFocus={() => setFocusedField('full_name')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase tracking-wide">Email</label>
              <input
                type="email" required
                className={inputClass('email')}
                placeholder="john@example.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {/* Username + Preview */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase tracking-wide">Username</label>
              <input
                type="text" required
                className={inputClass('username')}
                placeholder="johndoe"
                value={formData.username}
                onChange={e => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '') })}
                onFocus={() => setFocusedField('username')}
                onBlur={() => setFocusedField(null)}
              />
              <motion.p
                className="text-[11px] ml-1 flex items-center gap-1"
                animate={{ color: formData.username ? 'var(--foreground)' : 'var(--muted)' }}
              >
                <Globe className="w-3 h-3" />
                adsum.com/u/<span className="font-semibold">{formData.username || 'username'}</span>
              </motion.p>
            </div>

            {/* Password + Strength */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted uppercase tracking-wide">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required minLength={6}
                  className={inputClass('password')}
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Strength meter */}
              {formData.password.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex items-center gap-2 mt-1"
                >
                  <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full transition-all duration-500 ${passwordStrength.cls}`}
                      layout
                    />
                  </div>
                  <span className={`text-[11px] font-semibold ${
                    passwordStrength.level === 'strong' ? 'text-emerald-600' :
                    passwordStrength.level === 'good' ? 'text-blue-600' :
                    passwordStrength.level === 'fair' ? 'text-amber-600' : 'text-red-500'
                  }`}>
                    {passwordStrength.label}
                  </span>
                </motion.div>
              )}
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-foreground text-surface py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <motion.div
                  className="w-5 h-5 border-2 border-surface/30 border-t-surface rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Sign in link */}
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted">
              Already have an account?{' '}
              <Link href="/login" className="text-foreground hover:underline font-semibold">Sign in</Link>
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 mt-8 text-muted">
            {[
              { icon: Shield, text: 'Secure' },
              { icon: Zap, text: 'Fast' },
              { icon: CheckCircle2, text: 'Free' },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs font-medium">
                <badge.icon className="w-3.5 h-3.5" />
                {badge.text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
