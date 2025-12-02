/**
 * The three main categories of progression metrics we track across games.
 * - money: Financial investment required (e.g., skin prices, deck costs)
 * - hours: Time investment required (e.g., time to reach rank, seasonal cap)
 * - difficulty: Skill/pressure index (e.g., volatility, stress scores)
 */
export type MetricCategory = 'money' | 'hours' | 'difficulty';

/**
 * A single data point for a metric at a specific year.
 * The context field is optional and used to highlight notable events (e.g., "Operation Broken Fang doubled prices").
 */
export interface MetricValue {
  year: number;
  value: number;
  context?: string;
}

/**
 * Represents a tracked metric for a game (e.g., "CS2 Skin Basket", "LoL Hours to Diamond").
 * Each metric belongs to one game and one category, and contains time-series data.
 */
export interface Metric {
  id: string;
  gameId: string;
  label: string;
  category: MetricCategory;
  unit: string;
  description: string;
  values: MetricValue[];
}

/**
 * Represents a game in our tracking system.
 * The metrics array contains IDs of Metric objects that belong to this game.
 * The palette defines the color scheme used for charts and UI elements.
 */
export interface Game {
  id: string;
  name: string;
  icon: string;
  studio: string;
  description: string;
  heroTagline: string;
  howItWorks: string;
  palette: {
    primary: string;
    secondary: string;
  };
  highlights: string[];
  metrics: string[];
}

export interface SkinMarketEntry {
  id: string;
  gameId: 'cs2';
  skin: string;
  year: number;
  price: number;
  note?: string;
}

export interface ComparisonInsight {
  gameId: string;
  headline: string;
  summary: string;
  direction: 'easier' | 'harder';
  scoreChange: number;
}

export interface TimelineEvent {
  id: string;
  gameId: string;
  year: number;
  title: string;
  detail: string;
}

