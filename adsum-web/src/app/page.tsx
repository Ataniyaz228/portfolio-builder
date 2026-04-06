'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, Variants } from 'framer-motion';
import { ArrowRight, Code2, Globe, Sparkles, Zap, CheckCircle2, Users, Star, Layers, Briefcase, GraduationCap, Palette } from 'lucide-react';
import AdsumLogo from '@/components/AdsumLogo';
import Link from 'next/link';

/* ─── Floating Shapes Background ─── */
function BackgroundMesh() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Grid */}
      <div className="absolute inset-0 mesh-grid animate-grid-fade opacity-60" />
      {/* Blurred floating orbs */}
      <div className="absolute top-[10%] left-[15%] w-72 h-72 rounded-full bg-foreground/[0.02] blur-3xl animate-float" />
      <div className="absolute top-[50%] right-[10%] w-96 h-96 rounded-full bg-foreground/[0.03] blur-3xl animate-float-delayed" />
      <div className="absolute bottom-[10%] left-[40%] w-64 h-64 rounded-full bg-foreground/[0.02] blur-3xl animate-float" style={{ animationDelay: '4s' }} />
    </div>
  );
}

/* ─── 3D Tilt Card ─── */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Staggered Text Reveal ─── */
function TextReveal({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.5 + i * 0.03, duration: 0.4, ease: 'easeOut' }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Portfolio Demo Card ─── */
function PortfolioDemo() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setStep(s => (s + 1) % 3), 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { label: 'Input Your Data', icon: Code2, content: (
      <div className="font-mono text-xs space-y-1.5 text-muted">
        <div><span className="text-foreground/60">name:</span> &quot;Alex Chen&quot;</div>
        <div><span className="text-foreground/60">role:</span> &quot;Full-Stack Developer&quot;</div>
        <div><span className="text-foreground/60">skills:</span> [&quot;React&quot;, &quot;Node&quot;, &quot;TypeScript&quot;]</div>
        <div><span className="text-foreground/60">projects:</span> 12</div>
      </div>
    )},
    { label: 'Adsum Generates', icon: Zap, content: (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
            <motion.div className="bg-foreground h-full rounded-full" animate={{ width: ['0%', '100%'] }} transition={{ duration: 2, ease: 'easeInOut' }} />
          </div>
        </div>
        <div className="text-xs text-muted space-y-1">
          <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Generating layout...</div>
          <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Optimizing SEO...</div>
          <div className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-amber-500 animate-pulse" /> Adding animations...</div>
        </div>
      </div>
    )},
    { label: 'Portfolio Ready', icon: Globe, content: (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 font-semibold">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" /> Live
          </div>
          <span className="text-muted">adsum.com/u/alexchen</span>
        </div>
        <div className="rounded-lg border border-border bg-background p-2 space-y-1.5">
          <div className="h-2 w-2/3 bg-foreground/10 rounded" />
          <div className="h-1.5 w-full bg-foreground/5 rounded" />
          <div className="h-1.5 w-4/5 bg-foreground/5 rounded" />
          <div className="flex gap-1 mt-2">
            {['React', 'Node', 'TS'].map(t => (
              <span key={t} className="px-1.5 py-0.5 text-[9px] rounded bg-foreground/5 text-muted">{t}</span>
            ))}
          </div>
        </div>
      </div>
    )},
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {steps.map((s, i) => (
        <motion.div
          key={i}
          className={`glass p-5 rounded-2xl transition-all duration-500 cursor-default ${step === i ? 'ring-2 ring-foreground/10 shadow-elevated scale-[1.02]' : 'opacity-60'}`}
          onClick={() => setStep(i)}
        >
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-colors ${step === i ? 'bg-foreground text-surface' : 'bg-background text-muted border border-border'}`}>
            <s.icon className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold mb-3 text-foreground">{s.label}</h4>
          <div className="min-h-[80px]">{s.content}</div>
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*                 MAIN PAGE                  */
/* ═══════════════════════════════════════════ */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const itemVariants: Variants = {
    hidden: { y: 24, opacity: 0, filter: 'blur(4px)' },
    visible: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 120, damping: 20 } },
  };

  const features = [
    { icon: Zap, title: 'Blazing Fast Edge SSR', desc: 'Powered by Next.js. Every profile is server-rendered in milliseconds for optimal performance and UX.', color: 'bg-amber-50 text-amber-600' },
    { icon: Code2, title: 'Premium Design System', desc: 'Say goodbye to generic templates. Offer a cinematic, animated viewing experience for your work.', color: 'bg-blue-50 text-blue-600' },
    { icon: Globe, title: 'Instant SEO Supremacy', desc: 'Fully structured Schema.org markup and semantic HTML so you rank on Google immediately.', color: 'bg-emerald-50 text-emerald-600' },
    { icon: Layers, title: 'One-Click Deploy', desc: 'Your portfolio is always live. Update your data and changes propagate instantly — no rebuilds.', color: 'bg-purple-50 text-purple-600' },
    { icon: Star, title: 'Analytics Dashboard', desc: 'Track who views your portfolio, which projects get the most attention, and optimize your presence.', color: 'bg-rose-50 text-rose-600' },
    { icon: Users, title: 'Made for Teams', desc: 'Perfect for bootcamps, universities, and dev teams. Manage multiple portfolios from one dashboard.', color: 'bg-cyan-50 text-cyan-600' },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BackgroundMesh />

      {/* ── Navbar ── */}
      <nav className={`fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 lg:px-12 z-50 transition-all duration-500 ${scrolled ? 'bg-surface/80 backdrop-blur-xl border-b border-border shadow-soft' : 'bg-transparent'}`}>
        <div className="flex items-center gap-2.5 text-xl font-bold tracking-tighter text-foreground">
          <motion.div
            className="w-8 h-8 rounded-xl bg-sidebar flex items-center justify-center text-white"
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <AdsumLogo className="w-4 h-4" />
          </motion.div>
          Adsum.
        </div>
        <div className="flex items-center gap-3 text-sm font-medium">
          <Link href="#features" className="px-4 py-2 text-muted hover:text-foreground transition-colors hidden lg:block">Features</Link>
          <Link href="#demo" className="px-4 py-2 text-muted hover:text-foreground transition-colors hidden lg:block">How It Works</Link>
          <Link href="/login" className="px-4 py-2 text-muted hover:text-foreground transition-colors hidden sm:block">Sign In</Link>
          <Link href="/register" className="px-5 py-2.5 rounded-xl bg-foreground text-surface hover:opacity-90 transition-all font-semibold shadow-soft">
            Get Started
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <motion.section
        className="flex flex-col items-center text-center w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full">
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface text-xs font-semibold uppercase tracking-widest text-foreground mb-10 shadow-soft">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-dot" />
            <span>Status: Ready</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-8 text-foreground">
            Your Professional <br />
            <TextReveal text="Portfolio, Redefined." className="text-muted" />
          </motion.h1>

          {/* Sub */}
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted text-balance max-w-2xl mx-auto mb-14 leading-relaxed">
            Adsum instantly transforms your data into a blazing-fast, SEO-optimized, beautifully animated portfolio. Stop wrestling with templates.{' '}
            <span className="text-foreground font-semibold">Start impressing.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <motion.div
                className="px-8 py-4 rounded-xl bg-foreground text-surface font-semibold flex items-center gap-2.5 shadow-card"
                whileHover={{ scale: 1.04, boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }}
                whileTap={{ scale: 0.98 }}
              >
                Create Your Portfolio
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Link>
            <Link href="#demo">
              <motion.div
                className="px-8 py-4 rounded-xl border border-border bg-surface font-semibold flex items-center text-foreground shadow-soft"
                whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
                whileTap={{ scale: 0.98 }}
              >
                See How It Works
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ── Demo Section ── */}
      <section id="demo" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface text-xs font-semibold uppercase tracking-widest text-muted mb-4 shadow-soft">
              How it works
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
              From Data to Portfolio<br />
              <span className="text-muted">in 60 Seconds</span>
            </h2>
            <p className="text-muted max-w-xl mx-auto">Enter your information, our engine generates a stunning portfolio, and you&apos;re live. That simple.</p>
          </div>
          <PortfolioDemo />
        </motion.div>
      </section>

      {/* ── Features Grid ── */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface text-xs font-semibold uppercase tracking-widest text-muted mb-4 shadow-soft">
            Features
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Everything You Need,<br />
            <span className="text-muted">Nothing You Don&apos;t</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <TiltCard className="glass p-7 rounded-2xl h-full hover:shadow-elevated transition-shadow duration-300 cursor-default">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${feature.color}`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{feature.desc}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Social Proof / Stats ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="glass-raised p-10 md:p-16 rounded-3xl text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 mesh-grid opacity-30" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
              Built for <span className="text-muted">Ambitious Developers</span>
            </h2>
            <p className="text-muted max-w-xl mx-auto mb-12">Join a growing community of professionals who chose to stand out.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '60s', label: 'Setup Time' },
                { value: '100%', label: 'SEO Score' },
                { value: '∞', label: 'Customizations' },
                { value: '0$', label: 'To Start' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: 'spring', stiffness: 150 }}
                >
                  <div className="text-3xl md:text-4xl font-extrabold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-foreground text-surface rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="mesh-grid h-full" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)' }} />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Ready to Stand Out?
            </h2>
            <p className="text-surface/60 max-w-lg mx-auto mb-10 text-lg">
              Create your portfolio in under a minute. No credit card required.
            </p>
            <Link href="/register">
              <motion.div
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-surface text-foreground font-semibold shadow-card"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-12 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-lg font-bold tracking-tighter text-foreground">
            <div className="w-7 h-7 rounded-lg bg-sidebar flex items-center justify-center text-white">
              <AdsumLogo className="w-3.5 h-3.5" />
            </div>
            Adsum.
          </div>
          <div className="flex items-center gap-6 text-sm text-muted">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#demo" className="hover:text-foreground transition-colors">How It Works</Link>
            <Link href="/login" className="hover:text-foreground transition-colors">Sign In</Link>
            <Link href="/register" className="hover:text-foreground transition-colors">Register</Link>
          </div>
          <p className="text-xs text-muted">&copy; {new Date().getFullYear()} Adsum. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
