import { eq } from "drizzle-orm";
import { db } from "@/db";
import { uploads } from "@/db/schema";

import { parseGendo304 } from "./gendo-parser";
import { importGendo304 } from "./gendo-importer";

type UploadStatus = "processing" | "done" | "error";

export async function processUpload(
  uploadId: string,
  buffer: Buffer,
  salonId: string
) {
  console.log(`[UPLOAD ${uploadId}] starting process`);

  await db
    .update(uploads)
    .set({
      status: "processing",
      startedAt: new Date(),
      errorMessage: null,
    })
    .where(eq(uploads.id, uploadId));

  try {
    console.log(`[UPLOAD ${uploadId}] parsing file`);

    const rows = parseGendo304(buffer);

    console.log(
      `[UPLOAD ${uploadId}] rows parsed: ${rows.length}`
    );

    const result = await importGendo304(rows, salonId);

    console.log(
      `[UPLOAD ${uploadId}] import done`,
      result
    );

    await db
      .update(uploads)
      .set({
        status: "done",
        importedRows: result.imported,
        invalidRows: result.invalid,
        finishedAt: new Date(),
      })
      .where(eq(uploads.id, uploadId));

    console.log(`[UPLOAD ${uploadId}] finished successfully`);
  } catch (err) {
    console.error(`[UPLOAD ${uploadId}] error`, err);

    await db
      .update(uploads)
      .set({
        status: "error",
        errorMessage:
          err instanceof Error
            ? err.message
            : "Unknown error",
        finishedAt: new Date(),
      })
      .where(eq(uploads.id, uploadId));
  }
}