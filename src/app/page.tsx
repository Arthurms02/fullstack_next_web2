

import AnimatedBackground from '@/components/AnimatedBackground';
import Animation from '@/components/AnimatedText';
import PrimaryButton from '@/components/PrimaryButton';
import SecundaryButton from '@/components/SecundaryButton';
import NavbarLandpage from '@/components/NavbarLandpage';



export default function LandingPage() {
  return (
    <>
      <AnimatedBackground />
      <div className="flex flex-col align-items-center justify-center gap-32">
        <NavbarLandpage className="flex items-center justify-center mx-10 mt-10 p-2 rounded-md
                      bg-stone-950/50 border border-white/[0.08] backdrop-blur-xl
                      shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_10px_30px_rgba(0,0,0,0.5)]" />
        <Animation />
        <div className="flex items-center justify-center gap-4 mb-10">
          <PrimaryButton texto="Agendar" />
          <SecundaryButton texto="Saber mais" />
        </div>
      </div>
    </>
  );
}
