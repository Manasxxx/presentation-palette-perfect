import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import {
  Search,
  Star,
  Film,
  Presentation,
  FileText,
  Globe,
  PenTool,
  Database,
  CalendarDays,
  Megaphone,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import LightRays from "@/components/LightRays";
import { brandMarks } from "@/components/ui/brand-marks";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLowPowerMode } from "@/hooks/use-low-power";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { animateSlideAccent, animateSlideHeading, getSharedSlideMotionProfile, slideEditorialEase } from "./slide-motion";

// Five outcome-led pillar cards (D2, Session 43); shared by both platforms since
// Session 45 (mobile got the same cards in a compact vertical stack).
// One pillar per card: "Be [outcome]" + one concrete sentence + three deliverable tags.
type PillarService = {
  outcome: string;
  description: string;
  tags: string[];
};

// Mobile-only: small icons for the deliverable tags that have no official
// brand mark in brand-marks.tsx (those keep their marks).
const tagIcons: Record<string, LucideIcon> = {
  SEO: Search,
  Reviews: Star,
  Videos: Film,
  Decks: Presentation,
  Whitepapers: FileText,
  Web: Globe,
  UX: PenTool,
  CRM: Database,
  Events: CalendarDays,
  PR: Megaphone,
  Launches: Rocket,
};

const pillarServices: PillarService[] = [
  {
    outcome: "Found",
    description: "Show up when buyers search, in Google and in AI answers.",
    tags: ["SEO", "AI Search", "Reviews"],
  },
  {
    outcome: "Seen",
    description: "Ads that put you in front of the right buyers.",
    tags: ["Meta", "Google", "LinkedIn"],
  },
  {
    outcome: "Understood",
    description: "Words, films, and decks buyers actually get.",
    tags: ["Videos", "Decks", "Whitepapers"],
  },
  {
    outcome: "Trusted",
    description: "A site that holds up when buyers check you out.",
    tags: ["Web", "UX", "CRM"],
  },
  {
    outcome: "Known",
    description: "Presence where your industry gathers.",
    tags: ["Events", "PR", "Launches"],
  },
];

