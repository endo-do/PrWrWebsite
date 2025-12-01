import { useMemo, useState } from 'react';
import { games, getYearBounds, metricCategories, metrics, timelineEvents } from '../data/games';
import { FilterBar } from '../components/FilterBar';
import { GameCard } from '../components/GameCard';
import { TrendChart } from '../components/TrendChart';
import { ComparisonPanel } from '../components/ComparisonPanel';
import { Timeline } from '../components/Timeline';
import type { MetricCategory } from '../types';

const { min, max } = getYearBounds();

export const Dashboard = () => {
  const [selectedGames, setSelectedGames] = useState<string[]>(games.map((game) => game.id));
  const [metricFocus, setMetricFocus] = useState<MetricCategory>('money');
  const [yearRange, setYearRange] = useState<[number, number]>([min, max]);

  const chartPayload = useMemo(() => {
    const years = [];
    for (let year = yearRange[0]; year <= yearRange[1]; year += 1) {
      const entry: Record<string, number | string | null> = { year };
      selectedGames.forEach((gameId) => {
        const metric = metrics.find(
          (candidate) => candidate.gameId === gameId && candidate.category === metricFocus,
        );
        const value = metric?.values.find((val) => val.year === year)?.value ?? null;
        entry[gameId] = value;
      });
      years.push(entry);
    }
    return years;
  }, [selectedGames, metricFocus, yearRange]);

  const lineDefs = selectedGames.map((gameId) => {
    const game = games.find((g) => g.id === gameId)!;
    return {
      id: gameId,
      color: game.palette.primary,
      name: game.name,
    };
  });

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-midnight p-8 text-white shadow-2xl shadow-black/40">
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">
          Progression difficulty tracker
        </p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">
          How grindy are top games in 2025?
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-white/70">
          Explore money spent, hours invested, and raw difficulty for Counter-Strike 2, League of
          Legends, Clash Royale, and Destiny 2. Toggle years, focus on a metric, and compare each
          title’s trajectory.
        </p>
      </section>

      <FilterBar
        games={games.map((game) => ({ id: game.id, name: game.name }))}
        selectedGames={selectedGames}
        selectedMetric={metricFocus}
        metricOptions={metricCategories}
        yearRange={yearRange}
        bounds={{ min, max }}
        onGamesChange={setSelectedGames}
        onMetricChange={setMetricFocus}
        onYearRangeChange={setYearRange}
      />

      <TrendChart
        title="Trendlines across selected games"
        subtitle="Hover to inspect yearly values."
        unit={
          metricFocus === 'money'
            ? 'USD'
            : metricFocus === 'hours'
              ? 'Hours'
              : 'Difficulty pts'
        }
        data={chartPayload}
        lines={lineDefs}
      />

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {games.map((game) => {
          const metric = metrics.find(
            (candidate) => candidate.gameId === game.id && candidate.category === metricFocus,
          );
          return (
            <GameCard key={game.id} game={game} metric={metric} accent={game.palette.primary} />
          );
        })}
      </section>

      <ComparisonPanel />

      <Timeline
        events={timelineEvents.filter(
          (event) =>
            event.year >= yearRange[0] && event.year <= yearRange[1] && selectedGames.includes(event.gameId),
        )}
      />
    </div>
  );
};

