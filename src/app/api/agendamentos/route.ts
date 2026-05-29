import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Agendamento from "@/models/Agendamento";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions as any);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }

    const body = await request.json();
    const { profissionalId, dataHora } = body;

    if (!profissionalId || !dataHora) {
      return NextResponse.json({ error: 'Parâmetros "profissionalId" e "dataHora" são obrigatórios' }, { status: 400 });
    }

    const clienteId = (session.user as any).id;

    await dbConnect();

    const data = new Date(dataHora);
    if (isNaN(data.getTime())) {
      return NextResponse.json({ error: 'dataHora inválida' }, { status: 400 });
    }

    const agendamento = new Agendamento({
      dataHora: data,
      clienteId,
      profissionalId,
      status: 'pendente'
    });

    await agendamento.save();

    return NextResponse.json({ success: true, agendamento }, { status: 201 });
  } catch (error: any) {
    console.error('Erro em POST /api/agendamentos:', error);
    if (error && (error.code === 11000 || error.code === 11001)) {
      return NextResponse.json({ error: 'Horário já reservado' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
