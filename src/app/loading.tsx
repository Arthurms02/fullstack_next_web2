import { Card, CardContent } from "@/components/ui/card";
import { Scissors } from "lucide-react";
import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <Card className="w-full max-w-md bg-stone-950/50 border border-white/10 backdrop-blur-lg shadow-lg">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="flex items-center justify-center w-16 h-16 rounded-full  bg-stone-100/50 border border-white/60
                  backdrop-blur-lg shadow-lg mb-6">
            <Scissors className="h-8 w-8 text-stone-800" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size="xl" />
          </div>
          <h2 className="text-lg font-semibold text-gray-200 mb-2">
            Carregando...
          </h2>

          <p className="text-sm text-gray-400 text-center">
            Por favor, aguarde enquanto preparamos tudo para você.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}