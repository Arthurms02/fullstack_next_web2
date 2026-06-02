import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, ShieldCheck, User } from "lucide-react";
import { authOptions } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

const roleLabels = {
  client: "Cliente",
  barber: "Barbeiro",
};

export default async function Perfil() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-950 px-6 text-white">
      <section className="w-full max-w-lg rounded-xl border border-white/10 bg-stone-900/80 p-8 shadow-xl">
        <Link href="/home" className="mb-8 inline-flex items-center gap-2 text-sm text-orange-200 hover:text-orange-100">
          <ArrowLeft size={16} />
          Voltar para o inicio
        </Link>
        <h1 className="mb-6 text-3xl font-bold">Meu perfil</h1>
        <div className="space-y-4">
          <p className="flex items-center gap-3"><User size={18} /> {session.user.name}</p>
          <p className="flex items-center gap-3"><Mail size={18} /> {session.user.email}</p>
          <p className="flex items-center gap-3"><ShieldCheck size={18} /> {roleLabels[session.user.role]}</p>
        </div>
        <div className="mt-8">
          <LogoutButton />
        </div>
      </section>
    </main>
  );
}
