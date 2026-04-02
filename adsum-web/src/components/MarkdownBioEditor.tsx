'use client';

import { useState, useEffect } from 'react';
import { Eye, Pencil } from 'lucide-react';

interface MarkdownBioEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function MarkdownBioEditor({ value, onChange, placeholder }: MarkdownBioEditorProps) {
  const [mode, setMode] = useState<'write' | 'preview'>('write');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderPreview = (html: string) => {
    if (!html || html === '<p><br></p>' || html.trim() === '') {
      return <p className="text-muted/50 text-sm italic">Nothing to preview yet...</p>;
    }
    if (!mounted) {
      return <div className="text-sm text-muted/50">Loading preview...</div>;
    }
    return (
      <div
        className="prose-bio text-sm leading-relaxed text-foreground/80"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-background">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-surface">
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setMode('write')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mode === 'write'
                ? 'bg-foreground text-surface'
                : 'text-muted hover:text-foreground hover:bg-background'
            }`}
          >
            <Pencil className="w-3 h-3" /> Write
          </button>
          <button
            type="button"
            onClick={() => setMode('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mode === 'preview'
                ? 'bg-foreground text-surface'
                : 'text-muted hover:text-foreground hover:bg-background'
            }`}
          >
            <Eye className="w-3 h-3" /> Preview
          </button>
        </div>
        <span className="text-[10px] text-muted">
          {value ? value.replace(/<[^>]*>/g, '').length : 0} chars
        </span>
      </div>

      {/* Content */}
      {mode === 'write' ? (
        <div className="relative">
          <textarea
            value={value.replace(/<[^>]*>/g, '')}
            onChange={(e) => {
              const text = e.target.value;
              const lines = text.split('\n');
              const html = lines
                .map(line => {
                  if (!line.trim()) return '';
                  return `<p>${line}</p>`;
                })
                .filter(Boolean)
                .join('');
              onChange(html || '');
            }}
            placeholder={placeholder || 'Write about yourself...'}
            className="w-full min-h-[160px] p-4 bg-transparent text-sm text-foreground resize-none focus:outline-none placeholder:text-muted/40 leading-relaxed"
          />
          <div className="absolute bottom-2 right-3 flex gap-2">
            {[
              { label: 'B', tag: 'strong', title: 'Bold' },
              { label: 'I', tag: 'em', title: 'Italic' },
            ].map(btn => (
              <button
                key={btn.label}
                type="button"
                title={btn.title}
                onClick={() => {
                  const textarea = document.querySelector('.markdown-bio-textarea') as HTMLTextAreaElement;
                  if (!textarea) return;
                  const start = textarea.selectionStart;
                  const end = textarea.selectionEnd;
                  const text = textarea.value;
                  const selected = text.substring(start, end);
                  if (selected) {
                    const newText = text.substring(0, start) + `<${btn.tag}>${selected}</${btn.tag}>` + text.substring(end);
                    const lines = newText.split('\n');
                    const html = lines.map(line => line.trim() ? `<p>${line}</p>` : '').filter(Boolean).join('');
                    onChange(html);
                  }
                }}
                className="w-6 h-6 rounded text-[11px] font-bold text-muted hover:text-foreground hover:bg-foreground/5 transition-colors"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="min-h-[160px] p-4">
          {renderPreview(value)}
        </div>
      )}

      <style jsx global>{`
        .prose-bio p { margin-bottom: 0.5rem; }
        .prose-bio p:last-child { margin-bottom: 0; }
        .prose-bio strong { font-weight: 700; color: var(--foreground); }
        .prose-bio em { font-style: italic; }
        .prose-bio a { color: var(--foreground); text-decoration: underline; }
      `}</style>
    </div>
  );
}
