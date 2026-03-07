import { useEffect, useRef } from "react";
import { animate } from "animejs";

interface SlideNavigationProps {
  totalSlides: number;
  currentSlide: number;
  onNavigate: (index: number) => void;
}

const SlideNavigation = ({ totalSlides, currentSlide, onNavigate }: SlideNavigationProps) => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    animate(el, {
      opacity: [0, 1],
      translateX: [20, 0],
      duration: 500,
      delay: 1000,
      ease: "out(3)",
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2"
      style={{ opacity: 0 }}
    >
      {Array.from({ length: totalSlides }).map((_, i) => (
        <button
          key={i}
          onClick={() => onNavigate(i)}
          className={`w-1.5 rounded-full transition-all duration-300 ${currentSlide === i
              ? "h-6 md:h-8 bg-primary shadow-lg shadow-primary/50"
              : "h-2.5 md:h-3 bg-muted-foreground/30 hover:bg-muted-foreground/60"
            }`}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </nav>
  );
};

export default SlideNavigation;
