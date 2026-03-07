import { useEffect, useRef } from "react";
import { animate } from "animejs";

const slideLabels = [
  "Intro", "Why Us", "About",
  "Services", "Clients", "Case Study", "Contact"
];

const slideToNavIndex = (slideIndex: number): number => {
  if (slideIndex <= 5) return slideIndex;
  if (slideIndex <= 11) return 5;
  return 6;
};

const navToSlideIndex = (navIndex: number): number => {
  if (navIndex <= 5) return navIndex;
  return 12;
};

interface PersistentHeaderProps {
  visible: boolean;
  currentSlide: number;
  onNavigate: (index: number) => void;
}

const PersistentHeader = ({ visible, currentSlide, onNavigate }: PersistentHeaderProps) => {
  const headerRef = useRef<HTMLElement>(null);
  const wasVisible = useRef(visible);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    if (visible && !wasVisible.current) {
      // Entering
      el.style.display = "flex";
      animate(el, {
        translateY: [-30, 0],
        opacity: [0, 1],
        duration: 500,
        ease: "cubicBezier(0.22, 1, 0.36, 1)",
      });
    } else if (!visible && wasVisible.current) {
      // Exiting
      animate(el, {
        translateY: [0, -30],
        opacity: [1, 0],
        duration: 500,
        ease: "cubicBezier(0.22, 1, 0.36, 1)",
        onComplete: () => {
          if (el) el.style.display = "none";
        },
      });
    }

    wasVisible.current = visible;
  }, [visible]);

  return (
    <header
      ref={headerRef}
      className="fixed top-4 left-0 right-0 z-40 flex justify-center px-4"
      style={{ display: visible ? "flex" : "none", opacity: visible ? 1 : 0 }}
    >
      <nav
        className="flex items-center gap-0.5 px-2 py-1.5 rounded-full border border-white/20 max-w-full overflow-x-auto scrollbar-hide"
        style={{
          background: "linear-gradient(135deg, hsl(var(--background) / 0.45), hsl(var(--background) / 0.3))",
          backdropFilter: "blur(24px) saturate(1.6)",
          WebkitBackdropFilter: "blur(24px) saturate(1.6)",
          boxShadow: "0 8px 32px hsl(var(--background) / 0.4), inset 0 1px 0 hsl(var(--foreground) / 0.08)",
        }}
      >
        {slideLabels.map((label, i) => {
          const isActive = slideToNavIndex(currentSlide) === i;
          return (
            <button
              key={label}
              onClick={() => onNavigate(navToSlideIndex(i))}
              className="relative px-3 md:px-4 py-1.5 text-[10px] md:text-xs font-semibold tracking-wider uppercase whitespace-nowrap rounded-full"
              style={{
                color: isActive
                  ? "hsl(var(--primary-foreground))"
                  : "hsl(var(--muted-foreground) / 0.6)",
                background: isActive
                  ? "hsl(var(--primary))"
                  : "transparent",
                boxShadow: isActive
                  ? "0 2px 12px hsl(var(--primary) / 0.4)"
                  : "none",
                transition: "all 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};

export default PersistentHeader;
