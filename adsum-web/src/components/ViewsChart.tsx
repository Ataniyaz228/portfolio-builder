'use client';

import { useState, useEffect, useMemo } from 'react';
import { TrendingUp, TrendingDown, Eye, Loader2 } from 'lucide-react';
import api from '@/lib/axios';
import AreaChart from '@/components/ui/area-chart';

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

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const { trend, chartData } = useMemo(() => {
    if (!analytics?.data?.length) return { trend: 0, chartData: [] as Array<{ Date: string; Views: number }> };

    const data = analytics.data;
    const mid = Math.floor(data.length / 2);
    const firstHalf = data.slice(0, mid).reduce((s, d) => s + d.views, 0);
    const secondHalf = data.slice(mid).reduce((s, d) => s + d.views, 0);
    const trendVal = firstHalf === 0
      ? (secondHalf > 0 ? 100 : 0)
      : Math.round(((secondHalf - firstHalf) / firstHalf) * 100);

    const mapped = data.map((d) => ({ Date: formatDate(d.date), Views: d.views }));

    return { trend: trendVal, chartData: mapped };
  }, [analytics]);

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
                    trend > 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
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
        <div className="pt-2">
          <AreaChart
            className="h-52 w-full"
            index="Date"
            categories={['Views']}
            data={chartData}
            colors={['#3b82f6']}
          />
        </div>
      )}
    </div>
  );
}
