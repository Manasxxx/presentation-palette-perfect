import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { animate, stagger, createSpring } from "animejs";
import logo from "@/assets/logo.jpg";
import { Globe } from "@/components/ui/globe";
import { LiquidGlassCard } from "react-liquid-glass-card";

const owlLetters = "OWLSURF".split("");

const TitleSlide = ({ onViewCaseStudies }: { onViewCaseStudies?: () => void }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    animate(el.querySelectorAll(".owl-letter"), {
      translateY: [40, 0],
      opacity: [0, 1],
      scale: [0.5, 1],
      delay: stagger(60),
      ease: createSpring({ stiffness: 260, damping: 16 }),
    });
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section ref={ref} className="slide hexagon-pattern">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0 opacity-30 animate-gradient-shift"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 20% 40%, hsl(180 45% 53% / 0.4), transparent), radial-gradient(ellipse 60% 80% at 80% 60%, hsl(262 95% 64% / 0.25), transparent), radial-gradient(ellipse 70% 50% at 50% 80%, hsl(22 100% 59% / 0.2), transparent)",
          backgroundSize: "200% 200%",
        }}
      />
      
      {/* Globe background - zoomed in, only top half visible */}
      <div className="absolute left-1/2 -translate-x-1/2 overflow-hidden pointer-events-none" style={{ top: '45%', width: '150%', height: '100%' }}>
        <Globe className="opacity-40 !max-w-none !w-full" />
      </div>
      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 -mt-16 md:-mt-24"
      >
        {/* Logo with glass effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 relative"
        >
          <motion.div
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(50% at 50% 50%)" }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-32 h-32 md:w-40 md:h-40 animate-pulse-glow flex items-center justify-center"
          >
            <LiquidGlassCard borderRadius="50%" padding="4px" blur={15} brightness={1.15} backgroundColor="rgba(75, 194, 194, 0.08)">
              <img src={logo} alt="OwlSurf Digital" className="w-full h-full object-cover rounded-full" />
            </LiquidGlassCard>
          </motion.div>
        </motion.div>

        {/* Title with anime.js letter animation */}
        <div className="mb-4">
          <h1 className="text-5xl md:text-8xl font-black tracking-tight">
            <span className="inline-flex">
              {owlLetters.map((letter, i) => (
                <span
                  key={i}
                  className="owl-letter inline-block bg-clip-text text-transparent"
                  style={{
                    opacity: 0,
                    backgroundImage: "linear-gradient(135deg, hsl(180 45% 53% / 0.6), hsl(180 45% 70% / 0.4))",
                    WebkitTextStroke: "1px hsl(180 45% 53% / 0.3)",
                    filter: "blur(0.3px)",
                    textShadow: "0 0 40px hsl(180 45% 53% / 0.3), 0 0 80px hsl(180 45% 53% / 0.15)",
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </h1>
          <p className="text-xl md:text-3xl font-light tracking-[0.3em] text-muted-foreground mt-2">
            DIGITAL
          </p>
        </div>

        {/* Portfolio pill with glass effect */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-8"
        >
          <LiquidGlassCard padding="0.75rem 2rem" borderRadius="9999px" blur={12} brightness={1.1} backgroundColor="rgba(255, 255, 255, 0.05)">
            <div className="flex items-center gap-4">
              <div className="h-px w-10 bg-owl-orange" />
              <p className="text-sm md:text-base font-semibold tracking-[0.25em] text-muted-foreground">
                PORTFOLIO & CREDENTIALS
              </p>
              <div className="h-px w-10 bg-owl-orange" />
            </div>
          </LiquidGlassCard>
        </motion.div>

        <motion.a
          href="https://www.owlsurf.com"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-sm font-medium tracking-widest text-primary hover:text-primary/80 transition-colors"
        >
          www.owlsurf.com
        </motion.a>

        {onViewCaseStudies && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            onClick={onViewCaseStudies}
            className="mt-5 px-6 py-2.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(180 45% 53%), hsl(262 95% 64%))",
              color: "white",
              boxShadow: "0 4px 20px hsl(180 45% 53% / 0.35), 0 0 40px hsl(262 95% 64% / 0.15)",
            }}
          >
            <span className="relative z-10">Jump to Creatives</span>
            <span
              className="absolute inset-0 z-0"
              style={{
                background: "linear-gradient(110deg, transparent 30%, hsl(0 0% 100% / 0.35) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
                animation: "shimmer-cascade 2s ease-in-out infinite",
              }}
            />
          </motion.button>
        )}

        {/* Partner Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: [0, 1, 1, 0], y: [15, 0, 0, 0] }}
          transition={{ duration: 3, delay: 1.1, times: [0, 0.2, 0.7, 1] }}
          className="flex items-center justify-center gap-2 mt-6"
        >
          <LiquidGlassCard padding="0.35rem 0.6rem" borderRadius="9999px" blur={10} brightness={1.1} backgroundColor="rgba(255, 255, 255, 0.05)">
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 48 48" fill="none">
                <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" fill="#4285F4"/>
                <path d="M4.2 14.8l7 5.1C13 15.5 18 12 24 12c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 15.4 2 8.1 7.3 4.2 14.8z" fill="#EA4335"/>
                <path d="M24 46c5.4 0 10.3-1.8 14.1-5l-6.9-5.7C29.1 37 26.7 38 24 38c-6.1 0-11.2-4.1-13-9.7l-7.1 5.5C7.8 40.6 15.3 46 24 46z" fill="#34A853"/>
                <path d="M44.5 20H24v8.5h11.8c-1 3-2.8 5.3-5.5 6.8l6.9 5.7c4-3.7 6.8-9.2 6.8-17 0-1.3-.2-2.7-.5-4z" fill="#FBBC05"/>
              </svg>
              <span className="text-muted-foreground text-[10px] font-semibold tracking-wider">Google</span>
            </div>
          </LiquidGlassCard>

          <LiquidGlassCard padding="0.35rem 0.6rem" borderRadius="9999px" blur={10} brightness={1.1} backgroundColor="rgba(255, 255, 255, 0.05)">
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 48 48" fill="none">
                <path d="M24 4C12.95 4 4 12.95 4 24c0 9.94 7.28 18.17 16.8 19.67V29.4h-5.04V24h5.04v-4.12c0-4.98 2.97-7.73 7.5-7.73 2.17 0 4.44.39 4.44.39v4.88h-2.5c-2.47 0-3.24 1.53-3.24 3.1V24h5.5l-.88 5.4h-4.62v14.27C36.72 42.17 44 33.94 44 24c0-11.05-8.95-20-20-20z" fill="#1877F2"/>
                <path d="M33.12 29.4L34 24h-5.5v-3.48c0-1.57.77-3.1 3.24-3.1h2.5v-4.88s-2.27-.39-4.44-.39c-4.53 0-7.5 2.75-7.5 7.73V24h-5.04v5.4h5.04v14.27a20.3 20.3 0 006.4 0V29.4h4.62z" fill="white"/>
              </svg>
              <span className="text-muted-foreground text-[10px] font-semibold tracking-wider">Meta</span>
            </div>
          </LiquidGlassCard>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-primary to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default TitleSlide;
