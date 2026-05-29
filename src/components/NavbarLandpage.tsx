
import { Button } from "./ui/button";
import Logo from "./Logo";
import { User } from "lucide-react";
import Link from "next/link";


export default function NavbarLandpage() {
  return (
    <nav
      className="flex items-center justify-between px-6 py-3 w-full
                      bg-stone-950/50 border border-white/[0.08] backdrop-blur-xl
                      shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_10px_30px_rgba(0,0,0,0.5)]"
    >
      <Logo />
      <Link
        href="/perfil"
        className="inline-flex text-white items-center gap-2 bg-stone-950/50 border border-white/[0.08] backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_10px_30px_rgba(0,0,0,0.5)] px-3 py-2 rounded"
        aria-label="Perfil"
      >
        Perfil <User />
      </Link>
    </nav>
  );
}