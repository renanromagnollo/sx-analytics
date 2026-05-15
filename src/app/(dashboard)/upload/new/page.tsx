import Link from "next/link";
import { DEV_SALON_ID } from "@/config/dev-salon";
import { UploadForm } from "../upload-form";

export default function UploadNewPage() {
  const salonId = DEV_SALON_ID;

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Novo Upload
        </h1>

        <div className="flex gap-3">
          <Link
            href="/upload"
            className="text-sm underline"
          >
            Voltar
          </Link>

          <Link
            href="/dashboard"
            className="text-sm underline"
          >
            Dashboard
          </Link>
        </div>
      </div>

      {/* FORM */}
      <UploadForm salonId={salonId} />
    </div>
  );
}