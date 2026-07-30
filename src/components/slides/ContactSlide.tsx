import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import FlyonFooter from "@/components/blocks/FlyonFooter";
import { OwlSurfLogo } from "@/components/OwlSurfLogo";
import { Ripple } from "@/components/ui/ripple";
import { WordRotate } from "@/components/ui/word-rotate";
import { useIsMobile } from "@/hooks/use-mobile";
import { animateSlideAccent, animateSlideHeading, getSharedSlideMotionProfile, getSlideContentEase, slideEditorialEase, slideSettleEase } from "./slide-motion";

const rotatingComplexity = ["complex", "technical", "complicated", "confusing", "overwhelming"];
const rotatingChoose = ["understand", "explain", "buy", "get", "choose"];

const ContactSlide = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggered = useRef(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reveal = () => {
      if (triggered.current) return;
      triggered.current = true;
      const profile = getSharedSlideMotionProfile(isMobile);

      animate(el.querySelectorAll(".ct-reveal"), {
        opacity: [0, 1],
        translateY: [isMobile ? 16 : 24, 0],
        scale: isMobile ? [1, 1] : [0.96, 1],
        duration: 850,
        delay: stagger(profile.itemStagger, { start: profile.contentDelay }),
        ease: getSlideContentEase(isMobile),
      });

      animateSlideHeading(el, ".ct-heading", isMobile, 120);
      animateSlideAccent(el, ".ct-title-accent", isMobile, 170);

      animate(el.querySelector(".ct-mark"), {
        opacity: [0, 1],
        duration: 800,
        delay: 220,
        ease: slideSettleEase,
      });

      animate(el.querySelector(".ct-mark-inner"), {
        opacity: [0, 1],
        scale: [0.78, 1.08, 1],
        rotate: [8, -1, 0],
        duration: 1350,
        delay: 220,
        ease: slideEditorialEase,
      });

    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    const fallback = window.setTimeout(reveal, 700);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="slide overflow-hidden bg-background font-sans">
      <div className="absolute inset-0 bg-[#07090d]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(75,194,194,0.2),transparent_56%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_76%,rgba(75,194,194,0.13),transparent_34%),radial-gradient(circle_at_84%_76%,rgba(75,194,194,0.12),transparent_34%),linear-gradient(115deg,rgba(75,194,194,0.07),transparent_28%,transparent_70%,rgba(75,194,194,0.06))]" />
      <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(0deg,rgba(75,194,194,0.08),transparent_72%)]" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-start px-6 pb-[15.25rem] pt-[2.35rem] text-center md:justify-center md:pb-32 md:pt-8">
        {/* OwlSurf ripple mark — hero */}
        <div className="ct-mark relative mb-3 aspect-square w-[205px] opacity-0 md:mb-4 md:w-[372px]">
          {/* MagicUI ripple, centered exactly behind the logo mark. Fixed square
              box (not inset-0) so the rings can extend past the mark without the
              mask repeating; radial mask fades them out before the box edge. */}
          <Ripple
            mainCircleSize={236}
            mainCircleOpacity={isMobile ? 0.26 : 0.2}
            numCircles={7}
            accentColor="hsl(var(--primary))"
            ringBorderColor="transparent"
            className="left-1/2 top-1/2 h-[52rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(circle,white_28%,transparent_68%)] md:scale-[1.45]"
          />
          <div className="ct-mark-inner relative flex h-full w-full items-center justify-center rounded-full opacity-0">
            <div className="absolute inset-[0.55rem] rounded-full border border-transparent md:inset-3 md:border-primary/25" />
            <div className="absolute inset-5 rounded-full bg-primary/[0.05] blur-sm md:inset-7" />
            <div className="relative flex h-[64%] w-[64%] items-center justify-center rounded-full border border-primary/35 bg-black/45 p-2 shadow-[0_0_70px_rgba(75,194,194,0.2)] max-md:border-primary/20 max-md:bg-transparent">
              <OwlSurfLogo className="h-full w-full rounded-full" />
            </div>
          </div>
        </div>

        <h2 className="ct-heading flex max-w-[22rem] flex-wrap items-center justify-center gap-x-3 gap-y-1.5 font-sans text-[clamp(1.55rem,6.25vw,2.18rem)] font-black uppercase leading-[1.08] tracking-normal text-white opacity-0 [overflow-wrap:anywhere] md:max-w-none md:flex-nowrap md:gap-x-4 md:text-[clamp(1.7rem,3.1vw,2.6rem)]">
          <span className="shrink-0 whitespace-nowrap not-italic">We make the</span>
          <span className="ct-title-accent inline-flex shrink-0 not-italic rounded-full border border-owl-teal/45 bg-owl-teal px-4 py-1 text-[1.28rem] font-black uppercase leading-[1.16] tracking-[0.02em] text-background shadow-[0_0_28px_rgba(75,194,194,0.28)] md:px-6 md:py-2 md:text-[clamp(1.5rem,2.7vw,2.4rem)]">
            <WordRotate words={rotatingComplexity} duration={1900} lockWidth={isMobile} className="text-center not-italic" />
          </span>
          <span className="shrink-0 whitespace-nowrap not-italic">easy to</span>
          <span className="inline-flex shrink-0 not-italic rounded-full border border-owl-teal/45 bg-owl-teal px-4 py-1 text-[1.28rem] font-black uppercase leading-[1.16] tracking-[0.02em] text-background shadow-[0_0_28px_rgba(75,194,194,0.28)] md:px-6 md:py-2 md:text-[clamp(1.5rem,2.7vw,2.4rem)]">
            <WordRotate words={rotatingChoose} duration={1900} lockWidth={isMobile} className="text-center not-italic" />
          </span>
        </h2>

        <span className="ct-reveal mt-12 block text-[12.5px] font-bold uppercase tracking-[0.34em] text-primary opacity-0 md:mt-5 md:text-xs">
          Let’s talk
        </span>

      </div>

      <div className="ct-reveal absolute inset-x-5 bottom-4 z-[46] opacity-0 md:inset-x-12 md:bottom-8">
        <FlyonFooter />
      </div>
    </section>
  );
};

export default ContactSlide;
