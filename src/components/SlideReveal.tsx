import { useEffect, useRef, ReactNode } from "react";
import { animate } from "animejs";

interface SlideRevealProps {
  children: ReactNode;
  className?: string;
}

const SlideReveal = ({ children, className = "" }: SlideRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;

          // Container reveal
          animate(el, {
            opacity: [0, 1],
            translateY: [40, 0],
            scale: [0.97, 1],
            duration: 900,
            ease: "cubicBezier(0.22, 1, 0.36, 1)",
          });

          // Top wipe line
          animate(el.querySelector(".sr-top-line")!, {
            scaleX: [0, 1],
            duration: 800,
            delay: 200,
            ease: "cubicBezier(0.22, 1, 0.36, 1)",
          });

          // Bottom wipe line
          animate(el.querySelector(".sr-bottom-line")!, {
            scaleX: [0, 1],
            duration: 800,
            delay: 400,
            ease: "cubicBezier(0.22, 1, 0.36, 1)",
          });
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      <div
        className="sr-top-line absolute top-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-20"
        style={{ transform: "scaleX(0)" }}
      />
      <div
        className="sr-bottom-line absolute bottom-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent z-20"
        style={{ transform: "scaleX(0)" }}
      />
      {children}
    </div>
  );
};

export default SlideReveal;
