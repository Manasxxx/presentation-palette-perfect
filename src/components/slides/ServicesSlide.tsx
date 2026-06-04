import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { animate, createSpring, stagger } from "animejs";
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
import CardSwap, { Card } from "@/components/ui/CardSwap/CardSwap";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import brandStoryIllustration from "@/assets/service-illustration-brand-story.svg";
import videoIllustration from "@/assets/service-illustration-video.svg";
import designSystemIllustration from "@/assets/service-illustration-design-system.svg";
import researchIllustration from "@/assets/service-illustration-research.svg";
import thoughtLeadershipIllustration from "@/assets/service-illustration-thought-leadership.svg";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  illustration?: ServiceIllustrationKind;
};

type Category = {
  key: string;
  label: string;
  icon: LucideIcon;
  services: Service[];
};

type ServiceIllustrationKind = "story" | "video" | "system" | "research" | "thought";

const serviceIllustrations: Record<ServiceIllustrationKind, string> = {
  story: brandStoryIllustration,
  video: videoIllustration,
  system: designSystemIllustration,
  research: researchIllustration,
  thought: thoughtLeadershipIllustration,
};

const ServiceClipArt = ({ kind }: { kind: ServiceIllustrationKind }) => {
  return (
    <div className="pointer-events-none relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-primary/20 bg-primary/[0.055]">
      <img
        src={serviceIllustrations[kind]}
        alt=""
        className="h-[92%] w-[92%] object-contain drop-shadow-[0_18px_28px_rgba(75,194,194,0.16)]"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

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
          "Turn specifications, process, and expertise into a buyer-ready story.",
        illustration: "story",
      },
      {
        icon: Film,
        title: "Explainer Films",
        description:
          "Plant, product, and process films that make complex value visible.",
        illustration: "video",
      },
      {
        icon: PenTool,
        title: "Sales Collateral",
        description:
          "Decks, brochures, and booth material that sales can actually use.",
        illustration: "system",
      },
      {
        icon: FileText,
        title: "Whitepapers",
        description:
          "Research-led documents for buyers who need depth before trust.",
        illustration: "research",
      },
      {
        icon: Sparkles,
        title: "Executive POV",
        description:
          "Bylines, talks, and expert notes that make leadership credible.",
        illustration: "thought",
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
          "LinkedIn, Google, and programmatic campaigns measured against qualified interest.",
      },
      {
        icon: Target,
        title: "Account-Based Marketing (ABM)",
        description:
          "Targeted plays for priority accounts, sales teams, and distributor networks.",
      },
      {
        icon: Users,
        title: "Creator & Influencer Network",
        description:
          "Credible voices in the category, used carefully and commercially.",
      },
      {
        icon: Megaphone,
        title: "PR & Media Relations",
        description:
          "Trade press, analyst notes, and earned coverage that supports sales.",
      },
      {
        icon: Building2,
        title: "Events & Trade Shows",
        description:
          "Booth story, lead capture, and follow-up for exhibitions and trade shows.",
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
          "Found when technical buyers search by problem, product, or category.",
      },
      {
        icon: MessageSquare,
        title: "Social Listening",
        description:
          "What buyers, competitors, and the category are already saying.",
      },
      {
        icon: ShieldCheck,
        title: "Reputation Management",
        description:
          "How your brand appears in search, press, and buyer checks.",
      },
      {
        icon: Activity,
        title: "Competitive Intelligence",
        description:
          "Launches, hiring, pricing, positioning, and category shifts tracked early.",
      },
      {
        icon: Mic,
        title: "Community Management",
        description:
          "A steady presence in the rooms and channels your buyers already use.",
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
          "HubSpot, Marketo, and Pardot flows that match long buying cycles.",
      },
      {
        icon: Database,
        title: "CRM Integration",
        description:
          "Salesforce, HubSpot, and CRM hygiene so teams see the same buyer.",
      },
      {
        icon: BarChart2,
        title: "Analytics & Attribution",
        description:
          "Which channels created qualified movement, not just clicks.",
      },
      {
        icon: Cpu,
        title: "Lead Scoring",
        description:
          "Prioritization based on buyer signals, fit, and sales readiness.",
      },
      {
        icon: Globe,
        title: "Custom Microsites",
        description:
          "Account pages, campaign pages, and product explainers for serious buyers.",
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
          "Drafting support for blogs, emails, sales notes, and repurposing.",
      },
      {
        icon: Bot,
        title: "Marketing Copilots",
        description:
          "Assistants trained around your sales, support, and marketing context.",
      },
      {
        icon: Sparkles,
        title: "AI Personalization",
        description:
          "Landing experiences that adapt to account, intent, and stage.",
      },
      {
        icon: Lightbulb,
        title: "Answer Engine Optimization (AEO)",
        description:
          "Making your expertise legible to answer engines and search systems.",
      },
      {
        icon: Zap,
        title: "Workflow Automation",
        description:
          "Research, qualification, and reporting workflows with human judgment intact.",
      },
    ],
  },
];

