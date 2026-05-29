"use client";

import { LoginForm } from "./_components/LoginForm";
import { ArrowLeft } from "lucide-react";
import AnimetedCards from "@/components/AnimatedCards";
import Link from "next/dist/client/link";
import Image from "next/image";

export default function LoginPage() {

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 ">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center">
              <ArrowLeft className="size-4" />
            </div>
            Voltar
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
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
