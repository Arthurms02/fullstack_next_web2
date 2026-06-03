import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { updateProfile } from '@/app/perfil/_actions/updateProfileAction';
import { ProfileSchemaType } from '@/app/perfil/_schemas/profileSchema';
import Profile from '@/models/Profile';
import dbConnect from '@/lib/db';


export async function POST(request: Request){
  try{
    const session = await getServerSession(authOptions);

    if (!session) {
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

export async function GET(request: Request){
  try{
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }
    
    await dbConnect();

    const profiles = await Profile.find()
      .populate('user', 'name email role') // Popular dados do usuário
      .lean(); // Retorna objetos simples (mais rápido)

    return NextResponse.json({ 
      success: true, 
      profiles,
      total: profiles.length 
    }, { status: 200 });
  }catch(err){
    console.error('Erro em GET /api/perfil', err);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
