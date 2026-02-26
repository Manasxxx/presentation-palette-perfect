"use client";

import { useEffect, useRef, useCallback } from "react";

interface SpringConfig {
  damping: number;
  stiffness: number;
  mass: number;
  restDelta: number;
}

const defaultSpringConfig: SpringConfig = {
  damping: 45,
  stiffness: 400,
  mass: 1,
  restDelta: 0.001,
};

function DefaultCursorSVG() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}
    >
      <path
        d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
        fill="hsl(180, 45%, 53%)"
        stroke="white"
        strokeWidth="1"
      />
    </svg>
  );
}

export function SmoothCursor({
  cursor,
  springConfig = defaultSpringConfig,
}: {
  cursor?: React.ReactNode;
  springConfig?: SpringConfig;
}) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const angleRef = useRef(0);

  const updatePosition = useCallback(() => {
    const { damping, stiffness, mass } = springConfig;

    const dx = targetRef.current.x - posRef.current.x;
    const dy = targetRef.current.y - posRef.current.y;

    const springForceX = stiffness * dx;
    const springForceY = stiffness * dy;

    const dampingForceX = damping * velRef.current.x;
    const dampingForceY = damping * velRef.current.y;

    const accelX = (springForceX - dampingForceX) / mass;
    const accelY = (springForceY - dampingForceY) / mass;

    velRef.current.x += accelX * 0.016;
    velRef.current.y += accelY * 0.016;

    posRef.current.x += velRef.current.x * 0.016;
    posRef.current.y += velRef.current.y * 0.016;

    // Calculate rotation based on velocity
    const speed = Math.sqrt(
      velRef.current.x ** 2 + velRef.current.y ** 2
    );
    if (speed > 0.1) {
      angleRef.current =
        Math.atan2(velRef.current.y, velRef.current.x) * (180 / Math.PI) + 90;
    }

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) rotate(${angleRef.current}deg)`;
    }

    const distX = Math.abs(targetRef.current.x - posRef.current.x);
    const distY = Math.abs(targetRef.current.y - posRef.current.y);

    if (distX > springConfig.restDelta || distY > springConfig.restDelta || speed > 0.1) {
      rafRef.current = requestAnimationFrame(updatePosition);
    }
  }, [springConfig]);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updatePosition]);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{ willChange: "transform" }}
    >
      {cursor || <DefaultCursorSVG />}
    </div>
  );
}
