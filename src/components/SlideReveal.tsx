import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { animate } from "animejs";

interface SlideRevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const SlideReveal = ({ children, className = "", ...props }: SlideRevealProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    if (
      window.innerWidth < 1024 ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 767px)").matches
    ) {
      content.style.opacity = "1";
      content.style.transform = "none";
      return;
    }

    content.style.opacity = "0";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;

          // Content reveal — only animate the inner wrapper, not the outer container
          animate(content, {
            opacity: [0, 1],
            translateY: [32, 0],
            duration: 1100,
            ease: "cubicBezier(0.25, 0.1, 0.25, 1.0)",
          });

          // Top wipe line
          animate(content.querySelector(".sr-top-line")!, {
            scaleX: [0, 1],
            duration: 900,
            delay: 250,
            ease: "cubicBezier(0.25, 0.1, 0.25, 1.0)",
          });

          // Bottom wipe line
          animate(content.querySelector(".sr-bottom-line")!, {
            scaleX: [0, 1],
            duration: 900,
            delay: 450,
            ease: "cubicBezier(0.25, 0.1, 0.25, 1.0)",
          });
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${className} bg-background`} {...props}>
      <div
        ref={contentRef}
        data-slide-content
        className="relative"
        style={{ opacity: 1, willChange: "transform, opacity" }}
      >
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
