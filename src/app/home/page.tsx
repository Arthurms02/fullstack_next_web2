import CardBarber from "./_components/CardBarber";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import BarbersList from "./_components/BarbersList";


const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }


  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center h-screen min-h-screen">
        <div
          className="flex flex-col gap-3 w-full h-screen mx-10 p-8 bg-stone-900/40
                  backdrop-blur-lg shadow-lg"
        >
          <div className="flex flex-col align-center justify-center w-full text-center mb-8">
            <h1 className="text-start text-2xl font-bold text-white">
              Seus agendamentos
            </h1>
            <div
              className="flex gap-3 flex-wrap w-full p-8 rounded-xl
                  bg-stone-950/50 border border-white/10
                  backdrop-blur-lg shadow-lg"
            ></div>
          </div>
          <div className="w-full text-start mb-8">
              <BarbersList />
          </div>
        </div>
      </main>
    </>
  );
}
