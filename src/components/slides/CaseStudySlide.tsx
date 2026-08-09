import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { animate, stagger } from "animejs";
import mitsuiCreative1 from "@/assets/mitsui-creative-1.webp";
import mitsuiCreative2 from "@/assets/mitsui-creative-2.png";
import mitsuiCreative3 from "@/assets/mitsui-creative-3.webp";
import mitsuiCreative4 from "@/assets/mitsui-creative-4.webp";
import mitsuiExtra1 from "@/assets/mitsui-extra-1.webp";
import mitsuiExtra2 from "@/assets/mitsui-extra-2.webp";
import mitsuiExtra4 from "@/assets/mitsui-extra-4.webp";
import mitsuiExtra5 from "@/assets/mitsui-extra-5.webp";
import mitsuiExtra6 from "@/assets/mitsui-extra-6.webp";
import mitsuiExtra7 from "@/assets/mitsui-extra-7.webp";
import mitsuiExtra8 from "@/assets/mitsui-extra-8.webp";
import CaseStudyCarousel from "@/components/CaseStudyCarousel";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { useIsMobile } from "@/hooks/use-mobile";
import { animateSlideHeading, clearInlineFilter, getSharedSlideMotionProfile, slideEditorialEase, slideSettleEase } from "./slide-motion";
import {
  getMobileCaseRevealBacking,
  MobileCaseStudyRevealLayer,
  useCaseStudyEntryReveal,
} from "./MobileCaseStudyReveal";

interface StatDef {
  label: string;
  num: number;
  suffix: string;
  decimals: number;
  trend?: boolean;
}

const statDefs: StatDef[] = [
  { label: "Impressions", num: 4, suffix: "M+", decimals: 0 },
  { label: "Clicks", num: 50, suffix: "K+", decimals: 0 },
  { label: "New followers", num: 4, suffix: "K+", decimals: 0 },
  { label: "Organic engagement rate", num: 13, suffix: "%", decimals: 0, trend: true },
  { label: "Members reached", num: 67, suffix: "K+", decimals: 0 },
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
  { image: mitsuiExtra6, alt: "Mitsui Chemicals healthcare and ophthalmic solutions creative" },
  { image: mitsuiExtra7, alt: "Mitsui Chemicals material brand identity creative" },
  { image: mitsuiExtra8, alt: "Mitsui Chemicals laboratory brand identity creative" },
];

const mitsuiProofPoints = [
  { label: "Market", value: "Specialty chemicals across APAC" },
  { label: "Buyer", value: "Regional teams, technical buyers, and channel partners" },
  { label: "Role", value: "Creative, media, reporting, and campaign insights across markets" },
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
      ease: slideSettleEase,
      onUpdate: () => {
        setDisplay(objRef.current.value.toFixed(decimals) + suffix);
      },
    });
  }, [triggered, num, suffix, decimals]);

  return <>{display}</>;
}

