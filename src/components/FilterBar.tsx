import type { MetricCategory } from '../types';

interface FilterBarProps {
  selectedGames: string[];
  games: { id: string; name: string }[];
  selectedMetric: MetricCategory;
  metricOptions: MetricCategory[];
  yearRange: [number, number];
  bounds: { min: number; max: number };
  onGamesChange: (ids: string[]) => void;
  onMetricChange: (metric: MetricCategory) => void;
  onYearRangeChange: (range: [number, number]) => void;
}

export const FilterBar = ({
  selectedGames,
  games,
  selectedMetric,
  metricOptions,
  yearRange,
  bounds,
  onGamesChange,
  onMetricChange,
  onYearRangeChange,
}: FilterBarProps) => {
  const handleGameToggle = (gameId: string) => {
    onGamesChange(
      selectedGames.includes(gameId)
        ? selectedGames.filter((id) => id !== gameId)
        : [...selectedGames, gameId],
    );
  };

  const handleYearChange = (value: number, index: 0 | 1) => {
    const nextRange: [number, number] = [...yearRange] as [number, number];
    nextRange[index] = value;
    nextRange.sort((a, b) => a - b);
    onYearRangeChange(nextRange);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-glow-lg">
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-white/60">
            Games
          </span>
          <div className="flex flex-wrap gap-2">
            {games.map((game) => {
              const active = selectedGames.includes(game.id);
                  return (
                <button
                  key={game.id}
                  type="button"
                  onClick={() => handleGameToggle(game.id)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    active
                      ? 'bg-neon/20 text-neon ring-1 ring-neon/40'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10'
                  }`}
                >
                  {game.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-wide text-slate-500 dark:text-white/60">
            Metric focus
          </label>
          <select
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-neon/40 dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
            value={selectedMetric}
            onChange={(event) => onMetricChange(event.target.value as MetricCategory)}
          >
            {metricOptions.map((option) => (
              <option key={option} value={option}>
                {option === 'money' && 'Money / Monetization'}
                {option === 'hours' && 'Time / Hours'}
                {option === 'difficulty' && 'Difficulty / Pressure'}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-1 flex-col gap-2 min-w-[320px]">
          <label className="text-xs uppercase tracking-wide text-slate-500 dark:text-white/60">
            Year range
          </label>
          <div className="flex flex-nowrap items-center gap-2 text-xs text-slate-600 dark:text-white/70 overflow-hidden">
            <span className="shrink-0 whitespace-nowrap text-sm font-semibold w-[3.5rem] text-right">{yearRange[0]}</span>
            <div className="min-w-[100px] flex-1">
              <input
                type="range"
                min={bounds.min}
                max={bounds.max}
                value={yearRange[0]}
                onChange={(event) => handleYearChange(Number(event.target.value), 0)}
                className="w-full accent-neon"
              />
            </div>
            <div className="min-w-[100px] flex-1">
              <input
                type="range"
                min={bounds.min}
                max={bounds.max}
                value={yearRange[1]}
                onChange={(event) => handleYearChange(Number(event.target.value), 1)}
                className="w-full accent-amber"
              />
            </div>
            <span className="shrink-0 whitespace-nowrap text-sm font-semibold w-[3.5rem]">{yearRange[1]}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

