import { useEffect, useMemo, useRef, useState } from "react";
import { FlaskConical, GraduationCap, Pill, Warehouse, Zap, ArrowUpRight, Eye, Handshake, MessageSquareText, ShieldCheck, UsersRound, type LucideIcon } from "lucide-react";
import { animate, createSpring, stagger } from "animejs";
import Hyperspeed from "@/components/ui/Hyperspeed/Hyperspeed";
import { useIsMobile } from "@/hooks/use-mobile";

type Sector = { label: string; tag: string; icon: LucideIcon };

const sectors: Sector[] = [
  { label: "Chemicals", tag: "Specialty, process, materials", icon: FlaskConical },
  { label: "Industrial", tag: "Manufacturing, equipment, plants", icon: Warehouse },
  { label: "Pharma", tag: "Regulated, clinical, B2B", icon: Pill },
  { label: "Infrastructure", tag: "Power, mobility, built systems", icon: Zap },
  { label: "Institutions", tag: "Education, foundations, public trust", icon: GraduationCap },
];

type Differentiator = { icon: LucideIcon; label: string; desc: string };

const differentiators: Differentiator[] = [
  { icon: Eye, label: "Clear first look", desc: "Buyers understand what you do before the sales call starts." },
  { icon: Handshake, label: "Faster buy-in", desc: "Internal champions get language they can repeat upstairs." },
  { icon: MessageSquareText, label: "Less explaining", desc: "Technical details become simple without becoming shallow." },
  { icon: ShieldCheck, label: "Credible proof", desc: "Proof points reduce perceived risk for serious buyers." },
  { icon: UsersRound, label: "Sales alignment", desc: "Sales, marketing, and leadership tell the same story." },
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
      autoSpeedUp: isMobile ? 0.9 : 0,
      carLightsFade: 0.4,
      totalSideLightSticks: 20,
      lightPairsPerRoadWay: 40,
      shoulderLinesWidthPercentage: 0.05,
      brokenLinesWidthPercentage: 0.1,
      brokenLinesLengthPercentage: 0.5,
      lightStickWidth: [0.12, 0.5] as [number, number],
      lightStickHeight: [1.3, 1.7] as [number, number],
      movingAwaySpeed: (isMobile ? [82, 108] : [60, 80]) as [number, number],
      movingCloserSpeed: (isMobile ? [-165, -215] : [-120, -160]) as [number, number],
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
    }),
    [isMobile]
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);

          animate(el.querySelectorAll(".who-kicker"), {
            opacity: [0, 1],
            translateY: [16, 0],
            duration: 600,
            delay: stagger(120),
            ease: "out(3)",
          });

          animate(el.querySelectorAll(".who-rule"), {
            scaleX: [0, 1],
            duration: 800,
            delay: 200,
            ease: "out(3)",
          });

          animate(el.querySelectorAll(".who-word"), {
            opacity: [0, 1],
            translateY: [28, 0],
            delay: stagger(90, { start: 240 }),
            duration: 900,
            ease: createSpring({ stiffness: 95, damping: 12 }),
          });

          animate(el.querySelectorAll(".who-title-accent"), {
            translateX: [-24, 0],
            filter: ["blur(10px)", "blur(0px)"],
            duration: 900,
            delay: 460,
            ease: "out(4)",
          });

          animate(el.querySelectorAll(".who-copy"), {
            opacity: [0, 1],
            translateY: [22, 0],
            delay: stagger(110, { start: 520 }),
            duration: 760,
            ease: "out(3)",
          });

          animate(el.querySelectorAll(".who-chip"), {
            opacity: [0, 1],
            scale: [0.85, 1],
            delay: stagger(70, { start: 640 }),
            duration: 560,
            ease: createSpring({ stiffness: 130, damping: 14 }),
          });

          animate(el.querySelectorAll(".who-sector"), {
            opacity: [0, 1],
            translateX: [40, 0],
            delay: stagger(90, { start: 560 }),
            duration: 760,
            ease: "out(4)",
          });
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <section ref={sectionRef} className="slide relative overflow-hidden bg-background p-3 sm:p-5 md:p-7">
      <div className="absolute inset-0 z-0 pointer-events-none translate-x-[3%] opacity-70 md:translate-x-0">
        <Hyperspeed effectOptions={hyperspeedOptions} />
      </div>
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_30%,rgba(75,194,194,0.16),transparent_46%),linear-gradient(180deg,hsl(214_30%_5%/0.86),hsl(214_30%_6%/0.62)_50%,hsl(214_30%_5%/0.9))]" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1640px] flex-col justify-center gap-6 px-5 py-6 sm:px-10 md:justify-center md:gap-12 md:px-[4.5%] md:py-[4.4%]">
        {/* TOP — the message (left) + where we work (right) */}
        <div className="grid gap-5 md:grid-cols-12 md:items-start md:gap-14 lg:gap-20">
          {/* message */}
          <div className="md:col-span-7">
            <div className="who-kicker font-sans text-[0.76rem] font-black uppercase leading-none tracking-[0.2em] text-owl-teal drop-shadow-[0_0_18px_rgba(75,194,194,0.35)] md:text-xs md:tracking-[0.26em]" style={{ opacity: 0 }}>
                What we understand
              <span className="ml-1 hidden font-sans text-white/35 sm:inline">/ 02</span>
            </div>

            <h2 className="mt-3 font-sans font-black leading-[0.98] text-white drop-shadow-[0_0_36px_rgba(75,194,194,0.16)] text-[2.25rem] sm:text-[2.5rem] md:mt-9 md:text-[clamp(2.7rem,5.6vw,5.4rem)]">
              <span className="who-word block">
                <span className="font-sans not-italic">Long </span>
                <span className="who-title-accent font-serif italic text-owl-teal inline-block pr-2">sales.</span>
              </span>
              <span className="who-word block">
                <span className="font-sans not-italic">Technical </span>
                <span className="who-title-accent font-serif italic text-owl-teal inline-block pr-2">buyers.</span>
              </span>
            </h2>

            <p className="who-copy mt-2 hidden max-w-[520px] font-body leading-[1.5] text-white/70 text-sm sm:block md:mt-9 md:text-[clamp(1rem,1.15vw,1.3rem)]" style={{ opacity: 0 }}>
              We turn dense product truth into market-facing clarity for teams selling into plants, labs, factories, institutions, and procurement rooms.
            </p>
          </div>

          {/* where we work */}
          <div className="md:col-span-5 md:border-l md:border-white/10 md:pl-12 lg:pl-16">
            <div className="who-kicker" style={{ opacity: 0 }}>
              <span className="font-sans text-[0.76rem] font-black uppercase leading-none tracking-[0.2em] text-owl-teal drop-shadow-[0_0_18px_rgba(75,194,194,0.35)] md:text-xs md:tracking-[0.26em]">
                Priority sectors
              </span>
            </div>

            {/* Mobile: auto-scrolling sector marquee (CSS loop, two duplicated sets) */}
            <div
              className="md:hidden mt-4 -mx-5 overflow-hidden"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)",
                maskImage:
                  "linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)",
              }}
              aria-label="Priority sectors"
            >
              <div className="who-sector-track">
                {[...sectors, ...sectors].map((sector, i) =>
                  renderSectorChip(sector, i)
                )}
              </div>
            </div>

            {/* Desktop: vertical sector list (unchanged) */}
            <div className="hidden md:mt-6 md:flex md:flex-col md:gap-0">
              {sectors.map((sector) => {
                const Icon = sector.icon;
                return (
                  <div
                    key={sector.label}
                    className="who-sector group flex shrink-0 items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2.5 transition-colors duration-300 hover:border-owl-teal/40 md:shrink md:gap-4 md:rounded-none md:border-x-0 md:border-b md:bg-transparent md:px-0 md:py-4 md:first:border-t"
                    style={{ opacity: 0 }}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-owl-teal/10 text-owl-teal transition-colors duration-300 group-hover:bg-owl-teal/20 md:h-11 md:w-11">
                      <Icon className="h-[1rem] w-[1rem] md:h-[1.2rem] md:w-[1.2rem]" strokeWidth={1.8} />
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="font-sans text-[0.86rem] font-black leading-tight text-white md:text-base">
                        {sector.label}
                      </span>
                      <span className="hidden font-body text-xs leading-tight text-white/45 md:block md:text-[0.8rem]">
                        {sector.tag}
                      </span>
                    </span>
                    <ArrowUpRight className="ml-auto hidden h-4 w-4 shrink-0 -translate-x-1 text-white/0 transition-colors duration-300 group-hover:translate-x-0 group-hover:text-owl-teal md:block" strokeWidth={2} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOTTOM — buyer outcomes (full width) */}
        <div className="border-t border-white/10 pt-5 md:pt-9">
          <div className="who-copy mb-3 md:mb-6" style={{ opacity: 0 }}>
            <span className="font-sans text-[0.76rem] font-black uppercase leading-none tracking-[0.2em] text-owl-teal drop-shadow-[0_0_18px_rgba(75,194,194,0.35)] md:text-xs md:tracking-[0.26em]">
              What this means for buyers
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-5 md:gap-4 lg:gap-6">
            {differentiators.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="who-chip group relative flex min-w-0 items-center gap-3 overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-owl-teal/45 hover:bg-owl-teal/[0.06] hover:shadow-[0_10px_30px_rgba(75,194,194,0.16)] last:col-span-2 md:last:col-span-1 md:items-start md:gap-3 md:p-4 lg:gap-4 lg:p-5"
                  style={{ opacity: 0 }}
                >
                  <span className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-owl-teal/0 transition-colors duration-300 group-hover:bg-owl-teal" />
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-owl-teal/30 bg-owl-teal/12 text-owl-teal transition-colors duration-300 group-hover:bg-owl-teal/20 md:h-10 md:w-10 lg:h-11 lg:w-11">
                    <Icon className="h-[1rem] w-[1rem] md:h-[1.15rem] md:w-[1.15rem] lg:h-[1.25rem] lg:w-[1.25rem]" strokeWidth={1.9} />
                  </span>
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="font-sans text-[0.78rem] font-black uppercase leading-tight tracking-[0.04em] text-white md:text-[0.82rem] lg:text-[0.95rem]">
                      {item.label}
                    </span>
                    <span className="hidden font-body text-xs leading-snug text-white/55 md:block lg:text-sm">
                      {item.desc}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkyrocketSlide;
