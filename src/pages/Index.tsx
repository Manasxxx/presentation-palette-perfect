import { lazy, Suspense, useMemo, useState, useEffect, useRef, type ComponentType } from "react";
import TitleSlide from "@/components/slides/TitleSlide";

import SlideReveal from "@/components/SlideReveal";
import PillNav from "@/components/PillNav";

const SkyrocketSlide = lazy(() => import("@/components/slides/SkyrocketSlide"));
const OurTeamSlide = lazy(() => import("@/components/slides/OurTeamSlide"));
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
  OurTeamSlide,
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

const SlideFallback = () => <section className="slide" aria-hidden="true" />;

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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
        const slideHeight = window.innerHeight;
        const newSlide = Math.round(scrollTop / slideHeight);
        setCurrentSlide(Math.min(newSlide, slides.length - 1));
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
      top: index * window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={containerRef}
      data-deck-scroll-container
      className="h-screen w-full overflow-y-auto overflow-x-hidden scroll-smooth bg-background"
      style={{ scrollSnapType: "y mandatory", WebkitOverflowScrolling: "touch" }}
    >

      <PillNav
        visible={navActive}
        currentSlide={currentSlide}
        onNavigate={navigateToSlide}
      />
      {slides.map((SlideComponent, index) => (
        <SlideReveal key={index} className="relative">
          {mountedSlides.has(index) ? (
            <Suspense fallback={<SlideFallback />}>
              {index === 0 ? (
                <TitleSlide onViewCaseStudies={() => navigateToSlide(5)} />
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
