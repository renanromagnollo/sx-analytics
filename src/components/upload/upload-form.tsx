"use client";

import { useState, useTransition } from "react";

import { UploadCloud } from "lucide-react";
import { toast } from "sonner";

import { uploadReportAction } from "@/actions/upload-report.action";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null);

  const [isPending, startTransition] = useTransition();

  async function handleUpload() {
    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    startTransition(async () => {
      const response = await uploadReportAction(formData);

      if (response.success) {
        toast.success(
          `
          ${response.importedRows} linhas importadas.
          ${response.invalidRows} linhas inválidas.
          `
        );
      } else {
        toast.error(response.error);
      }
    });
  }

  return (
    <Card className="p-8">
      <div className="flex flex-col gap-6">

        <div className="border-2 border-dashed rounded-xl p-12 text-center">

          <div className="flex justify-center mb-4">
            <UploadCloud className="w-10 h-10" />
          </div>

          <h2 className="text-xl font-semibold mb-2">
            Envie seu relatório
          </h2>

          <p className="text-muted-foreground mb-6">
            Formatos suportados: XLSX e CSV
          </p>

          <input
            type="file"
            accept=".xlsx,.csv"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];

              if (!selectedFile) return;

              setFile(selectedFile);
            }}
          />

        </div>

        {file && (
          <div className="flex items-center justify-between border rounded-lg p-4">
            <div>
              <p className="font-medium">
                {file.name}
              </p>

              <p className="text-sm text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <Button
              onClick={handleUpload}
              disabled={isPending}
            >
              {isPending
                ? "Processando..."
                : "Processar Arquivo"}
            </Button>
          </div>
        )}

      </div>
    </Card>
  );
}