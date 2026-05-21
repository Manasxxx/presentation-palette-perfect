import { useState, useEffect, useRef } from "react";
import TitleSlide from "@/components/slides/TitleSlide";
import SkyrocketSlide from "@/components/slides/SkyrocketSlide";
import WhoAreWeSlide from "@/components/slides/WhoAreWeSlide";
import OurTeamSlide from "@/components/slides/OurTeamSlide";
import ServicesSlide from "@/components/slides/ServicesSlide";
import ClientsSlide from "@/components/slides/ClientsSlide";
import CaseStudySlide from "@/components/slides/CaseStudySlide";
import BaxsaaCaseStudy from "@/components/slides/BaxsaaCaseStudy";
import CultFitCaseStudy from "@/components/slides/CultFitCaseStudy";
import GirlUpCaseStudy from "@/components/slides/GirlUpCaseStudy";
import CTPCaseStudy from "@/components/slides/CTPCaseStudy";
import VNTCaseStudy from "@/components/slides/VNTCaseStudy";
import RaychemRPGCaseStudy from "@/components/slides/RaychemRPGCaseStudy";
import ContactSlide from "@/components/slides/ContactSlide";

import ThemeToggle from "@/components/ThemeToggle";
import SlideReveal from "@/components/SlideReveal";
import PillNav from "@/components/PillNav";


const slides = [
  TitleSlide,
  SkyrocketSlide,
  WhoAreWeSlide,
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

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Controls the visibility of overlapping UI like PillNav and ThemeToggle
  const [uiHidden, setUiHidden] = useState(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Tracks whether the current slide index is within the "Case Study" block.
   * Slide 6 to 12 represent the interactive case study gallery.
   */
  const isCaseStudySlide = currentSlide >= 6 && currentSlide <= 12;

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

  const shouldHideNav = isCaseStudySlide && uiHidden;

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-auto overflow-x-hidden scroll-smooth bg-background"
      style={{ scrollSnapType: "y mandatory", WebkitOverflowScrolling: "touch" }}
    >

      <PillNav
        visible={currentSlide > 0 && currentSlide < slides.length - 1 && !shouldHideNav}
        currentSlide={currentSlide}
        onNavigate={navigateToSlide}
      />
      <ThemeToggle hidden={shouldHideNav} />
      {slides.map((SlideComponent, index) => (
        <SlideReveal key={index} className="relative">
          {index === 0 ? (
            <SlideComponent onViewCaseStudies={() => navigateToSlide(6)} />
          ) : (
            <SlideComponent />
          )}
        </SlideReveal>
      ))}
    </div>
  );
};

export default Index;
