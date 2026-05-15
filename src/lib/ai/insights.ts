import type { Insight } from "@/types/insight";

type Input = {
  currentRevenue: number;
  previousRevenue: number;
};

export function generateRevenueInsights(
  input: Input
): Insight[] {
  const diff =
    input.currentRevenue - input.previousRevenue;

  const growth = input.previousRevenue
    ? diff / input.previousRevenue
    : 0;

  const insights: Insight[] = [];

  if (growth > 0.2) {
    insights.push({
      title: "Crescimento forte",
      description: "Sua receita teve um aumento significativo no período.",
      trend: "up",
    });
  } else if (growth < -0.1) {
    insights.push({
      title: "Queda de receita",
      description: "Sua receita caiu em relação ao período anterior.",
      trend: "down",
    });
  } else {
    insights.push({
      title: "Estável",
      description: "Sua receita está estável no período.",
      trend: "stable",
    });
  }

  return insights;
}