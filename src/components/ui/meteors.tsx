import { cn } from "@/lib/utils";
import React from "react";

export const Meteors = ({ number = 20, className }: { number?: number; className?: string }) => {
  const meteors = new Array(number).fill(true);
  return (
    <>
      {meteors.map((_, idx) => (
        <span
          key={idx}
          className={cn(
            "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-full bg-violet-400 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-violet-400 before:to-transparent",
            className
          )}
          style={{
            top: 0,
            left: Math.floor(Math.random() * 800 - 400) + "px",
            animationDelay: (Math.random() * 0.6 + 0.2) + "s",
            animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
          }}
        />
      ))}
    </>
  );
};
