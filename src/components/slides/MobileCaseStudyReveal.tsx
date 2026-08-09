/* eslint-disable react-refresh/only-export-components -- Shared reveal hook, layer, and backing belong to one mobile effect. */
import {
  Fragment,
  type CSSProperties,
  type MutableRefObject,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type UseCaseStudyEntryRevealOptions = {
  isMobile: boolean;
  onReveal: (section: HTMLElement) => void;
};

type MobileCaseStudyRevealLayerProps = {
  children: ReactNode;
  isMobile: boolean;
  revealed: boolean;
  revealLayerRef: MutableRefObject<HTMLDivElement | null>;
};

/**
 * Starts a case reveal from the real deck movement, before the slide settles.
 * The observed section is never clipped; only `MobileCaseStudyRevealLayer` is.
 */
export function useCaseStudyEntryReveal({
  isMobile,
  onReveal,
}: UseCaseStudyEntryRevealOptions) {
  const sectionRef = useRef<HTMLElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const onRevealRef = useRef(onReveal);
  const hasRevealedRef = useRef(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    onRevealRef.current = onReveal;
  }, [onReveal]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reveal = () => {
      if (hasRevealedRef.current) return;
      hasRevealedRef.current = true;

      // Change the clip class in the entry callback itself. Waiting for a
      // React render can make the circle start after the deck has landed.
      if (isMobile && revealLayerRef.current) {
        revealLayerRef.current.classList.remove("case-mobile-circle-ready");
        revealLayerRef.current.classList.add("case-mobile-circle-reveal");
      }

      setRevealed(true);
      onRevealRef.current(section);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
      },
      { threshold: isMobile ? 0.08 : 0.3 },
    );
    observer.observe(section);

    // Mobile cases mount one slide early. Follow the actual deck scroller so
    // forward and reverse entries start once about 6% of the case is visible.
    const scrollContainer = isMobile
      ? section.closest<HTMLElement>("[data-deck-scroll-container]")
      : null;
    const revealWhenEntering = () => {
      if (!scrollContainer) return;
      const rect = section.getBoundingClientRect();
      const viewportHeight = scrollContainer.clientHeight;
      if (
        rect.top < viewportHeight * 0.94
        && rect.bottom > viewportHeight * 0.06
      ) {
        reveal();
      }
    };

    scrollContainer?.addEventListener("scroll", revealWhenEntering, { passive: true });
    revealWhenEntering();

    // A timer is safe on desktop. On mobile it would fire while the adjacent
    // case is merely pre-mounted and finish the circle before real entry.
    const fallback = isMobile ? 0 : window.setTimeout(reveal, 900);

    return () => {
      observer.disconnect();
      scrollContainer?.removeEventListener("scroll", revealWhenEntering);
      if (fallback) window.clearTimeout(fallback);
    };
  }, [isMobile]);

  return { sectionRef, revealLayerRef, revealed };
}

/** Adds no DOM at desktop widths, preserving the existing desktop structure. */
export function MobileCaseStudyRevealLayer({
  children,
  isMobile,
  revealed,
  revealLayerRef,
}: MobileCaseStudyRevealLayerProps) {
  if (!isMobile) return <Fragment>{children}</Fragment>;

  return (
    <div
      ref={revealLayerRef}
      className={`relative h-full w-full overflow-hidden ${revealed ? "case-mobile-circle-reveal" : "case-mobile-circle-ready"}`}
    >
      {children}
    </div>
  );
}

export function getMobileCaseRevealBacking(
  accentColor: string,
  secondAccent = accentColor,
  lightMode = false,
): CSSProperties {
  return {
    // The opaque brand base prevents a black frame even if a browser drops a
    // gradient layer. The overlays only soften that base into a short-lived tint.
    backgroundColor: `hsl(${accentColor})`,
    backgroundImage: lightMode
      ? `radial-gradient(circle at 76% 72%, hsl(${secondAccent} / 0.24), transparent 56%), linear-gradient(145deg, hsl(36 28% 96% / 0.82), hsl(36 28% 94% / 0.62))`
      : `radial-gradient(circle at 76% 72%, hsl(${secondAccent} / 0.42), transparent 56%), linear-gradient(145deg, hsl(214 30% 10% / 0.22), hsl(214 30% 10% / 0.5))`,
  };
}
