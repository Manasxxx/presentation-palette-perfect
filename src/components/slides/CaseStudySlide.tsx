import { useEffect, useRef, useState, useCallback } from "react";
import { Eye, Users, TrendingUp, MousePointer, Gauge, LucideIcon } from "lucide-react";
import { animate, stagger, createSpring } from "animejs";
import mitsuiCreative1 from "@/assets/mitsui-creative-1.webp";
import mitsuiCreative2 from "@/assets/mitsui-creative-2.png";
import mitsuiCreative3 from "@/assets/mitsui-creative-3.webp";
import mitsuiCreative4 from "@/assets/mitsui-creative-4.webp";
import ParallaxCardSlider from "@/components/ParallaxCardSlider";
import { LiquidGlassCard } from "react-liquid-glass-card";
import { useIsMobile } from "@/hooks/use-mobile";

interface StatDef {
  icon: LucideIcon;
  rawValue: string;
  label: string;
  num: number;
  suffix: string;
  decimals: number;
}

const statDefs: StatDef[] = [
  { icon: Eye, rawValue: "5.8M", label: "Impressions", num: 5.8, suffix: "M", decimals: 1 },
  { icon: Users, rawValue: "1000%", label: "Follower Growth", num: 1000, suffix: "%", decimals: 0 },
  { icon: TrendingUp, rawValue: "99.2%", label: "Engagement ↑", num: 99.2, suffix: "%", decimals: 1 },
  { icon: MousePointer, rawValue: "104K", label: "Ad Clicks", num: 104, suffix: "K", decimals: 0 },
  { icon: Gauge, rawValue: "3X", label: "ROI", num: 3, suffix: "X", decimals: 0 },
];

const mitsuiBlue = "210 100% 30%";
const mitsuiCyan = "193 100% 42%";

const sliderImages = [
  { image: mitsuiCreative1, alt: "Mitsui Chemicals creative 1" },
  { image: mitsuiCreative2, alt: "Mitsui Chemicals creative 2" },
  { image: mitsuiCreative3, alt: "Mitsui Chemicals creative 3" },
  { image: mitsuiCreative4, alt: "Mitsui Chemicals creative 4" },
];

function AnimatedStatValue({ num, suffix, decimals, triggered }: { num: number; suffix: string; decimals: number; triggered: boolean }) {
  const [display, setDisplay] = useState("0" + suffix);
  const objRef = useRef({ value: 0 });

  useEffect(() => {
    if (!triggered) return;
    objRef.current.value = 0;
    animate(objRef.current, {
      value: [0, num],
      duration: 2000,
      ease: "outExpo",
      onUpdate: () => {
        setDisplay(objRef.current.value.toFixed(decimals) + suffix);
      },
    });
  }, [triggered, num, suffix, decimals]);

  return <>{display}</>;
}

const CaseStudySlide = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsTriggered, setStatsTriggered] = useState(false);
  const [triggered, setTriggered] = useState(false);
  const isMobile = useIsMobile();

  // Main section reveal
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
            opacity: [0, 1], translateY: [60, 0],
            duration: 900, ease: "out(3)",
          });

          animate(el.querySelector(".cs-subtitle")!, {
            opacity: [0, 1], translateY: [30, 0],
            duration: 600, delay: 200, ease: "out(3)",
          });

          animate(el.querySelector(".cs-slider")!, {
            opacity: [0, 1], scale: [0.9, 1],
            duration: 800, delay: 300, ease: "out(3)",
          });
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  // Stats counter trigger
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsTriggered) {
          setStatsTriggered(true);
          animate(el.querySelectorAll(".cs-stat"), {
            opacity: [0, 1], translateY: [40, 0], scale: [0.9, 1],
            delay: stagger(100, { start: 300 }),
            ease: createSpring({ stiffness: 100, damping: 15 }),
          });
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [statsTriggered]);

  return (
    <section ref={sectionRef} className="slide py-10 px-6 overflow-hidden relative flex flex-col bg-background">
      <div
        className="bg-wipe absolute inset-0 z-0"
        style={{ opacity: 0, clipPath: "circle(5% at 50% 50%)", background: `linear-gradient(160deg, hsl(${mitsuiBlue} / 0.85), hsl(210 60% 22% / 0.7), hsl(${mitsuiCyan} / 0.3))` }}
      />
      <div className="absolute inset-0 z-[-1]" style={{ background: `linear-gradient(160deg, hsl(${mitsuiBlue} / 0.85), hsl(210 60% 22% / 0.7), hsl(${mitsuiCyan} / 0.3))` }} />

      <div className={`max-w-6xl mx-auto w-full relative z-10 ${isMobile ? 'flex flex-col flex-1' : ''}`}>

        <h2 className="cs-heading text-3xl md:text-5xl font-black tracking-tight text-center text-white" style={{ opacity: 0, marginBottom: isMobile ? '0.25rem' : '0.75rem' }}>
          Mitsui Chemicals{" "}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, hsl(${mitsuiCyan}), hsl(193 80% 65%))` }}>
            Success
          </span>
        </h2>

        <p className="cs-subtitle text-center max-w-2xl mx-auto text-sm md:text-base" style={{ opacity: 0, color: "hsl(210 30% 75%)", marginBottom: isMobile ? '0.75rem' : '1.5rem' }}>
          Boosted brand visibility, engagement, and qualified leads through strategic digital marketing.
        </p>

        <div className={`cs-slider flex justify-center ${isMobile ? 'flex-1 items-center' : 'mb-14'}`} style={{ opacity: 0 }}>
          <ParallaxCardSlider slides={sliderImages} accentColor={mitsuiCyan} />
        </div>

        <div
          ref={statsRef}
          className={`flex flex-wrap gap-3 ${isMobile ? 'mt-auto pt-4 justify-start gap-1.5' : 'justify-center'}`}
        >
          {statDefs.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="cs-stat" style={{ opacity: 0 }}>
                <LiquidGlassCard padding={isMobile ? "0.4rem 0.75rem" : "0.5rem 1rem"} borderRadius="9999px" blur={12} brightness={1.15} backgroundColor="rgba(255, 255, 255, 0.08)">
                  <div className="flex items-center gap-2">
                    <Icon className={`${isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} style={{ color: `hsl(${mitsuiCyan})` }} />
                    <span className={`${isMobile ? 'text-xs' : 'text-sm md:text-base'} font-bold text-white`}>
                      <AnimatedStatValue num={stat.num} suffix={stat.suffix} decimals={stat.decimals} triggered={statsTriggered} />
                    </span>
                    <span className={`${isMobile ? 'text-[9px]' : 'text-[10px] md:text-xs'} font-medium uppercase tracking-wider`} style={{ color: "hsl(210 20% 80%)" }}>
                      {stat.label}
                    </span>
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

export default CaseStudySlide;
