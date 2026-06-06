import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { ArrowUpRight } from "lucide-react";
import FlyonFooter from "@/components/blocks/FlyonFooter";
import { OwlSurfLogo } from "@/components/OwlSurfLogo";
import { Meteors } from "@/components/ui/meteors";
import { WordRotate } from "@/components/ui/word-rotate";
import { useIsMobile } from "@/hooks/use-mobile";
import { animateSlideAccent, animateSlideHeading, getSharedSlideMotionProfile, slideContentSpring, slideEditorialEase, slideSettleEase } from "./slide-motion";

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
        translateY: [24, 0],
        scale: [0.96, 1],
        duration: 850,
        delay: stagger(profile.itemStagger, { start: profile.contentDelay }),
        ease: slideContentSpring,
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(75,194,194,0.16),transparent_56%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <Meteors
          number={28}
          angle={45}
          minDuration={3}
          maxDuration={7}
          className="!h-1 !w-1 bg-primary shadow-[0_0_8px_2px_rgba(75,194,194,0.55)]"
        />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-start px-6 pb-28 pt-7 text-center md:justify-center md:pb-32 md:pt-8">
        {/* OwlSurf ripple mark — hero */}
        <div className="ct-mark relative mb-3 aspect-square w-[236px] opacity-0 md:mb-4 md:w-[300px]">
          <div className="ct-mark-inner relative flex h-full w-full items-center justify-center rounded-full border border-white/12 opacity-0">
            <div className="absolute inset-[0.55rem] rounded-full border border-primary/25 md:inset-3" />
            <div className="absolute inset-5 rounded-full bg-primary/[0.05] blur-sm md:inset-7" />
            <div className="relative flex h-[64%] w-[64%] items-center justify-center rounded-full border border-primary/35 bg-black/45 p-2 shadow-[0_0_70px_rgba(75,194,194,0.2)]">
              <OwlSurfLogo className="h-full w-full rounded-full" />
            </div>
          </div>
        </div>

        <span className="ct-reveal mb-3 block text-[11px] font-bold uppercase tracking-[0.34em] text-primary opacity-0 md:mb-4 md:text-xs">
          Let’s talk
        </span>

        <h2 className="ct-heading flex max-w-[22rem] flex-wrap items-center justify-center gap-x-3 gap-y-2 font-sans text-[clamp(1.7rem,7vw,2.5rem)] font-black uppercase leading-[1.08] tracking-normal text-white opacity-0 [overflow-wrap:anywhere] md:max-w-none md:flex-nowrap md:gap-x-4 md:text-[clamp(1.7rem,3.1vw,2.6rem)]">
          <span className="shrink-0 whitespace-nowrap not-italic">We make the</span>
          <span className="ct-title-accent inline-flex shrink-0 rounded-full border border-owl-teal/45 bg-owl-teal px-4 py-1.5 text-[1.4rem] font-black uppercase leading-[1.16] tracking-[0.02em] text-background shadow-[0_0_28px_rgba(75,194,194,0.28)] md:px-6 md:py-2 md:text-[clamp(1.5rem,2.7vw,2.4rem)]">
            <WordRotate words={rotatingComplexity} duration={1900} className="text-center" />
          </span>
          <span className="shrink-0 whitespace-nowrap not-italic">easy to</span>
          <span className="inline-flex shrink-0 rounded-full border border-owl-teal/45 bg-owl-teal px-4 py-1.5 text-[1.4rem] font-black uppercase leading-[1.16] tracking-[0.02em] text-background shadow-[0_0_28px_rgba(75,194,194,0.28)] md:px-6 md:py-2 md:text-[clamp(1.5rem,2.7vw,2.4rem)]">
            <WordRotate words={rotatingChoose} duration={1900} className="text-center" />
          </span>
        </h2>

        <p className="ct-reveal mt-4 max-w-[19rem] font-body text-sm leading-relaxed text-white/60 opacity-0 md:mt-4 md:max-w-[34rem] md:text-lg">
          Bring the product, the market, and the sales problem. You’ll see it the way your buyers should, fast.
        </p>

        <div className="ct-reveal mt-5 flex w-full max-w-[20rem] flex-col items-stretch gap-3 opacity-0 sm:w-auto sm:max-w-none sm:flex-row sm:items-center md:mt-5">
          <a
            href="mailto:growth@owlsurf.com"
            className="group inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-6 py-3 font-sans text-sm font-bold uppercase tracking-[0.05em] text-background shadow-[0_0_30px_rgba(75,194,194,0.3)] transition duration-300 hover:bg-primary/90 md:text-base"
          >
            growth@owlsurf.com
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.4} />
          </a>
          <a
            href="tel:+919520367546"
            className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-white/22 px-6 py-3 font-sans text-sm font-semibold tracking-[0.03em] text-white/82 transition duration-300 hover:border-primary/60 hover:text-primary md:text-base"
          >
            +91 9520 367546
          </a>
        </div>
      </div>

      <div className="ct-reveal absolute inset-x-5 bottom-6 z-20 opacity-0 md:inset-x-12 md:bottom-8">
        <FlyonFooter />
      </div>
    </section>
  );
};

export default ContactSlide;
