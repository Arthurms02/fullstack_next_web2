

import AnimatedBackground from '@/components/AnimatedBackground';
import Animation from '@/components/AnimatedText';
import PrimaryButton from '@/components/PrimaryButton';
import SecundaryButton from '@/components/SecundaryButton';
import NavbarLandpage from '@/components/NavbarLandpage';
import Link from 'next/dist/client/link';



export default function LandingPage() {
  return (
    <>
      <div className="flex flex-col align-items-center justify-center gap-24">
        <NavbarLandpage className="flex items-center justify-between mx-20 mt-10 px-6 py-2 rounded-md
                      bg-stone-950/50 border border-white/[0.08] backdrop-blur-xl
                      shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_10px_30px_rgba(0,0,0,0.5)]" >
                        <div className="flex items-center gap-4">
                          <SecundaryButton texto="Cadastra-se" />
                        </div>
                      </NavbarLandpage>
        <Animation />
        <div className="flex items-center justify-center gap-4 mb-10">
          <PrimaryButton>Sobre</PrimaryButton>
          <SecundaryButton texto="Agendar" />
        </div>
      </div>
    </>
  );
}
