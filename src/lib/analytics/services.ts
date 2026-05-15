import { desc, gte, sql, eq } from "drizzle-orm";
import { db } from "@/db";

import { attendanceServices } from "@/db/schema/attendance-services";
import { attendances } from "@/db/schema/attendances";
import { services } from "@/db/schema/services";

import { getPeriodStartDate } from "./period";

export async function getServicesRanking(period: string) {
  const startDate = getPeriodStartDate(period);

  return db
    .select({
      serviceId: services.id,
      serviceName: services.name,

      totalRevenue: sql<number>`
        COALESCE(SUM(${attendances.totalAmount}), 0)
      `,

      totalAttendances: sql<number>`
        COUNT(DISTINCT ${attendances.id})
      `,

      averageTicket: sql<number>`
        COALESCE(AVG(${attendances.totalAmount}), 0)
      `,
    })
    .from(attendanceServices)

    .innerJoin(
      attendances,
      eq(attendanceServices.attendanceId, attendances.id)
    )

    .innerJoin(
      services,
      eq(attendanceServices.serviceId, services.id)
    )

    .where(gte(attendances.attendanceDate, startDate))

    .groupBy(services.id, services.name)

    .orderBy(
      desc(sql`SUM(${attendances.totalAmount})`)
    );
}