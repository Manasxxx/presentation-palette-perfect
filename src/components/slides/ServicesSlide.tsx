import { useEffect, useRef, useState } from "react";
import { animate, stagger, createSpring } from "animejs";
import { BarChart3, Palette, Globe, Code, ChevronRight } from "lucide-react";
import { LiquidGlassCard } from "react-liquid-glass-card";
import LightRays from "@/components/LightRays";
import { useIsMobile } from "@/hooks/use-mobile";

const services = [
  {
    icon: BarChart3,
    title: "Digital Strategy",
    description: "Data-driven campaigns that amplify your brand's reach and impact across every channel.",
    items: ["Building Brands", "Media Placements", "Writing & Repurposing", "Strategic Communications"],
    accent: "from-primary to-primary/60",
  },
  {
    icon: Palette,
    title: "Creative Strategy",
    description: "Bold visual storytelling that captures attention and communicates your unique value.",
    items: ["Visual Identity", "Graphic Design", "Creative Advertising", "Space Design & Events"],
    accent: "from-owl-orange to-owl-orange/60",
  },
  {
    icon: Globe,
    title: "Web Presence",
    description: "Dominate search results and social feeds with an optimized, engaging online presence.",
    items: ["Web Design", "SEO", "Social Media", "Content Marketing"],
    accent: "from-owl-blue to-owl-blue/60",
  },
  {
    icon: Code,
    title: "Development",
    description: "End-to-end product engineering from strategy and design to launch and testing.",
    items: ["Technology Consulting", "Product Development", "Product Strategy", "QA & Testing"],
    accent: "from-owl-chartreuse to-owl-chartreuse/60",
  },
];

const ServicesSlide = () => {
  const isMobile = useIsMobile();
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  // Reveal animations
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);

          animate(el.querySelector(".sv-header")!, {
            opacity: [0, 1], translateY: [40, 0],
            duration: 700, ease: "out(3)",
          });

          animate(el.querySelector(".sv-tabs")!, {
            opacity: [0, 1], translateX: [-40, 0],
            duration: 700, delay: 200, ease: "out(3)",
          });

          animate(el.querySelector(".sv-panel")!, {
            opacity: [0, 1], translateX: [40, 0],
            duration: 700, delay: 300, ease: "out(3)",
          });
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  // Animate content items when tab changes
  useEffect(() => {
    const panel = contentRef.current;
    if (!panel) return;

    // Animate the list items staggered
    const items = panel.querySelectorAll(".sv-item");
    if (items.length > 0) {
      animate(items, {
        opacity: [0, 1],
        translateX: [-10, 0],
        delay: stagger(80),
        duration: 400,
        ease: "out(3)",
      });
    }
  }, [active]);

  const handleTabChange = (index: number) => {
    if (index === active || isTransitioning) return;
    setIsTransitioning(true);

    // Fade out current content
    const panel = contentRef.current;
    if (panel) {
      animate(panel, {
        opacity: [1, 0],
        translateY: [0, -20],
        duration: 200,
        ease: "in(2)",
        onComplete: () => {
          setActive(index);
          // Fade in new content
          animate(panel, {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 400,
            ease: "cubicBezier(0.22, 1, 0.36, 1)",
            onComplete: () => setIsTransitioning(false),
          });
        },
      });
    } else {
      setActive(index);
      setIsTransitioning(false);
    }
  };

  return (
    <section ref={sectionRef} className="slide py-16 px-6 bg-background overflow-hidden">
      <LightRays
        raysColor="#4bc2c2"
        raysOrigin="top-center"
        raysSpeed={0.8}
        lightSpread={0.5}
        rayLength={3}
        fadeDistance={1}
        saturation={0.8}
        mouseInfluence={0.1}
        className="opacity-50 pointer-events-none"
      />
      <div className="max-w-6xl mx-auto w-full">
        <div className="sv-header text-center mb-10 md:mb-14" style={{ opacity: 0 }}>
          <span className="text-xs tracking-[0.3em] text-primary font-medium mb-3 block">WHAT WE DO</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            <span className="text-foreground">OUR </span>
            <span className="text-gradient-green">SERVICES</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-10 items-start">
          {/* Left tabs */}
          <div className="sv-tabs flex md:flex-col gap-2" style={{ opacity: 0 }}>
            {services.map((service, i) => (
              <button
                key={service.title}
                onClick={() => handleTabChange(i)}
                className={`relative flex items-center gap-3 px-4 py-3 md:py-4 rounded-xl text-left transition-all duration-300 group w-full ${active === i
                  ? "bg-primary/10 border border-primary/30"
                  : "hover:bg-muted/50 border border-transparent"
                  }`}
              >
                {active === i && (
                  <div
                    className="absolute left-0 top-[20%] bottom-[20%] w-[3px] rounded-full bg-primary transition-all duration-300"
                  />
                )}
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${active === i ? "bg-primary/20" : "bg-muted"
                    }`}
                >
                  <service.icon
                    className={`w-4 h-4 transition-colors duration-300 ${active === i ? "text-primary" : "text-muted-foreground"
                      }`}
                  />
                </div>
                <span
                  className={`text-sm font-semibold transition-colors duration-300 hidden md:block ${active === i ? "text-foreground" : "text-muted-foreground"
                    }`}
                >
                  {service.title}
                </span>
              </button>
            ))}
          </div>

          {/* Right content panel */}
          <div className="sv-panel min-h-[320px] relative overflow-hidden" style={{ opacity: 0 }}>
            <LiquidGlassCard padding={isMobile ? "1.5rem 1rem" : "1.5rem 2.5rem"} borderRadius="1rem" blur={12} brightness={1.1} backgroundColor="rgba(255, 255, 255, 0.06)">
              {/* Accent glow */}
              <div
                className={`absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br ${services[active].accent} opacity-10 blur-3xl transition-all duration-700`}
              />

              <div ref={contentRef} className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${services[active].accent} flex items-center justify-center`}>
                    {(() => {
                      const Icon = services[active].icon;
                      return <Icon className="w-6 h-6 text-background" />;
                    })()}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-foreground">
                    {services[active].title}
                  </h3>
                </div>

                <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-lg">
                  {services[active].description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services[active].items.map((item) => (
                    <div
                      key={item}
                      className="sv-item flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/30 border border-border/50 group hover:border-primary/30 transition-colors duration-200"
                      style={{ opacity: 0 }}
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="text-sm font-medium text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </LiquidGlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSlide;
