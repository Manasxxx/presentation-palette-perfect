import { useEffect, useRef, useState } from "react";
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
    label: "Content & Creative",
    icon: PenTool,
    services: [
      {
        icon: Target,
        title: "Brand Storytelling",
        description:
          "Crafting your narrative so the right people remember you in the right moments.",
      },
      {
        icon: Film,
        title: "Video Production",
        description:
          "Product demos, explainers, and brand films that turn complex tech into clear stories.",
      },
      {
        icon: PenTool,
        title: "Design Systems",
        description:
          "Logos, decks, brochures, and trade show creative that stay consistent and on-brand.",
      },
      {
        icon: FileText,
        title: "Whitepapers & Research",
        description:
          "Long-form content that establishes you as the expert in your space.",
      },
      {
        icon: Sparkles,
        title: "Thought Leadership",
        description:
          "Executive bylines, opinion pieces, and conference talks that build authority.",
      },
    ],
  },
  {
    key: "reach",
    label: "Reach & Activation",
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
          "Hyper-targeted campaigns aimed at your top-priority accounts.",
      },
      {
        icon: Users,
        title: "Creator & Influencer Network",
        description:
          "Working with industry voices and KOLs your buyers already trust.",
      },
      {
        icon: Megaphone,
        title: "PR & Media Relations",
        description:
          "Trade publications, analyst briefings, and earned coverage in your sector.",
      },
      {
        icon: Building2,
        title: "Events & Trade Shows",
        description:
          "Booth design, lead capture, and follow-up that turns attendees into pipeline.",
      },
    ],
  },
  {
    key: "discovery",
    label: "Search & Listening",
    icon: Search,
    services: [
      {
        icon: Search,
        title: "SEO",
        description:
          "Showing up on Google when buyers are actively evaluating their options.",
      },
      {
        icon: MessageSquare,
        title: "Social Listening",
        description:
          "Tracking what's said about you, your competitors, and your category, in real time.",
      },
      {
        icon: ShieldCheck,
        title: "Reputation Management",
        description:
          "Protecting and shaping how your brand shows up online and in industry conversations.",
      },
      {
        icon: Activity,
        title: "Competitive Intelligence",
        description:
          "Knowing what competitors are launching, hiring, pricing, and pitching.",
      },
      {
        icon: Mic,
        title: "Community Management",
        description:
          "Active, on-brand presence on the channels where your buyers actually gather.",
      },
    ],
  },
  {
    key: "engineering",
    label: "Data & Tech",
    icon: Database,
    services: [
      {
        icon: Workflow,
        title: "Marketing Automation",
        description:
          "HubSpot, Marketo, and Pardot stacks that send the right message at the right time.",
      },
      {
        icon: Database,
        title: "CRM Integration",
        description:
          "Connecting Salesforce, HubSpot, or any CRM so sales and marketing share one view.",
      },
      {
        icon: BarChart2,
        title: "Analytics & Attribution",
        description:
          "Knowing which campaigns actually drove pipeline, not just clicks and impressions.",
      },
      {
        icon: Cpu,
        title: "Lead Scoring",
        description:
          "Telling sales which leads to call first based on real buying signals.",
      },
      {
        icon: Globe,
        title: "Custom Microsites",
        description:
          "Purpose-built landing pages and microsites for campaigns or ABM accounts.",
      },
    ],
  },
  {
    key: "ai",
    label: "AI & Automation",
    icon: BrainCircuit,
    services: [
      {
        icon: Wand2,
        title: "AI Content Engine",
        description:
          "AI-assisted drafting at scale across blogs, emails, and social posts.",
      },
      {
        icon: Bot,
        title: "Marketing Copilots",
        description:
          "Custom AI assistants for sales, support, and marketing teams.",
      },
      {
        icon: Sparkles,
        title: "AI Personalization",
        description:
          "Dynamic content and offers that adapt to each visitor's intent signals.",
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
          "Letting AI handle research, lead qualification, and routine reporting.",
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
        duration: 700,
        ease: "out(3)",
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
            <span className="font-sans not-italic text-gradient-green inline-block pr-2">
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
          <div className="relative col-span-12 h-[460px] md:col-span-8 md:h-[460px]">
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

                      <div className="flex items-center justify-between border-t border-white/10 px-5 py-2.5 text-[10px] tracking-[0.25em] text-primary font-medium uppercase">
                        <span>{activeCategory.label}</span>
                        <span className="text-white/40">B2B / Industrial</span>
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
