import AnimatedBackground from "@/components/AnimatedBackground";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnimatedBackground />
      {children}
    </>
  );
}