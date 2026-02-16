import { useState, useEffect, useRef } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  startOnView?: boolean;
}

export function useCountUp({ end, duration = 1.8, suffix = "", prefix = "", decimals = 0 }: UseCountUpOptions) {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);
  const rafRef = useRef<number>();

  const start = () => {
    const startTime = performance.now();
    setDone(false);

    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * end);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setValue(end);
        setDone(true);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const display = `${prefix}${value.toFixed(decimals)}${suffix}`;

  return { display, done, start, value };
}
