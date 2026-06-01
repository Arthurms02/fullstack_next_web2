import {
  LogOutIcon,
  User,
  ChartNoAxesCombined,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/dist/client/link"

export function DropdownMenuPerfil() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="inline-flex text-white items-center gap-2 bg-stone-950/50 border border-white/[0.08]
        backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_10px_30px_rgba(0,0,0,0.5)] px-5 py-2 rounded-md "
      >
        <Button variant="outline">
          Perfil <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-stone-950/50 border text-white border-white/[0.08] backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_10px_30px_rgba(0,0,0,0.5)]">
        <DropdownMenuItem>
          <Link href="/perfil" className="flex items-center gap-2 w-full">
            <User />Perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ChartNoAxesCombined />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
