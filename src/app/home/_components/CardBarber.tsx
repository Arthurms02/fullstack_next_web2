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
import type { Barber } from "@/types/type";



export default function CardBarber({ barber }: { barber?: Barber }) {

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={barber?.avatar || "https://avatar.vercel.sh/shadcn1"}
        alt={barber?.name}
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          {barber?.status == "Online"? (
            <Badge variant="secondary" className="bg-green-300/50">
              {barber.status}
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-red-300/50">
              {barber?.status}
            </Badge>
          )}
        </CardAction>
        <CardTitle>{barber?.establishmentName}</CardTitle>
        <CardDescription>{barber?.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex align-center justify-center w-full">
        <DialogDemo profissionalId={barber?.id} profissionalName={barber?.establishmentName} />
      </CardFooter>
    </Card>
  );
}
