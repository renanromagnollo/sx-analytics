import { db } from "@/db";
import { uploads } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";

export default async function UploadsPage() {
  const data = await db
    .select()
    .from(uploads)
    .orderBy(desc(uploads.startedAt));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Uploads do Gendo
      </h1>
      <Link
        href="/upload/new"
        className="px-4 py-2 rounded bg-black text-white"
      >
        Novo Upload
      </Link>

      <div className="space-y-4">
        {data.map((upload) => (
          <div
            key={upload.id}
            className="border rounded p-4"
          >
            <div className="flex justify-between">
              <strong>ID: {upload.id}</strong>
              <span>{upload.status}</span>
            </div>

            <div className="text-sm text-muted-foreground mt-2">
              Importados: {upload.importedRows} | Inválidos:{" "}
              {upload.invalidRows}
            </div>

            {upload.errorMessage && (
              <div className="text-red-500 text-sm mt-2">
                {upload.errorMessage}
              </div>
            )}

            <div className="text-xs mt-2">
              Início:{" "}
              {upload.startedAt?.toString?.() ?? "-"}
              <br />
              Fim:{" "}
              {upload.finishedAt?.toString?.() ?? "-"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}