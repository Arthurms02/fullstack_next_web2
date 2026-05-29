'use client';

import { Button } from "./ui/button";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";


export default function CardBarber() {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary" className="bg-green-300/50">Online</Badge>
        </CardAction>
        <CardTitle>Nome do barbeiro</CardTitle>
        <CardDescription>
          Pequena descrição sobre o trabalho do profissional.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full bg-blue-800/50 hover:bg-blue-900 text-white">Agendar</Button>
      </CardFooter>
    </Card>
  );
}