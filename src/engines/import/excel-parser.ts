import * as XLSX from "xlsx";

export async function parseExcelFile(
  file: File
) {
  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  const workbook = XLSX.read(buffer, {
    type: "buffer",
  });

  const sheetName = workbook.SheetNames[0];

  const worksheet = workbook.Sheets[sheetName];

  const data = XLSX.utils.sheet_to_json(worksheet);

  return data;
}