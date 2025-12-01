import type {
  ComparisonInsight,
  Game,
  Metric,
  MetricCategory,
  SkinMarketEntry,
  TimelineEvent,
} from '../types';

export const metricCategories: MetricCategory[] = ['money', 'hours', 'difficulty'];

export const timelineYears = Array.from({ length: 10 }, (_, i) => 2016 + i);

export const games: Game[] = [
  {
    id: 'cs2',
    name: 'Counter-Strike 2',
    icon: '🎯',
    studio: 'Valve',
    description:
      'Skin speculation, operations, and capsule drops now act like a mini stock market for dedicated collectors.',
    heroTagline: 'Skin markets behave like blue-chip stocks.',
    palette: { primary: '#38bdf8', secondary: '#f472b6' },
    highlights: [
      'Iconic skins outperformed S&P 500 in 2020 spike.',
      'Valve case nerfs created predictable supply crunches.',
      'Entry barrier tripled since 2016 for rare loadouts.',
    ],
    metrics: ['cs2-skin-basket', 'cs2-market-volatility'],
  },
  {
    id: 'lol',
    name: 'League of Legends',
    icon: '⚔️',
    studio: 'Riot Games',
    description:
      'Season resets and LP decay keep Diamond+ players on an endless treadmill of adaptation.',
    heroTagline: 'Grind efficiency matters more than raw skill.',
    palette: { primary: '#38ef7d', secondary: '#06b6d4' },
    highlights: [
      'Season 14 item rework briefly lowered time-to-Diamond.',
      'Role queue rewards top-lane loyalists with faster LP.',
      'Master+ now assumes off-meta champ proficiency.',
    ],
    metrics: ['lol-hours-diamond', 'lol-difficulty-score'],
  },
  {
    id: 'clash',
    name: 'Clash Royale',
    icon: '👑',
    studio: 'Supercell',
    description:
      'Card evolution, star levels, and banner tokens gradually turned progression into a premium economy.',
    heroTagline: 'Whales set the pace of the arena.',
    palette: { primary: '#fbbf24', secondary: '#fb7185' },
    highlights: [
      'Champions and evolutions are now pay-to-rush gateways.',
      'Gold pass halved grind for mid-spenders post-2021.',
      'Maxing a deck jumped 2.6x since soft launch.',
    ],
    metrics: ['clash-max-cost', 'clash-evolution-premium'],
  },
  {
    id: 'd2',
    name: 'Destiny 2',
    icon: '🛰️',
    studio: 'Bungie',
    description:
      'Each expansion raises the pinnacle power wall, demanding seasonal chores plus flawless activity clears.',
    heroTagline: 'Seasonal chores gate ultimate power.',
    palette: { primary: '#a855f7', secondary: '#60a5fa' },
    highlights: [
      'Contest mode raids require meta builds and level cap.',
      'Artifact grind adds 12–20 bonus levels every season.',
      'Legend rank playlist now assumes crafted god-rolls.',
    ],
    metrics: ['d2-hours-pinnacle', 'd2-difficulty-pressure'],
  },
];

export const metrics: Metric[] = [
  {
    id: 'cs2-skin-basket',
    gameId: 'cs2',
    label: 'Iconic Skin Basket',
    category: 'money',
    unit: 'USD',
    description:
      'Average price of a 10-skin basket (Dragon Lore, Howl, lower-tier blue chips).',
    values: timelineYears.map((year, idx) => ({
      year,
      value: [320, 360, 410, 380, 520, 610, 640, 720, 780, 810][idx],
      context: idx === 4 ? 'Broken Fang cases doubled prices' : undefined,
    })),
  },
  {
    id: 'cs2-market-volatility',
    gameId: 'cs2',
    label: 'Market Volatility',
    category: 'difficulty',
    unit: 'Volatility score',
    description:
      'Composite index (0–100) of spike frequency + average correction depth.',
    values: timelineYears.map((year, idx) => ({
      year,
      value: [38, 42, 55, 48, 72, 81, 77, 83, 79, 76][idx],
    })),
  },
  {
    id: 'lol-hours-diamond',
    gameId: 'lol',
    label: 'Hours to Solo-Queue Diamond',
    category: 'hours',
    unit: 'Hours',
    description: 'Median hours logged per split for players climbing to Diamond IV.',
    values: timelineYears.map((year, idx) => ({
      year,
      value: [240, 255, 270, 265, 280, 295, 305, 300, 285, 275][idx],
      context: idx === 8 ? 'Role identity update improved climb speed' : undefined,
    })),
  },
  {
    id: 'lol-difficulty-score',
    gameId: 'lol',
    label: 'Ranked Stress Index',
    category: 'difficulty',
    unit: 'Composite score',
    description: 'Blend of LP volatility, dodge penalties, and pick-ban meta shifts.',
    values: timelineYears.map((year, idx) => ({
      year,
      value: [52, 58, 63, 61, 66, 72, 78, 81, 75, 70][idx],
    })),
  },
  {
    id: 'clash-max-cost',
    gameId: 'clash',
    label: 'Cost to Max a Deck',
    category: 'money',
    unit: 'USD',
    description:
      'Total spend to push 8-card deck to lvl 15 with evolutions (packs + tokens).',
    values: timelineYears.map((year, idx) => ({
      year,
      value: [480, 520, 610, 640, 720, 780, 860, 910, 1020, 1240][idx],
    })),
  },
  {
    id: 'clash-evolution-premium',
    gameId: 'clash',
    label: 'Evolution Premium',
    category: 'difficulty',
    unit: 'Difficulty score',
    description:
      'Additional barrier (0–100) to stay competitive without evolution unlocks.',
    values: timelineYears.map((year, idx) => ({
      year,
      value: [22, 28, 34, 38, 46, 52, 58, 64, 69, 74][idx],
    })),
  },
  {
    id: 'd2-hours-pinnacle',
    gameId: 'd2',
    label: 'Hours to Seasonal Pinnacle Cap',
    category: 'hours',
    unit: 'Hours',
    description:
      'Average time for a hardcore player to reach the seasonal hard cap (without artifact).',
    values: timelineYears.map((year, idx) => ({
      year,
      value: [110, 118, 124, 136, 148, 155, 168, 172, 165, 158][idx],
    })),
  },
  {
    id: 'd2-difficulty-pressure',
    gameId: 'd2',
    label: 'Endgame Pressure Index',
    category: 'difficulty',
    unit: 'Composite score',
    description:
      'Weighted mix of raid entry requirements, flawless expectations, and artifact level demands.',
    values: timelineYears.map((year, idx) => ({
      year,
      value: [48, 52, 56, 63, 70, 76, 79, 85, 82, 78][idx],
    })),
  },
];

