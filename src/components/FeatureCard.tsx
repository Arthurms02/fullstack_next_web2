// src/components/FeatureCard.tsx
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export default function FeatureCard({ title, description, Icon }: FeatureCardProps) {
  return (

    <div className="group flex flex-col items-center p-8 bg-zinc-900/40 border border-zinc-800 rounded-xl hover:bg-zinc-800/60 transition-all duration-300 text-center cursor-pointer shadow-lg hover:shadow-2xl">
     
      <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-full bg-zinc-950 border border-zinc-800 shadow-inner group-hover:bg-zinc-800/80 transition-all duration-300">
        <Icon size={28} strokeWidth={1.5} className="text-zinc-400 group-hover:text-white transition-colors duration-300" />
      </div>

      <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed font-light">
        {description}
      </p>
    </div>
  );
}
