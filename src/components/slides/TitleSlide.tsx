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
import { useIsMobile } from "@/hooks/use-mobile";
import { OwlSurfLogo } from "@/components/OwlSurfLogo";
import MagneticButton from "@/components/ui/MagneticButton";
import metaBusinessPartnerBadge from "@/assets/badge-meta-business-partner.png";
import googlePartnerBadge from "@/assets/badge-google-partner.png";
import linkedinMarketingPartnerBadge from "@/assets/badge-linkedin-marketing-partner.png";
import hubspotPartnerBadge from "@/assets/badge-hubspot-partner-gold.png";

const credibilityBadges = [
  { label: "LinkedIn Marketing Partner", src: linkedinMarketingPartnerBadge, className: "h-[48px] md:h-[62px]" },
  { label: "HubSpot Solutions Partner", src: hubspotPartnerBadge, className: "h-[64px] md:h-[80px]" },
  { label: "Meta Business Partner", src: metaBusinessPartnerBadge, className: "h-[62px] md:h-[78px]" },
  { label: "Google Partner", src: googlePartnerBadge, className: "h-[66px] md:h-[84px]" },
];

const TitleSlide = ({ onViewCaseStudies }: { onViewCaseStudies?: () => void }) => {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Entry animation timeline
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

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

    const seam = el.querySelector(".ts-seam");
    if (seam) {
      animate(seam, {
        opacity: [0, 1],
        scaleY: [0, 1],
        duration: 900,
        delay: 240,
        ease: "out(3)",
      });
    }

    const hook = el.querySelector(".ts-hook");
    if (hook) {
      animate(hook, {
        opacity: [0, 1],
        translateY: [44, 0],
        duration: 1100,
        delay: 220,
        ease: "out(4)",
      });
    }

    const hookAccent = el.querySelector(".ts-hook-accent");
    if (hookAccent) {
      animate(hookAccent, {
        opacity: [0, 1],
        translateX: [-26, 0],
        filter: ["blur(14px)", "blur(0px)"],
        duration: 1000,
        delay: 560,
        ease: "out(4)",
      });
    }

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

    animate(el.querySelectorAll(".ts-orbit-node, .ts-signal-line"), {
      opacity: [0, 1],
      scale: [0.8, 1],
      delay: (_, i) => 720 + i * 80,
      duration: 620,
      ease: "out(3)",
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

      {/* Industrial glow wash */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(115deg, hsl(180 45% 53% / 0.18), transparent 28%, hsl(180 45% 53% / 0.08) 66%, transparent)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Globe — top hemisphere rises from the bottom edge (desktop only) */}
      {!isMobile && (
        <div
          className="absolute pointer-events-none"
          style={{
            top: '100%',
            left: '50%',
            width: '120%',
            height: '120%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Globe className="opacity-25 !max-w-none !w-full" />
        </div>
      )}

      {/* Main content — editorial cover: brand lockup top, hook hero center, credibility baseline bottom */}
      <div
        ref={contentRef}
        className="relative z-10 w-full h-full px-6 md:px-16 lg:px-24 flex flex-col justify-between py-14 md:py-20"
      >
        {/* TOP: brand lockup */}
        <div className="flex flex-row items-start justify-between gap-6">
          <div className="ts-wordmark-line min-w-0" style={{ opacity: 0 }}>
            <span className="block font-sans font-black uppercase leading-none tracking-tight text-white text-[clamp(1.9rem,3.6vw,3.2rem)]">
              <span className="font-sans not-italic">OWL</span>
              <span className="ts-title-accent font-sans not-italic text-owl-teal inline-block">SURF</span>
              <span className="font-sans not-italic"> DIGITAL</span>
            </span>
            <span className="block font-body font-medium uppercase text-white/65 tracking-[0.22em] mt-1.5 text-[clamp(0.6rem,0.95vw,0.82rem)]">
              Credentials for chemical and industrial markets
            </span>
          </div>
          <div className="hidden w-[23vw] max-w-[24rem] border-t border-white/15 md:block" aria-hidden="true">
            <div className="mt-2 h-px w-1/3 bg-owl-teal/50" />
          </div>
        </div>

        {/* CENTER: editorial claim (left) + signal map (right) */}
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.7fr)] md:gap-12 lg:gap-16">
          <div className="relative min-w-0 pl-5 md:pl-8">
            <span
              className="ts-seam absolute left-0 top-1 bottom-1 w-[2px] rounded-full bg-gradient-to-b from-transparent via-owl-teal to-transparent"
              style={{ opacity: 0, transformOrigin: "top" }}
            />
            <h1 className="ts-hook max-w-[48rem] font-sans font-black tracking-normal text-white [overflow-wrap:anywhere]" style={{ opacity: 0 }}>
              <span className="block font-sans text-[clamp(1.1rem,1.55vw,1.55rem)] font-semibold uppercase leading-none tracking-[0.16em] text-white/58">
                When the product is
              </span>
              <span className="mt-3 block font-sans text-[clamp(3.1rem,5.65vw,5.8rem)] font-black uppercase leading-[0.9] text-white">
                complex,
              </span>
              <span className="mt-5 block font-body text-[clamp(1.4rem,2.35vw,2.35rem)] font-medium normal-case leading-tight tracking-normal text-white/70">
                the choice{" "}
                <span
                  className="ts-hook-accent font-serif text-[clamp(2.1rem,4vw,4.25rem)] font-semibold italic lowercase leading-none tracking-tight text-owl-teal"
                  style={{ opacity: 0 }}
                >
                  shouldn't be.
                </span>
              </span>
            </h1>
            <p className="ts-info-col mt-6 max-w-[42rem] font-body text-sm leading-[1.55] text-white/58 md:text-lg" style={{ opacity: 0 }}>
              Strategy, content, demand, and digital proof for chemical, industrial, and technical brands that need buyers to understand the value fast.
            </p>
          </div>

          <aside className="ts-logo-outer relative min-h-[20rem] min-w-0 overflow-hidden md:min-h-[31rem]" style={{ opacity: 0 }} aria-label="OwlSurf editorial signal graphic">
            <div className="absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
            <div className="absolute inset-y-12 left-1/2 w-px bg-gradient-to-b from-transparent via-white/16 to-transparent" />
            <div
              className="ts-signal-line absolute left-[13%] top-[20%] h-[62%] w-[62%] rounded-full border border-white/10"
              style={{ opacity: 0, animation: "ts-orbit-drift 18s linear infinite" }}
            />
            <div
              className="ts-signal-line absolute right-[4%] top-[8%] h-[76%] w-[76%] rounded-full border border-owl-teal/20"
              style={{ opacity: 0, animation: "ts-orbit-drift 24s linear infinite reverse" }}
            />
            <div className="absolute inset-6 border border-white/10" />
            <div className="absolute inset-14 border border-white/10" />
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                backgroundSize: "38px 38px",
                color: "white",
              }}
            />
            <div
              className="ts-signal-line absolute -left-10 top-1/2 h-28 w-[120%] -translate-y-1/2 rotate-[-8deg] bg-gradient-to-r from-transparent via-owl-teal/18 to-transparent blur-sm"
              style={{ opacity: 0, animation: "ts-scan-drift 7s ease-in-out infinite" }}
            />

            <div className="absolute left-1/2 top-1/2 h-[11rem] w-[11rem] -translate-x-1/2 -translate-y-1/2 md:h-[14rem] md:w-[14rem]">
              <div className="ts-ring absolute inset-0 rounded-full border border-owl-teal/35" style={{ opacity: 0, transform: "scale(1.18)" }} />
              <div className="ts-ring absolute inset-0 rounded-full border border-white/14" style={{ opacity: 0, transform: "scale(1.55)" }} />
              <div className="ts-ring absolute inset-0 rounded-full border border-owl-teal/18" style={{ opacity: 0, transform: "scale(2)" }} />
              <a
                href="https://www.owlsurf.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit owlsurf.com"
                className="relative z-10 flex h-full w-full cursor-pointer items-center justify-center transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div
                  className="ts-logo-inner flex h-full w-full items-center justify-center"
                  style={{ clipPath: "circle(0% at 50% 50%)" }}
                >
                  <LiquidGlassCard borderRadius="50%" padding="7px" blur={15} brightness={1.12} backgroundColor="rgba(75, 194, 194, 0.08)">
                    <OwlSurfLogo className="h-full w-full rounded-full" />
                  </LiquidGlassCard>
                </div>
              </a>
            </div>

            <span className="ts-orbit-node absolute left-[16%] top-[24%] h-2.5 w-2.5 rounded-full bg-owl-teal shadow-[0_0_24px_rgba(75,194,194,0.8)]" style={{ opacity: 0 }} />
            <span className="ts-orbit-node absolute right-[18%] top-[18%] h-1.5 w-1.5 rounded-full bg-white/70" style={{ opacity: 0 }} />
            <span className="ts-orbit-node absolute bottom-[24%] left-[22%] h-1.5 w-1.5 rounded-full bg-white/60" style={{ opacity: 0 }} />
            <span className="ts-orbit-node absolute bottom-[18%] right-[16%] h-3 w-3 rounded-full border border-owl-teal/70" style={{ opacity: 0 }} />
          </aside>
        </div>

        {/* BOTTOM: centered CTA over a centered partner badge strip */}
        <div className="flex flex-col items-center gap-8 md:gap-10">
          {onViewCaseStudies && (
            <div className="relative">
              <Arrow19
                className="ts-arrow absolute -top-12 -right-8 w-14 h-14 md:w-16 md:h-16 text-primary/70 pointer-events-none"
                style={{ opacity: 0, transform: "rotate(120deg) scaleX(-1)" }}
              />
              <div className="ts-button" style={{ opacity: 0 }}>
                <MagneticButton
                  onClick={onViewCaseStudies}
                  strength={0.32}
                  radius={170}
                  className="relative overflow-hidden rounded-full px-7 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white transition-shadow duration-300"
                  style={{
                    background: "linear-gradient(135deg, hsl(180 45% 53%), hsl(180 45% 40%))",
                    boxShadow: "0 4px 24px rgba(75, 194, 194, 0.45)",
                  }}
                >
                  <span className="relative z-10">Review case studies →</span>
                  <span
                    className="absolute inset-0 z-0"
                    style={{
                      background: "linear-gradient(110deg, transparent 30%, hsl(0 0% 100% / 0.35) 50%, transparent 70%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer-cascade 2.5s ease-in-out infinite",
                    }}
                  />
                </MagneticButton>
              </div>
            </div>
          )}

          {/* Partner badge strip — secondary credibility, centered */}
          <div className="flex translate-y-5 flex-col items-center gap-3 md:translate-y-8">
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.24em] uppercase text-white/35 font-sans">
              Platform partners
            </span>
            <div className="flex w-full flex-row flex-wrap items-center justify-center gap-x-7 gap-y-4 md:flex-nowrap md:gap-x-11">
              {credibilityBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="ts-cred-badge flex h-[74px] items-center justify-center md:h-[92px]"
                  style={{ opacity: 0 }}
                >
                  <img
                    src={badge.src}
                    alt={badge.label}
                    className={`block w-auto max-w-none object-contain ${badge.className}`}
                    loading="eager"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default TitleSlide;
