import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useTheme } from './ThemeProvider';

/**
 * Props for the TrendChart component.
 * data: Array of objects, each representing a year with values for each game.
 *       Format: [{ year: 2016, cs2: 320, lol: 520, ... }, ...]
 * lines: Array defining which lines to render, with their colors and display names.
 */
interface TrendChartProps {
  title: string;
  subtitle?: string;
  unit?: string;
  data: Record<string, number | string | null>[];
  lines: {
    id: string; // Game ID, used as dataKey to extract values from data objects
    color: string; // Line color (from game.palette.primary)
    name: string; // Display name in legend
  }[];
}

/**
 * Renders a line chart showing trendlines for multiple games over time.
 * Uses Recharts library for the visualization.
 */
export const TrendChart = ({ title, subtitle, unit, data, lines }: TrendChartProps) => {
  const { theme } = useTheme();
  
  // Colors that adapt to theme
  const isDark = theme === 'dark';
  const axisColor = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.6)';
  const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.1)';
  const tooltipBg = isDark ? '#020617' : '#ffffff';
  const tooltipBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const tooltipText = isDark ? '#ffffff' : '#000000';

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-white/5 dark:bg-slate-900/60 dark:shadow-glow-lg">
      <header className="mb-4 space-y-1">
        <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-white/50">
          Interactive chart
        </p>
        <h3 className="font-display text-2xl text-slate-900 dark:text-white">{title}</h3>
        {subtitle && (
          <p className="text-sm text-slate-600 dark:text-white/70">{subtitle}</p>
        )}
      </header>

      <div className="h-80 w-full">
        <ResponsiveContainer>
          <LineChart data={data}>
            {/* Grid lines for easier reading */}
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            {/* X-axis: years */}
            <XAxis
              dataKey="year"
              stroke={axisColor}
              tick={{ fill: axisColor }}
              tickLine={false}
              axisLine={false}
            />
            {/* Y-axis: metric values */}
            <YAxis
              stroke={axisColor}
              tick={{ fill: axisColor }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => Number(value).toLocaleString()} // Format numbers with commas
            />
            {/* Tooltip shown on hover */}
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: 12,
                color: tooltipText,
              }}
              labelFormatter={(label) => `Year ${label}`}
              formatter={(value: number, key: string) => [
                unit ? `${value.toLocaleString()} ${unit}` : value.toLocaleString(),
                key,
              ]}
            />
            {/* Legend showing game names and colors */}
            <Legend />
            {/* Render a line for each game */}
            {lines.map((line) => (
              <Line
                key={line.id}
                type="monotone" // Smooth curve interpolation
                dataKey={line.id} // Extracts values from data objects using this key
                stroke={line.color}
                name={line.name}
                dot={false} // No dots on the line
                strokeWidth={2.5}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

