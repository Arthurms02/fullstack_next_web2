import React from "react";
import { Button } from "./ui/button";

export default function PrimaryButton({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      className={
        "p-6 rounded-sm text-sm font-medium transition-all bg-black/30 border border-white/8 backdrop-blur-md hover:bg-white/5 hover:border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_15px_rgba(0,0,0,0.3)] " +
        (className || "")
      }
      size="lg"
      {...props}
    >
      {children}
    </Button>
  );
}
