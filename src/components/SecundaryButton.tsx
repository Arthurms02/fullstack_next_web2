import { Button } from "./ui/button";

export default function SecundaryButton({texto}: {texto: string}) {
  return (
  <Button className="p-6 rounded-sm bg-white text-black font-medium text-sm hover:bg-gray-200 transition-all shadow-lg">
    {texto}
  </Button>
  );
}