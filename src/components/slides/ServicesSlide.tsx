import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { animate, stagger } from "animejs";
import {
  Target,
  Film,
  Users,
  Cpu,
  MessageSquare,
  Search,
  TrendingUp,
  BarChart2,
  PenTool,
  Mic,
  FileText,
  Megaphone,
  Building2,
  ShieldCheck,
  Activity,
  Database,
  Workflow,
  Globe,
  Sparkles,
  BrainCircuit,
  Bot,
  Wand2,
  Zap,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import LightRays from "@/components/LightRays";
import { brandMarks } from "@/components/ui/brand-marks";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { animateSlideAccent, animateSlideHeading, getSharedSlideMotionProfile, slideEditorialEase, slideSettleEase } from "./slide-motion";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type Category = {
  key: string;
  label: string;
  icon: LucideIcon;
  services: Service[];
};

// Desktop-only: five outcome-led pillar cards, all visible at once (D2, Session 43).
// One pillar per card: "Be [outcome]" + one concrete sentence + three deliverable tags.
type DesktopService = {
  outcome: string;
  description: string;
  tags: string[];
};

const desktopServices: DesktopService[] = [
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

const categories: Category[] = [
  {
    key: "content",
    label: "Technical Story",
    icon: PenTool,
    services: [
      {
        icon: Target,
        title: "Technical Positioning",
        description:
          "Turn specs and expertise into a story buyers actually get.",
      },
      {
        icon: Film,
        title: "Explainer Films",
        description:
          "Plant, product, and process films that make the value obvious.",
      },
      {
        icon: PenTool,
        title: "Sales Collateral",
        description:
          "Decks, brochures, and booth material your sales team can use.",
      },
      {
        icon: FileText,
        title: "Whitepapers",
        description:
          "In-depth docs for buyers who want proof before they trust you.",
      },
      {
        icon: Sparkles,
        title: "Executive POV",
        description:
          "Bylines, talks, and expert notes that make your leaders credible.",
      },
    ],
  },
  {
    key: "reach",
    label: "Demand Capture",
    icon: Megaphone,
    services: [
      {
        icon: TrendingUp,
        title: "Paid Ads",
        description:
          "LinkedIn, Google, and programmatic ads measured on real interest, not clicks.",
      },
      {
        icon: Target,
        title: "Account-Based Marketing (ABM)",
        description:
          "Focused campaigns aimed at your priority accounts and partners.",
      },
      {
        icon: Users,
        title: "Creator & Influencer Network",
        description:
          "Trusted voices in your category, used carefully.",
      },
      {
        icon: Megaphone,
        title: "PR & Media Relations",
        description:
          "Trade press, analyst notes, and coverage that backs up sales.",
      },
      {
        icon: Building2,
        title: "Events & Trade Shows",
        description:
          "Booth story, lead capture, and follow-up for every show.",
      },
    ],
  },
  {
    key: "discovery",
    label: "Search & Trust",
    icon: Search,
    services: [
      {
        icon: Search,
        title: "SEO",
        description:
          "Get found when buyers search by problem, product, or category.",
      },
      {
        icon: MessageSquare,
        title: "Social Listening",
        description:
          "Know what buyers, rivals, and the market are already saying.",
      },
      {
        icon: ShieldCheck,
        title: "Reputation Management",
        description:
          "Shape how your brand shows up in search, press, and buyer checks.",
      },
      {
        icon: Activity,
        title: "Competitive Intelligence",
        description:
          "Spot rival launches, hiring, and pricing moves early.",
      },
      {
        icon: Mic,
        title: "Community Management",
        description:
          "A steady presence where your buyers already spend time.",
      },
    ],
  },
  {
    key: "engineering",
    label: "Sales Stack",
    icon: Database,
    services: [
      {
        icon: Workflow,
        title: "Marketing Automation",
        description:
          "HubSpot, Marketo, and Pardot flows built for long buying cycles.",
      },
      {
        icon: Database,
        title: "CRM Integration",
        description:
          "Salesforce and HubSpot set up so everyone sees the same buyer.",
      },
      {
        icon: BarChart2,
        title: "Analytics & Attribution",
        description:
          "See which channels drive real pipeline, not just clicks.",
      },
      {
        icon: Cpu,
        title: "Lead Scoring",
        description:
          "Rank leads by fit, intent, and readiness to buy.",
      },
      {
        icon: Globe,
        title: "Custom Microsites",
        description:
          "Account, campaign, and product pages built for serious buyers.",
      },
    ],
  },
  {
    key: "ai",
    label: "AI Workflow",
    icon: BrainCircuit,
    services: [
      {
        icon: Wand2,
        title: "AI Content Engine",
        description:
          "Faster first drafts for blogs, emails, and sales notes.",
      },
      {
        icon: Bot,
        title: "Marketing Assistants",
        description:
          "AI assistants trained on your sales, support, and marketing context.",
      },
      {
        icon: Sparkles,
        title: "AI Personalization",
        description:
          "Pages that adapt to the account, intent, and buying stage.",
      },
      {
        icon: Lightbulb,
        title: "AI Search Optimization",
        description:
          "Make your expertise show up in AI answers and search results.",
      },
      {
        icon: Zap,
        title: "Workflow Automation",
        description:
          "Automate research, qualifying, and reporting while keeping human judgment.",
      },
    ],
  },
];

// Mobile-only: each category collapsed to three headline groups so the stepper stays
// light on phones. The desktop ledger keeps the full five services + descriptions.
const mobileServices: Record<string, { icon: LucideIcon; title: string }[]> = {
  content: [
    { icon: Target, title: "Positioning & Story" },
    { icon: Film, title: "Films & Sales Assets" },
    { icon: Sparkles, title: "Thought Leadership" },
  ],
  reach: [
    { icon: TrendingUp, title: "Paid & ABM" },
    { icon: Megaphone, title: "PR & Influencers" },
    { icon: Building2, title: "Events & Trade Shows" },
  ],
  discovery: [
    { icon: Search, title: "SEO & Discovery" },
    { icon: MessageSquare, title: "Social & Community" },
    { icon: ShieldCheck, title: "Reputation & Insights" },
  ],
  engineering: [
    { icon: Database, title: "Automation & CRM" },
    { icon: BarChart2, title: "Analytics & Scoring" },
    { icon: Globe, title: "Custom Microsites" },
  ],
  ai: [
    { icon: Bot, title: "AI Content & Assistants" },
    { icon: Sparkles, title: "AI Personalization" },
    { icon: Zap, title: "AI Search & Automation" },
  ],
};

const ServicesSlide = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggered = useRef(false);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const lastMobilePanelKeyRef = useRef<string | null>(null);
  const activeKeyRef = useRef<string>(categories[0].key);
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeKey, setActiveKey] = useState<string>(categories[0].key);
  const [mobileEntryReady, setMobileEntryReady] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeCategory =
    categories.find((c) => c.key === activeKey) ?? categories[0];

  useEffect(() => {
    activeKeyRef.current = activeKey;
  }, [activeKey]);

  // Roving-focus keyboard support for the vertical tablist (WAI-ARIA tabs pattern).
  const handleTabKey = (event: ReactKeyboardEvent, index: number) => {
    const lastIndex = categories.length - 1;
    let nextIndex: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = index === lastIndex ? 0 : index + 1;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = index === 0 ? lastIndex : index - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = lastIndex;

    if (nextIndex === null) return;
    event.preventDefault();
    setActiveKey(categories[nextIndex].key);
    tabRefs.current[nextIndex]?.focus();
  };

  const animateMobilePanel = useCallback((start = 0) => {
    const panel = mobilePanelRef.current;
    if (!panel) return;

    const meta = panel.querySelector(".sv-mobile-panel-meta");
    const steps = panel.querySelectorAll(".sv-step-in");
    if (prefersReducedMotion) {
      if (meta instanceof HTMLElement) meta.style.opacity = "1";
      steps.forEach((step) => {
        if (step instanceof HTMLElement) {
          step.style.opacity = "1";
          step.style.transform = "none";
          step.style.filter = "none";
        }
      });
      lastMobilePanelKeyRef.current = activeKeyRef.current;
      return;
    }

    const profile = getSharedSlideMotionProfile(true);
    if (meta) {
      animate(meta, {
        opacity: [0, 1],
        translateY: [-14, 0],
        filter: ["blur(10px)", "blur(0px)"],
        duration: 560,
        delay: start,
        ease: slideEditorialEase,
      });
    }
    if (steps.length) {
      animate(steps, {
        opacity: [0, 1],
        translateY: [18, 0],
        scale: [0.985, 1],
        filter: ["blur(12px)", "blur(0px)"],
        delay: stagger(profile.itemStagger, { start: start + 110 }),
        duration: 720,
        ease: slideSettleEase,
      });
    }
    lastMobilePanelKeyRef.current = activeKeyRef.current;
  }, [prefersReducedMotion]);

  // Mobile: auto-advance the highlighted category every 3.5s (re-armed on each change,
  // so a manual tap resets the cycle). Paused under reduced-motion.
  useEffect(() => {
    if (!isMobile || prefersReducedMotion || !mobileEntryReady) return;
    const id = window.setTimeout(() => {
      setActiveKey((prev) => {
        const idx = categories.findIndex((c) => c.key === prev);
        return categories[(idx + 1) % categories.length].key;
      });
    }, 3500);
    return () => window.clearTimeout(id);
  }, [isMobile, prefersReducedMotion, activeKey, mobileEntryReady]);

  useEffect(() => {
    if (!isMobile || !mobileEntryReady || lastMobilePanelKeyRef.current === activeKey) return;
    animateMobilePanel();
  }, [activeKey, animateMobilePanel, isMobile, mobileEntryReady]);

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
        animateMobilePanel(profile.contentDelay + 220);
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
  }, [animateMobilePanel, isMobile, prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="slide font-sans">
      {/* Heavy WebGL rays — desktop only (gated off mobile per prod.md) */}
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
        />
      )}
      {/* Desktop paddings are svh clamps: identical on tall viewports, compress
          on short ones so the five ledger rows never clip (Session 42). */}
      <div className="relative z-10 flex h-full w-full flex-col px-8 pt-16 pb-6 md:px-12 md:pt-[clamp(2.75rem,8svh,5rem)] md:pb-[clamp(1.25rem,4svh,2.5rem)]">
        <header className="sv-header text-left self-start">
          <span className="mb-3 block font-sans text-[0.76rem] font-black uppercase leading-none tracking-[0.2em] text-owl-teal drop-shadow-[0_0_18px_rgba(75,194,194,0.35)] md:mb-[clamp(0.4rem,1.2svh,0.75rem)] md:text-xs md:tracking-[0.26em]">
            {isMobile ? "WHAT WE BUILD" : "OUR SERVICES"}
          </span>
          <h2 className="font-sans text-[2rem] sm:text-[2.6rem] md:text-[min(clamp(3rem,4.8vw,5.2rem),10svh)] font-black uppercase leading-[1.02] tracking-normal text-white text-left pb-2 [overflow-wrap:anywhere]">
            {isMobile ? (
              <>
                <span className="font-sans not-italic">BUYER </span>
                <span className="sv-title-accent font-sans not-italic text-primary inline-block pr-2">
                  SYSTEMS
                </span>
              </>
            ) : (
              <>
                <span className="font-sans not-italic">WHAT WE </span>
                <span className="sv-title-accent font-sans not-italic text-primary inline-block pr-2">
                  DO
                </span>
              </>
            )}
          </h2>
          {isMobile ? (
            <p className="mt-2.5 max-w-[45rem] font-body text-sm leading-snug text-white/58">
              Five systems that make a complex product easy to buy.
            </p>
          ) : (
            <p className="mt-3 max-w-[45rem] font-body text-lg leading-snug text-white/65 md:mt-[clamp(0.4rem,1.2svh,0.75rem)] md:text-[min(1.25rem,3svh)]">
              Five things we do to help you sell more.{" "}
              <span className="font-serif italic text-primary">That&rsquo;s it.</span>
            </p>
          )}
        </header>

        <div className="mt-5 flex w-full flex-1 flex-col grid-cols-12 items-start gap-5 md:mt-[clamp(0.5rem,2svh,1.5rem)] md:grid md:flex-initial md:gap-10">
          {isMobile ? (
            <div className="col-span-12 flex h-full flex-col justify-center gap-6 pb-[6vh]">
              <div className="flex flex-col gap-2.5">
              {/* Mobile: all five categories as a larger two-row segmented bar (3 + centered 2) */}
              <div
                className="sv-tabs grid grid-cols-6 gap-2"
                role="tablist"
                aria-label="Service categories"
              >
                {categories.map((cat, index) => {
                  const active = cat.key === activeKey;
                  const CatIcon = cat.icon;
                  return (
                    <button
                      key={cat.key}
                      type="button"
                      role="tab"
                      id={`sv-mtab-${cat.key}`}
                      aria-selected={active}
                      aria-controls="sv-mpanel"
                      tabIndex={active ? 0 : -1}
                      ref={(el) => { tabRefs.current[index] = el; }}
                      onClick={() => setActiveKey(cat.key)}
                      onKeyDown={(event) => handleTabKey(event, index)}
                      data-native-slide-motion
                      className={`sv-tab col-span-2 flex flex-col items-center gap-2 rounded-2xl border px-1.5 py-4 transition-[border-color,background-color,color,box-shadow] duration-700 [transition-timing-function:cubic-bezier(0.18,0.82,0.18,1)] ${
                        index === 3 ? "col-start-2" : ""
                      } ${
                        active
                          ? "border-primary/60 bg-primary/10 shadow-[0_0_22px_rgba(75,194,194,0.12)]"
                          : "border-border/40 bg-white/[0.02]"
                      }`}
                    >
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-xl transition-[background-color,color,box-shadow] duration-700 [transition-timing-function:cubic-bezier(0.18,0.82,0.18,1)] ${
                          active ? "bg-primary/25 text-primary" : "bg-white/5 text-muted-foreground"
                        }`}
                      >
                        <CatIcon className="h-[22px] w-[22px]" />
                      </span>
                      <span
                        className={`text-center font-sans text-[0.62rem] font-black uppercase leading-[1.1] tracking-tight transition-colors duration-700 [transition-timing-function:cubic-bezier(0.18,0.82,0.18,1)] ${
                          active ? "text-white" : "text-foreground/55"
                        }`}
                      >
                        {cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              </div>

              {/* Mobile: active category as a connected, low-text build sequence (titles only) */}
              <div ref={mobilePanelRef} className="flex flex-col gap-4">
                <div key={`sv-panel-meta-${activeKey}`} className="sv-mobile-panel-meta flex items-baseline justify-between gap-3 border-b border-white/10 pb-2" style={{ opacity: 0 }}>
                  <span className="font-sans text-[0.72rem] font-black uppercase tracking-[0.2em] text-primary">
                    Inside {activeCategory.label}
                  </span>
                </div>
              <ol
                className="sv-card-stage relative flex flex-col gap-6 pl-1"
                role="tabpanel"
                id="sv-mpanel"
                aria-labelledby={`sv-mtab-${activeKey}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-[25px] top-5 bottom-5 w-px bg-gradient-to-b from-primary/45 via-primary/20 to-transparent"
                />
                {(mobileServices[activeKey] ?? activeCategory.services).map((svc, i) => {
                  const Icon = svc.icon;
                  return (
                    <li
                      key={`${activeKey}-${svc.title}`}
                      className="sv-step-in relative flex items-center gap-4"
                      style={{ opacity: 0 }}
                    >
                      <span className="relative z-10 flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border border-primary/40 bg-background text-primary shadow-[0_0_0_4px_hsl(var(--background))]">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <span className="font-sans text-[1.05rem] font-black uppercase leading-tight tracking-tight text-white">
                        {svc.title}
                      </span>
                    </li>
                  );
                })}
              </ol>
              </div>
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
                {desktopServices.map((svc, index) => (
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
