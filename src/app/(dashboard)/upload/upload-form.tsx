"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";


import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Props = {
  salonId: string;
};

export function UploadForm({ salonId }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const router = useRouter();

  async function handleUpload() {
    if (!file || loading) return;


    setLoading(true);
    setStatus(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("salonId", salonId);

      const response = await fetch("/api/upload/gendo-304", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => null);

        throw new Error(
          error?.message || "Falha ao processar upload"
        );
      }

      router.push("/dashboard");
      router.refresh();

      setStatus("Upload iniciado com sucesso!");
      setFile(null);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erro inesperado no upload";

      setStatus(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="p-8">
      <div className="flex flex-col gap-6">

        {/* DROP AREA */}
        <div className="border-2 border-dashed rounded-xl p-12 text-center">
          <UploadCloud className="w-10 h-10 mx-auto mb-4" />

          <h2 className="text-xl font-semibold mb-2">
            Envie seu relatório
          </h2>

          <p className="text-muted-foreground mb-6">
            Formatos suportados: XLSX e CSV
          </p>

          <input
            type="file"
            accept=".xlsx,.csv"
            disabled={loading}
            onChange={(e) => {
              const selected = e.target.files?.[0];
              if (selected) {
                setFile(selected);
                setStatus(null);
              }
            }}
          />
        </div>

        {/* FILE SELECTED */}
        {file && (
          <div className="flex items-center justify-between border rounded-lg p-4">
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <Button
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? "Processando..." : "Processar Arquivo"}
            </Button>
          </div>
        )}

        {/* STATUS */}
        {status && (
          <div
            className={`text-sm ${status.toLowerCase().includes("erro")
              ? "text-red-500"
              : "text-green-600"
              }`}
          >
            {status}
          </div>
        )}

      </div>
    </Card>
  );
}