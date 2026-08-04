import { useEffect, useMemo, useRef, useState } from "react";
import { FlaskConical, GraduationCap, Pill, Warehouse, Zap, Eye, Handshake, ShieldCheck, type LucideIcon } from "lucide-react";
import { animate, stagger } from "animejs";
import Hyperspeed from "@/components/ui/Hyperspeed/Hyperspeed";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLowPowerMode } from "@/hooks/use-low-power";
import { animateSlideAccent, animateSlideHeading, getSharedSlideMotionProfile, getSlideContentEase, slideEditorialEase, slideSettleEase } from "./slide-motion";

type Sector = { label: string; tag: string; icon: LucideIcon };

const sectors: Sector[] = [
  { label: "Chemicals", tag: "Specialty, process, materials", icon: FlaskConical },
  { label: "Industrial", tag: "Manufacturing, equipment, plants", icon: Warehouse },
  { label: "Pharma", tag: "Regulated, clinical, B2B", icon: Pill },
  { label: "Infrastructure", tag: "Power, mobility, built systems", icon: Zap },
  { label: "Institutions", tag: "Education, foundations, public trust", icon: GraduationCap },
];

type Differentiator = { icon: LucideIcon; label: string; desc: string };

// Desktop: three consolidated buyer outcomes (was five icon-cards). Fuller
// wording than the mobile variants of the same three messages below.
const differentiators: Differentiator[] = [
  { icon: Eye, label: "Understood faster", desc: "Buyers grasp what you sell before the first call starts." },
  { icon: Handshake, label: "Easier internal buy-in", desc: "Champions carry one clear story to the people who sign off." },
  { icon: ShieldCheck, label: "Lower perceived risk", desc: "Real proof makes a high-stakes decision feel safe." },
];

// Mobile-only: the five outcomes above consolidated into three, each with a
// one-line sentence (comprehension, internal buy-in, lower risk).
const mobileOutcomes: Differentiator[] = [
  { icon: Eye, label: "Understood faster", desc: "Buyers get what you sell before the first call." },
  { icon: Handshake, label: "Easier internal buy-in", desc: "Your champions carry one clear story to the people who sign off." },
  { icon: ShieldCheck, label: "Lower perceived risk", desc: "Real numbers make a high-stakes decision feel safe." },
];

// Mobile-only: priority sectors render as an auto-scrolling marquee pill (like the Clients slide)
const renderSectorChip = (sector: Sector, key: React.Key) => {
  const Icon = sector.icon;
  return (
    <div
      key={key}
      className="mr-3 flex shrink-0 items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2.5 backdrop-blur-sm"
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-owl-teal/25 bg-owl-teal/12 text-owl-teal">
        <Icon className="h-[0.95rem] w-[0.95rem]" strokeWidth={1.9} />
      </span>
      <span className="whitespace-nowrap font-sans text-[0.9rem] font-black leading-none text-white">
        {sector.label}
      </span>
    </div>
  );
};

