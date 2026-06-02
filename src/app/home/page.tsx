import CardBarber from "./_components/CardBarber";
import Navbar from "@/components/Navbar";


export default async function Home() {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect('/login');
  // }

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen">
      <Navbar />
        <div
          className="flex flex-col gap-3 w-full mx-10 p-8 bg-stone-900/40
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
            <h2 className="text-2xl font-semibold text-white">
              Barbeiros cadastrados
            </h2>
            <div
              className="flex aling-center justify-center gap-5 flex-wrap w-full p-8 rounded-xl
                  bg-stone-950/50 border border-white/10
                  backdrop-blur-lg shadow-lg"
            >
              {[
                {
                  id: "64a1a1a1a1a1a1a1a1a1a1a1",
                  name: "João",
                  avatar: "https://avatar.vercel.sh/shadcn1",
                  status: "Online",
                  description: "Cortes clássicos e modernos.",
                },
                {
                  id: "64b2b2b2b2b2b2b2b2b2b2b2",
                  name: "Carlos",
                  avatar: "https://avatar.vercel.sh/shadcn2",
                  status: "Online",
                  description: "Especialista em fades.",
                },
                {
                  id: "64c3c3c3c3c3c3c3c3c3c3c3",
                  name: "Pedro",
                  avatar: "https://avatar.vercel.sh/shadcn3",
                  status: "Offline",
                  description: "Barbeiro experiente.",
                },
                {
                  id: "64c3c3c3c3c3c3c3c3c4c3c3",
                  name: "Jorge",
                  avatar: "https://avatar.vercel.sh/shadcn3",
                  status: "Offline",
                  description: "Barbeiro experiente.",
                },
              ].map((b) => (
                <CardBarber key={b.id} barber={b} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
