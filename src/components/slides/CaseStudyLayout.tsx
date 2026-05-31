import { useEffect, useRef, useState } from "react";
import { animate, createSpring, stagger } from "animejs";
import ParallaxCardSlider from "@/components/ParallaxCardSlider";
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
  const muted = lightMode ? "hsl(0 0% 36%)" : "hsl(0 0% 100% / 0.7)";
  const statBorder = lightMode ? "hsl(0 0% 0% / 0.14)" : "hsl(0 0% 100% / 0.18)";
  const statInk = lightMode ? "hsl(0 0% 15%)" : "white";

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
  }, [triggered]);

  return (
    <section ref={sectionRef} className="slide overflow-hidden relative bg-background">
      <div
        className="bg-wipe absolute inset-0 z-0"
        style={{ opacity: 0, clipPath: "circle(5% at 50% 50%)", background }}
      />
      <div className="absolute inset-0 z-[-1]" style={{ background }} />

      <div className="relative z-10 flex h-full w-full flex-col gap-8 px-6 pt-20 pb-8 md:block md:px-12 md:pt-24 md:pb-14">
        <header className="text-left md:absolute md:left-12 md:top-24 md:w-[32%] lg:w-[30%]">
          <span
            className="cs-heading text-[10px] md:text-xs tracking-[0.3em] font-medium mb-3 block uppercase"
            style={{ opacity: 0, color: `hsl(${accentColor})` }}
          >
            Case proof {caseNumber}
          </span>
          <h2
            className="cs-heading font-sans text-[clamp(2.45rem,4vw,4.8rem)] font-black uppercase leading-[1.02] tracking-normal text-left pb-2 [overflow-wrap:anywhere]"
            style={{ opacity: 0, color: ink }}
          >
            <span className="font-sans not-italic block">{title}</span>
            <span
              className="cs-title-accent font-sans not-italic inline-block pr-2"
              style={{ color: `hsl(${accentColor})` }}
            >
              {accentTitle}
            </span>
          </h2>
          <p
            className="cs-subtitle mt-3 max-w-[34rem] font-body text-[1.08rem] leading-snug md:text-[1.24rem]"
            style={{ opacity: 0, color: muted }}
          >
            {subtitle}
          </p>
          <div
            className="cs-subtitle mt-5 max-w-[23rem] border-t pt-3 font-body text-[0.95rem] leading-snug md:hidden"
            style={{ opacity: 0, color: muted, borderColor: statBorder }}
          >
            {proofNote}
          </div>
        </header>

        <div
          className="cs-proof max-w-[27rem] overflow-hidden border md:absolute md:left-12 md:top-[45%] md:w-[32%] md:max-w-none lg:w-[30%]"
          style={{
            opacity: 0,
            borderColor: statBorder,
            backgroundColor: lightMode ? "hsl(0 0% 100% / 0.38)" : "hsl(0 0% 0% / 0.18)",
          }}
        >
          <div className="grid grid-cols-2 border-b" style={{ borderColor: statBorder }}>
            <div className="border-r p-4" style={{ borderColor: statBorder }}>
              <div className="font-sans text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: `hsl(${accentColor})` }}>
                Market
              </div>
              <div className="mt-1.5 font-body text-[0.95rem] leading-tight md:text-base" style={{ color: statInk }}>
                {market}
              </div>
            </div>
            <div className="p-4">
              <div className="font-sans text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: `hsl(${accentColor})` }}>
                OwlSurf role
              </div>
              <div className="mt-1.5 font-body text-[0.95rem] leading-tight md:text-base" style={{ color: statInk }}>
                {owlsurfRole}
              </div>
            </div>
          </div>
          {proofPoints.length > 0 && (
            <div className="grid gap-0">
              {proofPoints.map((point) => (
                <div
                  key={`${point.label}-${point.value}`}
                  className="grid grid-cols-[6.7rem_minmax(0,1fr)] border-b p-4 last:border-b-0"
                  style={{ borderColor: statBorder }}
                >
                  <span className="font-sans text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: `hsl(${accentColor})` }}>
                    {point.label}
                  </span>
                  <span className="font-body text-[0.95rem] leading-snug md:text-base" style={{ color: muted }}>
                    {point.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {stats.length > 0 && (
          <div className="cs-stats grid grid-cols-2 gap-2 md:absolute md:right-12 md:top-[8.45rem] md:w-[52%] md:grid-cols-5 lg:w-[50%]">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="cs-stat flex min-w-0 flex-col justify-between border p-3 text-left"
                style={{
                  opacity: 0,
                  borderColor: statBorder,
                  backgroundColor: lightMode ? "hsl(0 0% 100% / 0.42)" : "hsl(0 0% 0% / 0.2)",
                }}
              >
                <div
                  className="flex min-h-11 items-center gap-1.5 font-sans tabular-nums text-[clamp(1.55rem,2.05vw,2.4rem)] font-black leading-none tracking-normal"
                  style={{ color: statInk }}
                >
                  {stat.value}
                </div>
                <div
                  className="mt-2 flex min-h-7 w-full items-center border-t pt-2 font-body text-[10px] font-semibold uppercase leading-[1.05] tracking-[0.08em] md:text-[9px] lg:text-[10px]"
                  style={{
                    color: lightMode ? "hsl(0 0% 18% / 0.92)" : "hsl(0 0% 100% / 0.92)",
                    borderColor: `hsl(${accentColor} / 0.28)`,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center self-center md:absolute md:bottom-[6%] md:left-[73%] md:top-[36%] md:w-[54%] md:-translate-x-1/2">
          <div className="cs-slider flex h-full w-full items-center justify-center" style={{ opacity: 0 }}>
            <ParallaxCardSlider
              slides={slides}
              accentColor={accentColor}
              cardWidth={isMobile ? undefined : "min(23vw, 310px)"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyLayout;
