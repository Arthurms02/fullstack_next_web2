import React, { useState, useEffect } from "react";
import generateSlots from "@/lib/slots";
import useHorariosOcupados from "@/hooks/useHorariosOcupados";

interface HorarioGridProps {
  date?: string; // YYYY-MM-DD
  profissionalId?: string;
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  durationMinutes: number;
  selected?: string;
  onSelect?: (time: string) => void;
  columns?: number;
}

export default function HorarioGrid({
  date,
  profissionalId,
  startTime,
  endTime,
  durationMinutes,
  selected: selectedProp,
  onSelect,
  columns = 4,
}: HorarioGridProps) {
  const {
    data: ocupados = [],
    isLoading,
    isError,
    error,
  } = useHorariosOcupados(date, profissionalId);
  const [selected, setSelected] = useState<string | undefined>(selectedProp);

  useEffect(() => setSelected(selectedProp), [selectedProp]);

  const slots = React.useMemo(
    () => generateSlots(startTime, endTime, durationMinutes),
    [startTime, endTime, durationMinutes],
  );

  function handleSelect(time: string) {
    if (ocupados.includes(time)) return;
    setSelected(time);
    onSelect?.(time);
  }

  if (isLoading)
    return <div className="text-sm text-gray-300">Carregando horários...</div>;
  if (isError)
    return (
      <div className="text-sm text-red-400">
        Erro ao carregar horários: {error?.message}
      </div>
    );

  return (
    <div className={`grid grid-cols-6 sm:grid-cols-${columns} gap-2`}>
      {slots.map((time) => {
        const isOcupado = ocupados.includes(time);
        const isSelected = selected === time;
        return (
          <button
            key={time}
            onClick={() => handleSelect(time)}
            disabled={isOcupado}
            className={`w-full text-sm py-2 px-3 rounded-md border transition-colors flex items-center justify-center
              ${isOcupado ? "bg-gray-700 text-gray-400 cursor-not-allowed opacity-60 line-through" : "bg-white/5 text-white hover:bg-indigo-600 hover:text-white cursor-pointer"}
              ${isSelected ? "ring-2 ring-indigo-400 bg-indigo-600 text-white" : ""}`}
            aria-disabled={isOcupado}
            aria-pressed={isSelected}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}
