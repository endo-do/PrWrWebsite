import { Link } from 'react-router-dom';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  YAxis,
  XAxis,
} from 'recharts';
import type { Game, Metric } from '../types';

interface GameCardProps {
  game: Game;
  metric: Metric | undefined;
  accent: string;
}

const CardTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const { year, value } = payload[0].payload;
  return (
    <div className="rounded-lg border border-white/20 bg-slate-900/90 px-3 py-2 text-xs text-white">
      <div className="font-semibold">{year}</div>
      <div className="text-neon">{value.toLocaleString()}</div>
    </div>
  );
};

export const GameCard = ({ game, metric, accent }: GameCardProps) => {
  const first = metric?.values[0]?.value ?? 0;
  const last = metric?.values.at(-1)?.value ?? 0;
  const delta = first ? ((last - first) / first) * 100 : 0;

  return (
    <article className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 dark:border-white/10 dark:bg-gradient-to-br dark:from-slate-900/70 dark:to-slate-900/30 dark:shadow-black/30">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-2xl">{game.icon}</p>
          <h3 className="font-display text-xl text-slate-900 dark:text-white">{game.name}</h3>
          <p className="text-sm text-slate-600 dark:text-white/70">{game.heroTagline}</p>
        </div>
        <div
          className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
          style={{ backgroundColor: `${accent}22`, color: accent }}
        >
          {delta >= 0 ? '+' : ''}
          {delta.toFixed(1)}%
        </div>
      </header>

      {metric ? (
        <div className="h-36">
          <ResponsiveContainer>
            <AreaChart data={metric.values}>
              <defs>
                <linearGradient id={`spark-${game.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={accent} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={accent} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis dataKey="year" hide />
              <YAxis hide />
              <Tooltip content={<CardTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={accent}
                fillOpacity={1}
                fill={`url(#spark-${game.id})`}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-sm text-white/60">No metric data available.</p>
      )}

      <ul className="space-y-2 text-sm text-slate-600 dark:text-white/70">
        {game.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <Link
        to={`/games/${game.id}`}
        className="inline-flex items-center justify-center rounded-2xl bg-slate-900/5 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-900/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
      >
        Dive into {game.name}
      </Link>
    </article>
  );
};