const CaseStudySlide = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsTriggered, setStatsTriggered] = useState(false);
  const isMobile = useIsMobile();

  const animateCaseContent = useCallback((el: HTMLElement) => {
    const profile = getSharedSlideMotionProfile(isMobile);
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
  }, [isMobile]);

  const { sectionRef, revealLayerRef, revealed } = useCaseStudyEntryReveal({
    isMobile,
    onReveal: animateCaseContent,
  });

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
            ease: slideEditorialEase,
          });
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [statsTriggered, isMobile]);

  return (
    <section
      ref={sectionRef}
      className="slide overflow-hidden relative bg-background"
      style={isMobile ? getMobileCaseRevealBacking(mitsuiBlue, mitsuiCyan) : undefined}
    >
      <MobileCaseStudyRevealLayer
        isMobile={isMobile}
        revealed={revealed}
        revealLayerRef={revealLayerRef}
      >
      <div className="absolute inset-0 z-0" style={{ background: `linear-gradient(160deg, hsl(${mitsuiBlue} / 0.85), hsl(210 60% 22% / 0.7), hsl(${mitsuiCyan} / 0.3))` }} />
      {/* Mitsui-blue interactive grid (desktop only; mobile has no hover).
          MagicUI demo recipe: radial spotlight mask + skew + 200% height.
          Squares 48x36 at 40px = 1920x1440 of real grid, enough to fill the
          masked region on wide screens. */}
      {!isMobile && (
        <InteractiveGridPattern
          width={40}
          height={40}
          squares={[48, 36]}
          className="z-[1] inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 opacity-100 [mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]"
          strokeColor={`hsl(${mitsuiCyan} / 0.42)`}
          hoverFillColor={`hsl(${mitsuiCyan} / 0.5)`}
        />
      )}
      {/* md:pointer-events-none lets the interactive grid receive hover through
          the empty areas of this full-slide layer; the carousel stage re-enables
          its own pointer events below. Mobile keeps normal event flow. */}
      <div className="relative z-10 flex h-full w-full flex-col justify-start gap-[clamp(0.55rem,1.35svh,0.75rem)] px-5 pt-8 pb-3 md:block md:px-12 md:pt-24 md:pb-14 md:pointer-events-none">
        {/* Hallmark · redesign v2: Split Studio — claim + ledger left, creatives right,
            stat-led proof strip across the bottom. Mobile order-flow untouched. */}
        <header className="order-1 text-left md:absolute md:left-12 md:top-20 md:w-[36%] lg:w-[34%]">
          <h2 className="cs-heading font-sans text-[clamp(1.62rem,8.8vw,2.25rem)] font-black uppercase leading-[1.02] tracking-normal text-white text-left pb-1 [overflow-wrap:anywhere] md:whitespace-nowrap md:text-[clamp(2.35rem,3.55vw,4.45rem)] md:pb-2" style={{ opacity: isMobile ? 1 : 0 }}>
            <span className="font-sans not-italic">Mitsui </span>
            <span
              className="cs-title-accent font-sans not-italic inline-block pr-2"
              style={{ color: `hsl(${mitsuiCyan})` }}
            >
              Chemicals
            </span>
          </h2>
          <p
            className="cs-subtitle mt-2 max-w-[22rem] font-body text-[0.82rem] leading-relaxed text-white/90 md:mt-3 md:max-w-[30rem] md:text-[1.24rem]"
            style={{ opacity: isMobile ? 1 : 0 }}
          >
            {isMobile
              ? "A specialty chemicals company. We managed its digital campaigns across APAC."
              : "A specialty chemicals company. We made complex product stories easier to understand across regions, formats, and paid campaigns."}
          </p>
          <div
            className="hidden"
            style={{ opacity: 0 }}
          >
            What it proves: chemical-sector delivery, regional campaign handling, and creative built around product credibility.
          </div>
        </header>

        <div className="cs-proof order-3 max-w-[27rem] overflow-hidden rounded-[1rem] border border-white/25 bg-black/40 backdrop-blur-sm md:absolute md:left-12 md:top-[44%] md:w-[38%] md:max-w-none md:rounded-[0.75rem] md:border md:border-white/12 md:bg-black/[0.16] md:px-5 md:backdrop-blur-[2px] lg:w-[35%]" style={{ opacity: isMobile ? 1 : 0 }}>
          {mitsuiProofPoints.map((point, pointIndex) => (
            <div key={point.label} className={`grid grid-cols-[4.75rem_minmax(0,1fr)] items-center border-b border-white/16 px-3 py-[clamp(0.4rem,0.9svh,0.55rem)] last:border-b-0 md:grid-cols-[7.6rem_minmax(0,1fr)] md:border-white/12 md:px-0 md:py-[1.125rem] md:last:border-b ${pointIndex === 0 ? "md:border-t md:border-t-white/12" : ""}`}>
              <span className="font-sans text-[10.9px] font-black uppercase tracking-[0.14em] text-white/92 md:text-[0.78rem] md:text-white/90">
                {point.label}
              </span>
              <span className="font-body text-[0.74rem] font-medium leading-snug text-white/92 md:text-[1.14rem] md:leading-snug">
                {point.value}
              </span>
            </div>
          ))}
        </div>

        {/* Desktop: stat-led proof strip across the bottom (big numerals, hairline
            dividers). Mobile keeps the compact 2x2 pill grid untouched. */}
        <div ref={statsRef} className="cs-stats order-4 grid grid-cols-2 gap-x-2 gap-y-2 md:absolute md:inset-x-12 md:bottom-10 md:grid-cols-5 md:gap-0 md:border-t md:border-white/10">
          {statDefs.map((stat, statIndex) => (
            <div
              key={stat.label}
              className={`cs-stat flex h-[2.3rem] min-w-0 flex-row items-center justify-between gap-2 rounded-full border border-white/22 bg-black/40 px-3 py-0.5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-sm md:h-auto md:flex-col md:items-start md:justify-center md:gap-1.5 md:rounded-none md:border-0 md:bg-transparent md:px-7 md:py-4 md:shadow-none md:backdrop-blur-none ${statIndex === statDefs.length - 1 ? "col-span-2 w-[calc(50%-0.25rem)] justify-self-center md:col-span-1 md:w-auto md:justify-self-auto" : ""} ${statIndex === 0 ? "md:pl-0" : "md:border-l md:border-l-white/10"}`}
              style={{ opacity: isMobile ? 1 : 0 }}
            >
              <div
                className="flex min-h-0 shrink-0 items-center gap-1 tabular-nums text-[1.12rem] font-semibold leading-none tracking-normal text-white md:gap-2 md:text-[clamp(1.8rem,2.3vw,2.5rem)] md:font-black"
                style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
              >
                <span className="tabular-nums" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                  <AnimatedStatValue num={stat.num} suffix={stat.suffix} decimals={stat.decimals} triggered={statsTriggered} />
                </span>
                {stat.trend && (
                  <span
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full md:h-7 md:w-7"
                    style={{ backgroundColor: `hsl(${mitsuiCyan} / 0.18)`, color: `hsl(${mitsuiCyan})` }}
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="h-2.5 w-2.5 md:h-4 md:w-4" strokeWidth={2.6} />
                  </span>
                )}
              </div>
              <div
                className="flex min-h-0 w-full items-center rounded-full border-l px-2 py-0.5 font-body text-[9.8px] font-bold uppercase leading-[1.02] tracking-[0.06em] text-white/95 md:w-auto md:border-l-0 md:px-2.5 md:py-1 md:text-[0.76rem] md:font-black md:tracking-[0.16em] md:text-white/90"
                style={{
                  borderColor: `hsl(${mitsuiCyan} / 0.4)`,
                  backgroundColor: isMobile ? "transparent" : "hsl(0 0% 0% / 0.16)",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: creative gallery */}
        <div className="cs-cards-stage--xl order-2 mt-3 mb-6 flex min-h-0 min-w-0 items-center justify-center self-center md:absolute md:left-[calc(100%-20rem)] md:top-[44%] md:mb-0 md:mt-0 md:w-auto md:-translate-x-1/2 md:-translate-y-1/2">
          <div className="cs-slider relative flex w-full items-center justify-center" style={{ opacity: isMobile ? 1 : 0 }}>
            <CaseStudyCarousel slides={sliderImages} accentColor={mitsuiCyan} mobileStack />
          </div>
        </div>
      </div>
      </MobileCaseStudyRevealLayer>
    </section>
  );
};

export default CaseStudySlide;
