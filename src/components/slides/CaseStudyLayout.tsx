import { useEffect, useRef, useState } from "react";
import { animate, createSpring, stagger } from "animejs";
import CaseStudyCarousel from "@/components/CaseStudyCarousel";
import { useIsMobile } from "@/hooks/use-mobile";

type SlideImage = {
  image: string;
  alt: string;
};

type ProofStat = {
  value: string;
  label: string;
};

type ProofPoint = {
  label: string;
  value: string;
};

type CaseStudyLayoutProps = {
  caseNumber: string;
  title: string;
  accentTitle: string;
  subtitle: string;
  slides: SlideImage[];
  stats?: ProofStat[];
  accentColor: string;
  background: string;
  lightMode?: boolean;
  proofNote?: string;
  market?: string;
  owlsurfRole?: string;
  proofPoints?: ProofPoint[];
};

const CaseStudyLayout = ({
  caseNumber,
  title,
  accentTitle,
  subtitle,
  slides,
  stats = [],
  accentColor,
  background,
  lightMode = false,
  proofNote = "What it proves: visual evidence, buyer context, and outcomes in one scan, built for a credentials deck instead of a long case-study page.",
  market = "B2B buyer context",
  owlsurfRole = "Positioning, creative, demand, and proof",
  proofPoints = [],
}: CaseStudyLayoutProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);
  const isMobile = useIsMobile();
  const ink = lightMode ? "hsl(0 0% 15%)" : "white";
  const muted = lightMode ? "hsl(0 0% 28%)" : "hsl(0 0% 100% / 0.84)";
  const statBorder = lightMode ? "hsl(0 0% 0% / 0.14)" : "hsl(0 0% 100% / 0.18)";
  const statInk = lightMode ? "hsl(0 0% 15%)" : "white";
  const proofRows = [
    { label: "Market", value: market },
    { label: "Role", value: owlsurfRole },
    ...proofPoints,
  ].filter((point) => !["proof", "shift"].includes(point.label.toLowerCase()));

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
            opacity: [0, 1],
            translateY: [70, 0],
            scale: [0.94, 1],
            delay: stagger(80),
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
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600,
            delay: 280,
            ease: "out(3)",
          });

          animate(el.querySelector(".cs-slider")!, {
            opacity: [0, 1],
            scale: [0.78, 1.04, 1],
            translateX: [180, -18, 0],
            rotate: [6, -1, 0],
            duration: 1350,
            delay: 360,
            ease: "out(4)",
          });

          animate(el.querySelectorAll(".cs-stat"), {
            opacity: [0, 1],
            translateY: [24, 0],
            scale: [0.96, 1],
            delay: stagger(90, { start: 520 }),
            duration: 760,
            ease: "out(3)",
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

  return (
    <section ref={sectionRef} className="slide overflow-hidden relative bg-background">
      <div
        className="bg-wipe absolute inset-0 z-0"
        style={{ opacity: isMobile ? 1 : 0, clipPath: isMobile ? "circle(150% at 50% 50%)" : "circle(5% at 50% 50%)", background }}
      />
      <div className="absolute inset-0 z-[-1]" style={{ background }} />

      <div className="relative z-10 flex h-full w-full flex-col justify-start gap-2.5 px-5 pt-10 pb-8 md:block md:px-12 md:pt-24 md:pb-14">
        <header className="order-1 text-left md:absolute md:left-12 md:top-24 md:w-[32%] lg:w-[30%]">
          <span
            className="cs-heading text-[10px] md:text-xs tracking-[0.3em] font-medium mb-3 hidden uppercase md:block"
            style={{ opacity: isMobile ? 1 : 0, color: `hsl(${accentColor})` }}
          >
            Case proof {caseNumber}
          </span>
          <h2
            className="cs-heading font-sans text-[clamp(1.78rem,9.8vw,2.55rem)] font-black uppercase leading-[1.02] tracking-normal text-left pb-1 [overflow-wrap:anywhere] md:text-[clamp(2.45rem,4vw,4.8rem)] md:pb-2"
            style={{ opacity: isMobile ? 1 : 0, color: ink }}
          >
            <span className="font-sans not-italic md:block">{title} </span>
            <span
              className="cs-title-accent font-sans not-italic inline-block pr-2"
              style={{ color: `hsl(${accentColor})` }}
            >
              {accentTitle}
            </span>
          </h2>
          <p
            className="cs-subtitle mt-1.5 max-w-[22rem] font-body text-[0.82rem] leading-relaxed md:mt-3 md:max-w-[34rem] md:text-[1.24rem]"
            style={{ opacity: isMobile ? 1 : 0, color: muted }}
          >
            {subtitle}
          </p>
          <div
            className="hidden"
            style={{ opacity: 0, color: muted, borderColor: statBorder }}
          >
            {proofNote}
          </div>
        </header>

        <div
          className="cs-proof order-3 max-w-[27rem] overflow-hidden rounded-[0.9rem] border backdrop-blur-sm md:absolute md:left-12 md:top-[45%] md:w-[32%] md:max-w-none md:rounded-none lg:w-[30%]"
          style={{
            opacity: isMobile ? 1 : 0,
            borderColor: isMobile ? (lightMode ? "hsl(0 0% 0% / 0.22)" : "hsl(0 0% 100% / 0.22)") : statBorder,
            backgroundColor: isMobile ? (lightMode ? "hsl(0 0% 100% / 0.7)" : "hsl(0 0% 0% / 0.42)") : (lightMode ? "hsl(0 0% 100% / 0.38)" : "hsl(0 0% 0% / 0.18)"),
          }}
        >
          {proofRows.map((point) => (
            <div
              key={`${point.label}-${point.value}`}
              className="grid grid-cols-[4.65rem_minmax(0,1fr)] items-center border-b px-3 py-1.5 last:border-b-0 md:grid-cols-[6.7rem_minmax(0,1fr)] md:p-4"
              style={{ borderColor: isMobile ? (lightMode ? "hsl(0 0% 0% / 0.16)" : "hsl(0 0% 100% / 0.16)") : statBorder }}
            >
              <span className="font-sans text-[9.5px] font-black uppercase tracking-[0.16em]" style={{ color: `hsl(${accentColor})` }}>
                {point.label}
              </span>
              <span className="font-body text-[0.72rem] leading-tight md:text-base" style={{ color: isMobile ? (lightMode ? "hsl(0 0% 10%)" : "hsl(0 0% 100% / 0.92)") : muted }}>
                {point.value}
              </span>
            </div>
          ))}
        </div>

        {stats.length > 0 && (
          <div className="cs-stats order-4 grid grid-cols-2 gap-2 md:absolute md:right-12 md:top-[8.45rem] md:w-[68%] md:grid-cols-5 md:gap-2 lg:w-[66%]">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="cs-stat flex h-[2.2rem] min-w-0 flex-row items-center justify-between gap-2 rounded-full border px-3 py-0.5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-sm md:h-auto md:min-h-[3.4rem] md:gap-2 md:px-3 md:py-1"
                style={{
                  opacity: isMobile ? 1 : 0,
                  borderColor: isMobile ? (lightMode ? "hsl(0 0% 0% / 0.2)" : "hsl(0 0% 100% / 0.22)") : statBorder,
                  backgroundColor: isMobile ? (lightMode ? "hsl(0 0% 100% / 0.72)" : "hsl(0 0% 0% / 0.42)") : (lightMode ? "hsl(0 0% 100% / 0.42)" : "hsl(0 0% 0% / 0.2)"),
                }}
              >
                <div
                  className="flex min-h-0 shrink-0 items-center gap-1 tabular-nums text-[1.12rem] font-semibold leading-none tracking-normal md:gap-1.5 md:text-[clamp(1.1rem,1.45vw,1.55rem)]"
                  style={{ color: statInk, fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                >
                  {stat.value}
                </div>
                <div
                  className="flex min-h-0 w-full items-center border-l pl-2 font-body text-[9.2px] font-semibold uppercase leading-[1.02] tracking-[0.035em] md:pl-2.5 md:tracking-[0.015em] md:text-[9px] lg:text-[10px]"
                  style={{
                    color: lightMode ? "hsl(0 0% 12%)" : "hsl(0 0% 100% / 0.96)",
                    borderColor: `hsl(${accentColor} / 0.4)`,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="order-2 mt-3 mb-1 flex min-h-0 min-w-0 items-center justify-center self-center md:absolute md:left-[50%] md:top-[58%] md:mb-0 md:mt-0 md:w-auto md:-translate-x-1/2 md:-translate-y-1/2">
          <div className="cs-slider flex w-full items-center justify-center" style={{ opacity: isMobile ? 1 : 0 }}>
            <CaseStudyCarousel slides={slides} accentColor={accentColor} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyLayout;
