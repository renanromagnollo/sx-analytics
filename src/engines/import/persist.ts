import { eq } from "drizzle-orm";

import { db } from "@/db";

import {
  attendances,
  professionals,
  services,
} from "@/db/schema";

import { NormalizedAttendanceRow } from "@/types/import";

const professionalCache = new Map<
  string,
  number
>();

const serviceCache = new Map<
  string,
  number
>();

async function getOrCreateProfessional(
  name: string
) {
  const normalizedName =
    name.toLowerCase().trim();

  const cachedId =
    professionalCache.get(
      normalizedName
    );

  if (cachedId) {
    return {
      id: cachedId,
    };
  }

  const existing =
    await db.query.professionals.findFirst({
      where: eq(
        professionals.name,
        name
      ),
    });

  if (existing) {
    professionalCache.set(
      normalizedName,
      existing.id
    );

    return existing;
  }

  const [professional] =
    await db
      .insert(professionals)
      .values({
        salonId: 1,

        name,
      })
      .returning();

  professionalCache.set(
    normalizedName,
    professional.id
  );

  return professional;
}

async function getOrCreateService(
  name: string
) {
  const normalizedName =
    name.toLowerCase().trim();

  const cachedId =
    serviceCache.get(
      normalizedName
    );

  if (cachedId) {
    return {
      id: cachedId,
    };
  }

  const existing =
    await db.query.services.findFirst({
      where: eq(
        services.name,
        name
      ),
    });

  if (existing) {
    serviceCache.set(
      normalizedName,
      existing.id
    );

    return existing;
  }

  const [service] =
    await db
      .insert(services)
      .values({
        salonId: 1,

        name,
      })
      .returning();

  serviceCache.set(
    normalizedName,
    service.id
  );

  return service;
}

async function prepareAttendance(
  row: NormalizedAttendanceRow
) {
  if (
    !row.professionalName ||
    !row.serviceName ||
    !row.amount ||
    !row.attendanceDate
  ) {
    return null;
  }

  const professional =
    await getOrCreateProfessional(
      row.professionalName
    );

  const service =
    await getOrCreateService(
      row.serviceName
    );

  return {
    salonId: 1,

    professionalId: professional.id,

    serviceId: service.id,

    clientName: row.clientName,

    amount: String(row.amount),

    commissionAmount: String(
      row.commissionAmount || 0
    ),

    attendanceDate: row.attendanceDate,
  };
}

export async function persistRows(
  rows: NormalizedAttendanceRow[]
) {
  await db.transaction(async () => {
    const attendanceValues = [];

    for (const row of rows) {
      const attendance =
        await prepareAttendance(row);

      if (!attendance) continue;

      attendanceValues.push(attendance);
    }

    if (attendanceValues.length > 0) {
      await db
        .insert(attendances)
        .values(attendanceValues);
    }
  });
}