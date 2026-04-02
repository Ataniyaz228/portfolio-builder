'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Loader2, Mail, MailOpen, ChevronDown, ChevronUp } from 'lucide-react';
import api from '@/lib/axios';
import EmptyState from '@/components/EmptyState';

interface Message {
  id: string;
  sender_name: string;
  sender_email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    try { const res = await api.get('/contact'); setMessages(res.data); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const toggleExpand = async (msg: Message) => {
    if (expandedId === msg.id) { setExpandedId(null); return; }
    setExpandedId(msg.id);
    if (!msg.is_read) {
      try {
        await api.patch(`/contact/${msg.id}/read`);
        setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, is_read: true } : m));
      } catch (err) { console.error(err); }
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Delete this message?')) return;
    try {
      await api.delete(`/contact/${id}`);
      setMessages(prev => prev.filter(m => m.id !== id));
      if (expandedId === id) setExpandedId(null);
    } catch (err) { console.error(err); }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs}h ago`;
    const diffDays = Math.floor(diffHrs / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-0.5">Messages</h1>
          <p className="text-sm text-muted">
            {unreadCount > 0 
              ? <span>You have <span className="text-foreground font-semibold">{unreadCount}</span> unread message{unreadCount > 1 ? 's' : ''}</span>
              : 'Your inbox is up to date.'}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-muted" /></div>
      ) : messages.length === 0 ? (
        <EmptyState
          illustration="inbox"
          icon={null}
          title="No messages yet"
          description="When visitors contact you through your portfolio, their messages will appear here."
        />
      ) : (
        <div className="space-y-2">
          {messages.map((msg, i) => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <div
                onClick={() => toggleExpand(msg)}
                className={`glass rounded-2xl p-5 cursor-pointer transition-all hover:shadow-elevated ${!msg.is_read ? 'border-foreground/10 bg-background' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className="shrink-0">
                    {msg.is_read 
                      ? <MailOpen className="w-5 h-5 text-muted/40" />
                      : <Mail className="w-5 h-5 text-foreground" />
                    }
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <h3 className={`font-semibold text-sm truncate ${!msg.is_read ? 'text-foreground' : 'text-foreground/70'}`}>
                        {msg.sender_name}
                      </h3>
                      <span className="text-[11px] text-muted shrink-0">{formatDate(msg.created_at)}</span>
                    </div>
                    <p className="text-xs text-muted truncate">{msg.sender_email}</p>
                    {expandedId !== msg.id && (
                      <p className="text-xs text-muted/50 truncate mt-1">{msg.message}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={(e) => handleDelete(msg.id, e)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-muted hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    {expandedId === msg.id 
                      ? <ChevronUp className="w-4 h-4 text-muted" />
                      : <ChevronDown className="w-4 h-4 text-muted" />
                    }
                  </div>
                </div>

                <AnimatePresence>
                  {expandedId === msg.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground/80">{msg.message}</p>
                        <div className="mt-4 flex items-center gap-3">
                          <a href={`mailto:${msg.sender_email}`}
                            className="text-xs text-foreground hover:underline font-semibold flex items-center gap-1"
                          >
                            <Mail className="w-3 h-3" /> Reply via Email
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
