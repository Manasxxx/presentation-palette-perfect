import React, { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Local adaptation of MagicUI's InteractiveGridPattern (Tailwind 3 syntax,
 * no default border, configurable hover fill).
 *
 * @param width - The width of each square.
 * @param height - The height of each square.
 * @param squares - [horizontal, vertical] square counts.
 * @param className - Class name of the grid svg.
 * @param squaresClassName - Class name of every square.
 * @param hoverFillClassName - Fill class applied to the hovered square.
 * @param strokeColor - Inline stroke color (for runtime per-slide brand colors
 *   that Tailwind's static class extraction cannot produce).
 * @param hoverFillColor - Inline fill color for the hovered square.
 */
interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  squares?: [number, number];
  className?: string;
  squaresClassName?: string;
  hoverFillClassName?: string;
  strokeColor?: string;
  hoverFillColor?: string;
}

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className,
  squaresClassName,
  hoverFillClassName = "fill-gray-300/30",
  strokeColor,
  hoverFillColor,
  ...props
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares;
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={cn("absolute inset-0 h-full w-full", className)}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width;
        const y = Math.floor(index / horizontal) * height;
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            className={cn(
              // Named properties only. `transition-all` here animated x/y/width/height
              // on every grid cell, which is layout work on the compositor's critical path.
              "stroke-gray-400/30 transition-[fill,stroke] duration-100 ease-in-out [&:not(:hover)]:duration-1000",
              squaresClassName,
              hoveredSquare === index ? hoverFillClassName : "fill-transparent"
            )}
            style={{
              stroke: strokeColor,
              fill: hoveredSquare === index ? hoverFillColor : undefined,
            }}
            onMouseEnter={() => setHoveredSquare(index)}
            onMouseLeave={() => setHoveredSquare(null)}
          />
        );
      })}
    </svg>
  );
}
