"use client";

import React, { useState } from "react";
import HorarioGrid from "./HorarioGrid";
import { Button } from "@/components/ui/button";


type SchedulingPanelProps = {
  initialProfissionalId?: string;
  initialDate?: string;
};

export default function SchedulingPanel({
  initialProfissionalId,
  initialDate,
}: SchedulingPanelProps) {
  const [date, setDate] = useState<string>(() => {
    const d = new Date();
    return initialDate ?? d.toISOString().slice(0, 10); // YYYY-MM-DD
  });
  const [profissional, setProfissional] = useState<string>("");
  const [duration, setDuration] = useState<number>(30);
  const [selected, setSelected] = useState<string | undefined>(undefined);

  // Exemplo simples de profissionais — substitua por dados reais se desejar
  const profissionais = [
    { id: "64a1a1a1a1a1a1a1a1a1a1a1", name: "João" },
    { id: "64b2b2b2b2b2b2b2b2b2b2b2", name: "Carlos" },
  ];

  // Set initial profissional if provided
  React.useEffect(() => {
    if (initialProfissionalId) {
      setProfissional(initialProfissionalId);
    }
  }, [initialProfissionalId]);

  return (
      <div className=" flex flex-col flex-wrap w-full p-4 bg-stone-950/40 rounded-lg">
        <div className="flex flex-wrap gap-3 items-center mb-4">
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
        <div className="mt-4 flex gap-2">
          <Button
            onClick={async () => {
              if (!profissional) {
                alert("Selecione um profissional.");
                return;
              }
              if (!selected) {
                alert("Selecione um horário.");
                return;
              }

              // Construir ISO simplificado (UTC) — ajuste conforme necessidade de timezone
              const iso = `${date}T${selected}:00.000Z`;

              try {
                const res = await fetch("/api/agendamentos", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    profissionalId: profissional,
                    dataHora: iso,
                  }),
                });

                if (res.status === 401) {
                  alert("Você precisa estar logado para agendar.");
                  window.location.href = "/login";
                  return;
                }

                if (res.status === 409) {
                  const body = await res.json();
                  alert(
                    body?.error ??
                      "Horário já reservado. Atualize e tente outro horário.",
                  );
                  return;
                }

                if (!res.ok) {
                  const body = await res.json().catch(() => ({}));
                  alert(body?.error ?? "Erro ao criar agendamento");
                  return;
                }

                alert("Agendamento criado com sucesso!");
              } catch (err) {
                console.error(err);
                alert("Erro ao conectar ao servidor");
              }
            }}
          >
            Confirmar agendamento
          </Button>
        </div>
      </div>
  );
}
