import { useEffect, useRef, useState } from "react";
import { animate, stagger, createSpring } from "animejs";
import { Eye, Users, TrendingUp, MousePointer, Gauge } from "lucide-react";
import cultfitCreative1 from "@/assets/cultfit-creative-1.webp";
import cultfitCreative2 from "@/assets/cultfit-creative-2.png";
import { LiquidGlassCard } from "react-liquid-glass-card";
import { useIsMobile } from "@/hooks/use-mobile";
import ParallaxCardSlider from "@/components/ParallaxCardSlider";

const cultPink = "340 82% 52%";
const cultYellow = "45 100% 51%";

const stats = [
  { icon: Eye, value: "4.2M", label: "Impressions" },
  { icon: Users, value: "850%", label: "Follower Growth" },
  { icon: TrendingUp, value: "12.4%", label: "Engagement" },
  { icon: MousePointer, value: "78K", label: "Link Clicks" },
  { icon: Gauge, value: "4.5X", label: "ROI" },
];

const sliderImages = [
  { image: cultfitCreative1, alt: "Cult Fit creative 1" },
  { image: cultfitCreative2, alt: "Cult Fit creative 2" },
];

const CultFitCaseStudy = () => {
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
            opacity: [0, 1], translateY: [80, 0], scale: [0.94, 1],
            duration: 900,
            ease: createSpring({ stiffness: 95, damping: 12 }),
          });

          animate(el.querySelector(".cs-title-accent")!, {
            translateX: [-26, 0],
            filter: ["blur(10px)", "blur(0px)"],
            duration: 900,
            delay: 160,
            ease: "out(4)",
          });

          animate(el.querySelector(".cs-subtitle")!, {
            opacity: [0, 1], translateY: [30, 0],
            duration: 600, delay: 200, ease: "out(3)",
          });

          if (!isMobile) {
            animate(el.querySelectorAll(".cs-image"), {
              opacity: [0, 1], translateY: [60, -12, 0], scale: [0.82, 1.05, 1], rotate: [-5, 1, 0],
              delay: stagger(100, { start: 300 }),
              duration: 1200, ease: "out(4)",
            });
          } else {
            animate(el.querySelector(".cs-slider")!, {
              opacity: [0, 1], scale: [0.78, 1.04, 1], translateX: [120, -12, 0], rotate: [5, -1, 0],
              duration: 1250, ease: "out(4)",
            });
          }

          animate(el.querySelector(".cs-scan-line")!, {
            scaleX: [0, 1, 0],
            transformOrigin: ["0% 50%", "0% 50%", "100% 50%"],
            opacity: [0, 0.9, 0],
            duration: 1600,
            delay: 520,
            ease: "inOut(3)",
          });

          animate(el.querySelector(".cs-glow-orbit")!, {
            opacity: [0, 0.66, 0.18],
            scale: [0.72, 1.08, 1],
            rotate: [0, 12],
            duration: 1500,
            delay: 420,
            ease: "out(3)",
          });

          animate(el.querySelectorAll(".cs-stat"), {
            opacity: [0, 1], translateY: [50, 0], scale: [0.9, 1],
            delay: stagger(100, { start: 300 }),
            ease: createSpring({ stiffness: 100, damping: 15 }),
          });
          animate(el.querySelectorAll(".cs-stat-icon"), {
            scale: [0.6, 1.28, 1],
            filter: [
              `drop-shadow(0 0 0 hsl(${cultPink} / 0))`,
              `drop-shadow(0 0 12px hsl(${cultPink} / 0.48))`,
              `drop-shadow(0 0 0 hsl(${cultPink} / 0))`,
            ],
            delay: stagger(90, { start: 520 }),
            duration: 850,
            ease: "out(4)",
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
      <div className="bg-wipe absolute inset-0 z-0" style={{ opacity: 0, clipPath: "circle(5% at 50% 50%)", background: `linear-gradient(145deg, hsl(260 20% 8%), hsl(340 30% 12%), hsl(${cultPink} / 0.25), hsl(${cultYellow} / 0.08))` }} />
      <div className="absolute inset-0 z-[-1]" style={{ background: `linear-gradient(145deg, hsl(260 20% 8%), hsl(340 30% 12%), hsl(${cultPink} / 0.25), hsl(${cultYellow} / 0.08))` }} />
      <div
        className="cs-scan-line pointer-events-none absolute left-0 top-[52%] z-[1] h-px w-full"
        style={{ opacity: 0, transform: "scaleX(0)", background: `linear-gradient(90deg, transparent, hsl(${cultPink}), hsl(${cultYellow}), transparent)` }}
      />
      <div
        className="cs-glow-orbit pointer-events-none absolute right-[14%] top-[18%] z-[1] h-[48%] w-[36%] rounded-full"
        style={{
          opacity: 0,
          border: `1px solid hsl(${cultPink} / 0.22)`,
          boxShadow: `0 0 90px -34px hsl(${cultPink} / 0.85), inset 0 0 80px -54px hsl(${cultYellow} / 0.7)`,
        }}
      />

      <div className={`max-w-6xl mx-auto w-full relative z-10 ${isMobile ? 'flex flex-col flex-1' : ''}`}>

        <h2 className="cs-heading text-2xl md:text-5xl font-black tracking-tight text-center text-white" style={{ opacity: 0, marginBottom: isMobile ? '0.25rem' : '0.75rem' }}>
          Cult{" "}<span className="cs-title-accent bg-clip-text text-transparent inline-block" style={{ backgroundImage: `linear-gradient(135deg, hsl(${cultPink}), hsl(${cultYellow}))` }}>.fit</span>
        </h2>

        <p className="cs-subtitle text-center max-w-2xl mx-auto text-sm md:text-base" style={{ opacity: 0, color: "hsl(0 0% 65%)", marginBottom: isMobile ? '0.75rem' : '1.5rem' }}>
          Fitness platform. Memberships up. Brand sharper.
        </p>

        {isMobile ? (
          <div className="cs-slider flex justify-center flex-1 items-center" style={{ opacity: 0 }}>
            <ParallaxCardSlider slides={sliderImages} accentColor={cultPink} />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:gap-6 mb-5 items-center max-w-3xl mx-auto">
            {[cultfitCreative1, cultfitCreative2].map((src, i) => (
              <div key={i} className="cs-image rounded-2xl overflow-hidden" style={{ opacity: 0 }}>
                <img src={src} alt={`Cult Fit creative ${i + 1}`} loading="lazy" className="w-full h-auto object-contain rounded-2xl" />
              </div>
            ))}
          </div>
        )}

        <div className={`flex flex-wrap gap-3 ${isMobile ? 'mt-auto pt-4 justify-start gap-1.5' : 'justify-center'}`}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="cs-stat" style={{ opacity: 0 }}>
                <LiquidGlassCard padding={isMobile ? "0.4rem 0.75rem" : "0.5rem 1rem"} borderRadius="9999px" blur={12} brightness={1.15} backgroundColor="rgba(255, 255, 255, 0.08)">
                  <div className="flex items-center gap-2">
                    <Icon className={`cs-stat-icon ${isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} style={{ color: `hsl(${cultPink})` }} />
                    <span className={`${isMobile ? 'text-xs' : 'text-sm md:text-base'} font-bold text-white`}>{stat.value}</span>
                    <span className={`${isMobile ? 'text-[9px]' : 'text-[10px] md:text-xs'} font-medium uppercase tracking-wider`} style={{ color: "hsl(0 0% 75%)" }}>{stat.label}</span>
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

export default CultFitCaseStudy;
