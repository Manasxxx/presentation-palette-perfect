import { memo, useEffect, useId, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const TWO_PI = Math.PI * 2;

type Dot = {
  ax: number;
  ay: number;
  sx: number;
  sy: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

type DotFieldProps = React.HTMLAttributes<HTMLDivElement> & {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
  maxDpr?: number;
};

const DotField = memo(
  ({
    dotRadius = 1.5,
    dotSpacing = 14,
    cursorRadius = 500,
    cursorForce = 0.1,
    bulgeOnly = true,
    bulgeStrength = 67,
    glowRadius = 160,
    sparkle = false,
    waveAmplitude = 0,
    gradientFrom = "rgba(75, 194, 194, 0.35)",
    gradientTo = "rgba(255, 255, 255, 0.16)",
    glowColor = "rgba(75, 194, 194, 0.18)",
    maxDpr = 1.25,
    className = "",
    ...rest
  }: DotFieldProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<SVGCircleElement>(null);
    const dotsRef = useRef<Dot[]>([]);
    const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 });
    const rafRef = useRef<number | null>(null);
    const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });
    const glowOpacity = useRef(0);
    const engagement = useRef(0);
    const frameCount = useRef(0);
    const propsRef = useRef({
      dotRadius,
      dotSpacing,
      cursorRadius,
      cursorForce,
      bulgeOnly,
      bulgeStrength,
      sparkle,
      waveAmplitude,
      gradientFrom,
      gradientTo,
    });
    const rebuildRef = useRef<(() => void) | null>(null);
    const prefersReducedMotion = usePrefersReducedMotion();
    const glowId = useId().replace(/:/g, "");

    propsRef.current = {
      dotRadius,
      dotSpacing,
      cursorRadius,
      cursorForce,
      bulgeOnly,
      bulgeStrength,
      sparkle,
      waveAmplitude,
      gradientFrom,
      gradientTo,
    };

    useEffect(() => {
      const canvas = canvasRef.current;
      const root = rootRef.current;
      const glowEl = glowRef.current;
      if (!canvas || !root) return;

      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      let resizeTimer: ReturnType<typeof setTimeout>;
      let speedInterval: ReturnType<typeof setInterval> | null = null;
      let inView = false;

      const buildDots = (w: number, h: number) => {
        const p = propsRef.current;
        const step = p.dotRadius + p.dotSpacing;
        const cols = Math.floor(w / step);
        const rows = Math.floor(h / step);
        const padX = (w % step) / 2;
        const padY = (h % step) / 2;
        const dots: Dot[] = new Array(rows * cols);
        let idx = 0;

        for (let row = 0; row < rows; row += 1) {
          for (let col = 0; col < cols; col += 1) {
            const ax = padX + col * step + step / 2;
            const ay = padY + row * step + step / 2;
            dots[idx] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
            idx += 1;
          }
        }

        dotsRef.current = dots;
      };

      const draw = () => {
        frameCount.current += 1;
        const dots = dotsRef.current;
        const m = mouseRef.current;
        const { w, h } = sizeRef.current;
        const p = propsRef.current;
        const t = frameCount.current * 0.02;

        const targetEngagement = prefersReducedMotion ? 0 : Math.min(m.speed / 5, 1);
        engagement.current += (targetEngagement - engagement.current) * 0.06;
        if (engagement.current < 0.001) engagement.current = 0;

        glowOpacity.current += (engagement.current - glowOpacity.current) * 0.08;
        if (glowEl) {
          glowEl.setAttribute("cx", String(m.x));
          glowEl.setAttribute("cy", String(m.y));
          glowEl.style.opacity = String(glowOpacity.current);
        }

        ctx.clearRect(0, 0, w, h);

        const gradient = ctx.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0, p.gradientFrom);
        gradient.addColorStop(1, p.gradientTo);
        ctx.fillStyle = gradient;

        const crSq = p.cursorRadius * p.cursorRadius;
        const rad = p.dotRadius / 2;
        ctx.beginPath();

        for (let i = 0; i < dots.length; i += 1) {
          const d = dots[i];
          const dx = m.x - d.ax;
          const dy = m.y - d.ay;
          const distSq = dx * dx + dy * dy;

          if (!prefersReducedMotion && distSq < crSq && engagement.current > 0.01) {
            const dist = Math.sqrt(distSq);
            if (p.bulgeOnly) {
              const localT = 1 - dist / p.cursorRadius;
              const push = localT * localT * p.bulgeStrength * engagement.current;
              const angle = Math.atan2(dy, dx);
              d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
              d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
            } else {
              const angle = Math.atan2(dy, dx);
              const move = (500 / Math.max(dist, 1)) * (m.speed * p.cursorForce);
              d.vx += Math.cos(angle) * -move;
              d.vy += Math.sin(angle) * -move;
            }
          } else if (p.bulgeOnly) {
            d.sx += (d.ax - d.sx) * 0.1;
            d.sy += (d.ay - d.sy) * 0.1;
          }

          if (!p.bulgeOnly) {
            d.vx *= 0.9;
            d.vy *= 0.9;
            d.x = d.ax + d.vx;
            d.y = d.ay + d.vy;
            d.sx += (d.x - d.sx) * 0.1;
            d.sy += (d.y - d.sy) * 0.1;
          }

          let drawX = d.sx;
          let drawY = d.sy;
          if (!prefersReducedMotion && p.waveAmplitude > 0) {
            drawY += Math.sin(d.ax * 0.03 + t) * p.waveAmplitude;
            drawX += Math.cos(d.ay * 0.03 + t * 0.7) * p.waveAmplitude * 0.5;
          }

          if (p.sparkle) {
            const hash = ((i * 2654435761) ^ (frameCount.current >> 3)) >>> 0;
            const sparkleRadius = hash % 100 < 3 ? rad * 1.8 : rad;
            ctx.moveTo(drawX + sparkleRadius, drawY);
            ctx.arc(drawX, drawY, sparkleRadius, 0, TWO_PI);
          } else {
            ctx.moveTo(drawX + rad, drawY);
            ctx.arc(drawX, drawY, rad, 0, TWO_PI);
          }
        }

        ctx.fill();
      };

      const tick = () => {
        draw();
        rafRef.current = requestAnimationFrame(tick);
      };

      const stop = () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        if (speedInterval) window.clearInterval(speedInterval);
        speedInterval = null;
      };

      const start = () => {
        if (rafRef.current || prefersReducedMotion) return;
        speedInterval = window.setInterval(() => {
          const m = mouseRef.current;
          const dx = m.prevX - m.x;
          const dy = m.prevY - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          m.speed += (dist - m.speed) * 0.5;
          if (m.speed < 0.001) m.speed = 0;
          m.prevX = m.x;
          m.prevY = m.y;
        }, 20);
        rafRef.current = requestAnimationFrame(tick);
      };

      const doResize = () => {
        const rect = root.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;

        canvas.width = Math.max(1, Math.floor(w * dpr));
        canvas.height = Math.max(1, Math.floor(h * dpr));
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        sizeRef.current = {
          w,
          h,
          offsetX: rect.left + window.scrollX,
          offsetY: rect.top + window.scrollY,
        };

        buildDots(w, h);
        draw();
      };

      const resize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(doResize, 100);
      };

      const onMouseMove = (event: MouseEvent) => {
        const s = sizeRef.current;
        mouseRef.current.x = event.pageX - s.offsetX;
        mouseRef.current.y = event.pageY - s.offsetY;
      };

      const observer = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
          if (inView) start();
          else stop();
        },
        { threshold: 0.05 }
      );

      doResize();
      if (!prefersReducedMotion) observer.observe(root);
      window.addEventListener("resize", resize);
      window.addEventListener("mousemove", onMouseMove, { passive: true });

      rebuildRef.current = () => buildDots(sizeRef.current.w, sizeRef.current.h);

      return () => {
        stop();
        observer.disconnect();
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", resize);
        window.removeEventListener("mousemove", onMouseMove);
      };
    }, [maxDpr, prefersReducedMotion]);

    useEffect(() => {
      rebuildRef.current?.();
    }, [dotRadius, dotSpacing]);

    return (
      <div ref={rootRef} className={`relative h-full w-full ${className}`} {...rest}>
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id={glowId}>
              <stop offset="0%" stopColor={glowColor} />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle ref={glowRef} cx="-9999" cy="-9999" r={glowRadius} fill={`url(#${glowId})`} style={{ opacity: 0, willChange: "opacity" }} />
        </svg>
      </div>
    );
  }
);

DotField.displayName = "DotField";

export default DotField;
