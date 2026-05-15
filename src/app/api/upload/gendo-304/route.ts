import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

import { processUpload } from "@/lib/import/process-upload";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");
    const salonId = formData.get("salonId");

    if (!salonId || typeof salonId !== "string") {
      return NextResponse.json(
        { error: "Salon não informado" },
        { status: 400 }
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Arquivo inválido" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadId = randomUUID();

    await processUpload(uploadId, buffer, salonId);

    // 🔥 ESSENCIAL: invalida dashboard
    revalidatePath("/dashboard");

    return NextResponse.json({
      ok: true,
      uploadId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao processar upload" },
      { status: 500 }
    );
  }
}