import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AnimatedShinyTextProps = {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
};

export function AnimatedShinyText({ children, className, shimmerWidth = 100 }: AnimatedShinyTextProps) {
  return (
    <span
      className={cn("inline-flex items-center justify-center bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: `linear-gradient(110deg, hsl(0 0% 100% / 0.58), hsl(0 0% 100%) 45%, hsl(0 0% 100% / 0.58) ${shimmerWidth}%)`,
        backgroundSize: "250% 100%",
        WebkitBackgroundClip: "text",
        animation: "shimmer-cascade 2.6s ease-in-out infinite",
      }}
    >
      {children}
    </span>
  );
}
