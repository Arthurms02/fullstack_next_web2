"use client";

import Link from "next/dist/client/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AppError({ error, reset }: ErrorProps) {

  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-xl max-w-lg mx-auto my-10 text-center">
      <h2 className="text-xl font-bold text-red-700 mb-2">Ops! Algo deu errado.</h2>
      <p className="text-sm text-red-600 mb-6">
        Não conseguimos carregar as informações do agendamento neste momento: {error.message}.
      </p>
      
      <div className="flex justify-center gap-4">
        <button
          onClick={() => reset()} // Tenta renderizar o componente original novamente
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition font-medium"
        >
          Tentar Novamente
        </button>
        <Link 
          href="/" 
          className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm transition"
        >
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
}
