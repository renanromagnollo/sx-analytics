import { generateWeeklyReport } from "@/lib/reports/weekly-report";
import { InsightsPanel } from "@/components/dashboard/insights-panel";

type Props = {
  searchParams: Promise<{ period?: string }>;
};

export default async function WeeklyReportPage({ searchParams }: Props) {
  const params = await searchParams;
  const period = params.period || "7d";

  const report = await generateWeeklyReport(period);

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Relatório Semanal
        </h1>

        <p className="text-muted-foreground">
          Visão consolidada do período {period}
        </p>
      </div>

      {/* INSIGHTS (o coração do relatório) */}
      <InsightsPanel insights={report.insights} />

      {/* KPIs */}
      <div className="grid gap-4">
        <div>Faturamento: R$ {report.metrics.totalRevenue}</div>
        <div>Atendimentos: {report.metrics.totalAttendances}</div>
        <div>Ticket médio: R$ {report.metrics.averageTicket}</div>
      </div>

      {/* TOP SERVIÇOS */}
      <div>
        <h2 className="font-semibold mb-2">Top Serviços</h2>
        <pre>{JSON.stringify(report.services, null, 2)}</pre>
      </div>

      {/* TOP PROFISSIONAIS */}
      <div>
        <h2 className="font-semibold mb-2">Top Profissionais</h2>
        <pre>{JSON.stringify(report.professionals, null, 2)}</pre>
      </div>
    </div>
  );
}