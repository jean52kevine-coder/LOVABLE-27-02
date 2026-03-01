import React from "react";
import { cn } from "@/lib/utils";

export const Meteors = ({
  number = 20,
  color = "#9B5FFF",
  className,
}: {
  number?: number;
  color?: string;
  className?: string;
}) => {
  const meteors = new Array(number).fill(true);
  return (
    <>
      {meteors.map((_, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[80px] before:h-[1px] before:bg-gradient-to-r before:to-transparent",
            className
          )}
          style={{
            top: 0,
            left: Math.floor(Math.random() * (400 - -400) + -400) + "px",
            animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
            animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
            background: color,
            boxShadow: `0 0 0 1px ${color}20`,
          }}
        />
      ))}
    </>
  );
};
