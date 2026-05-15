"use server";

import { parseExcelFile } from "@/engines/import/excel-parser";

import { normalizeRows } from "@/engines/import/normalizer";

import { validateRows } from "@/engines/import/validators";

import { persistRows } from "@/engines/import/persist";

import {
  createImportSession,
  failImportSession,
  finishImportSession,
} from "@/engines/import/import-session";

export async function uploadReportAction(
  formData: FormData
) {
  let uploadId: number | null = null;

  try {
    const file = formData.get("file") as File;

    if (!file) {
      throw new Error("Arquivo não enviado.");
    }

    const upload =
      await createImportSession(file.name);

    uploadId = upload.id;

    const rawData =
      await parseExcelFile(file);

    const normalizedData =
      normalizeRows(rawData);

    const validationResult =
      validateRows(normalizedData);

    await persistRows(
      validationResult.validRows
    );

    await finishImportSession(
      upload.id,
      {
        importedRows:
          validationResult.validRows.length,

        invalidRows:
          validationResult.invalidRows.length,
      }
    );

    return {
      success: true,

      importedRows:
        validationResult.validRows.length,

      invalidRows:
        validationResult.invalidRows.length,
    };

  } catch (error) {
    console.error(error);

    if (uploadId) {
      await failImportSession(
        uploadId,
        error instanceof Error
          ? error.message
          : "Erro desconhecido"
      );
    }

    return {
      success: false,
      error: "Erro ao processar arquivo.",
    };
  }
}