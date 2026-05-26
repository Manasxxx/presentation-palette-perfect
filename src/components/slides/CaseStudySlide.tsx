import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { animate, stagger, createSpring } from "animejs";
import mitsuiCreative1 from "@/assets/mitsui-creative-1.webp";
import mitsuiCreative2 from "@/assets/mitsui-creative-2.png";
import mitsuiCreative3 from "@/assets/mitsui-creative-3.webp";
import mitsuiCreative4 from "@/assets/mitsui-creative-4.webp";
import ParallaxCardSlider from "@/components/ParallaxCardSlider";
import { useIsMobile } from "@/hooks/use-mobile";

interface StatDef {
  label: string;
  num: number;
  suffix: string;
  decimals: number;
  trend?: boolean;
}

const statDefs: StatDef[] = [
  { label: "Impressions", num: 5.8, suffix: "M", decimals: 1 },
  { label: "Ad clicks", num: 104, suffix: "K", decimals: 0 },
  { label: "Engagement increase", num: 99.2, suffix: "%", decimals: 1, trend: true },
  { label: "ROI", num: 3, suffix: "X", decimals: 0 },
  { label: "Follower growth", num: 1000, suffix: "%", decimals: 0 },
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
            opacity: [0, 1],
            translateY: [24, 0],
            scale: [0.96, 1],
            delay: stagger(90, { start: 260 }),
            duration: 760,
            ease: "out(3)",
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
      <div className="relative z-10 flex h-full w-full flex-col gap-8 px-6 pt-20 pb-8 md:block md:px-12 md:pt-24 md:pb-14">
        <header className="text-left md:absolute md:left-12 md:top-24 md:w-[30%] lg:w-[28%]">
          <span
            className="cs-heading text-[10px] md:text-xs tracking-[0.3em] font-medium mb-3 block uppercase"
            style={{ opacity: 0, color: `hsl(${mitsuiCyan})` }}
          >
            Case study 01
          </span>
          <h2 className="cs-heading font-sans text-[clamp(2.6rem,4.1vw,4.9rem)] font-black uppercase leading-[0.95] tracking-normal text-white text-left pb-2" style={{ opacity: 0 }}>
            <span className="font-sans not-italic block">Mitsui</span>
            <span
              className="cs-title-accent font-sans not-italic bg-clip-text text-transparent inline-block pr-2"
              style={{ backgroundImage: `linear-gradient(135deg, hsl(${mitsuiCyan}), hsl(193 80% 65%))` }}
            >
              Chemicals
            </span>
          </h2>
          <p
            className="cs-subtitle mt-3 font-body text-white/70 leading-snug text-base md:text-[1.05rem] max-w-md"
            style={{ opacity: 0 }}
          >
            Specialty chemicals giant. We ran their digital across APAC.
          </p>
        </header>

        <div ref={statsRef} className="cs-stats grid grid-cols-2 gap-x-4 gap-y-3 md:absolute md:right-12 md:top-[8.45rem] md:w-[52%] md:grid-cols-5 md:gap-x-4 lg:w-[50%]">
          {statDefs.map((stat) => (
            <div
              key={stat.label}
              className="cs-stat flex min-w-0 flex-col items-center border-t border-white/18 pt-3 text-center"
              style={{ opacity: 0 }}
            >
              <div className="flex h-11 items-center justify-center gap-1.5 font-sans tabular-nums text-[clamp(1.7rem,2.25vw,2.55rem)] font-black leading-none tracking-normal text-white">
                <span>
                  <AnimatedStatValue num={stat.num} suffix={stat.suffix} decimals={stat.decimals} triggered={statsTriggered} />
                </span>
                {stat.trend && (
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full md:h-6 md:w-6"
                    style={{ backgroundColor: `hsl(${mitsuiCyan} / 0.18)`, color: `hsl(${mitsuiCyan})` }}
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="h-3 w-3 md:h-3.5 md:w-3.5" strokeWidth={2.6} />
                  </span>
                )}
              </div>
              <div
                className="mt-2 flex min-h-7 w-full max-w-[10.5rem] items-center justify-center rounded-full border px-2.5 py-1 text-center font-body text-[10px] font-semibold uppercase leading-[1.05] tracking-[0.08em] text-white/92 md:text-[9px] lg:text-[10px]"
                style={{
                  backgroundColor: `hsl(${mitsuiCyan} / 0.15)`,
                  borderColor: `hsl(${mitsuiCyan} / 0.3)`,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT — creative gallery */}
        <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center self-center md:absolute md:bottom-[6%] md:left-1/2 md:top-[36%] md:w-[78%] md:-translate-x-1/2">
          <div className="cs-slider flex h-full w-full items-center justify-center" style={{ opacity: 0 }}>
            <ParallaxCardSlider
              slides={sliderImages}
              accentColor={mitsuiCyan}
              cardWidth={isMobile ? undefined : "min(24vw, 320px)"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudySlide;
