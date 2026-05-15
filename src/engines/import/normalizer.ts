import { parse } from "date-fns";

import { NormalizedAttendanceRow } from "@/types/import";

import { COLUMN_ALIASES } from "./mapper";

function normalizeString(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function findColumnMatch(column: string) {
  const normalizedColumn =
    normalizeString(column);

  for (const [key, aliases] of Object.entries(
    COLUMN_ALIASES
  )) {
    const hasMatch = aliases.some((alias) => {
      return (
        normalizeString(alias) ===
        normalizedColumn
      );
    });

    if (hasMatch) {
      return key;
    }
  }

  return null;
}

export function normalizeRows(
  data: unknown[]
): NormalizedAttendanceRow[] {
  return data.map((row) => {
    const normalizedRow:
      NormalizedAttendanceRow = {};

    for (const [column, value] of Object.entries(
      row
    )) {
      const mappedColumn =
        findColumnMatch(column);

      if (!mappedColumn) continue;

      switch (mappedColumn) {
        case "clientName":
          normalizedRow.clientName =
            sanitizeText(value);
          break;

        case "professionalName":
          normalizedRow.professionalName =
            sanitizeText(value);
          break;

        case "serviceName":
          normalizedRow.serviceName =
            sanitizeText(value);
          break;

        case "amount":
          normalizedRow.amount =
            sanitizeCurrency(value);
          break;

        case "commissionAmount":
          normalizedRow.commissionAmount =
            sanitizeCurrency(value);
          break;

        case "attendanceDate":
          normalizedRow.attendanceDate =
            sanitizeDate(value);
          break;
      }
    }

    return normalizedRow;
  });
}

function sanitizeCurrency(
  value: unknown
): number | undefined {
  if (!value) return undefined;

  if (typeof value === "number") {
    return value;
  }

  const cleaned = String(value)
    .replace(/[R$\s]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  const parsed = Number(cleaned);

  if (Number.isNaN(parsed)) {
    return undefined;
  }

  return parsed;
}

function sanitizeDate(
  value: unknown
): Date | undefined {
  if (!value) return undefined;

  if (value instanceof Date) {
    return value;
  }

  if (typeof value === "number") {
    const excelEpoch = new Date(1899, 11, 30);

    return new Date(
      excelEpoch.getTime() +
      value * 24 * 60 * 60 * 1000
    );
  }

  const parsed = parse(
    String(value),
    "dd/MM/yyyy",
    new Date()
  );

  if (Number.isNaN(parsed.getTime())) {
    return undefined;
  }

  return parsed;
}

function sanitizeText(
  value: unknown
): string | undefined {
  if (!value) return undefined;

  return String(value).trim();
}