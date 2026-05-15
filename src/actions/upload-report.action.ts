"use server";

import { parseExcelFile } from "@/engines/import/excel-parser";

export async function uploadReportAction(
  formData: FormData
) {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      throw new Error("Arquivo não enviado.");
    }

    const data = await parseExcelFile(file);

    console.log(data);

    return {
      success: true,
    };

  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Erro ao processar arquivo.",
    };
  }
}