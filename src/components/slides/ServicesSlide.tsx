import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Palette, Globe, Code, ChevronRight } from "lucide-react";
import { useState } from "react";
import { LiquidGlassCard } from "react-liquid-glass-card";

const services = [
  {
    icon: BarChart3,
    title: "Digital Strategy",
    description: "Data-driven campaigns that amplify your brand's reach and impact across every channel.",
    items: ["Building Brands", "Media Placements", "Writing & Repurposing", "Strategic Communications"],
    accent: "from-primary to-primary/60",
  },
  {
    icon: Palette,
    title: "Creative Strategy",
    description: "Bold visual storytelling that captures attention and communicates your unique value.",
    items: ["Visual Identity", "Graphic Design", "Creative Advertising", "Space Design & Events"],
    accent: "from-owl-orange to-owl-orange/60",
  },
  {
    icon: Globe,
    title: "Web Presence",
    description: "Dominate search results and social feeds with an optimized, engaging online presence.",
    items: ["Web Design", "SEO", "Social Media", "Content Marketing"],
    accent: "from-owl-blue to-owl-blue/60",
  },
  {
    icon: Code,
    title: "Development",
    description: "End-to-end product engineering from strategy and design to launch and testing.",
    items: ["Technology Consulting", "Product Development", "Product Strategy", "QA & Testing"],
    accent: "from-owl-chartreuse to-owl-chartreuse/60",
  },
];

const ServicesSlide = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="slide py-16 px-6 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="text-xs tracking-[0.3em] text-primary font-medium mb-3 block">WHAT WE DO</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            <span className="text-foreground">OUR </span>
            <span className="text-gradient-green">SERVICES</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-10 items-start">
          {/* Left tabs */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex md:flex-col gap-2"
          >
            {services.map((service, i) => (
              <button
                key={service.title}
                onClick={() => setActive(i)}
                className={`relative flex items-center gap-3 px-4 py-3 md:py-4 rounded-xl text-left transition-all duration-300 group w-full ${
                  active === i
                    ? "bg-primary/10 border border-primary/30"
                    : "hover:bg-muted/50 border border-transparent"
                }`}
              >
                {active === i && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute left-0 top-[20%] bottom-[20%] w-[3px] rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${
                    active === i ? "bg-primary/20" : "bg-muted"
                  }`}
                >
                  <service.icon
                    className={`w-4 h-4 transition-colors duration-300 ${
                      active === i ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                </div>
                <span
                  className={`text-sm font-semibold transition-colors duration-300 hidden md:block ${
                    active === i ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {service.title}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Right content panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="min-h-[320px] relative overflow-hidden"
          >
            <LiquidGlassCard padding="1.5rem 2.5rem" borderRadius="1rem" blur={12} brightness={1.1} backgroundColor="rgba(255, 255, 255, 0.06)">
              {/* Accent glow */}
              <div
                className={`absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br ${services[active].accent} opacity-10 blur-3xl transition-all duration-700`}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${services[active].accent} flex items-center justify-center`}>
                      {(() => {
                        const Icon = services[active].icon;
                        return <Icon className="w-6 h-6 text-background" />;
                      })()}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-foreground">
                      {services[active].title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-lg">
                    {services[active].description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services[active].items.map((item, j) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: j * 0.08 }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/30 border border-border/50 group hover:border-primary/30 transition-colors duration-200"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="text-sm font-medium text-foreground">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </LiquidGlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSlide;