const SkyrocketSlide = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const isMobile = useIsMobile();
  const lowPower = useLowPowerMode();
  const hyperspeedOptions = useMemo(
    () => ({
      onSpeedUp: () => { },
      onSlowDown: () => { },
      distortion: "turbulentDistortion",
      length: 400,
      roadWidth: isMobile ? 12.5 : 10,
      islandWidth: isMobile ? 2.25 : 2,
      lanesPerRoad: 3,
      fov: isMobile ? 104 : 90,
      fovSpeedUp: isMobile ? 154 : 150,
      speedUp: isMobile ? 3 : 2,
      autoSpeedUp: isMobile ? 0.5 : 0,
      carLightsFade: 0.4,
      totalSideLightSticks: 20,
      lightPairsPerRoadWay: 40,
      shoulderLinesWidthPercentage: 0.05,
      brokenLinesWidthPercentage: 0.1,
      brokenLinesLengthPercentage: 0.5,
      lightStickWidth: [0.12, 0.5] as [number, number],
      lightStickHeight: [1.3, 1.7] as [number, number],
      movingAwaySpeed: (isMobile ? [55, 72] : [60, 80]) as [number, number],
      movingCloserSpeed: (isMobile ? [-112, -148] : [-120, -160]) as [number, number],
      carLightsLength: [400 * 0.03, 400 * 0.2] as [number, number],
      carLightsRadius: [0.05, 0.14] as [number, number],
      carWidthPercentage: [0.3, 0.5] as [number, number],
      carShiftX: [-0.8, 0.8] as [number, number],
      carFloorSeparation: [0, 5] as [number, number],
      colors: {
        roadColor: 0x080808,
        islandColor: 0x0a0a0a,
        background: 0x000000,
        shoulderLines: 0x131318,
        brokenLines: 0x131318,
        leftCars: [0x4bc2c2, 0x2dd4bf, 0x14b8a6],
        rightCars: [0x0f766e, 0x115e59, 0x134e4a],
        sticks: 0x4bc2c2,
      },
      // Same scene, fewer fragments on struggling machines (FPS watchdog).
      maxPixelRatio: lowPower ? 0.75 : 1.25,
    }),
    [isMobile, lowPower]
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          const profile = getSharedSlideMotionProfile(isMobile);

          const kickers = el.querySelectorAll(".who-kicker");
          if (kickers.length) {
            animate(kickers, {
              opacity: [0, 1],
              translateY: [profile.headingDropY * 0.45, 0],
              filter: ["blur(7px)", "blur(0px)"],
              duration: 600,
              delay: stagger(120),
              ease: slideSettleEase,
            });
          }

          const rules = el.querySelectorAll(".who-rule");
          if (rules.length) {
            animate(rules, {
              scaleX: [0, 1],
              duration: 800,
              delay: 200,
              ease: slideSettleEase,
            });
          }

          animateSlideHeading(el, ".who-word", isMobile, 210);
          animateSlideAccent(el, ".who-title-accent", isMobile, 260);

          const copy = el.querySelectorAll(".who-copy");
          if (copy.length) {
            animate(copy, {
              opacity: [0, 1],
              translateY: [22, 0],
              filter: ["blur(8px)", "blur(0px)"],
              delay: stagger(110, { start: profile.copyDelay + 240 }),
              duration: 760,
              ease: slideEditorialEase,
            });
          }

          const chips = el.querySelectorAll(".who-chip");
          if (chips.length) {
            animate(chips, {
              opacity: [0, 1],
              translateY: [isMobile ? 14 : 18, 0],
              scale: isMobile ? [0.98, 1] : [0.9, 1],
              delay: stagger(70, { start: 640 }),
              duration: isMobile ? 620 : 560,
              ease: getSlideContentEase(isMobile),
            });
          }

          const sectors = el.querySelectorAll(".who-sector");
          if (sectors.length) {
            animate(sectors, {
              opacity: [0, 1],
              translateY: [24, 0],
              filter: ["blur(8px)", "blur(0px)"],
              delay: stagger(90, { start: 560 }),
              duration: 760,
              ease: slideEditorialEase,
            });
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered, isMobile]);

  return (
    <section ref={sectionRef} className="slide relative overflow-hidden bg-background p-3 sm:p-5 md:p-7">
      <div className="absolute inset-0 z-0 pointer-events-none translate-x-[3%] opacity-70 md:translate-x-0">
        <Hyperspeed effectOptions={hyperspeedOptions} />
      </div>
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_30%,rgba(75,194,194,0.16),transparent_46%),linear-gradient(180deg,hsl(214_30%_5%/0.86),hsl(214_30%_6%/0.62)_50%,hsl(214_30%_5%/0.9))]" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1640px] flex-col justify-start gap-10 px-5 pt-[4.35rem] pb-9 sm:px-10 md:justify-center md:gap-12 md:px-[4.5%] md:py-[4.4%]">
        {/* TOP — the message (left) + where we work (right) */}
        <div className="grid gap-8 md:grid-cols-12 md:items-start md:gap-14 lg:gap-20">
          {/* message */}
          <div className="md:col-span-7">
            <div className="who-kicker font-sans text-[0.76rem] font-black uppercase leading-none tracking-[0.2em] text-owl-teal drop-shadow-[0_0_18px_rgba(75,194,194,0.35)] md:text-xs md:tracking-[0.26em]" style={{ opacity: 0 }}>
                What we understand
              <span className="ml-1 hidden font-sans text-white/35 sm:inline">/ 02</span>
            </div>

            <h2 className="mt-4 font-sans font-black leading-[0.98] text-white drop-shadow-[0_0_36px_rgba(75,194,194,0.16)] text-[2.25rem] sm:text-[2.5rem] md:mt-9 md:text-[clamp(2.7rem,5.6vw,5.4rem)]">
              <span className="who-word block">
                <span className="font-sans not-italic">Long </span>
                <span className="who-title-accent font-serif italic text-owl-teal inline-block pr-2">sales.</span>
              </span>
              <span className="who-word block">
                <span className="font-sans not-italic">Technical </span>
                <span className="who-title-accent font-serif italic text-owl-teal inline-block pr-2">buyers.</span>
              </span>
            </h2>

          </div>

          {/* where we work */}
          <div className="md:col-span-5 md:border-l md:border-white/10 md:pl-12 lg:pl-16">
            <div className="who-kicker" style={{ opacity: 0 }}>
              <span className="font-sans text-[0.76rem] font-black uppercase leading-none tracking-[0.2em] text-owl-teal drop-shadow-[0_0_18px_rgba(75,194,194,0.35)] md:text-[0.7rem] md:font-bold md:tracking-[0.26em] md:text-white/60 md:drop-shadow-none">
                Priority sectors
              </span>
            </div>

            {/* Mobile: auto-scrolling sector marquee (CSS loop, two duplicated sets) */}
            <div
              className="md:hidden mt-4 -mx-5 overflow-hidden"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
                maskImage:
                  "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
              }}
              aria-label="Priority sectors"
            >
              <div className="who-sector-track">
                {[...sectors, ...sectors].map((sector, i) =>
                  renderSectorChip(sector, i)
                )}
              </div>
            </div>

            {/* Desktop: quiet numbered sector ledger */}
            <div className="hidden md:mt-6 md:flex md:flex-col md:gap-0">
              {sectors.map((sector, i) => (
                <div
                  key={sector.label}
                  className="who-sector group flex items-baseline gap-5 border-b border-white/10 py-[1.15rem] transition-colors duration-300 first:border-t hover:border-owl-teal/35"
                  style={{ opacity: 0 }}
                >
                  <span className="font-sans text-[0.72rem] font-bold tabular-nums leading-none tracking-[0.08em] text-owl-teal/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-[1.05rem] font-black leading-none text-white/90 transition-colors duration-300 group-hover:text-white lg:text-[1.15rem]">
                    {sector.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM — buyer outcomes (full width) */}
        <div className="border-t border-white/10 pt-8 md:pt-9">
          <div className="who-copy mb-3 md:mb-7" style={{ opacity: 0 }}>
            <span className="font-sans text-[0.76rem] font-black uppercase leading-none tracking-[0.2em] text-owl-teal drop-shadow-[0_0_18px_rgba(75,194,194,0.35)] md:text-[0.7rem] md:font-bold md:tracking-[0.26em] md:text-white/60 md:drop-shadow-none">
              What this means for buyers
            </span>
          </div>
          {/* Mobile: three consolidated outcome pills, each with a one-line sentence */}
          <div className="flex flex-col gap-3 md:hidden">
            {mobileOutcomes.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="who-chip relative flex items-center gap-3.5 overflow-hidden rounded-xl border border-white/10 bg-white/[0.045] p-3.5 backdrop-blur-sm"
                  style={{ opacity: 0 }}
                >
                  <span className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-owl-teal/45" />
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-owl-teal/30 bg-owl-teal/12 text-owl-teal">
                    <Icon className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.9} />
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="font-sans text-[0.82rem] font-black uppercase leading-tight tracking-[0.03em] text-white">
                      {item.label}
                    </span>
                    <span className="font-body text-[0.78rem] leading-snug text-white/60">
                      {item.desc}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>

          {/* Desktop: three open outcome columns, hairline-divided, no card chrome */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-10 lg:gap-14">
            {differentiators.map((item) => (
              <div
                key={item.label}
                className="who-chip group min-w-0 border-l-2 border-owl-teal/40 pl-5 transition-colors duration-300 hover:border-owl-teal lg:pl-6"
                style={{ opacity: 0 }}
              >
                <span className="block font-sans text-[0.95rem] font-black uppercase leading-tight tracking-[0.04em] text-white lg:text-[1.05rem]">
                  {item.label}
                </span>
                <span className="mt-1.5 block max-w-[36ch] font-body text-[0.95rem] leading-snug text-white/75 lg:text-[1.05rem]">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkyrocketSlide;
