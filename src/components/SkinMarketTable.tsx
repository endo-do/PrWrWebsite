import { skinMarketData } from '../data/games';

export const SkinMarketTable = () => (
  <section className="rounded-3xl border border-amber/30 bg-amber/10 p-6 text-amber-50">
    <header className="mb-4">
      <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">CS2 skin market</p>
      <h3 className="font-display text-2xl">Signature items as a stock ticker</h3>
      <p className="text-sm text-amber-100/80">
        Averaged sale price snapshots taken from Buff + Steam Community market watchers.
      </p>
    </header>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="text-left text-amber-100/70">
          <tr>
            <th className="pb-2">Skin</th>
            <th className="pb-2">Year</th>
            <th className="pb-2">Price (USD)</th>
            <th className="pb-2">Note</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-amber/30">
          {skinMarketData.map((entry) => (
            <tr key={entry.id}>
              <td className="py-2 font-semibold">{entry.skin}</td>
              <td className="py-2">{entry.year}</td>
              <td className="py-2 font-mono">
                ${entry.price.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </td>
              <td className="py-2 text-amber-50/80">{entry.note ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

