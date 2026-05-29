import { NextResponse } from "next/server";


export async function POST(request: Request) {
  try {
    const payload = await request.json();
    // Aqui você pode adicionar validação do payload usando zod ou outra biblioteca
    // E depois chamar um serviço para autenticar o usuário
    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}