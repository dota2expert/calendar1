export type Norm = {
  daily: number;
  weekly: number;
};

export type Fact = {
  [key: string]: number;
};

export type DayData = {
  date: string;
  facts: Fact;
};

export type Norms = Record<string, Norm>;
