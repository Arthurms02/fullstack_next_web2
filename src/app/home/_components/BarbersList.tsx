'use client';

import { useQuery } from '@tanstack/react-query';
import CardBarber from './CardBarber';
import type { Barber } from '@/types/type';
import { Esteban } from 'next/font/google';
import { endpointServerChangedSubscribe } from 'next/dist/build/swc/generated-native';

export default function BarbersList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const res = await fetch('/api/perfil');
      if (!res.ok) {
        throw new Error('Erro ao buscar perfis');
      }
      return res.json();
    },
  });

  if (isLoading) {
    return <div className="text-white">Carregando barbeiros...</div>;
  }

  if (error) {
    return <div className="text-red-400">Erro ao buscar barbeiros</div>;
  }

  // ✅ Mapear os perfis reais
  const barbeiros = data?.profiles?.map((profile: any) => ({
    id: profile._id,
    name: profile.barbeiro?.name || 'Sem nome',
    establishmentName: profile.establishmentName || 'Sem estabelecimento',
    avatar: profile.avatar || 'https://avatar.vercel.sh/default',
    status: 'Online', //  Pode adicionar status no banco depois
    description: profile.bio || 'Sem descrição',
  })) || [];

  return (
    <div className="w-full text-start mb-8">
      <h2 className="text-2xl font-semibold text-white">
        Barbeiros cadastrados
      </h2>
      <div
        className="flex align-center justify-center gap-5 flex-wrap w-full p-8 rounded-xl
            bg-stone-950/50 border border-white/10
            backdrop-blur-lg shadow-lg"
      >
        {barbeiros.length === 0 ? (
          <p className="text-stone-400">Nenhum barbeiro disponível</p>
        ) : (
          barbeiros.map((barber: Barber) => (
            <CardBarber key={barber.id} barber={barber} />
          ))
        )}
      </div>
    </div>
  );
}