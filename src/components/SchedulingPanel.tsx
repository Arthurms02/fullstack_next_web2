"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HorarioGrid from "./HorarioGrid";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutos
    },
  },
});

export default function SchedulingPanel() {
  const [date, setDate] = useState<string>(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10); // YYYY-MM-DD
  });
  const [profissional, setProfissional] = useState<string>("");
  const [duration, setDuration] = useState<number>(30);
  const [selected, setSelected] = useState<string | undefined>(undefined);

  // Exemplo simples de profissionais — substitua por dados reais se desejar
  const profissionais = [
    { id: "64a1a1a1a1a1a1a1a1a1a1a1", name: "João" },
    { id: "64b2b2b2b2b2b2b2b2b2b2b2", name: "Carlos" },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full p-4 bg-stone-950/40 rounded-lg">
        <div className="flex gap-3 items-center mb-4">
          <label className="text-sm text-gray-300">Data:</label>
          <input
            className="p-2 rounded bg-white/5 text-white"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label className="text-sm text-gray-300">Profissional:</label>
          <select
            className="p-2 rounded bg-white/5 text-white"
            value={profissional}
            onChange={(e) => setProfissional(e.target.value)}
          >
            <option value="">Selecione</option>
            {profissionais.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <label className="text-sm text-gray-300">Duração (min):</label>
          <input
            className="p-2 rounded bg-white/5 text-white w-20"
            type="number"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value || "0", 10))}
          />
        </div>

        <div>
          <HorarioGrid
            date={date}
            profissionalId={profissional}
            startTime="09:00"
            endTime="17:00"
            durationMinutes={duration}
            selected={selected}
            onSelect={(t) => setSelected(t)}
            columns={4}
          />
        </div>

        <div className="mt-4 text-sm text-gray-300">
          Selecionado: {selected ?? "—"}
        </div>
      </div>
    </QueryClientProvider>
  );
}
