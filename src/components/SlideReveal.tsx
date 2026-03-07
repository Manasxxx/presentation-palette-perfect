import { useEffect, useRef, ReactNode } from "react";
import { animate } from "animejs";

interface SlideRevealProps {
  children: ReactNode;
  className?: string;
}

const SlideReveal = ({ children, className = "" }: SlideRevealProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;

          // Content reveal — only animate the inner wrapper, not the outer container
          animate(content, {
            opacity: [0, 1],
            translateY: [40, 0],
            scale: [0.97, 1],
            duration: 900,
            ease: "cubicBezier(0.22, 1, 0.36, 1)",
          });

          // Top wipe line
          animate(content.querySelector(".sr-top-line")!, {
            scaleX: [0, 1],
            duration: 800,
            delay: 200,
            ease: "cubicBezier(0.22, 1, 0.36, 1)",
          });

          // Bottom wipe line
          animate(content.querySelector(".sr-bottom-line")!, {
            scaleX: [0, 1],
            duration: 800,
            delay: 400,
            ease: "cubicBezier(0.22, 1, 0.36, 1)",
          });
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${className} bg-background`}>
      <div ref={contentRef} className="relative" style={{ opacity: 0 }}>
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
    </div>
  );
};

export default SlideReveal;
