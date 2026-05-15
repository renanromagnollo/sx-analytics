import { db } from "@/db";
import { attendances } from "@/db/schema/attendances";
import { professionals } from "@/db/schema/professionals";
import { desc, eq, gte, sql } from "drizzle-orm";
import { getPeriodStartDate } from "./period";

export async function getProfessionalsRanking(period: string) {
  const startDate = getPeriodStartDate(period);

  return db
    .select({
      professionalId: professionals.id,
      professionalName: professionals.name,

      totalRevenue: sql<number>`
        COALESCE(SUM(${attendances.totalAmount}), 0)
      `,

      totalAttendances: sql<number>`
        COUNT(${attendances.id})
      `,

      averageTicket: sql<number>`
        COALESCE(AVG(${attendances.totalAmount}), 0)
      `,
    })
    .from(attendances)
    .innerJoin(
      professionals,
      eq(attendances.professionalId, professionals.id)
    )
    .where(
      gte(attendances.attendanceDate, startDate)
    )
    .groupBy(
      professionals.id,
      professionals.name
    )
    .orderBy(
      desc(sql`SUM(${attendances.totalAmount})`)
    );
}