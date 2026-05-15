import { db } from "@/db";
import { attendances, attendanceServices } from "@/db/schema";

import type { Gendo304Row } from "./gendo-parser";

export async function importGendo304(
  rows: Gendo304Row[],
  salonId: string
) {
  let imported = 0;
  let invalid = 0;

  for (const row of rows) {
    try {
      const professional = await db.query.professionals.findFirst({
        where: (p, { eq }) => eq(p.name, row.professional),
      });

      if (!professional) {
        invalid++;
        continue;
      }

      const service = await db.query.services.findFirst({
        where: (s, { eq }) => eq(s.name, row.service),
      });

      if (!service) {
        invalid++;
        continue;
      }

      const [attendance] = await db
        .insert(attendances)
        .values({
          salonId,
          professionalId: professional.id,
          clientName: row.clientName,
          totalAmount: String(row.totalAmount),
          attendanceDate: new Date(row.date),
        })
        .returning();

      await db.insert(attendanceServices).values({
        attendanceId: attendance.id,
        serviceId: service.id,
        amount: String(row.totalAmount),
      });

      imported++;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: unknown) {
      invalid++;
    }
  }

  return {
    imported,
    invalid,
  };
}