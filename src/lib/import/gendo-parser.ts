import * as XLSX from "xlsx";

export type Gendo304Row = {
  date: string;
  professional: string;
  service: string;
  totalAmount: number;
  clientName: string | null;
};

type RawGendoRow = Record<string, unknown>;

export function parseGendo304(buffer: Buffer): Gendo304Row[] {
  const workbook = XLSX.read(buffer, { type: "buffer" });

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const data = XLSX.utils.sheet_to_json<RawGendoRow>(sheet);

  return data.map((row) => ({
    date: String(row["Data"] ?? ""),
    professional: String(row["Profissional"] ?? ""),
    service: String(row["Serviço"] ?? ""),
    totalAmount: Number(row["Valor"] ?? 0),
    clientName: row["Cliente"] ? String(row["Cliente"]) : null,
  }));
}