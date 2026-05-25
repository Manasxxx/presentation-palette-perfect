import { useEffect, useRef, useState } from "react";
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

const categories: Category[] = [
  {
    key: "content",
    label: "Brand & Story",
    icon: PenTool,
    services: [
      {
        icon: Target,
        title: "Brand Storytelling",
        description:
          "Narrative your buyers remember at the moment they decide.",
      },
      {
        icon: Film,
        title: "Video Production",
        description:
          "Product demos, explainers, brand films. Complex tech, clear stories.",
      },
      {
        icon: PenTool,
        title: "Design Systems",
        description:
          "Logos, decks, brochures, trade-show booths. Consistent. Yours.",
      },
      {
        icon: FileText,
        title: "Whitepapers & Research",
        description:
          "Long-form research that earns you the expert seat.",
      },
      {
        icon: Sparkles,
        title: "Thought Leadership",
        description:
          "Bylines, op-eds, conference talks. Earned authority.",
      },
    ],
  },
  {
    key: "reach",
    label: "Demand Gen",
    icon: Megaphone,
    services: [
      {
        icon: TrendingUp,
        title: "Paid Ads",
        description:
          "Performance marketing across LinkedIn, Google, and programmatic, measured against pipeline.",
      },
      {
        icon: Target,
        title: "Account-Based Marketing (ABM)",
        description:
          "Targeted plays for your top accounts. Sales-aligned.",
      },
      {
        icon: Users,
        title: "Creator & Influencer Network",
        description:
          "Voices your buyers already follow. We make the intro.",
      },
      {
        icon: Megaphone,
        title: "PR & Media Relations",
        description:
          "Trade press, analyst briefings, earned coverage. Coverage that closes deals.",
      },
      {
        icon: Building2,
        title: "Events & Trade Shows",
        description:
          "Booth, lead capture, follow-up. Attendees become pipeline.",
      },
    ],
  },
  {
    key: "discovery",
    label: "Discovery",
    icon: Search,
    services: [
      {
        icon: Search,
        title: "SEO",
        description:
          "Found on Google when buyers are deciding.",
      },
      {
        icon: MessageSquare,
        title: "Social Listening",
        description:
          "What's said about you, your competitors, your category. Live.",
      },
      {
        icon: ShieldCheck,
        title: "Reputation Management",
        description:
          "How your brand shows up online. Shaped and defended.",
      },
      {
        icon: Activity,
        title: "Competitive Intelligence",
        description:
          "What competitors launch, hire, price, pitch. You hear early.",
      },
      {
        icon: Mic,
        title: "Community Management",
        description:
          "Where your buyers gather, we show up daily.",
      },
    ],
  },
  {
    key: "engineering",
    label: "Marketing Stack",
    icon: Database,
    services: [
      {
        icon: Workflow,
        title: "Marketing Automation",
        description:
          "HubSpot, Marketo, Pardot. Right message, right minute.",
      },
      {
        icon: Database,
        title: "CRM Integration",
        description:
          "Salesforce, HubSpot, any CRM. Sales and marketing on one screen.",
      },
      {
        icon: BarChart2,
        title: "Analytics & Attribution",
        description:
          "Which campaign actually built pipeline. The signal beneath the clicks.",
      },
      {
        icon: Cpu,
        title: "Lead Scoring",
        description:
          "Sales calls hot leads first. Real signals, not gut.",
      },
      {
        icon: Globe,
        title: "Custom Microsites",
        description:
          "Landing pages and microsites, built per campaign or account.",
      },
    ],
  },
  {
    key: "ai",
    label: "AI & Autopilot",
    icon: BrainCircuit,
    services: [
      {
        icon: Wand2,
        title: "AI Content Engine",
        description:
          "AI drafts at scale. Blogs, emails, social. Humans approve.",
      },
      {
        icon: Bot,
        title: "Marketing Copilots",
        description:
          "AI assistants built for your sales, support, marketing.",
      },
      {
        icon: Sparkles,
        title: "AI Personalization",
        description:
          "Each visitor sees what fits their intent.",
      },
      {
        icon: Lightbulb,
        title: "Answer Engine Optimization (AEO)",
        description:
          "Showing up inside ChatGPT, Perplexity, and Google AI Overviews.",
      },
      {
        icon: Zap,
        title: "Workflow Automation",
        description:
          "AI handles research, qualification, reporting. Humans handle judgement.",
      },
    ],
  },
];

const ServicesSlide = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggered = useRef(false);
  const [activeKey, setActiveKey] = useState<string>(categories[0].key);

  const activeCategory =
    categories.find((c) => c.key === activeKey) ?? categories[0];

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
      <div className="relative z-10 flex h-full w-full flex-col px-8 pt-20 pb-8 md:px-12 md:pt-20 md:pb-10">
        <header className="sv-header text-left self-start">
          <span className="text-[10px] md:text-xs tracking-[0.3em] text-primary font-medium mb-3 block">
            WHAT WE DO
          </span>
          <h2 className="font-sans text-[clamp(3.4rem,5.9vw,6.6rem)] font-black uppercase leading-[0.95] tracking-normal text-white text-left pb-2">
            <span className="font-sans not-italic">OUR </span>
            <span className="sv-title-accent font-sans not-italic text-gradient-green inline-block pr-2">
              SERVICES
            </span>
          </h2>
        </header>

        <div className="mt-[3vh] grid w-full grid-cols-12 items-start gap-8 md:gap-10">
          {/* Left: compact category tabs (no descriptions) */}
          <div className="sv-tabs col-span-12 flex flex-col gap-3 md:col-span-4 md:gap-4">
            {categories.map((cat) => {
              const active = cat.key === activeKey;
              const CatIcon = cat.icon;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveKey(cat.key)}
                  className={`sv-tab group relative flex items-center justify-between gap-4 text-left rounded-xl border px-5 py-4 transition-all duration-300 ${
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
                    className={`shrink-0 text-[10px] font-semibold rounded-full px-2 py-0.5 transition-colors ${
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
          <div className="sv-card-stage relative col-span-12 h-[460px] md:col-span-8 md:h-[460px]" style={{ opacity: 0 }}>
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
            >
              {activeCategory.services.map((svc) => {
                const Icon = svc.icon;
                return (
                  <Card key={svc.title}>
                    <div className="relative flex h-full w-full flex-col">
                      {/* Vertical accent stripe on the left edge */}
                      <span className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r bg-primary" />

                      {/* Top edge: tight icon + compact monster heading — peeks above when stacked */}
                      <div className="flex items-center gap-2.5 px-5 pt-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/15">
                          <Icon className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <h3 className="font-sans text-[0.95rem] md:text-base font-black uppercase tracking-tight text-primary leading-none truncate">
                          {svc.title}
                        </h3>
                      </div>

                      {/* Body content */}
                      <div className="flex-1 px-5 pt-4">
                        <p className="text-sm md:text-[0.95rem] text-white/80 leading-relaxed">
                          {svc.description}
                        </p>
                      </div>

                    </div>
                  </Card>
                );
              })}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSlide;
