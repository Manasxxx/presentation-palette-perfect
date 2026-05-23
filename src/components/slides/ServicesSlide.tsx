import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { Target, Film, Users, Cpu, MessageSquare, Search, TrendingUp, BarChart2 } from "lucide-react";
import LightRays from "@/components/LightRays";

const services = [
  {
    icon: Target,
    title: "Content Strategy",
    description: "Building thought leadership and demand programs that influence every stakeholder — from technical evaluators to C-suite decision makers.",
  },
  {
    icon: Film,
    title: "Creative Production",
    description: "Technical explainers, product demos, case studies, and design assets that help complex products sell themselves.",
  },
  {
    icon: Users,
    title: "Creator Partnerships",
    description: "Collaborating with industry experts, trade publications, and niche KOLs to build credibility in specialized B2B markets.",
  },
  {
    icon: Cpu,
    title: "Tech Solutions",
    description: "Deploying martech stacks, marketing automation, and digital tools that reduce friction across long B2B sales cycles.",
  },
  {
    icon: MessageSquare,
    title: "Social Listening",
    description: "Tracking buyer intent signals, competitor moves, and industry conversations to surface opportunities before your competition does.",
  },
  {
    icon: Search,
    title: "Search & SEO",
    description: "Owning the high-intent search terms that industrial and technical buyers use when they're ready to evaluate vendors.",
  },
  {
    icon: TrendingUp,
    title: "Paid Ads",
    description: "Targeted LinkedIn, Google, and programmatic campaigns built for long sales cycles and complex buying committees.",
  },
  {
    icon: BarChart2,
    title: "Data & Insights",
    description: "Measuring pipeline influence, lead quality, and funnel performance so every marketing rupee is accountable.",
  },
];

const ServicesSlide = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;

          animate(el.querySelector(".sv-header")!, {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 700,
            ease: "out(3)",
          });

          animate(el.querySelectorAll(".sv-card"), {
            opacity: [0, 1],
            translateY: [40, 0],
            delay: stagger(70, { start: 250 }),
            duration: 600,
            ease: "out(3)",
          });
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
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

      <div className="relative z-10 flex h-full w-full flex-col px-8 pt-24 pb-10 md:px-12 md:pt-24 md:pb-12">
        <header className="sv-header text-left self-start" style={{ opacity: 0 }}>
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

        <div className="my-auto grid w-full grid-cols-2 gap-4 md:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="sv-card group flex flex-col gap-4 p-5 rounded-2xl border border-border/40 bg-white/[0.03] hover:border-primary/40 hover:bg-white/[0.06] transition-all duration-300"
              style={{ opacity: 0 }}
            >
              <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                <service.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-bold text-foreground mb-1.5 leading-snug">
                  {service.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSlide;
