import Link from "next/link";
import { User } from "lucide-react";

export default function PerfilButton() {
  return (
    <Link
        href="/perfil"
        className="inline-flex text-white items-center gap-2 bg-stone-950/50 border border-white/[0.08]
        backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_10px_30px_rgba(0,0,0,0.5)] px-3 py-2 rounded"
        aria-label="Perfil"
      >
        Perfil <User />
    </Link>
  );
}