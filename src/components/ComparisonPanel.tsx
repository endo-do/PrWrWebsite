import { Link } from 'react-router-dom';
import { comparisonInsights, games } from '../data/games';

export const ComparisonPanel = () => (
  <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-slate-900/80">
    <header className="mb-6 flex flex-col gap-2">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-white/50">
        Who got harder?
      </p>
      <h3 className="font-display text-2xl text-slate-900 dark:text-white">
        Clash Royale leads the cost climb, League eased up slightly.
      </h3>
      <p className="text-sm text-slate-600 dark:text-white/70">
        Based on cumulative % change in money, hours, and difficulty metrics between 2016 and 2025.
      </p>
    </header>

    <div className="grid gap-4 md:grid-cols-2">
      {comparisonInsights.map((insight) => {
        const game = games.find((g) => g.id === insight.gameId);
        const isPositive = insight.direction === 'harder';
        return (
          <article
            key={insight.gameId}
            className="rounded-2xl border border-slate-200 bg-white/90 p-4 transition hover:border-slate-300 dark:border-white/5 dark:bg-white/[0.04] dark:hover:border-white/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
                <span>{game?.icon}</span>
                <span>{game?.name}</span>
              </div>
              <span
                className={`text-sm font-bold ${
                  isPositive ? 'text-rose-300' : 'text-emerald-300'
                }`}
              >
                {isPositive ? '+' : ''}
                {insight.scoreChange} pts
              </span>
            </div>
            <h4 className="mt-2 font-display text-xl text-slate-900 dark:text-white">
              {insight.headline}
            </h4>
            <p className="text-sm text-slate-600 dark:text-white/70">{insight.summary}</p>
          </article>
        );
      })}
    </div>

    <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600 dark:text-white/70">
      <Link
        to="/comparison"
        className="inline-flex items-center rounded-full bg-neon/20 px-4 py-2 font-semibold text-neon transition hover:bg-neon/30"
      >
        Open comparison lab →
      </Link>
      <span>Methodology: normalized % change of tracked metrics per game.</span>
    </div>
  </section>
);

