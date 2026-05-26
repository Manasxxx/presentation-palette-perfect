import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  strength?: number;
  radius?: number;
};

const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ className, strength = 0.24, radius = 150, disabled, onMouseMove, onMouseLeave, style, ...props }, forwardedRef) => {
    const localRef = useRef<HTMLButtonElement | null>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      const hoverDevice = window.matchMedia("(hover: hover) and (pointer: fine)");

      const update = () => {
        setIsEnabled(!reducedMotion.matches && hoverDevice.matches);
      };

      update();
      reducedMotion.addEventListener("change", update);
      hoverDevice.addEventListener("change", update);

      return () => {
        reducedMotion.removeEventListener("change", update);
        hoverDevice.removeEventListener("change", update);
      };
    }, []);

    const setRefs = (node: HTMLButtonElement | null) => {
      localRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      }
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
      onMouseMove?.(event);
      if (!isEnabled || disabled || !localRef.current) return;

      const rect = localRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance > radius) {
        setOffset({ x: 0, y: 0 });
        return;
      }

      const pull = 1 - distance / radius;
      setOffset({
        x: deltaX * strength * pull,
        y: deltaY * strength * pull,
      });
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
      onMouseLeave?.(event);
      setOffset({ x: 0, y: 0 });
    };

    return (
      <button
        ref={setRefs}
        disabled={disabled}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn("will-change-transform", className)}
        style={{
          ...style,
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: offset.x === 0 && offset.y === 0 ? "transform 420ms cubic-bezier(0.16, 1, 0.3, 1)" : "transform 120ms ease-out",
        }}
        {...props}
      />
    );
  }
);

MagneticButton.displayName = "MagneticButton";

export default MagneticButton;
