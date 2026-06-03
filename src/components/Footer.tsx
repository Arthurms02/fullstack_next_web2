import Link from 'next/link';
import { Scissors } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 bg-black py-10 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Esquerda: Logo e Descrição */}
        <div className="flex items-center gap-4">
          <div className="p-2 bg-zinc-900 rounded-md border border-zinc-800">
            <Scissors className="text-white" size={24} />
          </div>
          <div className="text-left">
            <h4 className="text-white font-bold text-lg leading-none mb-1">BarberShop</h4>
            <p className="text-zinc-500 text-sm">Gestão inteligente para barbearias modernas.</p>
          </div>
        </div>

        {/* Direita: Links */}
        <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm text-zinc-400 items-center">
          <Link href="mailto:suporte@barbershop.com" className="hover:text-white transition-colors">
            suporte@barbershop.com
          </Link>
          <Link href="/login" className="hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/login" className="hover:text-white transition-colors">
            Área do Barbeiro
          </Link>
          <span className="text-zinc-600">
            © 2026 BarberShop
          </span>
        </div>

      </div>
    </footer>
  );
}