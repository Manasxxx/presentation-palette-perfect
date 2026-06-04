import { lazy, Suspense, useMemo, useState, useEffect, useRef, type ComponentType } from "react";
import TitleSlide from "@/components/slides/TitleSlide";

import SlideReveal from "@/components/SlideReveal";
import PillNav from "@/components/PillNav";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const SkyrocketSlide = lazy(() => import("@/components/slides/SkyrocketSlide"));
const ServicesSlide = lazy(() => import("@/components/slides/ServicesSlide"));
const ClientsSlide = lazy(() => import("@/components/slides/ClientsSlide"));
const CaseStudySlide = lazy(() => import("@/components/slides/CaseStudySlide"));
const BaxsaaCaseStudy = lazy(() => import("@/components/slides/BaxsaaCaseStudy"));
const CultFitCaseStudy = lazy(() => import("@/components/slides/CultFitCaseStudy"));
const GirlUpCaseStudy = lazy(() => import("@/components/slides/GirlUpCaseStudy"));
const CTPCaseStudy = lazy(() => import("@/components/slides/CTPCaseStudy"));
const VNTCaseStudy = lazy(() => import("@/components/slides/VNTCaseStudy"));
const RaychemRPGCaseStudy = lazy(() => import("@/components/slides/RaychemRPGCaseStudy"));
const ContactSlide = lazy(() => import("@/components/slides/ContactSlide"));

const slides: ComponentType[] = [
  TitleSlide,
  SkyrocketSlide,
  ServicesSlide,
  ClientsSlide,
  CaseStudySlide,
  BaxsaaCaseStudy,
  CultFitCaseStudy,
  GirlUpCaseStudy,
  CTPCaseStudy,
  VNTCaseStudy,
  RaychemRPGCaseStudy,
  ContactSlide,
];

const SLIDE_MOUNT_RADIUS = 0;
const NAV_IDLE_HIDE_DELAY = 1600;

/**
 * The slides are sized in `svh` (small-viewport height, constant), but
 * `window.innerHeight` grows on mobile when the browser URL bar auto-hides on
 * scroll. Dividing `scrollTop` (which accrues in real svh-based layout pixels)
 * by `window.innerHeight` makes the active-slide index drift low and compound
 * down the deck, so the looked-at slide stops being the mounted one and shows
 * the black `SlideFallback`. Measuring an actual rendered slide gives the true
 * per-slide stride and is correct on desktop too.
 */
const getSlideHeight = (container: HTMLElement) => {
  const probe = container.querySelector<HTMLElement>(".slide");
  const height = probe?.getBoundingClientRect().height ?? 0;
  return height > 0 ? height : window.innerHeight;
};

// A soft branded skeleton instead of a black void, so the lazy-chunk fetch for
// the next slide does not flash an empty frame between scroll-snap stops.
const SlideFallback = () => (
  <section className="slide bg-background" aria-hidden="true">
    <div className="h-full w-full bg-[radial-gradient(circle_at_50%_40%,rgba(75,194,194,0.06),transparent_60%)]" />
  </section>
);

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  // Case studies (Mitsui through Raychem) are immersive on mobile — hide the
  // whole nav bar (logo + menu) there. Desktop keeps the nav untouched.
  const onCaseStudy = currentSlide >= 4 && currentSlide <= 10;

  const [navActive, setNavActive] = useState(true);
  const navIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mountedSlides = useMemo(() => {
    const next = new Set<number>();
    const start = Math.max(0, currentSlide - SLIDE_MOUNT_RADIUS);
    const end = Math.min(slides.length - 1, currentSlide + SLIDE_MOUNT_RADIUS);
    for (let index = start; index <= end; index += 1) {
      next.add(index);
    }
    return next;
  }, [currentSlide]);

  /**
   * Keeps the header navigation available while the user is moving through the
   * deck, then clears it once they pause to view the current slide.
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const showNavWhileActive = () => {
      setNavActive(true);
      if (navIdleTimerRef.current) clearTimeout(navIdleTimerRef.current);
      navIdleTimerRef.current = setTimeout(() => {
        setNavActive(false);
      }, NAV_IDLE_HIDE_DELAY);
    };

    showNavWhileActive();
    container.addEventListener("mousemove", showNavWhileActive);
    container.addEventListener("wheel", showNavWhileActive, { passive: true });
    container.addEventListener("touchstart", showNavWhileActive, { passive: true });
    container.addEventListener("touchmove", showNavWhileActive, { passive: true });
    container.addEventListener("scroll", showNavWhileActive, { passive: true });
    window.addEventListener("keydown", showNavWhileActive);

    return () => {
      if (navIdleTimerRef.current) clearTimeout(navIdleTimerRef.current);
      container.removeEventListener("mousemove", showNavWhileActive);
      container.removeEventListener("wheel", showNavWhileActive);
      container.removeEventListener("touchstart", showNavWhileActive);
      container.removeEventListener("touchmove", showNavWhileActive);
      container.removeEventListener("scroll", showNavWhileActive);
      window.removeEventListener("keydown", showNavWhileActive);
    };
  }, []);

  /**
   * Tracks the user's vertical scroll position across the full-height sections
   * and maps it to the `currentSlide` index.
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        const scrollTop = container.scrollTop;
        const slideHeight = getSlideHeight(container);
        const newSlide = Math.round(scrollTop / slideHeight);
        setCurrentSlide(Math.max(0, Math.min(newSlide, slides.length - 1)));
        rafId = null;
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  /**
   * Programmatically scrolls the container to a specific slide index.
   */
  const navigateToSlide = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({
      top: index * getSlideHeight(container),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div
      ref={containerRef}
      data-deck-scroll-container
      className={`h-screen w-full overflow-y-auto overflow-x-hidden bg-background${prefersReducedMotion ? "" : " scroll-smooth"}`}
      style={{ scrollSnapType: "y mandatory", WebkitOverflowScrolling: "touch" }}
    >

      <PillNav
        visible={navActive && !(isMobile && onCaseStudy)}
        currentSlide={currentSlide}
        onNavigate={navigateToSlide}
      />
      {slides.map((SlideComponent, index) => (
        <SlideReveal key={index} className="relative">
          {mountedSlides.has(index) ? (
            <Suspense fallback={<SlideFallback />}>
              {index === 0 ? (
                <TitleSlide onViewCaseStudies={() => navigateToSlide(4)} />
              ) : (
                <SlideComponent />
              )}
            </Suspense>
          ) : (
            <SlideFallback />
          )}
        </SlideReveal>
      ))}
    </div>
  );
};

export default Index;
