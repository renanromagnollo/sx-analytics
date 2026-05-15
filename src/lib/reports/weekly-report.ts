import { getRevenueMetrics } from "@/lib/analytics/revenue";
import { getServicesRanking } from "@/lib/analytics/services";
import { getProfessionalsRanking } from "@/lib/analytics/professionals";
import { getRevenueChartData } from "@/lib/analytics/revenue-chart";
import { generateRevenueInsights } from "@/lib/ai/insights";

export async function generateWeeklyReport(period: string) {
  const metrics = await getRevenueMetrics(period);
  const services = await getServicesRanking(period);
  const professionals = await getProfessionalsRanking(period);
  const chart = await getRevenueChartData(period);

  const insights = generateRevenueInsights({
    currentRevenue: metrics.totalRevenue,
    previousRevenue: metrics.previousRevenue,
  });

  return {
    period,
    metrics,
    services,
    professionals,
    chart,
    insights,
  };
}