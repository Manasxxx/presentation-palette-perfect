import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { animate, spring } from "animejs";

interface SlideRevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  nativeMotion?: boolean;
}

// One restrained content settle after Lenis brings a slide into view. High
// damping and tiny travel keep the spring felt, not seen.
const lightSlideSpring = spring({ stiffness: 240, damping: 36, mass: 0.65 });

const SlideReveal = ({
  children,
  className = "",
  nativeMotion = false,
  ...props
}: SlideRevealProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    if (nativeMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      content.style.opacity = "1";
      content.style.transform = "none";
      return;
    }

    content.style.opacity = "0.9";
    content.style.transform = "translateY(-10px) scale(0.995)";

    const reveal = () => {
      if (triggered.current) return;
      triggered.current = true;
      content.style.willChange = "transform, opacity";

      animate(content, {
        opacity: [0.9, 1],
        translateY: [-10, 0],
        scale: [0.995, 1],
        duration: 620,
        ease: lightSlideSpring,
        onComplete: () => {
          content.style.willChange = "";
        },
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
      },
      { threshold: 0.16 },
    );

    observer.observe(content);
    const fallback = window.setTimeout(reveal, 800);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
      content.style.willChange = "";
    };
  }, [nativeMotion]);

  return (
    <div className={`${className} bg-background`} {...props}>
      <div
        ref={contentRef}
        data-slide-content
        data-native-slide-motion={nativeMotion ? "true" : undefined}
        className="relative"
        style={{ opacity: 1 }}
      >
        {children}
      </div>
    </div>
  );
};

export default SlideReveal;
