"use client";

import { useState } from "react";

import { UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null);

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

            <Button>
              Processar Arquivo
            </Button>
          </div>
        )}

      </div>
    </Card>
  );
}