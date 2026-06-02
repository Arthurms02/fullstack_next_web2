"use client";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DialogDemo } from "./DrawerAgendamento";

type Barber = {
  id: string;
  name: string;
  avatar?: string;
  status?: string;
  description?: string;
};

export default function CardBarber({ barber }: { barber?: Barber }) {
  const b = barber ?? {
    id: "64a1a1a1a1a1a1a1a1a1a1a1",
    name: "Nome do barbeiro",
    avatar: "https://avatar.vercel.sh/shadcn1",
    status: "online",
    description: "Pequena descrição sobre o trabalho do profissional.",
  };

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={b.avatar || "https://avatar.vercel.sh/shadcn1"}
        alt={b.name}
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          {b.status == "Online"? (
            <Badge variant="secondary" className="bg-green-300/50">
              {b.status}
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-red-300/50">
              {b.status}
            </Badge>
          )}
        </CardAction>
        <CardTitle>{b.name}</CardTitle>
        <CardDescription>{b.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex align-center justify-center w-full">
        <DialogDemo profissionalId={b.id} profissionalName={b.name} />
      </CardFooter>
    </Card>
  );
}
