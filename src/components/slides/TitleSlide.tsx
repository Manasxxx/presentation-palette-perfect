import React, { useEffect, useRef } from "react";

export type Arrow19Element = SVGSVGElement;
export type Arrow19Props = React.SVGAttributes<SVGSVGElement>;

const Arrow19 = React.forwardRef<Arrow19Element, Arrow19Props>(
  (props, forwardedRef) => (
    <svg width="212" height="181" viewBox="0 0 212 181" fill="none" xmlns="http://www.w3.org/2000/svg" ref={forwardedRef} {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M48.3405 0.123174C34.689 0.662894 20.709 3.85426 10.6462 8.66481C6.18955 10.8002 3.67973 12.3959 1.73285 14.3202C-0.964619 16.9718 -0.425113 17.6289 2.74149 15.5404C9.16851 11.3165 20.7794 7.35073 32.5075 5.40304C43.6962 3.54922 59.4588 3.59616 76.2535 5.52037C98.6074 8.10164 114.276 11.997 133.604 19.7643C145.215 24.434 155.981 30.3005 163.722 36.1905C170.993 41.7051 183.472 53.9074 189.383 61.2758C196.749 70.451 203.011 84.9296 204.888 97.132C206.108 105.063 205.756 114.919 203.996 121.865C202.143 129.116 198.672 135.687 193.465 141.718C180.446 156.877 157.905 164.362 119.061 166.498C112.822 166.826 97.1531 166.639 90.3273 166.146C74.8696 164.996 64.8303 163.658 52.2108 161.054C45.69 159.716 42.2184 158.848 42.711 158.66C42.8987 158.613 44.4468 158.167 46.1122 157.698C47.801 157.205 49.959 156.431 50.9207 155.961C52.3516 155.257 52.7503 154.929 53.1256 154.201C53.5009 153.427 53.5244 153.146 53.2898 152.418C52.633 150.212 51.2256 149.931 45.6665 150.846C40.7876 151.667 37.2926 151.902 29.8335 151.925C24.0398 151.925 23.5472 151.949 22.6324 152.418C19.372 153.99 19.9819 158.496 24.3213 165.16C28.3088 171.238 32.2261 175.18 37.1988 178.043C40.1308 179.756 43.1801 180.624 43.1801 179.779C43.1801 179.615 42.4061 178.7 41.4678 177.738C40.2716 176.494 38.6061 174.242 35.8852 170.111C31.7569 163.846 30.1853 161.335 30.3026 161.194C30.3495 161.171 32.6717 161.898 35.4865 162.837C46.7689 166.592 64.0328 169.947 80.7102 171.613C100.906 173.631 115.168 173.725 133.956 171.965C151.994 170.299 167.85 166.333 179.086 160.678C194.59 152.887 205.615 139.676 209.462 124.329C211.385 116.585 211.784 106.988 210.517 97.8829C208.828 85.5866 202.589 70.2164 195.271 60.3606C189.712 52.8749 176.975 40.2971 167.733 33.1399C152.486 21.36 124.503 9.83813 99.0061 4.81639C86.5508 2.37592 71.9376 0.569007 61.8279 0.217016C53.9935 -0.0411113 52.5627 -0.0645544 48.3405 0.123174Z" fill="currentColor" />
    </svg>
  )
);
Arrow19.displayName = "Arrow19";
import { animate, stagger, createSpring } from "animejs";
import logo from "@/assets/logo-main.jpg";
import { Globe } from "@/components/ui/globe";
import { LiquidGlassCard } from "react-liquid-glass-card";
import LightRays from "@/components/LightRays";
import { useIsMobile } from "@/hooks/use-mobile";

const owlLetters = "OWLSURF".split("");

const TitleSlide = ({ onViewCaseStudies }: { onViewCaseStudies?: () => void }) => {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // OWL letter animation on mount
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

  // Mount animations (logo, link, button, badges, scroll indicator)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Logo reveal
    animate(el.querySelector(".ts-logo-outer")!, {
      opacity: [0, 1],
      scale: [0.3, 1],
      duration: 800,
      ease: "cubicBezier(0.16, 1, 0.3, 1)",
    });

    animate(el.querySelector(".ts-logo-inner")!, {
      clipPath: ["circle(0% at 50% 50%)", "circle(50% at 50% 50%)"],
      duration: 1200,
      delay: 300,
      ease: "cubicBezier(0.16, 1, 0.3, 1)",
    });

    // www.owlsurf.com link — fade in then out over 2.3s
    animate(el.querySelector(".ts-link")!, {
      opacity: [0, 1, 1, 0],
      duration: 2300,
    });

    // Jump to Creatives button
    const btn = el.querySelector(".ts-button");
    if (btn) {
      animate(btn, {
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 600,
        delay: 1000,
        ease: "out(3)",
      });
    }

    // Arrow pointing to button
    const arrow = el.querySelector(".ts-arrow");
    if (arrow) {
      animate(arrow, {
        opacity: [0, 0.7],
        scale: [0.5, 1],
        duration: 800,
        delay: 1400,
        ease: createSpring({ stiffness: 200, damping: 12 }),
      });
    }

    // Partner badges — appear then disappear
    animate(el.querySelector(".ts-badges")!, {
      opacity: [0, 1, 1, 0],
      translateY: [15, 0, 0, 0],
      duration: 3000,
      delay: 1100,
    });

    // Scroll indicator
    animate(el.querySelector(".ts-scroll")!, {
      opacity: [0, 1],
      duration: 1000,
      delay: 1200,
      ease: "out(3)",
    });

    // Scroll bounce animation (infinite loop)
    animate(el.querySelector(".ts-scroll-line")!, {
      translateY: [0, 8, 0],
      duration: 1500,
      loop: true,
      ease: "inOut(2)",
    });
  }, []);

  // Scroll-driven parallax for the content area
  useEffect(() => {
    const section = ref.current;
    const content = contentRef.current;
    if (!section || !content) return;

    let raf = 0;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const total = section.offsetHeight;
        if (total === 0) return;
        const progress = Math.max(0, Math.min(1, -rect.top / total));

        const y = progress * 150;
        const opacity = Math.max(0, 1 - progress * 2);
        const scale = Math.max(0.8, 1 - progress * 0.4);

        content.style.transform = `translateY(${y}px) scale(${scale})`;
        content.style.opacity = `${opacity}`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

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

      {/* Light Rays */}
      <LightRays
        raysColor="#4bc2c2"
        raysOrigin="top-center"
        raysSpeed={0.8}
        lightSpread={0.5}
        rayLength={3}
        fadeDistance={1}
        saturation={0.8}
        mouseInfluence={0.1}
        className="opacity-50 pointer-events-none"
      />

      {/* Globe background */}
      <div className="absolute left-1/2 -translate-x-1/2 overflow-hidden pointer-events-none" style={{ top: isMobile ? '35%' : '45%', width: isMobile ? '200%' : '150%', height: '100%' }}>
        <Globe className="opacity-40 !max-w-none !w-full" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 -mt-16 md:-mt-24"
      >
        {/* Logo with glass effect */}
        <div className="ts-logo-outer mb-6 md:mb-8 relative" style={{ opacity: 0 }}>
          <div
            className="ts-logo-inner w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 animate-pulse-glow flex items-center justify-center"
            style={{ clipPath: "circle(0% at 50% 50%)" }}
          >
            <LiquidGlassCard borderRadius="50%" padding="4px" blur={15} brightness={1.15} backgroundColor="rgba(75, 194, 194, 0.08)">
              <img src={logo} alt="OwlSurf Digital" className="w-full h-full object-cover rounded-full" />
            </LiquidGlassCard>
          </div>
        </div>

        {/* Title with anime.js letter animation + cascading shimmer */}
        <div className="mb-4">
          <h1 className="text-7xl md:text-9xl font-black tracking-tight">
            <span className="inline-flex">
              {owlLetters.map((letter, i) => (
                <span
                  key={i}
                  className="owl-letter inline-block bg-clip-text text-transparent"
                  style={{
                    opacity: 0,
                    backgroundImage: "linear-gradient(110deg, hsl(180 45% 53% / 0.5) 0%, hsl(180 45% 80% / 0.9) 40%, hsl(0 0% 100% / 0.95) 50%, hsl(180 45% 80% / 0.9) 60%, hsl(180 45% 53% / 0.5) 100%)",
                    backgroundSize: "300% 100%",
                    WebkitTextStroke: "1px hsl(180 45% 53% / 0.3)",
                    textShadow: "0 0 40px hsl(180 45% 53% / 0.3), 0 0 80px hsl(180 45% 53% / 0.15)",
                    animation: "shimmer-cascade 2.5s ease-in-out 1",
                    animationDelay: `${i * 0.12}s`,
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

        <a
          href="https://www.owlsurf.com"
          target="_blank"
          rel="noopener noreferrer"
          className="ts-link text-sm font-medium tracking-widest text-primary hover:text-primary/80 transition-colors"
          style={{ opacity: 0 }}
        >
          www.owlsurf.com
        </a>

        {onViewCaseStudies && (
          <div className="relative mt-5">
            {/* Arrow pointing to the button */}
            <Arrow19
              className="ts-arrow absolute -top-14 -right-10 md:-top-16 md:-right-12 w-16 h-16 md:w-20 md:h-20 text-primary/70 pointer-events-none"
              style={{
                opacity: 0,
                transform: "rotate(120deg) scaleX(-1)",
              }}
            />
            <button
              onClick={onViewCaseStudies}
              className="ts-button px-6 py-2.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 relative overflow-hidden"
              style={{
                opacity: 0,
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
            </button>
          </div>
        )}

        {/* Partner Badges */}
        <div className="ts-badges flex items-center justify-center gap-2 mt-6" style={{ opacity: 0 }}>
          <LiquidGlassCard padding={isMobile ? "0.25rem 0.5rem" : "0.35rem 0.6rem"} borderRadius="9999px" blur={10} brightness={1.1} backgroundColor="rgba(255, 255, 255, 0.05)">
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 48 48" fill="none">
                <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" fill="#4285F4" />
                <path d="M4.2 14.8l7 5.1C13 15.5 18 12 24 12c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 15.4 2 8.1 7.3 4.2 14.8z" fill="#EA4335" />
                <path d="M24 46c5.4 0 10.3-1.8 14.1-5l-6.9-5.7C29.1 37 26.7 38 24 38c-6.1 0-11.2-4.1-13-9.7l-7.1 5.5C7.8 40.6 15.3 46 24 46z" fill="#34A853" />
                <path d="M44.5 20H24v8.5h11.8c-1 3-2.8 5.3-5.5 6.8l6.9 5.7c4-3.7 6.8-9.2 6.8-17 0-1.3-.2-2.7-.5-4z" fill="#FBBC05" />
              </svg>
              <span className="text-muted-foreground text-[10px] font-semibold tracking-wider">Google</span>
            </div>
          </LiquidGlassCard>

          <LiquidGlassCard padding={isMobile ? "0.25rem 0.5rem" : "0.35rem 0.6rem"} borderRadius="9999px" blur={10} brightness={1.1} backgroundColor="rgba(255, 255, 255, 0.05)">
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 48 48" fill="none">
                <path d="M24 4C12.95 4 4 12.95 4 24c0 9.94 7.28 18.17 16.8 19.67V29.4h-5.04V24h5.04v-4.12c0-4.98 2.97-7.73 7.5-7.73 2.17 0 4.44.39 4.44.39v4.88h-2.5c-2.47 0-3.24 1.53-3.24 3.1V24h5.5l-.88 5.4h-4.62v14.27C36.72 42.17 44 33.94 44 24c0-11.05-8.95-20-20-20z" fill="#1877F2" />
                <path d="M33.12 29.4L34 24h-5.5v-3.48c0-1.57.77-3.1 3.24-3.1h2.5v-4.88s-2.27-.39-4.44-.39c-4.53 0-7.5 2.75-7.5 7.73V24h-5.04v5.4h5.04v14.27a20.3 20.3 0 006.4 0V29.4h4.62z" fill="white" />
              </svg>
              <span className="text-muted-foreground text-[10px] font-semibold tracking-wider">Meta</span>
            </div>
          </LiquidGlassCard>
        </div>
      </div>

      <div className="ts-scroll absolute bottom-8 left-1/2 -translate-x-1/2" style={{ opacity: 0 }}>
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs tracking-widest">SCROLL</span>
          <div className="ts-scroll-line w-px h-8 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default TitleSlide;
