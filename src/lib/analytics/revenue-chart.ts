import { db } from "@/db";
import { attendances } from "@/db/schema/attendances";
import { gte, sql } from "drizzle-orm";
import { getPeriodStartDate } from "./period";

export async function getRevenueChartData(period: string) {
  const startDate = getPeriodStartDate(period);

  return db
    .select({
      date: sql<string>`
        DATE(${attendances.attendanceDate})
      `,

      revenue: sql<number>`
        COALESCE(SUM(${attendances.totalAmount}), 0)
      `,
    })
    .from(attendances)
    .where(gte(attendances.attendanceDate, startDate))
    .groupBy(sql`DATE(${attendances.attendanceDate})`)
    .orderBy(sql`DATE(${attendances.attendanceDate})`);
}