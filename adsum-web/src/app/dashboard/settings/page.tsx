'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Globe, Loader2, CheckCircle, Palette, Check, Layout, Eye } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/axios';
import ImageUpload from '@/components/ImageUpload';
import MarkdownBioEditor from '@/components/MarkdownBioEditor';

export default function SettingsPage() {
  const { user, token } = useAuthStore();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '', bio: '', avatar_url: '',
    github_url: '', linkedin_url: '', twitter_url: '',
    theme_color: 'blue', template_id: 'creative',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: (user as any).full_name || '', bio: (user as any).bio || '',
        avatar_url: (user as any).avatar_url || '', github_url: (user as any).github_url || '',
        linkedin_url: (user as any).linkedin_url || '', twitter_url: (user as any).twitter_url || '',
        theme_color: (user as any).theme_color || 'blue', template_id: (user as any).template_id || 'creative',
      });
    }
  }, [user]);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get('/users/me');
        setFormData({
          full_name: res.data.full_name || '', bio: res.data.bio || '',
          avatar_url: res.data.avatar_url || '', github_url: res.data.github_url || '',
          linkedin_url: res.data.linkedin_url || '', twitter_url: res.data.twitter_url || '',
          theme_color: res.data.theme_color || 'blue', template_id: res.data.template_id || 'creative',
        });
      } catch (e) { /* ignore */ }
    }
    if (token) fetchProfile();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setSaved(false);
    try {
      await api.patch('/users/me', formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) { console.error('Failed to save profile:', err); }
    finally { setSaving(false); }
  };

  const inputClass = "w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-foreground/10 transition-all font-medium placeholder:text-muted/50 text-foreground";

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-0.5">Profile Settings</h1>
        <p className="text-sm text-muted">Manage your public portfolio information.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
        {/* Personal Info */}
        <div className="glass p-6 rounded-2xl space-y-5">
          <h2 className="text-sm font-semibold flex items-center gap-2 text-foreground">
            <User className="w-4 h-4 text-muted" /> Personal Information
          </h2>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted uppercase tracking-wide">Full Name</label>
            <input type="text" className={inputClass} placeholder="John Doe"
              value={formData.full_name} onChange={e => setFormData({ ...formData, full_name: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted uppercase tracking-wide">Bio</label>
            <MarkdownBioEditor 
              value={formData.bio} 
              onChange={val => setFormData({ ...formData, bio: val })} 
              placeholder="I am a full-stack developer passionate about building great products..."
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted uppercase tracking-wide">Avatar Image</label>
            <ImageUpload 
              value={formData.avatar_url}
              onChange={(url) => setFormData({ ...formData, avatar_url: url })}
              label="Upload Avatar"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="glass p-6 rounded-2xl space-y-5">
          <h2 className="text-sm font-semibold flex items-center gap-2 text-foreground">
            <Globe className="w-4 h-4 text-muted" /> Social Links
          </h2>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted uppercase tracking-wide">GitHub</label>
            <input type="url" className={inputClass} placeholder="https://github.com/username"
              value={formData.github_url} onChange={e => setFormData({ ...formData, github_url: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted uppercase tracking-wide">LinkedIn</label>
            <input type="url" className={inputClass} placeholder="https://linkedin.com/in/username"
              value={formData.linkedin_url} onChange={e => setFormData({ ...formData, linkedin_url: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted uppercase tracking-wide">Twitter / X</label>
            <input type="url" className={inputClass} placeholder="https://x.com/username"
              value={formData.twitter_url} onChange={e => setFormData({ ...formData, twitter_url: e.target.value })}
            />
          </div>
        </div>

        {/* Theme */}
        <div className="glass p-6 rounded-2xl space-y-5">
          <h2 className="text-sm font-semibold flex items-center gap-2 text-foreground">
            <Palette className="w-4 h-4 text-muted" /> Portfolio Theme
          </h2>
          <p className="text-xs text-muted">Choose a primary brand color for your public portfolio.</p>
          <div className="flex gap-3">
            {[
              { id: 'blue', color: '#3b82f6' },
              { id: 'emerald', color: '#10b981' },
              { id: 'purple', color: '#8b5cf6' },
              { id: 'rose', color: '#f43f5e' },
              { id: 'amber', color: '#f59e0b' },
            ].map((theme) => (
              <button
                key={theme.id} type="button"
                onClick={() => setFormData({ ...formData, theme_color: theme.id })}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  formData.theme_color === theme.id ? 'ring-2 ring-foreground ring-offset-2 ring-offset-surface scale-110 shadow-card' : 'opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: theme.color }}
                title={theme.id.charAt(0).toUpperCase() + theme.id.slice(1)}
              >
                {formData.theme_color === theme.id && <Check className="w-4 h-4 text-white" />}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Template */}
        <div className="glass p-6 rounded-2xl space-y-5">
          <h2 className="text-sm font-semibold flex items-center gap-2 text-foreground">
            <Layout className="w-4 h-4 text-muted" /> Portfolio Template
          </h2>
          <p className="text-xs text-muted">Choose a layout style for your public portfolio page.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                id: 'minimal',
                name: 'Minimal',
                desc: 'Clean & typographic',
                preview: (
                  <div className="space-y-1.5">
                    <div className="w-8 h-8 rounded-full bg-foreground/10 mx-auto" />
                    <div className="h-1.5 w-16 bg-foreground/20 rounded mx-auto" />
                    <div className="h-1 w-24 bg-foreground/10 rounded mx-auto" />
                    <div className="border-t border-border my-1.5" />
                    <div className="flex gap-1 justify-center">
                      <div className="h-1 w-6 bg-foreground/10 rounded" />
                      <div className="h-1 w-8 bg-foreground/10 rounded" />
                      <div className="h-1 w-5 bg-foreground/10 rounded" />
                    </div>
                    <div className="grid grid-cols-2 gap-1 mt-1">
                      <div className="h-6 bg-foreground/5 rounded" />
                      <div className="h-6 bg-foreground/5 rounded" />
                    </div>
                  </div>
                ),
              },
              {
                id: 'creative',
                name: 'Creative',
                desc: 'Bold & animated',
                preview: (
                  <div className="space-y-1.5">
                    <div className="h-8 bg-gradient-to-r from-violet-500/20 to-blue-500/20 rounded" />
                    <div className="flex gap-1">
                      <div className="h-1 w-6 bg-violet-400/30 rounded-full" />
                      <div className="h-1 w-8 bg-blue-400/30 rounded-full" />
                      <div className="h-1 w-5 bg-emerald-400/30 rounded-full" />
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="h-8 bg-violet-500/10 rounded-lg" />
                      <div className="h-8 bg-blue-500/10 rounded-lg" />
                    </div>
                    <div className="h-4 bg-gradient-to-r from-violet-500/10 to-transparent rounded" />
                  </div>
                ),
              },
              {
                id: 'professional',
                name: 'Professional',
                desc: 'Corporate & clean',
                preview: (
                  <div className="space-y-1.5">
                    <div className="flex gap-2 items-center">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20" />
                      <div className="space-y-0.5 flex-1">
                        <div className="h-1.5 w-12 bg-foreground/20 rounded" />
                        <div className="h-1 w-16 bg-foreground/10 rounded" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="h-4 bg-blue-500/10 rounded text-center" />
                      <div className="h-4 bg-blue-500/10 rounded" />
                      <div className="h-4 bg-blue-500/10 rounded" />
                    </div>
                    <div className="h-6 bg-foreground/5 rounded" />
                    <div className="h-6 bg-foreground/5 rounded" />
                  </div>
                ),
              },
            ].map((tmpl) => (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => setFormData({ ...formData, template_id: tmpl.id })}
                className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                  formData.template_id === tmpl.id
                    ? 'border-foreground bg-foreground/5 shadow-card'
                    : 'border-border hover:border-foreground/20'
                }`}
              >
                {formData.template_id === tmpl.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-foreground rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-surface" />
                  </div>
                )}
                <div className="mb-3 p-3 bg-surface rounded-lg border border-border">
                  {tmpl.preview}
                </div>
                <h3 className="font-semibold text-sm">{tmpl.name}</h3>
                <p className="text-xs text-muted">{tmpl.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Save */}
        <div className="flex items-center gap-4">
          <button type="submit" disabled={saving}
            className="px-6 py-3 bg-foreground text-surface rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 shadow-soft"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          {saved && (
            <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-emerald-600 flex items-center gap-1 text-sm font-medium">
              <CheckCircle className="w-4 h-4" /> Saved successfully
            </motion.span>
          )}
        </div>
      </form>
    </motion.div>
  );
}
