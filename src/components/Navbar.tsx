'use client';

import { DropdownMenuPerfil } from "./DropdownMenuPerfil";
import { usePathname } from "next/navigation";
import Logo from "./Logo";


export default function Navbar() {
  const pathname = usePathname();

  const hideNavbarRoutes = ['/login', '/register'];

  if (hideNavbarRoutes.includes(pathname)) {
    return null;
  }
  return (
    <nav className="flex items-center justify-between px-6 py-3 w-full bg-stone-950/50 border border-white/[0.08] backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_10px_30px_rgba(0,0,0,0.5)]">
          <Logo />
          <DropdownMenuPerfil />
    </nav>
  );
 }