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

interface TrendChartProps {
  title: string;
  subtitle?: string;
  unit?: string;
  data: Record<string, number | string | null>[];
  lines: {
    id: string;
    color: string;
    name: string;
  }[];
}

export const TrendChart = ({ title, subtitle, unit, data, lines }: TrendChartProps) => (
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
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="year"
            stroke="rgba(255,255,255,0.45)"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="rgba(255,255,255,0.45)"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => Number(value).toLocaleString()}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#020617',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
            }}
            labelFormatter={(label) => `Year ${label}`}
            formatter={(value: number, key: string) => [
              unit ? `${value.toLocaleString()} ${unit}` : value.toLocaleString(),
              key,
            ]}
          />
          <Legend />
          {lines.map((line) => (
            <Line
              key={line.id}
              type="monotone"
              dataKey={line.id}
              stroke={line.color}
              name={line.name}
              dot={false}
              strokeWidth={2.5}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  </section>
);

