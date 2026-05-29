import Image from "next/image";

export default function Logo(){
  return (
    <div className="flex items-center gap-3">
      <Image src="/Tesoura-logo.png" alt="Logo da barbearia" width={50} height={50} />
      <h1 className="text-xl font-bold text-white">BarberShop</h1>
    </div>
  );
}