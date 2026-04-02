'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, LayoutDashboard, Briefcase, Code, Star, 
  Mail, LogOut, Settings, MessageSquare, 
  Globe, ChevronRight, PanelLeftClose, PanelLeft, 
  ExternalLink, Bell
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, logout, user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (!isAuthenticated && !isLoading) return null;

  const navLinks = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/dashboard/projects', icon: Briefcase },
    { name: 'Experience', href: '/dashboard/experience', icon: Code },
    { name: 'Skills', href: '/dashboard/skills', icon: Star },
    { name: 'Testimonials', href: '/dashboard/testimonials', icon: MessageSquare },
    { name: 'Messages', href: '/dashboard/messages', icon: Mail },
  ];

  const username = (user as any)?.username || '';
  const fullName = (user as any)?.full_name || username;
  const initials = fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <div className="min-h-screen flex bg-background">
      {/* ═══ Sidebar ═══ */}
      <aside className={`${collapsed ? 'w-[76px]' : 'w-[264px]'} bg-sidebar flex flex-col h-screen sticky top-0 shrink-0 z-20 transition-all duration-300 ease-in-out`}>
        {/* Header */}
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} px-5 pt-6 pb-5`}>
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tighter text-white">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              Adsum
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all ${collapsed ? '' : ''}`}
          >
            {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 overflow-y-auto styled-scrollbar">
          {!collapsed && (
            <div className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-2 px-3">
              Menu
            </div>
          )}
          <div className="space-y-1">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 ${collapsed ? 'justify-center px-0' : 'px-3'} py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 relative group ${
                    isActive
                      ? 'bg-white/15 text-white'
                      : 'text-white/50 hover:text-white hover:bg-white/8'
                  }`}
                  title={collapsed ? link.name : undefined}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-white rounded-r-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <link.icon className="w-[18px] h-[18px] shrink-0" />
                  {!collapsed && <span className="flex-1">{link.name}</span>}
                  {!collapsed && isActive && <ChevronRight className="w-3.5 h-3.5 opacity-40" />}
                </Link>
              );
            })}
          </div>

          {/* Portfolio Link */}
          <div className={`mt-6 ${collapsed ? 'px-0' : ''}`}>
            {!collapsed && (
              <div className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-2 px-3">
                Quick Links
              </div>
            )}
            <a
              href={`/u/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 ${collapsed ? 'justify-center px-0' : 'px-3'} py-2.5 rounded-xl text-[13px] font-medium text-white/50 hover:text-white hover:bg-white/8 transition-all`}
              title={collapsed ? 'View Portfolio' : undefined}
            >
              <Globe className="w-[18px] h-[18px] shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1">View Portfolio</span>
                  <ExternalLink className="w-3 h-3 opacity-40" />
                </>
              )}
            </a>
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="p-3 border-t border-white/8 space-y-1">
          <Link
            href="/dashboard/settings"
            className={`flex items-center gap-3 ${collapsed ? 'justify-center px-0' : 'px-3'} py-2.5 rounded-xl text-[13px] font-medium transition-all ${
              pathname === '/dashboard/settings'
                ? 'bg-white/15 text-white'
                : 'text-white/50 hover:text-white hover:bg-white/8'
            }`}
            title={collapsed ? 'Settings' : undefined}
          >
            <Settings className="w-[18px] h-[18px]" />
            {!collapsed && <span>Settings</span>}
          </Link>

          <button
            onClick={() => { logout(); router.push('/'); }}
            className={`w-full flex items-center gap-3 ${collapsed ? 'justify-center px-0' : 'px-3'} py-2.5 text-[13px] font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all`}
            title={collapsed ? 'Sign Out' : undefined}
          >
            <LogOut className="w-[18px] h-[18px]" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>

        {/* User */}
        <div className={`p-3 border-t border-white/8 ${collapsed ? 'flex justify-center' : ''}`}>
          <div className={`flex items-center gap-3 ${collapsed ? '' : 'px-2'}`}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
              {initials}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate text-white">{fullName}</p>
                <p className="text-[11px] text-white/40 truncate">@{username}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ═══ Main Content ═══ */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <header className="h-16 border-b border-border bg-surface/50 backdrop-blur-sm flex items-center justify-between px-8 sticky top-0 z-10 shrink-0">
          <div>
            <h2 className="text-sm font-semibold text-foreground capitalize">
              {pathname === '/dashboard' ? 'Overview' : pathname.split('/').pop()?.replace(/-/g, ' ')}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-xl bg-background border border-border flex items-center justify-center text-muted hover:text-foreground hover:shadow-soft transition-all">
              <Bell className="w-4 h-4" />
            </button>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-[11px]">
              {initials}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto hide-scrollbar">
          <div className="p-8 md:p-10 max-w-6xl w-full mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
