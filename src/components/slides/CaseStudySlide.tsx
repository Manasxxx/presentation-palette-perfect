import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { animate, stagger, createSpring } from "animejs";
import mitsuiCreative1 from "@/assets/mitsui-creative-1.webp";
import mitsuiCreative2 from "@/assets/mitsui-creative-2.png";
import mitsuiCreative3 from "@/assets/mitsui-creative-3.webp";
import mitsuiCreative4 from "@/assets/mitsui-creative-4.webp";
import mitsuiExtra1 from "@/assets/mitsui-extra-1.webp";
import mitsuiExtra2 from "@/assets/mitsui-extra-2.webp";
import mitsuiExtra4 from "@/assets/mitsui-extra-4.webp";
import mitsuiExtra5 from "@/assets/mitsui-extra-5.webp";
import CaseStudyCarousel from "@/components/CaseStudyCarousel";
import { useIsMobile } from "@/hooks/use-mobile";

interface StatDef {
  label: string;
  num: number;
  suffix: string;
  decimals: number;
  trend?: boolean;
}

const statDefs: StatDef[] = [
  { label: "APAC impressions", num: 5.8, suffix: "M", decimals: 1 },
  { label: "Site-bound clicks", num: 104, suffix: "K", decimals: 0 },
  { label: "Engagement lift", num: 99.2, suffix: "%", decimals: 1, trend: true },
  { label: "Reported ROI", num: 3, suffix: "X", decimals: 0 },
];

const mitsuiBlue = "210 100% 30%";
const mitsuiCyan = "193 100% 42%";

const sliderImages = [
  { image: mitsuiCreative1, alt: "Mitsui Chemicals creative 1" },
  { image: mitsuiCreative2, alt: "Mitsui Chemicals creative 2" },
  { image: mitsuiCreative3, alt: "Mitsui Chemicals creative 3" },
  { image: mitsuiCreative4, alt: "Mitsui Chemicals creative 4" },
  { image: mitsuiExtra1, alt: "Mitsui Chemicals additional creative 1" },
  { image: mitsuiExtra2, alt: "Mitsui Chemicals additional creative 2" },
  { image: mitsuiExtra4, alt: "Mitsui Chemicals additional creative 4" },
  { image: mitsuiExtra5, alt: "Mitsui Chemicals additional creative 5" },
];