export const skinMarketData: SkinMarketEntry[] = [
  {
    id: 'dl-2016',
    gameId: 'cs2',
    skin: 'AWP | Dragon Lore (Factory New)',
    year: 2016,
    price: 1850,
    note: 'Pre-Dragon lore souvenir hype.',
  },
  {
    id: 'dl-2020',
    gameId: 'cs2',
    skin: 'AWP | Dragon Lore (Factory New)',
    year: 2020,
    price: 3100,
    note: 'Operation Broken Fang surge.',
  },
  {
    id: 'howl-2025',
    gameId: 'cs2',
    skin: 'M4A4 | Howl (Minimal Wear)',
    year: 2025,
    price: 4200,
    note: 'Supply locked due to contraband status.',
  },
  {
    id: 'butterfly-2023',
    gameId: 'cs2',
    skin: 'Butterfly Knife | Crimson Web',
    year: 2023,
    price: 1850,
    note: 'Premier launch added knife flex culture.',
  },
];

export const comparisonInsights: ComparisonInsight[] = [
  {
    gameId: 'clash',
    headline: 'Clash Royale became the priciest grind.',
    summary:
      'Maxing a single deck now costs 2.6× the 2016 spend, and evolutions force repeated purchases.',
    direction: 'harder',
    scoreChange: 160,
  },
  {
    gameId: 'cs2',
    headline: 'CS2 skins behave like blue-chip assets.',
    summary:
      'Skin basket prices climbed 153% with volatility spikes mirroring real-world commodities.',
    direction: 'harder',
    scoreChange: 120,
  },
  {
    gameId: 'lol',
    headline: 'League grind stabilized recently.',
    summary:
      'Time-to-Diamond fell 10% post Season 14, but LP volatility is still high mid-year.',
    direction: 'easier',
    scoreChange: -25,
  },
  {
    gameId: 'd2',
    headline: 'Destiny 2 is plateauing at “busy-hard.”',
    summary:
      'Power chase remains long, yet contest raid prep is slightly faster thanks to Fireteam Finder.',
    direction: 'harder',
    scoreChange: 45,
  },
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: '2018-cs2',
    gameId: 'cs2',
    year: 2018,
    title: 'Dragon Lore crash + rebound',
    detail: 'Valve drop rates briefly tanked prices before a 2020 rally.',
  },
  {
    id: '2020-lol',
    gameId: 'lol',
    year: 2020,
    title: 'Season 10 ranked reset',
    detail: 'Wider LP gains increased time-to-Diamond by 15 hours.',
  },
  {
    id: '2021-clash',
    gameId: 'clash',
    year: 2021,
    title: 'Card Level 14 + Gold Pass rework',
    detail: 'Instantly raised cost ceiling while lowering grind for pass holders.',
  },
  {
    id: '2023-d2',
    gameId: 'd2',
    year: 2023,
    title: 'Lightfall contest rules',
    detail: 'Pinnacle chase extended but contest kept level fairness.',
  },
  {
    id: '2024-clash',
    gameId: 'clash',
    year: 2024,
    title: 'Card Evolutions wave 2',
    detail: 'Meta decks now require evolution tokens plus wild shards.',
  },
  {
    id: '2025-lol',
    gameId: 'lol',
    year: 2025,
    title: 'Role identity overhaul',
    detail: 'Reduced Diamond grind for duo lanes, trimmed LP volatility.',
  },
];

export const getMetric = (id: string) => metrics.find((metric) => metric.id === id);

export const getGameMetrics = (gameId: string) =>
  metrics.filter((metric) => metric.gameId === gameId);

export const getMetricValue = (metricId: string, year: number) => {
  const metric = getMetric(metricId);
  return metric?.values.find((entry) => entry.year === year)?.value ?? null;
};

export const getYearBounds = () => ({
  min: Math.min(...timelineYears),
  max: Math.max(...timelineYears),
});

