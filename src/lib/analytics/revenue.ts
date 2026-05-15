import { and, count, gte, lt, sql } from "drizzle-orm";
import { db } from "@/db";
import { attendances } from "@/db/schema";
import { getPeriodStartDate } from "./period";
import { calculateGrowth } from "./comparison";

export type RevenueMetrics = {
  totalRevenue: number;
  totalAttendances: number;
  averageTicket: number;
  revenueGrowth: number;
  previousRevenue: number;
};

export async function getRevenueMetrics(period: string) {
  const currentStartDate = getPeriodStartDate(period);
  const now = new Date();

  const diff = now.getTime() - currentStartDate.getTime();
  const previousStartDate = new Date(currentStartDate.getTime() - diff);

  // -------------------------
  // PERÍODO ATUAL
  // -------------------------
  const currentResult = await db
    .select({
      totalRevenue: sql<number>`
        COALESCE(SUM(${attendances.totalAmount}), 0)
      `,
      totalAttendances: count(attendances.id),
      averageTicket: sql<number>`
        COALESCE(AVG(${attendances.totalAmount}), 0)
      `,
    })
    .from(attendances)
    .where(gte(attendances.attendanceDate, currentStartDate));

  // -------------------------
  // PERÍODO ANTERIOR
  // -------------------------
  const previousResult = await db
    .select({
      totalRevenue: sql<number>`
        COALESCE(SUM(${attendances.totalAmount}), 0)
      `,
    })
    .from(attendances)
    .where(
      and(
        gte(attendances.attendanceDate, previousStartDate),
        lt(attendances.attendanceDate, currentStartDate)
      )
    );

  const current = currentResult[0] ?? {
    totalRevenue: 0,
    totalAttendances: 0,
    averageTicket: 0,
  };

  const previous = previousResult[0] ?? {
    totalRevenue: 0,
  };

  const currentRevenue = Number(current.totalRevenue);
  const previousRevenue = Number(previous.totalRevenue);

  const revenueGrowth = calculateGrowth(
    currentRevenue,
    previousRevenue
  );

  return {
    totalRevenue: Number(current.totalRevenue),
    totalAttendances: Number(current.totalAttendances),
    averageTicket: Number(current.averageTicket),
    revenueGrowth,
    previousRevenue: Number(previous.totalRevenue),
  };
}