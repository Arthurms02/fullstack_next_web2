import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Agendamento from "@/models/Agendamento";

function formatHourUTC(date: Date) {
  const h = date.getUTCHours();
  const m = date.getUTCMinutes();
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const data = searchParams.get("data"); // YYYY-MM-DD
    const profissional = searchParams.get("profissional");

    if (!data || !profissional) {
      return NextResponse.json({ error: 'Parâmetros "data" e "profissional" são obrigatórios' }, { status: 400 });
    }

    // Construir intervalo UTC do dia
    const start = new Date(`${data}T00:00:00.000Z`);
    const end = new Date(`${data}T23:59:59.999Z`);

    await dbConnect();

    const ocupados = await Agendamento.find({
      profissionalId: profissional,
      dataHora: { $gte: start, $lte: end },
      status: { $ne: 'cancelado' }
    }).select('dataHora -_id').lean();

    const horas = ocupados
      .map((d: any) => formatHourUTC(new Date(d.dataHora)))
      .filter((v: string, i: number, a: string[]) => a.indexOf(v) === i)
      .sort();

    return NextResponse.json(horas, { status: 200 });
  } catch (error: any) {
    console.error('Erro em /api/agendamentos/ocupados:', error);
    if (error && error.code === 11000) {
      return NextResponse.json({ error: 'Conflito de duplicidade' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