// Mobile-only: each category collapsed to three headline groups so the stepper stays
// light on phones. Desktop CardSwap keeps the full five services + descriptions.
const mobileServices: Record<string, { icon: LucideIcon; title: string }[]> = {
  content: [
    { icon: Target, title: "Positioning & Story" },
    { icon: Film, title: "Films & Collateral" },
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
    { icon: ShieldCheck, title: "Reputation & Intel" },
  ],
  engineering: [
    { icon: Database, title: "Automation & CRM" },
    { icon: BarChart2, title: "Analytics & Scoring" },
    { icon: Globe, title: "Custom Microsites" },
  ],
  ai: [
    { icon: Bot, title: "AI Content & Copilots" },
    { icon: Sparkles, title: "AI Personalization" },
    { icon: Zap, title: "AEO & Automation" },
  ],
};

const ServicesSlide = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggered = useRef(false);
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeKey, setActiveKey] = useState<string>(categories[0].key);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeCategory =
    categories.find((c) => c.key === activeKey) ?? categories[0];

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

  // Mobile: auto-advance the highlighted category every 3.5s (re-armed on each change,
  // so a manual tap resets the cycle). Paused under reduced-motion.
  useEffect(() => {
    if (!isMobile || prefersReducedMotion) return;
    const id = window.setTimeout(() => {
      setActiveKey((prev) => {
        const idx = categories.findIndex((c) => c.key === prev);
        return categories[(idx + 1) % categories.length].key;
      });
    }, 3500);
    return () => window.clearTimeout(id);
  }, [isMobile, prefersReducedMotion, activeKey]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const header = el.querySelector(".sv-header") as HTMLElement | null;
    const tabs = el.querySelector(".sv-tabs") as HTMLElement | null;
    if (!header || !tabs) return;

    header.style.opacity = "0";
    header.style.transform = "translateY(30px)";
    tabs.style.opacity = "0";
    tabs.style.transform = "translateY(20px)";

    const reveal = () => {
      if (triggered.current) return;
      triggered.current = true;
      animate(header, {
        opacity: 1,
        translateY: 0,
        scale: [0.94, 1],
        duration: 900,
        ease: createSpring({ stiffness: 95, damping: 12 }),
      });
      animate(el.querySelector(".sv-title-accent")!, {
        translateX: [-26, 0],
        filter: ["blur(10px)", "blur(0px)"],
        duration: 900,
        delay: 120,
        ease: "out(4)",
      });
      animate(tabs, {
        opacity: 1,
        translateY: 0,
        delay: 200,
        duration: 600,
        ease: "out(3)",
      });
      animate(el.querySelectorAll(".sv-tab"), {
        opacity: [0, 1],
        translateX: [-20, 0],
        delay: stagger(70, { start: 250 }),
        duration: 500,
        ease: "out(3)",
      });
      animate(el.querySelector(".sv-card-stage")!, {
        opacity: [0, 1],
        scale: [0.82, 1.04, 1],
        translateX: [120, -14, 0],
        rotate: [4, -1, 0],
        duration: 1250,
        delay: 360,
        ease: "out(4)",
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    const fallback = window.setTimeout(reveal, 600);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

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
      <div className="relative z-10 flex h-full w-full flex-col px-8 pt-16 pb-6 md:px-12 md:pt-20 md:pb-10">
        <header className="sv-header text-left self-start">
          <span className="text-[10px] md:text-xs tracking-[0.3em] text-primary font-medium mb-3 block">
            WHAT WE BUILD
          </span>
          <h2 className="font-sans text-[2rem] sm:text-[2.6rem] md:text-[clamp(3.4rem,5.9vw,6.6rem)] font-black uppercase leading-[1.02] tracking-normal text-white text-left pb-2 [overflow-wrap:anywhere]">
            <span className="font-sans not-italic">BUYER </span>
            <span className="sv-title-accent font-sans not-italic text-primary inline-block pr-2">
              SYSTEMS
            </span>
          </h2>
          <p className="mt-2.5 max-w-[45rem] font-body text-sm leading-snug text-white/58 md:mt-3 md:text-lg">
            The assets and operating layer around a technical sale: explain the product, find the right accounts, and give sales sharper proof.
          </p>
        </header>

        <div className="mt-5 flex w-full flex-1 flex-col grid-cols-12 items-start gap-5 md:mt-[3vh] md:grid md:flex-initial md:gap-10">
          {isMobile ? (
            <div className="col-span-12 flex h-full flex-col justify-center gap-7 pb-[6vh]">
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
                      className={`sv-tab col-span-2 flex flex-col items-center gap-2 rounded-2xl border px-1.5 py-4 transition-all duration-300 ${
                        index === 3 ? "col-start-2" : ""
                      } ${
                        active
                          ? "border-primary/60 bg-primary/10"
                          : "border-border/40 bg-white/[0.02]"
                      }`}
                    >
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                          active ? "bg-primary/25 text-primary" : "bg-white/5 text-muted-foreground"
                        }`}
                      >
                        <CatIcon className="h-[22px] w-[22px]" />
                      </span>
                      <span
                        className={`text-center font-sans text-[0.62rem] font-black uppercase leading-[1.1] tracking-tight transition-colors ${
                          active ? "text-white" : "text-foreground/55"
                        }`}
                      >
                        {cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile: active category as a connected, low-text build sequence (titles only) */}
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
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <span className="relative z-10 flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full border border-primary/40 bg-background text-primary shadow-[0_0_0_4px_hsl(var(--background))]">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <span className="flex items-baseline gap-2.5">
                        <span className="font-sans text-[0.65rem] font-black tabular-nums text-primary/55">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-sans text-[1.05rem] font-black uppercase leading-tight tracking-tight text-white">
                          {svc.title}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          ) : (
            <>
              {/* Left: compact category tabs (vertical column on desktop) */}
              <div
                className="sv-tabs col-span-12 -mx-1 flex flex-row gap-2 overflow-x-auto px-1 pb-1 md:col-span-4 md:mx-0 md:flex-col md:gap-4 md:overflow-visible md:px-0 md:pb-0"
                role="tablist"
                aria-label="Service categories"
                aria-orientation="vertical"
              >
                {categories.map((cat, index) => {
                  const active = cat.key === activeKey;
                  const CatIcon = cat.icon;
                  return (
                    <button
                      key={cat.key}
                      type="button"
                      role="tab"
                      id={`sv-tab-${cat.key}`}
                      aria-selected={active}
                      aria-controls="sv-panel"
                      tabIndex={active ? 0 : -1}
                      ref={(el) => { tabRefs.current[index] = el; }}
                      onClick={() => setActiveKey(cat.key)}
                      onKeyDown={(event) => handleTabKey(event, index)}
                      className={`sv-tab group relative flex shrink-0 items-center justify-between gap-3 text-left rounded-xl border px-4 py-3 transition-all duration-300 md:shrink md:gap-4 md:px-5 md:py-4 ${
                        active
                          ? "border-primary/60 bg-primary/10"
                          : "border-border/40 bg-white/[0.02] hover:border-primary/30 hover:bg-white/[0.05]"
                      }`}
                    >
                      {active && (
                        <span className="absolute left-0 top-[20%] bottom-[20%] w-[3px] rounded-full bg-primary" />
                      )}
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                            active
                              ? "bg-primary/25 text-primary"
                              : "bg-white/5 text-muted-foreground"
                          }`}
                        >
                          <CatIcon className="h-[18px] w-[18px]" />
                        </span>
                        <span
                          className={`block font-sans text-base md:text-lg font-black uppercase tracking-tight truncate transition-colors ${
                            active ? "text-white" : "text-foreground/80"
                          }`}
                        >
                          {cat.label}
                        </span>
                      </div>
                      <span
                        className={`hidden shrink-0 text-[10px] font-semibold rounded-full px-2 py-0.5 transition-colors md:inline-block ${
                          active
                            ? "bg-primary/25 text-primary"
                            : "bg-white/5 text-muted-foreground"
                        }`}
                      >
                        {cat.services.length}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right: CardSwap stack — 5 cards per category, simpler content */}
              <div
                className="sv-card-stage relative col-span-12 h-auto md:col-span-8 md:h-[460px]"
                style={{ opacity: 0 }}
                role="tabpanel"
                id="sv-panel"
                aria-labelledby={`sv-tab-${activeKey}`}
              >
                <CardSwap
                  key={activeKey}
                  width={520}
                  height={270}
                  cardDistance={48}
                  verticalDistance={52}
                  delay={3000}
                  pauseOnHover
                  skewAmount={5}
                  easing="elastic"
                  reduceMotion={prefersReducedMotion}
                >
                  {activeCategory.services.map((svc) => {
                    const Icon = svc.icon;
                    const hasIllustration =
                      activeCategory.key === "content" && svc.illustration;
                    return (
                      <Card key={svc.title}>
                        <div className="relative flex h-full w-full flex-col overflow-hidden">
                          {/* Vertical accent stripe on the left edge */}
                          <span className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r bg-primary" />

                          {/* Top edge: tight icon + compact monster heading — peeks above when stacked */}
                          <div className="relative z-10 flex items-center gap-2.5 px-5 pt-2.5">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/15">
                              <Icon className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <h3 className="font-sans text-[0.95rem] md:text-base font-black uppercase tracking-tight text-primary leading-none truncate">
                              {svc.title}
                            </h3>
                          </div>

                          {/* Body content */}
                          <div className="relative z-10 flex-1">
                            {hasIllustration ? (
                              <div className="grid h-full grid-cols-[0.9fr_1.1fr] gap-4 px-5 pb-4 pt-4">
                                <div className="flex min-w-0 items-start">
                                  <p className="text-sm md:text-[0.95rem] text-white/80 leading-relaxed">
                                    {svc.description}
                                  </p>
                                </div>
                                <ServiceClipArt kind={hasIllustration} />
                              </div>
                            ) : (
                              <div className="px-5 pt-4">
                                <p className="text-sm md:text-[0.95rem] text-white/80 leading-relaxed">
                                  {svc.description}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </CardSwap>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSlide;
