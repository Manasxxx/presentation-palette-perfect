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

const SlideFallback = () => <section className="slide" aria-hidden="true" />;

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Controls the visibility of overlapping UI like PillNav
  const [uiHidden, setUiHidden] = useState(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Tracks whether the current slide index is within the "Case Study" block.
   * Slide 5 to 11 represent the interactive case study gallery.
   */
  const isCaseStudySlide = currentSlide >= 5 && currentSlide <= 11;

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
   * Auto-hides UI elements during case studies after 2 seconds of inactivity
   * to provide a distraction-free, immersive viewing experience.
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resetIdleTimer = () => {
      if (!isCaseStudySlide) return;
      setUiHidden(false);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => setUiHidden(true), 2000);
    };

    if (isCaseStudySlide) {
      // Start the timer immediately when entering a case study slide
      idleTimerRef.current = setTimeout(() => setUiHidden(true), 2000);

      container.addEventListener("mousemove", resetIdleTimer);
      container.addEventListener("touchstart", resetIdleTimer);
      container.addEventListener("scroll", resetIdleTimer);
    } else {
      setUiHidden(false);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    }

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      container.removeEventListener("mousemove", resetIdleTimer);
      container.removeEventListener("touchstart", resetIdleTimer);
      container.removeEventListener("scroll", resetIdleTimer);
    };
  }, [isCaseStudySlide]);

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

  const shouldHideNav = currentSlide === 1 || (isCaseStudySlide && uiHidden);

  return (
    <div
      ref={containerRef}
      data-deck-scroll-container
      className="h-screen w-full overflow-y-auto overflow-x-hidden scroll-smooth bg-background"
      style={{ scrollSnapType: "y mandatory", WebkitOverflowScrolling: "touch" }}
    >

      <PillNav
        visible={currentSlide > 0 && currentSlide < slides.length - 1 && !shouldHideNav}
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
