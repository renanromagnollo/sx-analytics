import { db } from "@/db";

import { uploads } from "@/db/schema";

import { eq } from "drizzle-orm";

export async function createImportSession(
  fileName: string
) {
  const [upload] =
    await db
      .insert(uploads)
      .values({
        salonId: 1,

        fileName,

        status: "processing",
      })
      .returning();

  return upload;
}

export async function finishImportSession(
  uploadId: number,
  data: {
    importedRows: number;
    invalidRows: number;
  }
) {
  await db
    .update(uploads)
    .set({
      status: "completed",

      importedRows: data.importedRows,

      invalidRows: data.invalidRows,

      finishedAt: new Date(),
    })
    .where(eq(uploads.id, uploadId));
}

export async function failImportSession(
  uploadId: number,
  errorMessage: string
) {
  await db
    .update(uploads)
    .set({
      status: "failed",

      errorMessage,

      finishedAt: new Date(),
    })
    .where(eq(uploads.id, uploadId));
}