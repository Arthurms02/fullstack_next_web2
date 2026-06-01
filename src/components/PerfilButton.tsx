import Link from "next/link";
import { User } from "lucide-react";

export default function PerfilButton() {
  return (
    <Link
        href="/perfil"
      >
        Perfil <User />
    </Link>
  );
}