'use client';

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";


export function SessionProviders({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthSessionProvider>
      {children}
    </NextAuthSessionProvider>
  );
}