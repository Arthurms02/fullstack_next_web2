import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { updateProfile } from '@/app/perfil/_actions/updateProfileAction';
import { ProfileSchemaType } from '@/app/perfil/_schemas/profileSchema';

export async function POST(request: Request){
  try{
    const session = await getServerSession(authOptions as any);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }

    const payload: ProfileSchemaType = await request.json();
    // attach user id from session
    const userId = (session.user as any).id;

    await updateProfile({ ...payload, userId });

    return NextResponse.json({ success: true }, { status: 200 });
  }catch(err){
    console.error('Erro em POST /api/perfil', err);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
