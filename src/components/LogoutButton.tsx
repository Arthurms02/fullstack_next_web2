"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="border-white/20 bg-stone-950/50 text-white hover:bg-stone-800 hover:text-white"
    >
      <LogOut />
      Sair
    </Button>
  );
}
