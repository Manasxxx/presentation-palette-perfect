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
import { animate, createSpring } from "animejs";
import { Globe } from "@/components/ui/globe";
import { LiquidGlassCard } from "react-liquid-glass-card";
import LightRays from "@/components/LightRays";
import { useIsMobile } from "@/hooks/use-mobile";
import { OwlSurfLogo } from "@/components/OwlSurfLogo";

const credibilityBadges = [
  { label: "Meta", detail: "Verified Agency" },
  { label: "Google", detail: "Partner Agency" },
  { label: "LinkedIn", detail: "B2B Ads Partner" },
  { label: "HubSpot", detail: "Growth Partner" },
];

const TitleSlide = ({ onViewCaseStudies }: { onViewCaseStudies?: () => void }) => {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Entry animation timeline
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    animate(el.querySelector(".ts-eyebrow")!, {
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 700,
      ease: "cubicBezier(0.25, 0.1, 0.25, 1.0)",
    });

    animate(el.querySelectorAll(".ts-wordmark-line"), {
      opacity: [0, 1],
      translateY: [34, 0],
      scale: [0.94, 1],
      duration: 950,
      delay: (_, i) => 150 + i * 120,
      ease: createSpring({ stiffness: 95, damping: 12 }),
    });

    animate(el.querySelector(".ts-title-accent")!, {
      translateX: [-30, 0],
      filter: ["blur(12px)", "blur(0px)"],
      duration: 950,
      delay: 260,
      ease: "out(4)",
    });

    animate(el.querySelector(".ts-logo-outer")!, {
      opacity: [0, 1],
      scale: [0.85, 1],
      duration: 1000,
      delay: 250,
      ease: "cubicBezier(0.16, 1, 0.3, 1)",
    });

    animate(el.querySelector(".ts-logo-inner")!, {
      clipPath: ["circle(0% at 50% 50%)", "circle(50% at 50% 50%)"],
      duration: 1200,
      delay: 400,
      ease: "cubicBezier(0.16, 1, 0.3, 1)",
    });

    animate(el.querySelectorAll(".ts-ring"), {
      opacity: [0, 0.6],
      scale: [0.6, 1],
      duration: 1400,
      delay: (_, i) => 500 + i * 120,
      ease: "cubicBezier(0.16, 1, 0.3, 1)",
    });

    animate(el.querySelectorAll(".ts-info-col"), {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 800,
      delay: (_, i) => 600 + i * 120,
      ease: "cubicBezier(0.25, 0.1, 0.25, 1.0)",
    });

    animate(el.querySelectorAll(".ts-cred-badge"), {
      opacity: [0, 1],
      translateY: [12, 0],
      scale: [0.96, 1],
      duration: 700,
      delay: (_, i) => 520 + i * 90,
      ease: "out(3)",
    });

    const btn = el.querySelector(".ts-button");
    if (btn) {
      animate(btn, {
        opacity: [0, 1],
        translateY: [18, 0],
        scale: [0.88, 1.04, 1],
        duration: 950,
        delay: 1000,
        ease: "out(4)",
      });
    }

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

  }, []);

  // Scroll-driven parallax
  useEffect(() => {
    const section = ref.current;
    const content = contentRef.current;
    if (!section || !content) return;

    let raf = 0;
    const scrollTarget = section.closest("[data-deck-scroll-container]");
    if (!scrollTarget) return;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const total = section.offsetHeight;
        if (total === 0) {
          raf = 0;
          return;
        }
        const progress = Math.max(0, Math.min(1, -rect.top / total));

        const y = progress * 120;
        const opacity = Math.max(0, 1 - progress * 1.8);

        content.style.transform = `translateY(${y}px)`;
        content.style.opacity = `${opacity}`;
        raf = 0;
      });
    };

    scrollTarget.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      scrollTarget.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className="slide hexagon-pattern overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      {/* Subtle glow wash */}
      <div
        className="absolute inset-0 opacity-25 animate-gradient-shift pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 40%, hsl(180 45% 53% / 0.35), transparent), radial-gradient(ellipse 60% 80% at 80% 60%, hsl(180 45% 53% / 0.15), transparent)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Light Rays */}
      <LightRays
        raysColor="#4bc2c2"
        raysOrigin="top-center"
        raysSpeed={0.6}
        lightSpread={0.5}
        rayLength={3}
        fadeDistance={1}
        saturation={0.7}
        followMouse={false}
        mouseInfluence={0.08}
        className="opacity-30 pointer-events-none"
      />

      {/* Globe — retained, pushed lower-right as ambient */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: isMobile ? '-30%' : '-40%',
          left: isMobile ? '-50%' : '-20%',
          width: isMobile ? '200%' : '120%',
          height: '120%',
        }}
      >
        <Globe className="opacity-25 !max-w-none !w-full" />
      </div>

      {/* Main content — 3-zone layout: eyebrow top, wordmark center, info bottom */}
      <div
        ref={contentRef}
        className="relative z-10 w-full h-full px-6 md:px-16 lg:px-24 flex flex-col justify-between py-14 md:py-16"
      >
        {/* TOP: Eyebrow */}
        <div className="ts-eyebrow flex items-center gap-3" style={{ opacity: 0 }}>
          <span className="block w-8 h-px bg-owl-teal" />
          <span className="text-[11px] md:text-xs font-bold tracking-[0.25em] uppercase text-owl-teal font-sans">
            Credentials
          </span>
        </div>

        {/* CENTER: Wordmark + Logo — vertically centered, items-center aligns logo to wordmark midpoint */}
        <div className="flex flex-row items-center justify-between gap-4 md:gap-8">
          <div className="flex-1 min-w-0">
            <h1 className="font-sans font-black leading-[0.9] tracking-tight uppercase text-white text-[clamp(3.5rem,10vw,7rem)]">
              <span className="ts-wordmark-line block" style={{ opacity: 0 }}>
                <span className="font-sans">OWL</span>
                <span className="ts-title-accent font-sans text-owl-teal inline-block">SURF</span>
              </span>
            </h1>
            <p
              className="ts-wordmark-line font-body font-medium uppercase text-white/75 tracking-[0.22em] mt-2 md:mt-3"
              style={{ opacity: 0, fontSize: "clamp(0.9rem, 1.6vw, 1.5rem)" }}
            >
              B2B Marketing for complex markets
            </p>
          </div>

          {/* Logo right — vertically centered with wordmark block */}
          <a
            href="https://www.owlsurf.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit owlsurf.com"
            className="ts-logo-outer relative flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105"
            style={{ opacity: 0 }}
          >
            <div className="ts-ring absolute inset-0 rounded-full border border-owl-teal/50" style={{ opacity: 0, transform: "scale(1.18)" }} />
            <div className="ts-ring absolute inset-0 rounded-full border border-owl-teal/30" style={{ opacity: 0, transform: "scale(1.4)" }} />
            <div className="ts-ring absolute inset-0 rounded-full border border-owl-teal/15" style={{ opacity: 0, transform: "scale(1.65)" }} />
            <div
              className="ts-logo-inner w-28 h-28 sm:w-36 sm:h-36 md:w-52 md:h-52 lg:w-64 lg:h-64 animate-pulse-glow flex items-center justify-center"
              style={{ clipPath: "circle(0% at 50% 50%)" }}
            >
              <LiquidGlassCard borderRadius="50%" padding="6px" blur={15} brightness={1.15} backgroundColor="rgba(75, 194, 194, 0.08)">
                <OwlSurfLogo className="h-full w-full rounded-full" />
              </LiquidGlassCard>
            </div>
          </a>
        </div>

        {/* BOTTOM: Info columns + button row */}
        <div className="flex flex-col gap-6">
          <div className="flex max-w-4xl flex-wrap gap-2.5 md:gap-3">
            {credibilityBadges.map((badge) => (
              <div
                key={badge.label}
                className="ts-cred-badge flex min-h-10 items-center gap-2 rounded-full border border-white/12 bg-white/[0.045] px-3.5 py-2 backdrop-blur-sm"
                style={{ opacity: 0 }}
              >
                <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_14px_rgba(75,194,194,0.75)]" />
                <span className="font-sans text-[10px] font-black uppercase tracking-[0.18em] text-white">
                  {badge.label}
                </span>
                <span className="font-body text-xs font-semibold text-white/58">
                  {badge.detail}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-8 md:gap-16 max-w-2xl">
            <div className="ts-info-col" style={{ opacity: 0 }}>
              <div className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white/40 font-sans mb-1.5">
                What We Do
              </div>
              <div className="text-sm md:text-base font-body font-semibold text-white leading-snug">
                B2B marketing for technical brands
              </div>
            </div>
            <div className="ts-info-col" style={{ opacity: 0 }}>
              <div className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white/40 font-sans mb-1.5">
                Made For
              </div>
              <div className="text-sm md:text-base font-body text-white/75 leading-snug">
                Long cycles. Complex products. Buyers who expect substance.
              </div>
            </div>
          </div>

          {onViewCaseStudies && (
            <div className="relative self-start">
              <Arrow19
                className="ts-arrow absolute -top-12 -right-8 w-14 h-14 md:w-16 md:h-16 text-primary/70 pointer-events-none"
                style={{ opacity: 0, transform: "rotate(120deg) scaleX(-1)" }}
              />
              <button
                onClick={onViewCaseStudies}
                className="ts-button px-6 py-2.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 relative overflow-hidden"
                style={{
                  opacity: 0,
                  background: "linear-gradient(135deg, hsl(180 45% 53%), hsl(180 45% 40%))",
                  color: "white",
                  boxShadow: "0 4px 24px rgba(75, 194, 194, 0.45)",
                }}
              >
                <span className="relative z-10">See case studies →</span>
                <span
                  className="absolute inset-0 z-0"
                  style={{
                    background: "linear-gradient(110deg, transparent 30%, hsl(0 0% 100% / 0.35) 50%, transparent 70%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer-cascade 2.5s ease-in-out infinite",
                  }}
                />
              </button>
            </div>
          )}
        </div>
      </div>

    </section>
  );
};

export default TitleSlide;
