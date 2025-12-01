import { useMemo } from 'react';
import {
  comparisonInsights,
  games,
  metricCategories,
  metrics,
  timelineYears,
} from '../data/games';
import { TrendChart } from '../components/TrendChart';

const categoryLabels: Record<string, string> = {
  money: 'Money',
  hours: 'Hours',
  difficulty: 'Difficulty',
};

const toPercentChange = (values: { value: number }[]) => {
  const first = values[0]?.value ?? 0;
  const last = values.at(-1)?.value ?? 0;
  if (!first) return 0;
  return ((last - first) / first) * 100;
};

export const Comparison = () => {
  const normalizedSeries = useMemo(() => {
    return timelineYears.map((year) => {
      const row: Record<string, number | string | null> = { year };
      games.forEach((game) => {
        const gameMetrics = metrics.filter((metric) => metric.gameId === game.id);
        if (!gameMetrics.length) {
          row[game.id] = null;
          return;
        }
        const aggregated = gameMetrics.reduce((acc, metric) => {
          const baseline = metric.values[0]?.value ?? 1;
          const current = metric.values.find((entry) => entry.year === year)?.value ?? baseline;
          return acc + current / baseline;
        }, 0);
        row[game.id] = Number(((aggregated / gameMetrics.length) * 100).toFixed(1));
      });
      return row;
    });
  }, []);

  return (
    <div className="space-y-10 text-slate-900 dark:text-white">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-8 shadow-2xl dark:border-white/10 dark:from-indigo-900/60 dark:to-slate-950">
        <p className="text-xs uppercase tracking-[0.5em] text-slate-500 dark:text-white/60">
          Comparison lab
        </p>
        <h1 className="mt-4 font-display text-4xl text-slate-900 dark:text-white">
          Which game is the harshest grind?
        </h1>
        <p className="mt-3 max-w-3xl text-slate-600 dark:text-white/70">
          We normalize each metric to its 2016 baseline and average by game. Scores above 100 mean
          the grind is harder than in 2016, while sub-100 indicates easing.
        </p>
      </section>

      <TrendChart
        title="Normalized progression pressure (2016 = 100)"
        data={normalizedSeries}
        lines={games.map((game) => ({
          id: game.id,
          color: game.palette.primary,
          name: game.name,
        }))}
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900/70">
        <h2 className="font-display text-2xl text-slate-900 dark:text-white">
          Category swing since 2016
        </h2>
        <p className="text-sm text-slate-600 dark:text-white/70">
          Positive numbers = more investment needed today; negative = the grind got lighter.
        </p>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-500 dark:text-white/60">
              <tr>
                <th className="pb-2">Game</th>
                {metricCategories.map((category) => (
                  <th key={category} className="pb-2">
                    {categoryLabels[category]}
                  </th>
                ))}
                <th className="pb-2">Headline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/10">
              {games.map((game) => (
                <tr key={game.id}>
                  <td className="py-3 font-semibold text-slate-900 dark:text-white">
                    {game.icon} {game.name}
                  </td>
                  {metricCategories.map((category) => {
                    const metric = metrics.find(
                      (item) => item.gameId === game.id && item.category === category,
                    );
                    const change = metric ? toPercentChange(metric.values) : null;
                    return (
                      <td key={`${game.id}-${category}`} className="py-3">
                        {change === null ? (
                          <span className="text-slate-400 dark:text-white/40">—</span>
                        ) : (
                          <span className={change >= 0 ? 'text-rose-300' : 'text-emerald-300'}>
                            {change >= 0 ? '+' : ''}
                            {change.toFixed(1)}%
                          </span>
                        )}
                      </td>
                    );
                  })}
                  <td className="py-3 text-slate-600 dark:text-white/70">
                    {comparisonInsights.find((insight) => insight.gameId === game.id)?.headline ??
                      '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {comparisonInsights.map((insight) => {
          const game = games.find((item) => item.id === insight.gameId);
          const color = insight.direction === 'harder' ? 'text-rose-300' : 'text-emerald-300';
          return (
            <article
              key={insight.gameId}
              className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-white/5 dark:bg-white/[0.04]"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl text-slate-900 dark:text-white">
                  {game?.icon} {game?.name}
                </h3>
                <span className={`text-sm font-semibold ${color}`}>
                  {insight.direction === 'harder' ? 'Harder' : 'Easier'}
                </span>
              </div>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                {insight.headline}
              </p>
              <p className="text-sm text-slate-600 dark:text-white/70">{insight.summary}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
};

