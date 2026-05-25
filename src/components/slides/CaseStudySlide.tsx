import { useEffect, useRef, useState } from "react";
import { Eye, Users, TrendingUp, MousePointer, Gauge, LucideIcon } from "lucide-react";
import { animate, stagger, createSpring } from "animejs";
import mitsuiCreative1 from "@/assets/mitsui-creative-1.webp";
import mitsuiCreative2 from "@/assets/mitsui-creative-2.png";
import mitsuiCreative3 from "@/assets/mitsui-creative-3.webp";
import mitsuiCreative4 from "@/assets/mitsui-creative-4.webp";
import ParallaxCardSlider from "@/components/ParallaxCardSlider";
import { useIsMobile } from "@/hooks/use-mobile";

interface StatDef {
  icon: LucideIcon;
  label: string;
  num: number;
  suffix: string;
  decimals: number;
}

const statDefs: StatDef[] = [
  { icon: Eye, label: "Impressions", num: 5.8, suffix: "M", decimals: 1 },
  { icon: Users, label: "Follower growth", num: 1000, suffix: "%", decimals: 0 },
  { icon: TrendingUp, label: "Engagement", num: 99.2, suffix: "%", decimals: 1 },
  { icon: MousePointer, label: "Ad clicks", num: 104, suffix: "K", decimals: 0 },
  { icon: Gauge, label: "ROI", num: 3, suffix: "X", decimals: 0 },
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
  const statsRef = useRef<HTMLUListElement>(null);
  const [statsTriggered, setStatsTriggered] = useState(false);
  const [triggered, setTriggered] = useState(false);
  const isMobile = useIsMobile();

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

          animate(el.querySelectorAll(".cs-heading"), {
            opacity: [0, 1], translateY: [70, 0], scale: [0.94, 1],
            delay: stagger(80),
            duration: 900, ease: createSpring({ stiffness: 95, damping: 12 }),
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
            duration: 600, delay: 280, ease: "out(3)",
          });

          animate(el.querySelector(".cs-slider")!, {
            opacity: [0, 1], scale: [0.78, 1.04, 1], translateX: [180, -18, 0], rotate: [6, -1, 0],
            duration: 1350, delay: 360, ease: "out(4)",
          });

        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsTriggered) {
          setStatsTriggered(true);
          animate(el.querySelectorAll(".cs-stat"), {
            opacity: [0, 1], translateX: [40, 0],
            delay: stagger(110, { start: 300 }),
            ease: createSpring({ stiffness: 110, damping: 16 }),
          });
          animate(el.querySelectorAll(".cs-stat-icon"), {
            scale: [0.6, 1.28, 1],
            boxShadow: [
              `0 0 0 0 hsl(${mitsuiCyan} / 0)`,
              `0 0 34px 4px hsl(${mitsuiCyan} / 0.42)`,
              `0 0 0 0 hsl(${mitsuiCyan} / 0)`,
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
  }, [statsTriggered]);

  return (
    <section ref={sectionRef} className="slide overflow-hidden relative bg-background">
      <div
        className="bg-wipe absolute inset-0 z-0"
        style={{ opacity: 0, clipPath: "circle(5% at 50% 50%)", background: `linear-gradient(160deg, hsl(${mitsuiBlue} / 0.85), hsl(210 60% 22% / 0.7), hsl(${mitsuiCyan} / 0.3))` }}
      />
      <div className="absolute inset-0 z-[-1]" style={{ background: `linear-gradient(160deg, hsl(${mitsuiBlue} / 0.85), hsl(210 60% 22% / 0.7), hsl(${mitsuiCyan} / 0.3))` }} />
      <div className="relative z-10 flex h-full w-full flex-col md:flex-row items-stretch gap-8 md:gap-10 px-6 pt-20 pb-8 md:px-12 md:pt-24 md:pb-14">
        {/* LEFT — copy + stats (top-aligned, leaving room below for extra copy) */}
        <div className="flex flex-col gap-6 md:gap-7 md:w-[42%] lg:w-[38%] shrink-0">
          <header className="text-left">
            <span
              className="cs-heading text-[10px] md:text-xs tracking-[0.3em] font-medium mb-3 block uppercase"
              style={{ opacity: 0, color: `hsl(${mitsuiCyan})` }}
            >
              Case study 01
            </span>
            <h2 className="cs-heading font-sans text-[clamp(2.8rem,4.7vw,5.4rem)] font-black uppercase leading-[0.95] tracking-normal text-white text-left pb-2" style={{ opacity: 0 }}>
              <span className="font-sans not-italic block">Mitsui</span>
              <span
                className="cs-title-accent font-sans not-italic bg-clip-text text-transparent inline-block pr-2"
                style={{ backgroundImage: `linear-gradient(135deg, hsl(${mitsuiCyan}), hsl(193 80% 65%))` }}
              >
                Chemicals
              </span>
            </h2>
            <p
              className="cs-subtitle mt-4 md:mt-5 font-body text-white/70 leading-snug text-base md:text-lg max-w-md"
              style={{ opacity: 0 }}
            >
              Specialty chemicals giant. We ran their digital across APAC.
            </p>
          </header>

          <ul ref={statsRef} className="cs-stats flex flex-col gap-3 md:gap-4">
            {statDefs.map((stat) => {
              const Icon = stat.icon;
              return (
                <li key={stat.label} className="cs-stat flex items-center gap-4" style={{ opacity: 0 }}>
                  <span
                    className="cs-stat-icon flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full shrink-0"
                    style={{ backgroundColor: `hsl(${mitsuiCyan} / 0.14)`, border: `1px solid hsl(${mitsuiCyan} / 0.3)` }}
                  >
                    <Icon className="h-4 w-4 md:h-[18px] md:w-[18px]" style={{ color: `hsl(${mitsuiCyan})` }} />
                  </span>
                  <div className="flex items-baseline gap-3 min-w-0">
                    <span className="font-sans text-[clamp(1.6rem,2.4vw,2.4rem)] font-black leading-none text-white">
                      <AnimatedStatValue num={stat.num} suffix={stat.suffix} decimals={stat.decimals} triggered={statsTriggered} />
                    </span>
                    <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.22em] text-white/55 truncate">
                      {stat.label}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* RIGHT — creative (anchored left so right edge clips at section bound) */}
        <div className="cs-slider flex flex-1 items-center justify-start min-w-0 min-h-0 self-center" style={{ opacity: 0 }}>
          <ParallaxCardSlider
            slides={sliderImages}
            accentColor={mitsuiCyan}
            cardWidth={isMobile ? undefined : "min(24vw, 320px)"}
          />
        </div>
      </div>
    </section>
  );
};

export default CaseStudySlide;
