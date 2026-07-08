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
import { animate, cubicBezier, spring, stagger } from "animejs";
import { Globe } from "@/components/ui/globe";
import { LiquidGlassCard } from "react-liquid-glass-card";
import { useIsMobile } from "@/hooks/use-mobile";
import { OwlSurfLogo } from "@/components/OwlSurfLogo";
import { WordRotate } from "@/components/ui/word-rotate";
import { getTitleTextMotionProfile } from "./title-motion";
import metaPartnerBadge from "@/assets/badge-meta-partner-trim.png";
import googlePartnerBadge from "@/assets/badge-google-partner-2026-trim.png";
import linkedinMarketingPartnerBadge from "@/assets/badge-linkedin-marketing-partner-trim.png";

// Badges are trimmed to content and shown on identical white chips at one fixed
// height, so the row reads as a uniform, vertically-aligned partner strip.
const credibilityBadges = [
  { label: "LinkedIn Marketing Partner", src: linkedinMarketingPartnerBadge },
  { label: "Google Ads Agency Partner", src: googlePartnerBadge },
  { label: "Meta Agency Partner", src: metaPartnerBadge },
];

const rotatingIndustries = ["Solar", "Industrial", "Chemical", "Pharma", "Manufacturing", "Mobility", "Real Estate"];
const rotatingTrustWords = ["trust", "choose", "believe", "prefer", "buy from"];

