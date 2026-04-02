'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { motion } from 'framer-motion';
import { 
  Eye, Briefcase, Star, Activity, ArrowRight, Loader2, TrendingUp,
  Plus, Sparkles, ExternalLink, CheckCircle2, Circle, Clock, Zap
} from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/axios';
import ViewsChart from '@/components/ViewsChart';

export default function DashboardOverview() {
  const { user } = useAuthStore();
  const [data, setData] = useState({ views: 0, projects: 0, skills: 0, experiences: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users/me/stats')
      .then(res => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const username = (user as any)?.username || '';
  const fullName = (user as any)?.full_name || username;
  const firstName = fullName?.split(' ')[0] || username;
  const personalizedGreetings = [
    `Ready to showcase your work, ${firstName}?`,
    `What will you build today, ${firstName}?`,
    `Your portfolio is waiting, ${firstName}.`,
    `Let's make something great, ${firstName}.`,
    `Time to shine, ${firstName}!`,
  ];
  const randomGreeting = personalizedGreetings[Math.floor(Math.random() * personalizedGreetings.length)];

  const stats = [
    { label: 'Profile Views', value: data.views, icon: Eye, gradient: 'from-blue-500 to-indigo-600', bg: 'bg-blue-50', text: 'text-blue-600' },
    { label: 'Projects', value: data.projects, icon: Briefcase, gradient: 'from-violet-500 to-purple-600', bg: 'bg-violet-50', text: 'text-violet-600' },
    { label: 'Skills', value: data.skills, icon: Star, gradient: 'from-amber-500 to-orange-600', bg: 'bg-amber-50', text: 'text-amber-600' },
    { label: 'Experience', value: data.experiences, icon: Activity, gradient: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50', text: 'text-emerald-600' },
  ];

  const quickActions = [
    { label: 'Add a project', desc: 'Show what you\'ve built', href: '/dashboard/projects', icon: Briefcase, color: 'text-violet-600 bg-violet-50' },
    { label: 'Update skills', desc: 'Keep your stack sharp', href: '/dashboard/skills', icon: Star, color: 'text-amber-600 bg-amber-50' },
    { label: 'Add experience', desc: 'Tell your career story', href: '/dashboard/experience', icon: Clock, color: 'text-emerald-600 bg-emerald-50' },
  ];

  const setupSteps = [
    { label: 'Add your first project', done: data.projects > 0, href: '/dashboard/projects' },
    { label: 'Publish your skills', done: data.skills > 0, href: '/dashboard/skills' },
    { label: 'Add work experience', done: data.experiences > 0, href: '/dashboard/experience' },
  ];
  const completedSteps = setupSteps.filter(s => s.done).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* ── Compact Hero Banner ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sidebar via-[#252540] to-[#1a1a35] p-6">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-[-30%] right-[-10%] w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl" />
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-1">
              {randomGreeting}
            </h1>
            <p className="text-white/40 text-sm">
              {data.views} views · {data.projects} projects · {data.skills} skills
            </p>
          </div>
          <a
            href={`/u/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-sidebar font-semibold text-sm hover:shadow-elevated transition-all shrink-0"
          >
            <ExternalLink className="w-4 h-4" />
            View Portfolio
          </a>
        </div>
      </div>

      {/* ── Enhanced Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className="glass rounded-2xl p-6 hover:shadow-elevated transition-all duration-300 group cursor-default"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.text}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-border group-hover:text-emerald-400 transition-colors" />
            </div>
            <div>
              <h3 className="text-4xl font-extrabold tracking-tight text-foreground mb-1">
                {loading ? <Loader2 className="w-8 h-8 animate-spin text-muted" /> : stat.value}
              </h3>
              <p className="text-sm font-medium text-muted">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Views Analytics Chart ── */}
      <ViewsChart />

      {/* ── Two Column Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-3 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              Quick Actions
            </h2>
          </div>
          <div className="space-y-2">
            {quickActions.map((action, i) => (
              <Link
                key={i}
                href={action.href}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-background border border-transparent hover:border-border transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${action.color}`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{action.label}</p>
                  <p className="text-xs text-muted">{action.desc}</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="w-4 h-4 text-muted" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Setup Progress */}
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              Setup Progress
            </h2>
            <span className="text-xs font-bold text-muted px-2.5 py-1 rounded-full bg-background">
              {completedSteps}/{setupSteps.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-2 rounded-full bg-background overflow-hidden mb-5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${(completedSteps / setupSteps.length) * 100}%` }}
              transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            />
          </div>

          <div className="space-y-1">
            {setupSteps.map((step, i) => (
              <Link
                key={i}
                href={step.href}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-background transition-all group"
              >
                {step.done ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-border group-hover:text-muted shrink-0 transition-colors" />
                )}
                <span className={`text-sm font-medium flex-1 ${step.done ? 'text-muted line-through' : 'text-foreground'}`}>
                  {step.label}
                </span>
                {!step.done && (
                  <ArrowRight className="w-3.5 h-3.5 text-muted/0 group-hover:text-muted transition-all" />
                )}
              </Link>
            ))}
          </div>

          {completedSteps === setupSteps.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-center"
            >
              <p className="text-xs font-semibold text-emerald-600">🎉 All set! Your portfolio is ready to shine.</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
