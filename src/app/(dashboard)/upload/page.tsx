import { UploadForm } from "./upload-form";

export default function UploadPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Upload de Relatório
        </h1>

        <p className="text-muted-foreground">
          Envie relatórios XLSX ou CSV do Gendo.
        </p>
      </div>

      <UploadForm />
    </div>
  );
}