const TitleSlide = ({ onViewCaseStudies }: { onViewCaseStudies?: () => void }) => {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Entry animation timeline
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const profile = getTitleTextMotionProfile(isMobile);
    const editorialEase = cubicBezier(0.18, 0.82, 0.18, 1);
    const signalEase = cubicBezier(0.16, 1, 0.3, 1);
    const wordmarkEase = spring({ stiffness: 145, damping: 18, mass: 0.9 });
    const pillEase = spring({ stiffness: 105, damping: 14, mass: 0.8 });

    animate(el.querySelectorAll(".ts-brand-token"), {
      opacity: [0, 1],
      translateY: [profile.wordmarkDropY, 0],
      scale: [0.94, 1],
      filter: ["blur(10px)", "blur(0px)"],
      duration: profile.wordmarkDuration,
      delay: stagger(profile.wordmarkStagger, { start: 90 }),
      ease: wordmarkEase,
    });

    animate(el.querySelectorAll(".ts-brand-subtitle, .ts-brand-rule"), {
      opacity: [0, 1],
      translateY: [-10, 0],
      scaleX: [0.74, 1],
      transformOrigin: ["left center", "left center"],
      duration: 740,
      delay: 260,
      ease: signalEase,
    });

    animate(el.querySelectorAll(".ts-cover-line"), {
      opacity: [0, 1],
      translateY: [34, 0],
      filter: ["blur(12px)", "blur(0px)"],
      duration: profile.lineDuration,
      delay: stagger(profile.lineStagger, { start: 260 }),
      ease: editorialEase,
    });

    animate(el.querySelectorAll(".ts-pill-shell"), {
      opacity: [0, 1],
      translateY: [28, 0],
      scale: [0.78, 1.035, 1],
      filter: ["blur(14px)", "blur(0px)"],
      duration: profile.pillDuration,
      delay: stagger(profile.pillStagger, { start: 430 }),
      ease: pillEase,
    });

    animate(el.querySelectorAll(".ts-pill-glow"), {
      opacity: [0, 0.72, 0.38],
      scaleX: [0.45, 1.08, 1],
      duration: profile.pillDuration + 180,
      delay: stagger(profile.pillStagger, { start: 520 }),
      ease: editorialEase,
    });

    animate(el.querySelector(".ts-logo-outer")!, {
      opacity: [0, 1],
      scale: [0.85, 1],
      duration: 1000,
      delay: 250,
      ease: signalEase,
    });

    animate(el.querySelector(".ts-logo-inner")!, {
      clipPath: ["circle(0% at 50% 50%)", "circle(50% at 50% 50%)"],
      duration: 1200,
      delay: 400,
      ease: signalEase,
    });

    animate(el.querySelectorAll(".ts-ring"), {
      opacity: [0, 0.6],
      scale: [0.6, 1],
      duration: 1400,
      delay: (_, i) => 500 + i * 120,
      ease: signalEase,
    });

    animate(el.querySelectorAll(".ts-info-col"), {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 800,
      delay: (_, i) => profile.subcopyDelay + i * 120,
      ease: editorialEase,
    });

    animate(el.querySelectorAll(".ts-orbit-node, .ts-signal-line"), {
      opacity: [0, 1],
      scale: [0.8, 1],
      delay: (_, i) => 720 + i * 80,
      duration: 620,
      ease: signalEase,
    });

    animate(el.querySelectorAll(".ts-cred-badge"), {
      opacity: [0, 1],
      translateY: [12, 0],
      scale: [0.96, 1],
      duration: 700,
      delay: (_, i) => profile.badgeDelay + i * 90,
      ease: editorialEase,
    });

    const btn = el.querySelector(".ts-button");
    if (btn) {
      animate(btn, {
        opacity: [0, 1],
        translateY: [18, 0],
        scale: [0.88, 1.04, 1],
        duration: 950,
        delay: profile.badgeDelay - 160,
        ease: pillEase,
      });
    }

    const arrow = el.querySelector(".ts-arrow");
    if (arrow) {
      animate(arrow, {
        opacity: [0, 0.7],
        scale: [0.5, 1],
        duration: 800,
        delay: 1400,
        ease: spring({ stiffness: 200, damping: 12 }),
      });
    }

  }, [isMobile]);

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

      {/* Globe — top hemisphere rises from the bottom edge. Runs on mobile too
          (user-requested exception to the desktop-only WebGL rule; cobe is a light
          single-canvas renderer). On mobile the globe sits inside the viewport with no horizontal bleed,
          so it cannot drift into the right edge. */}
      <div
        className="absolute pointer-events-none"
        style={
          isMobile
            ? {
                top: 'calc(100% - 66vw)',
                left: '-12vw',
                right: '-12vw',
                width: '124vw',
                height: '124vw',
                transform: 'none',
                marginInline: 'auto',
              }
            : {
                top: '100%',
                left: '50%',
                width: '120%',
                height: '120%',
                transform: 'translate(-50%, -50%)',
              }
        }
      >
        <Globe className={`${isMobile ? "opacity-50" : "opacity-25"} !max-w-none !w-full`} />
      </div>

      {/* Main content — editorial cover: brand lockup top, hook hero center, credibility baseline bottom */}
      <div
        ref={contentRef}
        className="relative z-10 w-full h-full px-6 md:px-16 lg:px-24 flex flex-col justify-between py-14 md:py-[clamp(2.5rem,6svh,5rem)]"
      >
        {/* TOP: brand lockup */}
        <div className="flex flex-row items-start justify-center gap-6 md:mt-5 md:-ml-4 md:justify-between lg:-ml-12">
          <div className="ts-wordmark-line w-full min-w-0 text-center md:w-auto md:text-left">
            <span className="block pb-2 text-left font-sans text-[2rem] font-black uppercase leading-[1.02] tracking-normal text-white [overflow-wrap:anywhere] sm:text-[2.6rem] md:text-[min(clamp(3rem,4.8vw,5.2rem),10svh)]">
              <span className="ts-brand-token inline-block font-sans not-italic text-owl-teal drop-shadow-[0_0_18px_rgba(75,194,194,0.28)]" style={{ opacity: 0 }}>OWL</span>
              <span className="ts-brand-token ts-title-accent mr-1 inline-block font-sans not-italic text-owl-teal drop-shadow-[0_0_18px_rgba(75,194,194,0.28)]" style={{ opacity: 0 }}>
                SURF
              </span>
              <span className="ts-brand-token ml-2 inline-block font-sans not-italic text-white md:ml-3" style={{ opacity: 0 }}>DIGITAL</span>
            </span>
          </div>
          <div className="ts-brand-rule hidden w-[23vw] max-w-[24rem] origin-left border-t border-white/15 md:block" aria-hidden="true" style={{ opacity: 0 }}>
            <div className="mt-2 h-px w-1/3 bg-owl-teal/50 shadow-[0_0_18px_rgba(75,194,194,0.32)]" />
          </div>
        </div>

        {/* CENTER: editorial claim (left) + signal map (right) */}
        <div className="grid translate-y-0 items-center gap-8 md:translate-y-0 md:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.7fr)] md:gap-12 lg:gap-16">
          <div className="relative min-w-0">
            <h1 className="ts-hook mx-auto max-w-[48rem] text-center font-sans font-black tracking-normal text-white [overflow-wrap:anywhere] md:mx-0 md:text-left">
              <span className="block max-w-[22rem] md:max-w-[52rem]">
                <span className="ts-cover-line block font-sans text-[1.08rem] font-semibold uppercase leading-none tracking-[0.15em] text-white/76 md:text-[clamp(1.25rem,1.7vw,1.72rem)] md:tracking-[0.14em]" style={{ opacity: 0 }}>
                  We turn,
                </span>
                <span className="mt-3 block md:mt-4">
                  <span className="ts-pill-shell title-pill relative inline-flex overflow-hidden rounded-full border border-owl-teal/45 bg-owl-teal px-4 py-2 font-sans text-[1.42rem] font-black uppercase leading-none tracking-[0.04em] text-background shadow-[0_0_28px_rgba(75,194,194,0.28)] sm:text-[1.58rem] md:-ml-3 md:px-5 md:py-2.5 md:text-[clamp(1.65rem,3vw,3.1rem)]" style={{ opacity: 0 }}>
                    <span className="ts-pill-glow pointer-events-none absolute inset-x-3 bottom-1 h-1 rounded-full bg-white/55 blur-sm" style={{ opacity: 0 }} />
                    <WordRotate words={rotatingIndustries} duration={1900} className="text-center" />
                  </span>
                </span>
                <span className="ts-cover-line mt-3 block font-sans text-[1.08rem] font-semibold uppercase leading-none tracking-[0.15em] text-white/76 md:text-[clamp(1.25rem,1.7vw,1.72rem)] md:tracking-[0.14em]" style={{ opacity: 0 }}>
                  businesses, into brands that
                </span>
                <span className="ts-cover-line mt-2 block font-sans text-[1.08rem] font-semibold uppercase leading-none tracking-[0.15em] text-white/76 md:mt-3 md:text-[clamp(1.25rem,1.7vw,1.72rem)] md:tracking-[0.14em]" style={{ opacity: 0 }}>
                  buyers actually
                </span>
                <span className="mt-3 block md:mt-4">
                  <span
                    className="ts-pill-shell title-pill relative inline-flex overflow-hidden rounded-full border border-owl-teal/45 bg-owl-teal px-4 py-2 font-sans text-[1.42rem] font-black uppercase leading-none tracking-[0.04em] text-background shadow-[0_0_28px_rgba(75,194,194,0.28)] sm:text-[1.58rem] md:-ml-3 md:px-5 md:py-2.5 md:text-[clamp(1.65rem,3vw,3.1rem)]"
                    style={{ opacity: 0 }}
                  >
                    <span className="ts-pill-glow pointer-events-none absolute inset-x-3 bottom-1 h-1 rounded-full bg-white/55 blur-sm" style={{ opacity: 0 }} />
                    <WordRotate words={rotatingTrustWords} duration={1900} className="text-center" />
                  </span>
                  <span className="ts-cover-line ml-1 align-baseline font-sans text-[1.08rem] font-semibold leading-none text-white/76 md:text-[clamp(1.25rem,1.7vw,1.72rem)]" style={{ opacity: 0 }}>.</span>
                </span>
              </span>
            </h1>
          </div>

          <aside className="ts-logo-outer relative min-h-[13.5rem] min-w-0 overflow-hidden sm:min-h-[14.5rem] md:min-h-[min(31rem,46svh)]" style={{ opacity: 0 }} aria-label="OwlSurf editorial signal graphic">
            <div
              className="ts-signal-line absolute left-[13%] top-[20%] h-[62%] w-[62%] rounded-full border border-white/10"
              style={{ opacity: 0, animation: "ts-orbit-drift 18s linear infinite" }}
            />
            <div
              className="ts-signal-line absolute right-[4%] top-[8%] h-[76%] w-[76%] rounded-full border border-owl-teal/20"
              style={{ opacity: 0, animation: "ts-orbit-drift 24s linear infinite reverse" }}
            />
            <div
              className="ts-signal-line absolute -left-10 top-1/2 h-28 w-[120%] -translate-y-1/2 rotate-[-8deg] bg-gradient-to-r from-transparent via-owl-teal/18 to-transparent blur-sm"
              style={{ opacity: 0, animation: "ts-scan-drift 7s ease-in-out infinite" }}
            />

            <div className="absolute left-1/2 top-1/2 h-[12.5rem] w-[12.5rem] -translate-x-1/2 -translate-y-1/2 sm:h-[13.2rem] sm:w-[13.2rem] md:h-[18.5rem] md:w-[18.5rem]">
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
        <div className="flex -translate-y-4 flex-col items-center gap-4 md:translate-y-0 md:gap-[clamp(1rem,3svh,2.5rem)]">
          {onViewCaseStudies && (
            <div className="relative">
              <Arrow19
                className="ts-arrow absolute -top-12 -right-8 w-14 h-14 md:w-16 md:h-16 text-primary/70 pointer-events-none"
                style={{ opacity: 0, transform: "rotate(120deg) scaleX(-1)" }}
              />
              <div className="ts-button" style={{ opacity: 0 }}>
                <button
                  type="button"
                  onClick={onViewCaseStudies}
                  className="group relative overflow-hidden rounded-full border border-white/10 bg-white/[0.07] px-7 py-3 font-sans text-xs font-bold uppercase tracking-[0.18em] shadow-[0_4px_24px_rgba(75,194,194,0.22)] backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-300 hover:border-owl-teal/45 hover:bg-owl-teal/10 hover:shadow-[0_6px_30px_rgba(75,194,194,0.32)]"
                >
                  <span
                    aria-hidden="true"
                    className="ts-cta-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                  />
                  <span className="relative inline-flex items-center text-white transition-transform duration-300 group-hover:translate-x-0.5">
                    <span>Review case studies</span>
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Partner badge strip — secondary credibility, centered */}
          <div className="flex flex-col items-center gap-2 md:-translate-y-3 md:gap-3">
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.24em] uppercase text-white/35 font-sans">
              Platform partners
            </span>
            <div className="flex w-full flex-row flex-nowrap items-center justify-center gap-x-3 md:gap-x-8">
              {credibilityBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="ts-cred-badge flex h-[42px] min-w-0 items-center justify-center overflow-hidden rounded-lg md:h-[62px]"
                  style={{ opacity: 0 }}
                >
                  <img
                    src={badge.src}
                    alt={badge.label}
                    className="block h-full w-auto max-w-[30vw] object-contain md:max-w-none"
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
