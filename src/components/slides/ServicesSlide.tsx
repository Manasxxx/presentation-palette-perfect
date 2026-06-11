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
import { Separator } from "@/components/ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
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

// Desktop-only: the whole offer as five plain-language cards, all visible at once.
// Verb-led titles + one concrete sentence + deliverable chips — no jargon.
type DesktopService = {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
};

const desktopServices: DesktopService[] = [
  {
    icon: PenTool,
    title: "Tell Your Story",
    description:
      "We turn your product into clear words, videos, and sales decks buyers actually get.",
    tags: ["Videos", "Sales decks", "Whitepapers"],
  },
  {
    icon: Megaphone,
    title: "Get You Seen",
    description:
      "Ads, PR, and trade shows that put you in front of the right buyers.",
    tags: ["Paid ads", "PR", "Events"],
  },
  {
    icon: Search,
    title: "Get You Found",
    description:
      "Show up when buyers search — and look trustworthy when they check you out.",
    tags: ["SEO", "Reviews", "Reputation"],
  },
  {
    icon: Database,
    title: "Track Your Buyers",
    description:
      "One clean system that shows which leads are real and where they came from.",
    tags: ["CRM", "Automation", "Analytics"],
  },
  {
    icon: Bot,
    title: "Put AI to Work",
    description:
      "AI tools that draft content, answer questions, and save your team hours every week.",
    tags: ["AI content", "Assistants", "Workflows"],
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
            <p className="mt-3 max-w-[45rem] font-serif text-lg italic leading-snug text-white/65 md:mt-[clamp(0.4rem,1.2svh,0.75rem)] md:text-[min(1.25rem,3svh)]">
              Five things we do to help you sell more.{" "}
              <span className="text-primary">That&rsquo;s it.</span>
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
              {/* Hallmark · redesign v2: editorial ledger, scan-first · theme: OwlSurf (locked brand)
                  Each row reads left→right in one pass: ordinal anchor (01–05, genuinely
                  ordinal — "Five things"), title column, one bright plain sentence,
                  small-caps deliverables right. Quiet row hover tint + visible "+5" depth
                  cue replace the invisible HoverCard affordance. No icon boxes, no cards. */}
              <div className="sv-tabs col-span-12 flex flex-1 flex-col justify-center">
                {desktopServices.map((svc, index) => {
                  const detail = categories[index];
                  return (
                    <div key={svc.title} className="contents">
                      {index > 0 && <Separator className="bg-white/[0.07]" />}
                      <HoverCard openDelay={150} closeDelay={80}>
                        <HoverCardTrigger asChild>
                          <article
                            tabIndex={0}
                            className="sv-tab group -mx-4 grid cursor-default grid-cols-[2.75rem_minmax(0,23rem)_minmax(0,1fr)_auto] items-baseline gap-x-8 rounded-lg px-4 py-[clamp(0.5rem,1.8svh,1.5rem)] transition-colors duration-300 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 xl:py-[clamp(0.6rem,2svh,1.75rem)]"
                          >
                            <span
                              aria-hidden="true"
                              className="font-sans text-sm font-bold tabular-nums tracking-[0.08em] text-primary/45 transition-colors duration-300 group-hover:text-primary"
                            >
                              0{index + 1}
                            </span>
                            <h3 className="font-sans text-[min(1.5rem,3.8svh)] font-black uppercase tracking-tight text-white transition-colors duration-300 group-hover:text-primary xl:text-[min(1.875rem,4svh)]">
                              {svc.title}
                            </h3>
                            <p className="max-w-[36rem] font-body text-[min(1.125rem,2.9svh)] leading-snug text-white/70 transition-colors duration-300 group-hover:text-white/90 xl:text-[min(1.25rem,3svh)]">
                              {svc.description}
                            </p>
                            <span className="hidden items-baseline gap-4 whitespace-nowrap lg:flex">
                              <span className="font-sans text-[0.7rem] font-bold uppercase tracking-[0.14em] text-primary/75 transition-colors duration-300 group-hover:text-primary">
                                {svc.tags.join("  ·  ")}
                              </span>
                              <span className="font-sans text-[0.7rem] font-bold tabular-nums text-white/30 transition-colors duration-300 group-hover:text-primary">
                                +{detail.services.length}
                              </span>
                            </span>
                          </article>
                        </HoverCardTrigger>
                        <HoverCardContent
                          side="bottom"
                          align="start"
                          sideOffset={4}
                          className="w-[24rem] rounded-xl border-white/10 bg-[#111] p-5 shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
                        >
                          <span className="mb-3 block font-serif text-sm italic text-white/60">
                            Inside {svc.title.toLowerCase()} —
                          </span>
                          <ul className="flex flex-col gap-2">
                            {detail.services.map((sub) => (
                              <li key={sub.title} className="flex items-baseline gap-2.5">
                                <span aria-hidden="true" className="text-primary">
                                  –
                                </span>
                                <div className="min-w-0">
                                  <span className="font-sans text-[0.8rem] font-bold text-white">
                                    {sub.title}.
                                  </span>{" "}
                                  <span className="font-body text-xs leading-snug text-white/55">
                                    {sub.description}
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSlide;
