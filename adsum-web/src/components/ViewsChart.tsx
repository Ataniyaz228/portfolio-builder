'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Eye, Loader2 } from 'lucide-react';
import api from '@/lib/axios';

type Period = 7 | 30 | 90;

interface ViewData {
  date: string;
  views: number;
}

interface AnalyticsResponse {
  period: number;
  data: ViewData[];
  total: number;
}

export default function ViewsChart() {
  const [period, setPeriod] = useState<Period>(30);
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/users/me/analytics?days=${period}`)
      .then(res => setAnalytics(res.data))
      .catch(() => setAnalytics(null))
      .finally(() => setLoading(false));
  }, [period]);

  const { maxViews, points, areaPath, linePath, trend } = useMemo(() => {
    if (!analytics?.data?.length) return { maxViews: 0, points: [], areaPath: '', linePath: '', trend: 0 };

    const data = analytics.data;
    const max = Math.max(...data.map(d => d.views), 1);
    const width = 100;
    const height = 100;
    const padding = 2;

    const pts = data.map((d, i) => ({
      x: padding + (i / (data.length - 1 || 1)) * (width - padding * 2),
      y: padding + (1 - d.views / max) * (height - padding * 2),
      views: d.views,
      date: d.date,
    }));

    const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const area = `${line} L ${pts[pts.length - 1].x} ${height} L ${pts[0].x} ${height} Z`;

    // Trend: compare last half vs first half
    const mid = Math.floor(data.length / 2);
    const firstHalf = data.slice(0, mid).reduce((s, d) => s + d.views, 0);
    const secondHalf = data.slice(mid).reduce((s, d) => s + d.views, 0);
    const trendVal = firstHalf === 0 ? (secondHalf > 0 ? 100 : 0) : Math.round(((secondHalf - firstHalf) / firstHalf) * 100);

    return { maxViews: max, points: pts, areaPath: area, linePath: line, trend: trendVal };
  }, [analytics]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <Eye className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Profile Views</h3>
            {analytics && !loading && (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{analytics.total}</span>
                {trend !== 0 && (
                  <span className={`text-xs font-medium flex items-center gap-0.5 px-1.5 py-0.5 rounded-full ${
                    trend > 0 ? 'bg-emerald-500/10 text-emerald-500' : trend < 0 ? 'bg-red-500/10 text-red-500' : 'bg-muted/10 text-muted'
                  }`}>
                    {trend > 0 ? <TrendingUp className="w-3 h-3" /> : trend < 0 ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                    {trend > 0 ? '+' : ''}{trend}%
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-1 bg-surface rounded-lg p-1">
          {([7, 30, 90] as Period[]).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                period === p ? 'bg-foreground text-surface shadow-sm' : 'text-muted hover:text-foreground'
              }`}
            >
              {p}d
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-40 flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-muted" />
        </div>
      ) : !analytics?.data?.length ? (
        <div className="h-40 flex items-center justify-center text-muted text-sm">
          No views data yet
        </div>
      ) : (
        <div className="relative h-40 group">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map(y => (
              <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="currentColor" strokeOpacity="0.05" strokeWidth="0.3" />
            ))}
            {/* Area */}
            <motion.path
              d={areaPath}
              fill="url(#viewsGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
            {/* Line */}
            <motion.path
              d={linePath}
              fill="none"
              stroke="rgb(59, 130, 246)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
            {/* Dots on hover */}
            {points.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="1.2" fill="rgb(59, 130, 246)" opacity="0" className="group-hover:opacity-100 transition-opacity">
                <title>{formatDate(p.date)}: {p.views} views</title>
              </circle>
            ))}
          </svg>
          {/* X-axis labels */}
          <div className="flex justify-between mt-2 text-[10px] text-muted">
            <span>{analytics.data.length > 0 ? formatDate(analytics.data[0].date) : ''}</span>
            <span>{analytics.data.length > 1 ? formatDate(analytics.data[Math.floor(analytics.data.length / 2)].date) : ''}</span>
            <span>{analytics.data.length > 1 ? formatDate(analytics.data[analytics.data.length - 1].date) : ''}</span>
          </div>
        </div>
      )}
    </div>
  );
}
