/**
 * Utilitários para gerar slots de horários a partir de horários de início/fim
 * e duração do serviço (em minutos).
 */

/** Converte "HH:MM" para minutos desde 00:00 */
export function hhmmToMinutes(hhmm: string): number {
  const parts = hhmm.split(":");
  if (parts.length !== 2) throw new Error("Formato inválido, esperado HH:MM");
  const h = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);
  if (Number.isNaN(h) || Number.isNaN(m)) throw new Error("Horas inválidas");
  return h * 60 + m;
}

/** Converte minutos desde 00:00 para "HH:MM" (00-23) */
export function minutesToHHMM(mins: number): string {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/**
 * Gera um array de horários (strings "HH:MM") entre `start` e `end` considerando
 * a duração em minutos do serviço. O último slot será tal que `slot + duration <= end`.
 *
 * Ex: generateSlots('09:00','17:00',30) => ['09:00','09:30',...,'16:30']
 */
export function generateSlots(start: string, end: string, durationMinutes: number): string[] {
  if (durationMinutes <= 0) throw new Error("durationMinutes deve ser maior que 0");
  const startMin = hhmmToMinutes(start);
  const endMin = hhmmToMinutes(end);
  if (endMin <= startMin) return [];

  const slots: string[] = [];
  for (let t = startMin; t + durationMinutes <= endMin; t += durationMinutes) {
    slots.push(minutesToHHMM(t));
  }
  return slots;
}

export default generateSlots;
