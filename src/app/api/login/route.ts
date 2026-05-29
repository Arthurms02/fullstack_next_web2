import { NextResponse } from "next/server";
import { loginUser } from "@/app/login/_actions/loginAction";


export async function POST(request: Request) {
  try {
    const payload = await request.json();
    await loginUser(payload);
    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}