import { useQuery } from '@tanstack/react-query';

/**
 * Hook para buscar horários ocupados de um profissional em uma data.
 * queryKey: ['horariosOcupados', date, profissionalId]
 */
export default function useHorariosOcupados(date?: string, profissionalId?: string) {
  return useQuery<string[], Error>({
    queryKey: ['horariosOcupados', date, profissionalId],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('data', date!);
      params.set('profissional', profissionalId!);

      const res = await fetch(`/api/agendamentos/ocupados?${params.toString()}`);
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `Erro ao buscar horários (${res.status})`);
      }

      const data = await res.json();
      return data as string[];
    },
    enabled: Boolean(date && profissionalId),
    staleTime: 1000 * 60 * 2, // 2 minutos
  });
}
