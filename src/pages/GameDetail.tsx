import { Link, useParams } from 'react-router-dom';
import {
  games,
  getGameMetrics,
  timelineEvents,
} from '../data/games';
import { TrendChart } from '../components/TrendChart';
import { Timeline } from '../components/Timeline';
import { SkinMarketTable } from '../components/SkinMarketTable';

export const GameDetail = () => {
  const { gameId = '' } = useParams();
  const game = games.find((item) => item.id === gameId);

  if (!game) {
    return (
      <div className="space-y-4 text-white">
        <p>Unknown game.</p>
        <Link to="/" className="text-neon underline">
          Return to dashboard
        </Link>
      </div>
    );
  }

  const metrics = getGameMetrics(game.id);
  const events = timelineEvents.filter((event) => event.gameId === game.id);

  return (
    <div className="space-y-10">
      <section
        className="rounded-3xl border border-slate-200 p-8 text-slate-900 shadow-2xl dark:border-white/10 dark:text-white"
        style={{
          background: `radial-gradient(circle at top, ${game.palette.primary}22, var(--surface-bg) 65%)`,
        }}
      >
        <Link
          to="/"
          className="text-sm text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white"
        >
          ← Back to dashboard
        </Link>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-4xl">{game.icon}</p>
            <h1 className="font-display text-4xl text-slate-900 dark:text-white">{game.name}</h1>
            <p className="text-lg text-slate-600 dark:text-white/70">{game.heroTagline}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-600 dark:border-white/20 dark:bg-white/10 dark:text-white/70">
            Developed by {game.studio}
          </div>
        </div>
        {/* Game description section */}
        <div className="mt-6 max-w-3xl space-y-6">
          <div>
            <h2 className="mb-2 font-display text-xl text-slate-900 dark:text-white">About</h2>
            <p className="text-base leading-relaxed text-slate-600 dark:text-white/70">{game.description}</p>
          </div>
          <div>
            <h2 className="mb-2 font-display text-xl text-slate-900 dark:text-white">How it works</h2>
            <p className="text-base leading-relaxed text-slate-600 dark:text-white/70">{game.howItWorks}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {metrics.map((metric) => {
          const first = metric.values[0]?.value ?? 0;
          const last = metric.values.at(-1)?.value ?? 0;
          const delta = first ? ((last - first) / first) * 100 : 0;
          return (
            <article
              key={metric.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 dark:border-white/5 dark:bg-slate-900/70 dark:text-white"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500 dark:text-white/40">
                {metric.category}
              </p>
              <h3 className="font-display text-2xl">{metric.label}</h3>
              <p className="text-sm text-slate-600 dark:text-white/70">{metric.description}</p>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-white/60">Latest (2025)</p>
                  <p className="text-3xl font-semibold text-slate-900 dark:text-white">
                    {metric.unit === 'USD' ? '$' : ''}
                    {last.toLocaleString()}
                    {metric.unit !== 'USD' ? ` ${metric.unit}` : ''}
                  </p>
                </div>
                <p className={`text-sm font-semibold ${delta >= 0 ? 'text-rose-300' : 'text-emerald-300'}`}>
                  {delta >= 0 ? '+' : ''}
                  {delta.toFixed(1)}% since 2016
                </p>
              </div>
            </article>
          );
        })}
      </section>

      <div className="space-y-6">
        {metrics.map((metric) => (
          <TrendChart
            key={metric.id}
            title={metric.label}
            subtitle={metric.description}
            unit={metric.unit}
            data={metric.values.map(({ year, value }) => ({ year, value }))}
            lines={[
              {
                id: 'value',
                color: game.palette.secondary,
                name: metric.label,
              },
            ]}
          />
        ))}
      </div>

      {game.id === 'cs2' && <SkinMarketTable />}

      {events.length > 0 && <Timeline events={events} title="Key progression beats" />}
    </div>
  );
};

