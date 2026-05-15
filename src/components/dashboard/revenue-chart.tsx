"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  data: {
    date: string;
    revenue: number;
  }[];
};

export function RevenueChart({
  data,
}: Props) {
  return (
    <div className="border rounded-xl p-6">

      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Evolução de Faturamento
        </h2>

        <p className="text-sm text-muted-foreground">
          Receita diária do salão.
        </p>
      </div>

      <div
        className="h-87.5 w-full min-w-0"
      >

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}