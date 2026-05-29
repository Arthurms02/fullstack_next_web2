import { RegisterAuthSchemaType } from "@/app/register/_schemas/registerAuthSchema";
import { registerUser } from "@/app/register/_actions/registerActions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload: RegisterAuthSchemaType = await request.json();
    await registerUser(payload);
    return NextResponse.json({ message: 'Usuário registrado com sucesso' }, { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'Falha ao registrar usuário' }, { status: 500 });
  }
}