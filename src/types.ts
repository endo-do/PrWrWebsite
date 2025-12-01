export type MetricCategory = 'money' | 'hours' | 'difficulty';

export interface MetricValue {
  year: number;
  value: number;
  context?: string;
}

export interface Metric {
  id: string;
  gameId: string;
  label: string;
  category: MetricCategory;
  unit: string;
  description: string;
  values: MetricValue[];
}

export interface Game {
  id: string;
  name: string;
  icon: string;
  studio: string;
  description: string;
  heroTagline: string;
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