const ServicesSlide = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggered = useRef(false);
  const isMobile = useIsMobile();
  const lowPower = useLowPowerMode();
  const prefersReducedMotion = usePrefersReducedMotion();
  // Mobile accordion: one pillar expanded, the rest compressed to a title row.
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileEntryReady, setMobileEntryReady] = useState(false);

  // Mobile: auto-advance the expanded pillar every 3.5s (re-armed on each change,
  // so a manual tap resets the cycle). Paused under reduced motion.
  useEffect(() => {
    if (!isMobile || prefersReducedMotion || !mobileEntryReady) return;
    const id = window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % pillarServices.length);
    }, 3500);
    return () => window.clearTimeout(id);
  }, [isMobile, prefersReducedMotion, mobileEntryReady, activeIndex]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const header = el.querySelector(".sv-header") as HTMLElement | null;
    const tabs = el.querySelector(".sv-tabs") as HTMLElement | null;
    if (!header || !tabs) return;

    if (!triggered.current) {
      header.style.opacity = "0";
      header.style.transform = "translateY(30px)";
      tabs.style.opacity = "0";
      tabs.style.transform = "translateY(20px)";
    }

    const reveal = () => {
      if (triggered.current) return;
      triggered.current = true;
      const profile = getSharedSlideMotionProfile(isMobile);
      animateSlideHeading(el, ".sv-header", isMobile);
      animateSlideAccent(el, ".sv-title-accent", isMobile);
      animate(tabs, {
        opacity: 1,
        translateY: 0,
        delay: profile.contentDelay,
        duration: 600,
        ease: slideEditorialEase,
      });
      animate(el.querySelectorAll(".sv-tab"), {
        opacity: [0, 1],
        translateY: [10, 0],
        filter: ["blur(5px)", "blur(0px)"],
        delay: stagger(profile.itemStagger + 18, { start: profile.contentDelay + 80 }),
        duration: isMobile ? 760 : 640,
        ease: slideEditorialEase,
      });
      if (isMobile) {
        window.setTimeout(() => setMobileEntryReady(true), profile.contentDelay + 980);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    const fallback = isMobile ? 0 : window.setTimeout(reveal, 600);
    return () => {
      observer.disconnect();
      if (fallback) window.clearTimeout(fallback);
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="slide font-sans">
      {/* Heavy WebGL rays — desktop only (gated off mobile per prod.md).
          Low-power machines drop the DPR cap to 0.75 (FPS watchdog) so the
          same rays render fewer fragments. */}
      {!isMobile && (
        <LightRays
          raysColor="#4bc2c2"
          raysOrigin="top-center"
          raysSpeed={0.8}
          lightSpread={0.5}
          rayLength={3}
          fadeDistance={1}
          saturation={0.8}
          followMouse={false}
          className="opacity-40 pointer-events-none"
          maxDpr={lowPower ? 0.75 : 1.25}
        />
      )}
      {/* Desktop paddings are svh clamps: identical on tall viewports, compress
          on short ones so the five ledger rows never clip (Session 42). */}
      <div className="relative z-10 flex h-full w-full flex-col px-8 pt-[5.25rem] pb-6 md:px-12 md:pt-[clamp(2.75rem,8svh,5rem)] md:pb-[clamp(1.25rem,4svh,2.5rem)]">
        <header className="sv-header text-left self-start">
          <span className="mb-3 block font-sans text-[0.76rem] font-black uppercase leading-none tracking-[0.2em] text-owl-teal drop-shadow-[0_0_18px_rgba(75,194,194,0.35)] md:mb-[clamp(0.4rem,1.2svh,0.75rem)] md:text-xs md:tracking-[0.26em]">
            OUR SERVICES
          </span>
          <h2 className="font-sans text-[2rem] sm:text-[2.6rem] md:text-[min(clamp(3rem,4.8vw,5.2rem),10svh)] font-black uppercase leading-[1.02] tracking-normal text-white text-left pb-2 [overflow-wrap:anywhere]">
            <span className="font-sans not-italic">WHAT WE </span>
            <span className="sv-title-accent font-sans not-italic text-primary inline-block pr-2">
              DO
            </span>
          </h2>
          <p className="mt-2.5 max-w-[45rem] font-body text-sm leading-snug text-white/65 md:mt-[clamp(0.4rem,1.2svh,0.75rem)] md:text-[min(1.25rem,3svh)]">
            Five things we do to help you sell more.{" "}
            <span className="font-serif italic text-primary">That&rsquo;s it.</span>
          </p>
        </header>

        <div className="mt-5 flex w-full flex-1 flex-col grid-cols-12 items-start gap-5 md:mt-[clamp(0.5rem,2svh,1.5rem)] md:grid md:flex-initial md:gap-10">
          {isMobile ? (
            /* Mobile (Session 45): the desktop pillar cards as an auto-advancing
               accordion. One card expanded (full description + tags, roomy),
               the rest compressed to a "GET [OUTCOME]" title row. Tap to expand;
               collapse animates via the grid-template-rows 0fr→1fr trick. */
            <div className="sv-tabs col-span-12 flex w-full flex-1 flex-col justify-center gap-[clamp(0.5rem,1.4svh,0.85rem)] pb-[2vh]">
              {pillarServices.map((svc, index) => {
                const active = index === activeIndex;
                return (
                  <article
                    key={svc.outcome}
                    onClick={() => setActiveIndex(index)}
                    aria-expanded={active}
                    className={`sv-tab flex flex-col rounded-xl border backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-[border-color,background-color,padding] duration-500 [transition-timing-function:cubic-bezier(0.18,0.82,0.18,1)] ${
                      active
                        ? "border-primary/35 bg-primary/[0.07] px-4 py-[1.1rem] shadow-[0_0_24px_rgba(75,194,194,0.12),inset_0_1px_0_rgba(255,255,255,0.06)]"
                        : "border-white/10 bg-white/[0.04] px-4 py-2.5"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="flex items-center gap-2 font-sans font-black uppercase tracking-tight">
                        <span className={`text-[1.1rem] leading-none transition-colors duration-500 ${active ? "text-white/55" : "text-white/35"}`}>
                          Get
                        </span>
                        <span
                          className={`text-[1.1rem] leading-none transition-colors duration-500 ${
                            active
                              ? "text-primary drop-shadow-[0_0_14px_rgba(75,194,194,0.25)]"
                              : "text-white/60"
                          }`}
                        >
                          {svc.outcome}
                        </span>
                      </h3>
                      <span
                        aria-hidden="true"
                        className={`font-sans text-[0.7rem] font-bold tabular-nums tracking-[0.08em] transition-colors duration-500 ${
                          active ? "text-primary/70" : "text-white/30"
                        }`}
                      >
                        0{index + 1}
                      </span>
                    </div>
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-500 [transition-timing-function:cubic-bezier(0.18,0.82,0.18,1)] ${
                        active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <p className="mt-3 font-body text-[0.85rem] leading-relaxed text-white/75">
                          {svc.description}
                        </p>
                        <ul className="mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-white/10 pt-3">
                          {svc.tags.map((tag) => {
                            const Mark = brandMarks[tag];
                            const TagIcon = tagIcons[tag];
                            return (
                              <li
                                key={tag}
                                className="flex items-center gap-1.5 font-sans text-[0.62rem] font-bold uppercase tracking-[0.12em] text-primary/80"
                              >
                                {Mark ? (
                                  <Mark className={tag === "AI Search" ? "shrink-0" : "h-3 w-3 shrink-0"} />
                                ) : TagIcon ? (
                                  <TagIcon aria-hidden="true" className="h-3 w-3 shrink-0" />
                                ) : null}
                                {tag}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <>
              {/* Hallmark · redesign v3 (D2): five outcome-led pillar glass cards · theme: OwlSurf (locked brand)
                  One pillar per card, all depth visible: ordinal, "BE [OUTCOME]" verb pair,
                  one plain sentence, hairline rule, three small-caps deliverable tags.
                  Reads in one pass as: found · seen · understood · trusted · known.
                  No HoverCard, no hidden depth. Glass per brand: translucent fill +
                  backdrop blur + hairline border, teal lift on hover. */}
              <div className="sv-tabs col-span-12 grid flex-1 grid-cols-6 content-center gap-[clamp(1rem,1.8vw,1.75rem)]">
                {pillarServices.map((svc, index) => (
                  <article
                    key={svc.outcome}
                    className={`sv-tab group flex min-h-[min(11.5rem,26svh)] gap-[clamp(1.25rem,2vw,2.25rem)] rounded-xl border border-white/10 bg-white/[0.04] p-[clamp(1.1rem,1.6vw,1.75rem)] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_4px_24px_rgba(75,194,194,0.18),inset_0_1px_0_rgba(255,255,255,0.06)] ${
                      index < 3 ? "col-span-2" : "col-span-3"
                    }`}
                  >
                    <div className="flex shrink-0 flex-col">
                      <h3 className="font-sans font-black uppercase leading-[1.05] tracking-tight">
                        <span className="block text-[min(0.95rem,2.3svh)] text-white/55">Be</span>
                        <span className="block text-[min(1.5rem,3.5svh)] text-primary drop-shadow-[0_0_14px_rgba(75,194,194,0.25)] xl:text-[min(1.75rem,3.8svh)]">
                          {svc.outcome}
                        </span>
                      </h3>
                      <span
                        aria-hidden="true"
                        className="mt-auto font-sans text-sm font-bold tabular-nums tracking-[0.08em] text-white/40 transition-colors duration-300 group-hover:text-primary/70"
                      >
                        0{index + 1}
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="font-body text-[min(0.95rem,2.5svh)] leading-snug text-white/70 transition-colors duration-300 group-hover:text-white/90">
                        {svc.description}
                      </p>
                      <ul className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/10 pt-[clamp(0.6rem,1.6svh,0.9rem)]">
                        {svc.tags.map((tag) => {
                          const Mark = brandMarks[tag];
                          return (
                            <li
                              key={tag}
                              className="flex items-center gap-1.5 font-sans text-[0.66rem] font-bold uppercase tracking-[0.14em] text-primary/75 transition-colors duration-300 group-hover:text-primary"
                            >
                              {Mark && (
                                <Mark className={tag === "AI Search" ? "shrink-0" : "h-3.5 w-3.5 shrink-0"} />
                              )}
                              {tag}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSlide;
