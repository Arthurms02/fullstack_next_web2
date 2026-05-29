import GlassIcons from "@/components/reactBits/glassCard/GlassIcons"
import Image from "next/image"
import { FiCalendar, FiClock, FiScissors } from "react-icons/fi";



export default function AnimatedCards() {

  const items = [
  { icon: <FiCalendar />, color: 'stone', label: 'Agendar' },
  { icon: <FiScissors />, color: 'stone', label: 'Estilos' },
  { icon: <FiClock />, color: 'stone', label: 'Horários' },
];

  return (
    <>
      <div className="absolute inset-0 bg-black/50 flex pb-30 items-end justify-center">
        <GlassIcons items={items} className="text-white" />
      </div>
    </>
  );
}