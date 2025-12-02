import type { MetricCategory } from '../types';

/**
 * Props for the FilterBar component.
 * gamesWithData: Array of game IDs that have data for the current metric - used to disable buttons
 */
interface FilterBarProps {
  selectedGames: string[];
  games: { id: string; name: string }[];
  selectedMetric: MetricCategory;
  metricOptions: MetricCategory[];
  yearRange: [number, number];
  bounds: { min: number; max: number };
  gamesWithData: string[];
  onGamesChange: (ids: string[]) => void;
  onMetricChange: (metric: MetricCategory) => void;
  onYearRangeChange: (range: [number, number]) => void;
}

/**
 * Filter bar component that allows users to:
 * - Toggle games on/off (buttons are disabled if game has no data for selected metric)
 * - Select a metric category (money, hours, difficulty)
 * - Adjust the year range using dual sliders
 */
export const FilterBar = ({
  selectedGames,
  games,
  selectedMetric,
  metricOptions,
  yearRange,
  bounds,
  gamesWithData,
  onGamesChange,
  onMetricChange,
  onYearRangeChange,
}: FilterBarProps) => {
  /**
   * Toggles a game's selection state.
   * If the game is selected, remove it; if not selected, add it.
   */
  const handleGameToggle = (gameId: string) => {
    onGamesChange(
      selectedGames.includes(gameId)
        ? selectedGames.filter((id) => id !== gameId)
        : [...selectedGames, gameId],
    );
  };

  /**
   * Handles changes to the year range sliders.
   * index: 0 for start year, 1 for end year
   * After updating, we sort to ensure start <= end (handles slider crossover).
   */
  const handleYearChange = (value: number, index: 0 | 1) => {
    const nextRange: [number, number] = [...yearRange] as [number, number];
    nextRange[index] = value;
    nextRange.sort((a, b) => a - b); // Ensure start year <= end year
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
              const hasData = gamesWithData.includes(game.id);
              return (
                <button
                  key={game.id}
                  type="button"
                  onClick={() => handleGameToggle(game.id)}
                  disabled={!hasData} // Disable if game has no data for current metric
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    !hasData
                      ? 'cursor-not-allowed opacity-40 bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-white/30'
                      : active
                        ? 'bg-neon/20 text-neon ring-1 ring-neon/40' // Active state
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10' // Inactive state
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

        {/* Year range selector with dual sliders */}
        <div className="flex flex-1 flex-col gap-2 min-w-[320px]">
          <label className="text-xs uppercase tracking-wide text-slate-500 dark:text-white/60">
            Year range
          </label>
          <div className="flex flex-nowrap items-center gap-2 text-xs text-slate-600 dark:text-white/70 overflow-hidden">
            {/* Start year display */}
            <span className="shrink-0 whitespace-nowrap text-sm font-semibold w-[3.5rem] text-right">{yearRange[0]}</span>
            {/* Start year slider (neon accent) */}
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
            {/* End year slider (amber accent) */}
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
            {/* End year display */}
            <span className="shrink-0 whitespace-nowrap text-sm font-semibold w-[3.5rem]">{yearRange[1]}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

