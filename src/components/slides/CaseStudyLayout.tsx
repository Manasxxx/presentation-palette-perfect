import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import CaseStudyCarousel from "@/components/CaseStudyCarousel";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { useIsMobile } from "@/hooks/use-mobile";
import { animateSlideHeading, clearInlineFilter, getSharedSlideMotionProfile, slideEditorialEase } from "./slide-motion";

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
  /** Shorter glanceable subtitle for the mobile stack; desktop keeps `subtitle`. */
  mobileSubtitle?: string;
  slides: SlideImage[];
  stats?: ProofStat[];
  accentColor: string;
  background: string;
  lightMode?: boolean;
  proofNote?: string;
  market?: string;
  owlsurfRole?: string;
  proofPoints?: ProofPoint[];
  mobileWideCarousel?: boolean;
  /** Wide-aspect desktop cards for landscape creatives (e.g. DEHN 1256x650). */
  desktopWideCarousel?: boolean;
  /** Adds extra mobile breathing room for dense case slides. */
  mobileRoomySpacing?: boolean;
};

const CaseStudyLayout = ({
  caseNumber,
  title,
  accentTitle,
  subtitle,
  mobileSubtitle,
  slides,
  stats = [],
  accentColor,
  background,
  lightMode = false,
  proofNote = "What it proves: visual evidence, buyer context, and outcomes in one scan, built for a credentials deck instead of a long case-study page.",
  market = "B2B buyer context",
  owlsurfRole = "Positioning, creative, demand, and proof",
  proofPoints = [],
  mobileWideCarousel = false,
  desktopWideCarousel = false,
  mobileRoomySpacing = false,
}: CaseStudyLayoutProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);
  const isMobile = useIsMobile();
  const ink = lightMode ? "hsl(0 0% 15%)" : "white";
  const muted = lightMode ? "hsl(0 0% 20%)" : "hsl(0 0% 100% / 0.9)";
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
    const profile = getSharedSlideMotionProfile(isMobile);
    const reveal = () => {
      if (triggered) return;
      setTriggered(true);

      animateSlideHeading(el, ".cs-heading", isMobile, 90);

      const subtitle = el.querySelector(".cs-subtitle")!;
      animate(subtitle, {
        opacity: [0, 1],
        translateY: [16, 0],
        filter: ["blur(7px)", "blur(0px)"],
        duration: isMobile ? 680 : 760,
        delay: profile.copyDelay + 40,
        ease: slideEditorialEase,
        onComplete: () => clearInlineFilter(subtitle),
      });

      const slider = el.querySelector(".cs-slider")!;
      animate(slider, {
        opacity: [0, 1],
        scale: [0.985, 1],
        translateY: [18, 0],
        filter: ["blur(8px)", "blur(0px)"],
        duration: isMobile ? 920 : 1080,
        delay: profile.contentDelay + 160,
        ease: slideEditorialEase,
        onComplete: () => clearInlineFilter(slider),
      });

      animate(el.querySelectorAll(".cs-stat"), {
        opacity: [0, 1],
        translateY: [24, 0],
        scale: [0.96, 1],
        delay: stagger(profile.itemStagger, { start: profile.contentDelay + 220 }),
        duration: 760,
        ease: slideEditorialEase,
      });

      const proofEls = el.querySelectorAll(".cs-proof");
      animate(proofEls, {
        opacity: [0, 1],
        translateY: [18, 0],
        filter: ["blur(8px)", "blur(0px)"],
        delay: stagger(profile.itemStagger, { start: profile.contentDelay + 160 }),
        duration: 680,
        ease: slideEditorialEase,
        onComplete: () => clearInlineFilter(proofEls),
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
      },
      { threshold: isMobile ? 0.18 : 0.3 }
    );
    observer.observe(el);
    // Desktop fallback only. On mobile these slides are mounted one step early,
    // so a timer can run the entry before the user reaches the slide.
    const fallback = isMobile ? 0 : window.setTimeout(reveal, 900);
    return () => {
      observer.disconnect();
      if (fallback) window.clearTimeout(fallback);
    };
  }, [triggered, isMobile]);

  return (
    <section ref={sectionRef} className="slide overflow-hidden relative bg-background">
      <div className="absolute inset-0 z-0" style={{ background }} />
      {/* Brand-colored interactive grid (desktop only; mobile has no hover).
          MagicUI demo recipe: radial spotlight mask + skew + 200% height. */}
      {!isMobile && (
        <InteractiveGridPattern
          width={40}
          height={40}
          squares={[48, 36]}
          className="z-[1] inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 opacity-100 [mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]"
          strokeColor={`hsl(${accentColor} / 0.42)`}
          hoverFillColor={`hsl(${accentColor} / 0.5)`}
        />
      )}

      {/* md:pointer-events-none lets the grid receive hover through this
          full-slide layer; the carousel auto-advances, so it needs no mouse. */}
      <div className={`relative z-10 flex h-full w-full flex-col justify-start px-5 pt-8 pb-8 md:block md:px-12 md:pt-24 md:pb-14 md:pointer-events-none ${mobileRoomySpacing ? "gap-3" : "gap-2.5"}`}>
        {/* Hallmark · redesign v2 (ported from Mitsui): Split Studio — claim + open
            ledger left, creatives right, stat-led proof strip bottom. Mobile untouched. */}
        <header className="order-1 text-left md:absolute md:left-12 md:top-20 md:w-[36%] lg:w-[34%]">
          <h2
            className="cs-heading font-sans text-[clamp(1.78rem,9.8vw,2.55rem)] font-black uppercase leading-[1.02] tracking-normal text-left pb-1 [overflow-wrap:anywhere] md:whitespace-nowrap md:text-[clamp(2.25rem,3.45vw,4.35rem)] md:pb-2"
            style={{ opacity: isMobile ? 1 : 0, color: ink }}
          >
            <span className="font-sans not-italic">{title} </span>
            <span
              className="cs-title-accent font-sans not-italic inline-block pr-2"
              style={{ color: `hsl(${accentColor})` }}
            >
              {accentTitle}
            </span>
          </h2>
          <p
            className="cs-subtitle mt-1.5 max-w-[22rem] font-body text-[0.82rem] leading-relaxed md:mt-3 md:max-w-[30rem] md:text-[1.24rem]"
            style={{ opacity: isMobile ? 1 : 0, color: muted }}
          >
            {isMobile && mobileSubtitle ? mobileSubtitle : subtitle}
          </p>
          <div
            className="hidden"
            style={{ opacity: 0, color: muted, borderColor: statBorder }}
          >
            {proofNote}
          </div>
        </header>

        <div
          className="cs-proof order-3 max-w-[29rem] overflow-hidden rounded-[1rem] border backdrop-blur-sm md:absolute md:left-12 md:top-[44%] md:w-[38%] md:max-w-none md:rounded-[0.75rem] md:border md:px-5 md:backdrop-blur-[2px] lg:w-[35%]"
          style={{
            opacity: isMobile ? 1 : 0,
            borderColor: isMobile ? (lightMode ? "hsl(0 0% 0% / 0.22)" : "hsl(0 0% 100% / 0.22)") : statBorder,
            backgroundColor: isMobile
              ? (lightMode ? "hsl(0 0% 100% / 0.7)" : "hsl(0 0% 0% / 0.42)")
              : (lightMode ? "hsl(0 0% 100% / 0.18)" : "hsl(0 0% 0% / 0.16)"),
          }}
        >
          {proofRows.map((point, pointIndex) => (
            <div
              key={`${point.label}-${point.value}`}
              className={`grid grid-cols-[5.15rem_minmax(0,1fr)] items-center border-b px-3.5 py-2 last:border-b-0 md:grid-cols-[7.6rem_minmax(0,1fr)] md:px-0 md:py-[1.125rem] md:last:border-b ${pointIndex === 0 ? "md:border-t" : ""}`}
              style={{ borderColor: isMobile ? (lightMode ? "hsl(0 0% 0% / 0.16)" : "hsl(0 0% 100% / 0.16)") : statBorder }}
            >
              <span className="font-sans text-[10.5px] font-black uppercase tracking-[0.15em] md:text-[0.78rem]" style={{ color: lightMode ? "hsl(0 0% 8%)" : (isMobile ? "hsl(0 0% 100% / 0.92)" : muted) }}>
                {point.label}
              </span>
              <span className="font-body text-[0.82rem] font-medium leading-snug md:text-[1.14rem] md:leading-snug" style={{ color: lightMode ? "hsl(0 0% 8%)" : (isMobile ? "hsl(0 0% 100% / 0.92)" : muted) }}>
                {point.value}
              </span>
            </div>
          ))}
        </div>

        {stats.length > 0 && (
          /* Desktop: stat-led proof strip across the bottom. Mobile keeps the pills. */
          <div
            className={`cs-stats order-4 grid grid-cols-2 gap-x-2 md:absolute md:inset-x-12 md:bottom-10 md:grid-cols-4 md:gap-0 md:border-t ${mobileRoomySpacing ? "gap-y-3" : "gap-y-2"}`}
            style={{ borderColor: statBorder }}
          >
            {stats.map((stat, statIndex) => (
              <div
                key={stat.label}
                className={`cs-stat flex h-[2.2rem] min-w-0 flex-row items-center justify-between gap-2 rounded-full border px-3 py-0.5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-sm md:h-auto md:flex-col md:items-start md:justify-center md:gap-1.5 md:rounded-none md:border-0 md:px-7 md:py-4 md:shadow-none md:backdrop-blur-none ${statIndex === 0 ? "md:pl-0" : "md:border-l"}`}
                style={{
                  opacity: isMobile ? 1 : 0,
                  borderColor: isMobile ? (lightMode ? "hsl(0 0% 0% / 0.2)" : "hsl(0 0% 100% / 0.22)") : statBorder,
                  backgroundColor: isMobile ? (lightMode ? "hsl(0 0% 100% / 0.72)" : "hsl(0 0% 0% / 0.42)") : "transparent",
                }}
              >
                <div
                  className="flex min-h-0 shrink-0 items-center gap-1 tabular-nums text-[1.12rem] font-semibold leading-none tracking-normal md:gap-2 md:text-[clamp(1.8rem,2.3vw,2.5rem)] md:font-black"
                  style={{ color: statInk, fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                >
                  {stat.value}
                </div>
                <div
                  className="flex min-h-0 w-full items-center rounded-full border-l px-2 py-0.5 font-body text-[10.9px] font-semibold uppercase leading-[1.02] tracking-[0.05em] md:w-fit md:-translate-x-2 md:border-l-0 md:px-2 md:py-0.5 md:text-[0.83rem] md:font-extrabold md:tracking-[0.145em]"
                  style={{
                    color: isMobile
                      ? (lightMode ? "hsl(0 0% 12%)" : "hsl(0 0% 100% / 0.96)")
                      : (lightMode ? "hsl(0 0% 20%)" : "hsl(0 0% 100% / 0.8)"),
                    borderColor: `hsl(${accentColor} / 0.4)`,
                    backgroundColor: isMobile
                      ? (lightMode ? "hsl(0 0% 100% / 0.58)" : "hsl(0 0% 0% / 0.34)")
                      : (lightMode ? "hsl(0 0% 100% / 0.18)" : "hsl(0 0% 0% / 0.16)"),
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={`cs-cards-stage--xl order-2 mt-3 flex min-h-0 min-w-0 items-center justify-center self-center md:absolute ${mobileRoomySpacing ? "mb-4" : "mb-1"} ${desktopWideCarousel ? "md:left-[calc(100%-22rem)]" : "md:left-[calc(100%-20rem)]"} md:mb-0 md:mt-0 md:w-auto md:-translate-x-1/2 md:-translate-y-1/2 ${stats.length > 0 ? "md:top-[44%]" : "md:top-[50%]"}`}>
          <div className="cs-slider relative flex w-full items-center justify-center" style={{ opacity: isMobile ? 1 : 0 }}>
            <CaseStudyCarousel
              slides={slides}
              accentColor={accentColor}
              mobileWide={mobileWideCarousel}
              mobileTableWidth={!mobileWideCarousel && stats.length === 0}
              mobileStack
              desktopWide={desktopWideCarousel}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyLayout;
