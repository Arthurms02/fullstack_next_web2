import AnimetedBackground from "@/components/AnimatedBackground";
import CardBarber from "@/components/CardBarber";
import NavbarLandpage from "@/components/NavbarLandpage";
import PerfilButton from "@/components/PerfilButton";
import SchedulingPanel from "@/components/SchedulingPanel";
import { DrawerDialogDemo } from "@/components/DrawerAgendamento";

export default async function Home() {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect('/login');
  // }

  return (
    <>
      <AnimetedBackground />
      <main className="flex flex-col items-center justify-center min-h-screen">
        <NavbarLandpage
          className="flex items-center justify-between px-6 py-3 w-full
                      bg-stone-950/50 border border-white/[0.08] backdrop-blur-xl
                      shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_10px_30px_rgba(0,0,0,0.5)]"
        >
          <PerfilButton />
        </NavbarLandpage>
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
            <DrawerDialogDemo />
            <div
              className="flex aling-center justify-center gap-5 flex-wrap w-full p-8 rounded-xl
                  bg-stone-950/50 border border-white/10
                  backdrop-blur-lg shadow-lg"
            >
              <CardBarber />
              <CardBarber />
              <CardBarber />
              <CardBarber />
              <CardBarber />
              <CardBarber />
              <CardBarber />
              <CardBarber />
            </div>
          </div>
          <div className="w-full mt-6">
            <h2 className="text-2xl font-semibold text-white mb-3">
              Agendar Horário
            </h2>
            <SchedulingPanel />
          </div>
        </div>
      </main>
    </>
  );
}
