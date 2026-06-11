"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import createGlobe, { COBEOptions } from "cobe";
import { cn } from "@/lib/utils";

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => { },
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.3, 0.3, 0.3],
  markerColor: [0.1, 0.8, 0.8],
  glowColor: [0.1, 0.5, 0.5],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.05 },
    { location: [23.8103, 90.4125], size: 0.03 },
    { location: [30.0444, 31.2357], size: 0.03 },
    { location: [39.9042, 116.4074], size: 0.04 },
    { location: [35.6762, 139.6503], size: 0.04 },
    { location: [51.5074, -0.1278], size: 0.04 },
    { location: [40.7128, -74.006], size: 0.05 },
    { location: [-23.5505, -46.6333], size: 0.03 },
    { location: [1.3521, 103.8198], size: 0.03 },
    { location: [28.6139, 77.209], size: 0.05 },
  ],
};

/**
 * Simple spring-like smoothing: lerps toward a target value each frame.
 * Replaces framer-motion's useMotionValue + useSpring for the globe rotation offset.
 */
function useSpringValue(initial: number, config = { damping: 30, stiffness: 100 }) {
  const current = useRef(initial);
  const target = useRef(initial);
  const velocity = useRef(0);
  const { damping, stiffness } = config;

  const set = useCallback((value: number) => {
    target.current = value;
  }, []);

  const get = useCallback(() => current.current, []);

  // Simple spring step (called per frame inside globe's onRender)
  const step = useCallback(() => {
    const dt = 1 / 60; // assumed 60fps
    const force = stiffness * (target.current - current.current);
    velocity.current += force * dt;
    velocity.current *= Math.exp(-damping * dt);
    current.current += velocity.current * dt;
  }, [damping, stiffness]);

  return { set, get, step };
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const spring = useSpringValue(0, { damping: 30, stiffness: 100 });
  const springRef = useRef(spring);
  springRef.current = spring;

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      spring.set(delta / 200);
    }
  };

  // IntersectionObserver to only render when visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !canvasRef.current) {
      // Destroy globe when not visible
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
      return;
    }

    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    // Ambient backdrop: cap the WebGL backing store so the oversized desktop
    // container (120% of the slide) doesn't allocate a huge retina buffer.
    // The cap must flow through devicePixelRatio: phenomenon sizes the canvas
    // buffer from clientWidth * dpr, while width/height only set the shader
    // resolution uniform — if they disagree the globe renders shrunken and
    // offscreen (Session 41/42 invisible-globe bug).
    const dpr = widthRef.current > 0 ? Math.min(2, 2048 / widthRef.current) : 2;
    const renderSize = () => widthRef.current * dpr;

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      devicePixelRatio: dpr,
      width: renderSize(),
      height: renderSize(),
      onRender: (state) => {
        springRef.current.step();
        if (!pointerInteracting.current) phiRef.current += 0.005;
        state.phi = phiRef.current + springRef.current.get();
        state.width = renderSize();
        state.height = renderSize();
      },
    });
    globeRef.current = globe;

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    });

    return () => {
      globe.destroy();
      globeRef.current = null;
      window.removeEventListener("resize", onResize);
    };
  }, [config, isVisible]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => updatePointerInteraction(e.clientX)}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
