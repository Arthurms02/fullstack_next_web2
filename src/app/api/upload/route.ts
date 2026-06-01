import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    // espera { filename, data: base64, contentType?, size? }
    const body = await request.json();
    const { filename, data, contentType, size } = body as {
      filename: string;
      data: string;
      contentType?: string;
      size?: number;
    };

    if (!filename || !data) {
      return NextResponse.json({ error: 'Payload inválido' }, { status: 400 });
    }

    // Validações de segurança: só permitir imagens e tamanho máximo
    const allowed = ['image/png', 'image/jpeg', 'image/webp'];
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (contentType && !allowed.includes(contentType)) {
      return NextResponse.json({ error: 'Formato de arquivo não permitido' }, { status: 400 });
    }
    if (size && size > maxSize) {
      return NextResponse.json({ error: 'Arquivo muito grande' }, { status: 400 });
    }

    // garante que a pasta public/uploads existe
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // decodifica base64 e verifica tamanho real antes de salvar
    const buffer = Buffer.from(data, 'base64');
    if (buffer.length > maxSize) {
      return NextResponse.json({ error: 'Arquivo muito grande' }, { status: 400 });
    }

    // sanitiza o nome do arquivo para evitar path traversal
    const safeName = path.basename(filename);
    const filePath = path.join(uploadsDir, safeName);
    fs.writeFileSync(filePath, buffer);

    // retorna a URL pública do arquivo salvo
    const url = `/uploads/${safeName}`;
    return NextResponse.json({ url }, { status: 200 });
  } catch (err) {
    console.error('Erro em /api/upload', err);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