const mitsuiProofPoints = [
  { label: "Market", value: "Specialty chemicals across APAC" },
  { label: "Buyer", value: "Regional teams, technical audiences, and channel decision-makers" },
  { label: "Role", value: "Creative, media, reporting, and demand signals across markets" },
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
    if (
      isMobile ||
      window.innerWidth < 1024 ||
      window.matchMedia("(pointer: coarse)").matches
    ) return;
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

          animate(el.querySelectorAll(".cs-proof"), {
            opacity: [0, 1],
            translateY: [18, 0],
            delay: stagger(80, { start: 460 }),
            duration: 680,
            ease: "out(3)",
          });

        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered, isMobile]);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    if (isMobile) {
      if (!statsTriggered) setStatsTriggered(true);
      return;
    }
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
  }, [statsTriggered, isMobile]);

  return (
    <section ref={sectionRef} className="slide overflow-hidden relative bg-background">
      <div
        className="bg-wipe absolute inset-0 z-0"
        style={{ opacity: isMobile ? 1 : 0, clipPath: isMobile ? "circle(150% at 50% 50%)" : "circle(5% at 50% 50%)", background: `linear-gradient(160deg, hsl(${mitsuiBlue} / 0.85), hsl(210 60% 22% / 0.7), hsl(${mitsuiCyan} / 0.3))` }}
      />
      <div className="absolute inset-0 z-[-1]" style={{ background: `linear-gradient(160deg, hsl(${mitsuiBlue} / 0.85), hsl(210 60% 22% / 0.7), hsl(${mitsuiCyan} / 0.3))` }} />
      <div className="relative z-10 flex h-full w-full flex-col justify-start gap-2.5 px-5 pt-5 pb-5 md:block md:px-12 md:pt-24 md:pb-14">
        <header className="order-1 text-left md:absolute md:left-12 md:top-24 md:w-[32%] lg:w-[30%]">
          <span
            className="cs-heading text-[10px] md:text-xs tracking-[0.3em] font-medium mb-3 hidden uppercase md:block"
            style={{ opacity: isMobile ? 1 : 0, color: `hsl(${mitsuiCyan})` }}
          >
            Case proof 01
          </span>
          <h2 className="cs-heading font-sans text-[clamp(1.78rem,9.8vw,2.55rem)] font-black uppercase leading-[1.02] tracking-normal text-white text-left pb-1 [overflow-wrap:anywhere] md:text-[clamp(2.6rem,4.1vw,4.9rem)] md:pb-2" style={{ opacity: isMobile ? 1 : 0 }}>
            <span className="font-sans not-italic block">Mitsui</span>
            <span
              className="cs-title-accent font-sans not-italic inline-block pr-2"
              style={{ color: `hsl(${mitsuiCyan})` }}
            >
              Chemicals
            </span>
          </h2>
          <p
            className="cs-subtitle mt-2.5 max-w-[22rem] font-body text-[0.82rem] leading-relaxed text-white/70 md:mt-3 md:max-w-[34rem] md:text-[1.24rem]"
            style={{ opacity: isMobile ? 1 : 0 }}
          >
            Specialty chemicals across APAC. We made technical value visible across regions, formats, and paid channels.
          </p>
          <div
            className="hidden"
            style={{ opacity: 0 }}
          >
            What it proves: chemical-sector delivery, regional campaign handling, and creative built around product credibility.
          </div>
        </header>

        <div className="cs-proof order-3 max-w-[27rem] overflow-hidden rounded-[0.9rem] border border-white/16 bg-white/[0.045] backdrop-blur-sm md:absolute md:left-12 md:top-[45%] md:w-[32%] md:max-w-none md:rounded-none lg:w-[30%]" style={{ opacity: isMobile ? 1 : 0 }}>
          {mitsuiProofPoints.map((point) => (
            <div key={point.label} className="grid grid-cols-[4.65rem_minmax(0,1fr)] items-center border-b border-white/12 px-3 py-1.5 last:border-b-0 md:grid-cols-[6.7rem_minmax(0,1fr)] md:p-4">
              <span className="font-sans text-[9px] font-black uppercase tracking-[0.18em]" style={{ color: `hsl(${mitsuiCyan})` }}>
                {point.label}
              </span>
              <span className="font-body text-[0.66rem] leading-tight text-white/76 md:text-base">
                {point.value}
              </span>
            </div>
          ))}
        </div>

        <div ref={statsRef} className="cs-stats order-4 grid grid-cols-2 gap-2 md:absolute md:right-12 md:top-[8.45rem] md:w-[68%] md:grid-cols-5 md:gap-2 lg:w-[66%]">
          {statDefs.map((stat) => (
            <div
              key={stat.label}
              className="cs-stat flex h-[2.2rem] min-w-0 flex-row items-center justify-between gap-2 rounded-full border border-white/16 bg-white/[0.055] px-3 py-0.5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-sm md:h-auto md:min-h-[3.4rem] md:gap-2 md:px-3 md:py-1"
              style={{ opacity: isMobile ? 1 : 0 }}
            >
              <div
                className="flex min-h-0 shrink-0 items-center gap-1 tabular-nums text-[1.12rem] font-semibold leading-none tracking-normal text-white md:gap-1.5 md:text-[clamp(1.1rem,1.45vw,1.55rem)]"
              >
                <span>
                  <AnimatedStatValue num={stat.num} suffix={stat.suffix} decimals={stat.decimals} triggered={statsTriggered} />
                </span>
                {stat.trend && (
                  <span
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full md:h-6 md:w-6"
                    style={{ backgroundColor: `hsl(${mitsuiCyan} / 0.18)`, color: `hsl(${mitsuiCyan})` }}
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="h-2.5 w-2.5 md:h-3.5 md:w-3.5" strokeWidth={2.6} />
                  </span>
                )}
              </div>
              <div
                className="flex min-h-0 w-full items-center border-l pl-2 font-body text-[9.2px] font-semibold uppercase leading-[1.02] tracking-[0.035em] text-white/88 md:pl-2.5 md:tracking-[0.015em] md:text-[9px] lg:text-[10px]"
                style={{
                  borderColor: `hsl(${mitsuiCyan} / 0.28)`,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: creative gallery */}
        <div className="order-2 mt-3 mb-1 flex min-h-0 min-w-0 items-center justify-center self-center md:absolute md:left-[50%] md:top-[58%] md:mb-0 md:mt-0 md:w-auto md:-translate-x-1/2 md:-translate-y-1/2">
          <div className="cs-slider flex w-full items-center justify-center" style={{ opacity: isMobile ? 1 : 0 }}>
            <CaseStudyCarousel slides={sliderImages} accentColor={mitsuiCyan} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudySlide;
