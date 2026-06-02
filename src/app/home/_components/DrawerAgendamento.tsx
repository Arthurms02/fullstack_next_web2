"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SchedulingPanel from "./SchedulingPanel";

type DialogDemoProps = {
  profissionalId?: string;
  profissionalName?: string;
  initialDate?: string;
};

export function DialogDemo({
  profissionalId,
  profissionalName,
  initialDate,
}: DialogDemoProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="md:px-20">
          Agende seu horário {profissionalName ? `com ${profissionalName}` : ""}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Agendar Horário</DialogTitle>
          <DialogDescription>
            Selecione o horário disponível para o seu agendamento.
          </DialogDescription>
        </DialogHeader>

        <SchedulingPanel
          initialProfissionalId={profissionalId}
          initialDate={initialDate}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
