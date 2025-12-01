import type { TimelineEvent } from '../types';
import { games } from '../data/games';

interface TimelineProps {
  events: TimelineEvent[];
  title?: string;
}

export const Timeline = ({ events, title = 'Progression timeline' }: TimelineProps) => {
  const gameMap = Object.fromEntries(games.map((game) => [game.id, game]));

  return (
    <section className="rounded-3xl border border-white/5 bg-gradient-to-b from-slate-900/80 to-slate-950/40 p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-white/50">{title}</p>
      <ol className="mt-4 space-y-6">
        {events.map((event) => {
          const game = gameMap[event.gameId];
          return (
            <li key={event.id} className="relative pl-8">
              <span className="absolute left-2 top-1.5 h-2 w-2 rounded-full bg-neon" />
              <div className="flex items-center gap-3 text-sm text-white/60">
                <span className="font-semibold text-white">{event.year}</span>
                <span className="text-white/50">/</span>
                <span className="font-medium text-white">
                  {game?.icon} {game?.name}
                </span>
              </div>
              <h4 className="font-display text-lg text-white">{event.title}</h4>
              <p className="text-sm text-white/70">{event.detail}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

