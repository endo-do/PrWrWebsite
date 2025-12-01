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
    <section className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-glow-lg backdrop-blur">
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-wide text-white/60">Games</span>
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
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {game.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-wide text-white/60">
            Metric focus
          </label>
          <select
            className="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-neon/40"
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

        <div className="flex flex-1 flex-col gap-2 min-w-[240px]">
          <label className="text-xs uppercase tracking-wide text-white/60">
            Year range
          </label>
          <div className="flex items-center gap-3 text-xs text-white/70">
            <span>{yearRange[0]}</span>
            <input
              type="range"
              min={bounds.min}
              max={bounds.max}
              value={yearRange[0]}
              onChange={(event) => handleYearChange(Number(event.target.value), 0)}
              className="flex-1 accent-neon"
            />
            <input
              type="range"
              min={bounds.min}
              max={bounds.max}
              value={yearRange[1]}
              onChange={(event) => handleYearChange(Number(event.target.value), 1)}
              className="flex-1 accent-amber"
            />
            <span>{yearRange[1]}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

