import { useEffect, useRef, useState } from "react";
import { animate, stagger, createSpring } from "animejs";
import { Eye, Users, TrendingUp, MousePointer, Gauge } from "lucide-react";
import ctpCreative1 from "@/assets/ctp-creative-1.png";
import ctpCreative2 from "@/assets/ctp-creative-2.png";
import ctpCreative3 from "@/assets/ctp-creative-3.png";
import { LiquidGlassCard } from "react-liquid-glass-card";
import { useIsMobile } from "@/hooks/use-mobile";
import ParallaxCardSlider from "@/components/ParallaxCardSlider";

const ctpGreen = "95 48% 41%";
const ctpTeal = "185 28% 24%";

const stats = [
  { icon: Eye, value: "1.8M", label: "Impressions" },
  { icon: Users, value: "430%", label: "Follower Growth" },
  { icon: TrendingUp, value: "14.2%", label: "Engagement" },
  { icon: MousePointer, value: "36K", label: "Link Clicks" },
  { icon: Gauge, value: "3.2X", label: "ROI" },
];

const sliderImages = [
  { image: ctpCreative1, alt: "Check This Property creative 1" },
  { image: ctpCreative2, alt: "Check This Property creative 2" },
  { image: ctpCreative3, alt: "Check This Property creative 3" },
];

const CTPCaseStudy = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);

          animate(el.querySelector(".bg-wipe")!, {
            clipPath: ["circle(5% at 50% 50%)", "circle(150% at 50% 50%)"],
            opacity: [0, 1],
            duration: 1800,
            ease: "cubicBezier(0.22, 1, 0.36, 1)",
          });

          animate(el.querySelector(".cs-heading")!, {
            opacity: [0, 1], translateY: [80, 0],
            duration: 800,
            ease: createSpring({ stiffness: 100, damping: 15 }),
          });

          animate(el.querySelector(".cs-subtitle")!, {
            opacity: [0, 1], translateY: [30, 0],
            duration: 600, delay: 200, ease: "out(3)",
          });

          if (!isMobile) {
            animate(el.querySelectorAll(".cs-image"), {
              opacity: [0, 1], translateY: [50, 0], scale: [0.9, 1],
              delay: stagger(100, { start: 300 }),
              ease: createSpring({ stiffness: 100, damping: 15 }),
            });
          } else {
            animate(el.querySelector(".cs-slider")!, {
              opacity: [0, 1], scale: [0.9, 1],
              duration: 800, ease: "out(3)",
            });
          }

          animate(el.querySelectorAll(".cs-stat"), {
            opacity: [0, 1], translateY: [50, 0], scale: [0.9, 1],
            delay: stagger(100, { start: 300 }),
            ease: createSpring({ stiffness: 100, damping: 15 }),
          });
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered, isMobile]);

  return (
    <section ref={sectionRef} className="slide pt-16 pb-6 md:py-10 px-4 md:px-6 overflow-hidden relative flex flex-col">
      <div className="bg-wipe absolute inset-0 z-0" style={{ opacity: 0, clipPath: "circle(5% at 50% 50%)", background: `linear-gradient(145deg, hsl(95 30% 92%), hsl(95 20% 88%), hsl(${ctpGreen} / 0.2))` }} />
      <div className="absolute inset-0 z-[-1]" style={{ background: `linear-gradient(145deg, hsl(95 30% 92%), hsl(95 20% 88%), hsl(${ctpGreen} / 0.2))` }} />

      <div className={`max-w-6xl mx-auto w-full relative z-10 ${isMobile ? 'flex flex-col flex-1' : ''}`}>

        <h2 className="cs-heading text-2xl md:text-5xl font-black tracking-tight text-center" style={{ opacity: 0, color: "hsl(0 0% 15%)", marginBottom: isMobile ? '0.25rem' : '0.75rem' }}>
          Check This Property{" "}<span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, hsl(${ctpGreen}), hsl(${ctpTeal}))` }}>Success</span>
        </h2>

        <p className="cs-subtitle text-center max-w-2xl mx-auto text-sm md:text-base" style={{ opacity: 0, color: "hsl(0 0% 40%)", marginBottom: isMobile ? '0.75rem' : '1.5rem' }}>
          Elevated property awareness through targeted content marketing and strategic social campaigns across Australia.
        </p>

        {isMobile ? (
          <div className="cs-slider flex justify-center flex-1 items-center" style={{ opacity: 0 }}>
            <ParallaxCardSlider slides={sliderImages} accentColor={ctpGreen} />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 md:gap-6 mb-5 items-center max-w-5xl mx-auto">
            {[ctpCreative1, ctpCreative2, ctpCreative3].map((src, i) => (
              <div key={i} className="cs-image rounded-2xl overflow-hidden" style={{ opacity: 0 }}>
                <img src={src} alt={`Check This Property creative ${i + 1}`} loading="lazy" className="w-full h-auto object-contain rounded-2xl" />
              </div>
            ))}
          </div>
        )}

        <div className={`flex flex-wrap gap-3 ${isMobile ? 'mt-auto pt-4 justify-start gap-1.5' : 'justify-center'}`}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="cs-stat" style={{ opacity: 0 }}>
                <LiquidGlassCard padding={isMobile ? "0.4rem 0.75rem" : "0.5rem 1rem"} borderRadius="9999px" blur={12} brightness={1.15} backgroundColor="rgba(255, 255, 255, 0.3)">
                  <div className="flex items-center gap-2">
                    <Icon className={`${isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} style={{ color: `hsl(${ctpGreen})` }} />
                    <span className={`${isMobile ? 'text-xs' : 'text-sm md:text-base'} font-bold`} style={{ color: "hsl(0 0% 15%)" }}>{stat.value}</span>
                    <span className={`${isMobile ? 'text-[9px]' : 'text-[10px] md:text-xs'} font-medium uppercase tracking-wider`} style={{ color: "hsl(0 0% 35%)" }}>{stat.label}</span>
                  </div>
                </LiquidGlassCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CTPCaseStudy;
