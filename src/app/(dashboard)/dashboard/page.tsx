export const dynamic = "force-dynamic";

import { getRevenueMetrics } from "@/lib/analytics/revenue";
import { getProfessionalsRanking } from "@/lib/analytics/professionals";
import { getRevenueChartData } from "@/lib/analytics/revenue-chart";
import { getServicesRanking } from "@/lib/analytics/services";

import { generateRevenueInsights } from "@/lib/ai/insights";

import { ProfessionalsRanking } from "@/components/dashboard/professionals-ranking";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { ServicesRanking } from "@/components/dashboard/services-ranking";
import { InsightsPanel } from "@/components/dashboard/insights-panel";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PeriodFilter } from "@/components/dashboard/period-filter";
import { KpiCard } from "@/components/dashboard/kpi-card";

import { DollarSign, Users, Wallet } from "lucide-react";

type Props = {
  searchParams: Promise<{ period?: string }>;
};

export default async function DashboardPage({ searchParams }: Props) {
  const params = await searchParams;
  const period = params.period || "30d";

  const metrics = await getRevenueMetrics(period);
  const professionals = await getProfessionalsRanking(period);
  const revenueChart = await getRevenueChartData(period);
  const services = await getServicesRanking(period);

  const insights = generateRevenueInsights({
    currentRevenue: Number(metrics.totalRevenue),
    previousRevenue: Number((metrics as any).previousRevenue ?? 0),
  });

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Inteligência operacional e financeira.
          </p>
        </div>

        <PeriodFilter currentPeriod={period} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <KpiCard
          title="Faturamento"
          value={`R$ ${Number(metrics.totalRevenue).toFixed(2)}`}
          description="Receita total processada."
          trend={metrics.revenueGrowth}
          icon={<DollarSign className="h-5 w-5" />}
        />

        <KpiCard
          title="Atendimentos"
          value={String(metrics.totalAttendances)}
          description="Total de atendimentos registrados."
          icon={<Users className="h-5 w-5" />}
        />

        <KpiCard
          title="Ticket Médio"
          value={`R$ ${Number(metrics.averageTicket).toFixed(2)}`}
          description="Média de faturamento por atendimento."
          icon={<Wallet className="h-5 w-5" />}
        />
      </div>

      <div className="mt-8">
        <InsightsPanel insights={insights} />
      </div>

      <div className="mt-8">
        <RevenueChart data={revenueChart} />
      </div>

      <div className="mt-8">
        <ProfessionalsRanking data={professionals} />
      </div>

      <div className="mt-8">
        <ServicesRanking data={services} />
      </div>
    </DashboardLayout>
  );
}