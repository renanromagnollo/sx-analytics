import { z } from "zod";

export const attendanceImportSchema = z.object({
  clientName: z
    .string()
    .min(1, "Cliente obrigatório"),

  professionalName: z
    .string()
    .min(1, "Profissional obrigatório"),

  serviceName: z
    .string()
    .min(1, "Serviço obrigatório"),

  amount: z
    .number()
    .positive("Valor deve ser maior que zero"),

  commissionAmount: z
    .number()
    .optional(),

  attendanceDate: z.date(),
});

export function validateRows(data: unknown[]) {
  const validRows = [];

  const invalidRows = [];

  for (const row of data) {
    const result =
      attendanceImportSchema.safeParse(row);

    if (result.success) {
      validRows.push(result.data);
    } else {
      invalidRows.push({
        row,
        errors: result.error.flatten(),
      });
    }
  }

  return {
    validRows,
    invalidRows,
  };
}