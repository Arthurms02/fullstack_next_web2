import { Button } from "./ui/button";

export default function PrimaryButton({texto}: {texto: string}) {
  return (
    <Button
      className="p-6 rounded-sm text-sm font-medium transition-all
                             bg-black/[0.3] border border-white/[0.08] backdrop-blur-md
                             hover:bg-white/[0.05] hover:border-white/[0.2]
                             shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_15px_rgba(0,0,0,0.3)]"
      size="lg"
    >
      {texto}
    </Button>
  );
}