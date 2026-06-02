"use client"


import  AnimetedCards  from "@/components/AnimatedCards"
import { RegisterForm } from "../register/_components/RegisterForm"
import { ArrowLeft } from "lucide-react"
import Link from "next/dist/client/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import FormRegisterBarbeiro from "./_components/FormRegisterBarbeiro"



export default function RegisterPage() {
  const [role, setRole] = useState<"barber" | "client">("client");

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-white/20 text-stone-100 backdrop-blur-lg shadow-lg">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/login" className="flex items-center gap-2 font-medium">
            <ArrowLeft size={16} />
            Voltar.
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center mb-2">
          <div className="flex items-center gap-2">
          <p>Você é um:</p>
            <Button onClick={() => setRole("client")}>Cliente</Button>
            <Button onClick={() => setRole("barber")}>Barbeiro</Button>
          </div>
          <div className="w-full max-w-xs">
            {role === "barber" ? <FormRegisterBarbeiro /> : <RegisterForm  />}
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/modelo-barbershop.jpg"
          alt="Modelo realizando o corte de cabelo"
          fill
          sizes="100vw"
          loading="eager"
          priority
          className="absolute inset-0 object-cover "
        />
        <AnimetedCards />
      </div>
    </div>
  );
}
