'use client';

import AnimatedBackground from "@/components/AnimatedBackground";
import NotAnimatedBackground from "@/components/NotAnimatedBackground";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const hideBackgroundRoutes = ['/perfil','/home','/login', '/register'];
  
    if (hideBackgroundRoutes.includes(pathname)) {
      return (
        <>
          <NotAnimatedBackground />
          {children}
        </>
      );
    }
  return (
    <>
      <AnimatedBackground />
      {children}
    </>
  );
}