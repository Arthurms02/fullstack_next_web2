
import { redirect } from "next/dist/client/components/navigation";
import PerfilFormClient from "./_components/PerfilFormClient";
import Navbar from "@/components/Navbar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

export default async function Perfil() {

  const session = await getServerSession(authOptions);
  if (!session) {
      redirect('/login');
  }



  return (
    <>
    <Navbar />
    <main className="min-h-screen w-full py-12 bg-stone-900/40 backdrop-blur-lg shadow-lg">
      <div className="mx-auto w-[85%] max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-white">
            Perfil do Barbeiro
          </h1>
        </div>
        <PerfilFormClient />
      </div>
    </main>
    </>
  );
}
