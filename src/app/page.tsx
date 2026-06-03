import Animation from '@/components/AnimatedText';
import PrimaryButton from '@/components/PrimaryButton';
import SecundaryButton from '@/components/SecundaryButton';
import NavbarLandpage from '@/components/NavbarLandpage';
import Link from 'next/link';
import FeatureCard from '@/components/FeatureCard';
import { CalendarClock, Scissors, Wallet } from 'lucide-react';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <>
      <div className="flex flex-col align-items-center justify-center gap-24">
        <NavbarLandpage className="flex items-center justify-between md:mx-20 mt-10 px-6 py-2 rounded-md
                      bg-stone-950/50 border border-white/[0.08] backdrop-blur-xl
                      shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_10px_30px_rgba(0,0,0,0.5)]" >
          <SecundaryButton texto="Cadastra-se" />
        </NavbarLandpage>
        <Animation />
        <div className="flex items-center justify-center gap-4 mb-10">
         <Link href="#sobre-o-sistema">
          <PrimaryButton>Sobre</PrimaryButton>
        </Link>
          <SecundaryButton texto="Agendar" />
        </div>
      </div>
      
      <section id="sobre-o-sistema" className="min-h-screen py-24 px-8 mt-12 text-center text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            Muito mais que um agendamento. Uma gestão completa.
          </h2>
          <p className="text-lg text-gray-400 mb-12">
            Nossa plataforma foi desenvolvida para conectar clientes aos seus estilos favoritos, 
            enquanto entrega aos donos de barbearia o controle total sobre agendas, 
            comissões de profissionais e fluxo de caixa.
          </p>
          
          {/* Espaço para os seus cards de funcionalidades */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-16 px-4">
            <FeatureCard 
              Icon={CalendarClock}
              title="Agenda Inteligente" 
              description="Esqueça os cadernos. Seus clientes agendam pelo celular e o sistema organiza tudo automaticamente, sem furos de horário."
            />
            
            <FeatureCard 
              Icon={Scissors}
              title="Comissões Exatas" 
              description="Fechamento do dia em poucos cliques. O sistema calcula automaticamente a parte da barbearia e a de cada barbeiro."
            />
            
            <FeatureCard 
              Icon={Wallet}
              title="Estoque e Caixa" 
              description="Controle o que entra e sai. Saiba quantas pomadas ou bebidas foram vendidas e mantenha a saúde financeira do negócio."
            />
          </div>
        </div>
        
          <div className="w-full max-w-5xl mx-auto mt-32 mb-20 px-4">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-12 md:p-16 flex flex-col items-center text-center shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Pronto para elevar o nível da sua barbearia?
              </h2>
              <p className="text-gray-400 mb-8 max-w-2xl text-lg">
                Assuma o controle da sua agenda, facilite o cálculo de comissões e ofereça a melhor experiência de agendamento para os seus clientes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href="/register" className="w-full sm:w-auto">
                  <button className="w-full bg-white text-black px-8 py-3 rounded-md font-bold hover:bg-gray-200 transition-colors">
                    Criar minha conta
                  </button>
                </Link>
                <Link href="/login" className="w-full sm:w-auto">
                  <button className="w-full bg-zinc-950 text-white border border-zinc-700 px-8 py-3 rounded-md font-bold hover:bg-zinc-800 transition-colors">
                    Acesso Administrativo
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <Footer />
      </section>
    </>
  );
}
