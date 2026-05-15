export type Insight = {
  title: string;
  description: string;
  trend?: "up" | "down" | "stable";
  type?: "revenue" | "growth" | "operational";
};