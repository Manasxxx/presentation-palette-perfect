import { useState, useEffect, useRef } from "react";
import TitleSlide from "@/components/slides/TitleSlide";
import SkyrocketSlide from "@/components/slides/SkyrocketSlide";
import WhoAreWeSlide from "@/components/slides/WhoAreWeSlide";
import ServicesSlide from "@/components/slides/ServicesSlide";
import ClientsSlide from "@/components/slides/ClientsSlide";
import CaseStudySlide from "@/components/slides/CaseStudySlide";
import BaxsaaCaseStudy from "@/components/slides/BaxsaaCaseStudy";
import CultFitCaseStudy from "@/components/slides/CultFitCaseStudy";
import GirlUpCaseStudy from "@/components/slides/GirlUpCaseStudy";
import CTPCaseStudy from "@/components/slides/CTPCaseStudy";
import VNTCaseStudy from "@/components/slides/VNTCaseStudy";
import ContactSlide from "@/components/slides/ContactSlide";

import ThemeToggle from "@/components/ThemeToggle";
import SlideReveal from "@/components/SlideReveal";
import PillNav from "@/components/PillNav";

const slides = [
  TitleSlide,
  SkyrocketSlide,
  WhoAreWeSlide,
  ServicesSlide,
  ClientsSlide,
  CaseStudySlide,
  BaxsaaCaseStudy,
  CultFitCaseStudy,
  GirlUpCaseStudy,
  CTPCaseStudy,
  VNTCaseStudy,
  ContactSlide,
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const slideHeight = window.innerHeight;
      const newSlide = Math.round(scrollTop / slideHeight);
      setCurrentSlide(Math.min(newSlide, slides.length - 1));
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

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
      className="h-screen overflow-y-auto scroll-smooth"
      style={{ scrollSnapType: "y mandatory" }}
    >
      <PillNav
        visible={currentSlide > 0 && currentSlide < slides.length - 1 && !(currentSlide >= 5 && currentSlide <= 10)}
        currentSlide={currentSlide}
        onNavigate={navigateToSlide}
      />
      <ThemeToggle />
      
      {slides.map((SlideComponent, index) => (
        <SlideReveal key={index} className="relative">
          {index === 0 ? (
            <SlideComponent onViewCaseStudies={() => navigateToSlide(5)} />
          ) : (
            <SlideComponent />
          )}
        </SlideReveal>
      ))}
    </div>
  );
};

export default Index;
