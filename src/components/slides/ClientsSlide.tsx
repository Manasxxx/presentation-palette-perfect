import { useEffect, useRef } from "react";
import { animate } from "animejs";
import LogoLoop from "@/components/ui/LogoLoop/LogoLoop";
import { GoogleMark, MetaMark } from "@/components/ui/brand-marks";
import PrismaticBurst from "@/components/ui/PrismaticBurst/PrismaticBurst";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLowPowerMode } from "@/hooks/use-low-power";
import { animateSlideHeading, getSharedSlideMotionProfile, slideEditorialEase } from "./slide-motion";
import cultfitLogo from "@/assets/client-cultfit.png";
import vntLogo from "@/assets/client-vnt.png";
import girlupLogo from "@/assets/client-girlup.png";
import cliquesLogo from "@/assets/client-cliques.png";
import aviLogo from "@/assets/client-avi.png";
import iimlLogo from "@/assets/client-iiml.png";
import baxsaaLogo from "@/assets/client-baxsaa.png";
import ctpLogo from "@/assets/client-ctp.png";
import welhamLogo from "@/assets/client-welham2.png";

type Client = {
  name: string;
  src: string;
  alt: string;
};

const allClients: Client[] = [
  { name: "VNT", src: vntLogo, alt: "VNT" },
  { name: "GirlUp", src: girlupLogo, alt: "GirlUp" },
  { name: "Cliques", src: cliquesLogo, alt: "Cliques" },
  { name: "IIM Lucknow", src: iimlLogo, alt: "IIM Lucknow" },
  { name: "AVI Global Plast", src: aviLogo, alt: "AVI Global Plast" },
  { name: "The Baxsaa Co.", src: baxsaaLogo, alt: "The Baxsaa Co." },
  { name: "Check This Property", src: ctpLogo, alt: "Check This Property" },
  { name: "Cult.fit", src: cultfitLogo, alt: "Cult.fit" },
  { name: "Welham", src: welhamLogo, alt: "Welham" },
];

const firstRow = allClients.slice(0, Math.ceil(allClients.length / 2));
const secondRow = allClients.slice(Math.ceil(allClients.length / 2));

// Mobile: three rows, each a distinct set of logos so the same logo never
// appears in two rows at the same moment.
const mobileRow1 = allClients.slice(0, 3);
const mobileRow2 = allClients.slice(3, 6);
const mobileRow3 = allClients.slice(6, 9);

const renderClientLogo = (client: Client, key: React.Key) => (
  <div
    key={key}
    className="flex h-[96px] w-[188px] items-center justify-center rounded-lg border border-white/12 bg-[#0b1217]/72 px-4 backdrop-blur-sm transition-[border-color,background-color,transform] duration-300 hover:border-primary/60 hover:bg-primary/10 md:h-[128px] md:w-[252px] md:px-5"
  >
    <img
      src={client.src}
      alt={client.alt}
      className="max-h-[84px] max-w-[170px] object-contain md:max-h-[114px] md:max-w-[238px]"
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  </div>
);

const ClientsSlide = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggered = useRef(false);
  const isMobile = useIsMobile();
  const lowPower = useLowPowerMode();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const heading = el.querySelector(".cl-heading") as HTMLElement | null;
    const cards = el.querySelector(".cl-cards") as HTMLElement | null;
    if (!heading || !cards) return;

    // Initial hidden state set via JS — so content stays visible if this never runs
    heading.style.opacity = "0";
    heading.style.transform = "translateY(40px)";
    cards.style.opacity = "0";
    cards.style.transform = "translateY(40px)";

    const reveal = () => {
      if (triggered.current) return;
      triggered.current = true;
      const profile = getSharedSlideMotionProfile(isMobile);
      animateSlideHeading(el, ".cl-heading", isMobile);
      animate(cards, {
        opacity: [0, 1],
        translateY: [18, 0],
        filter: ["blur(7px)", "blur(0px)"],
        duration: isMobile ? 860 : 980,
        delay: profile.contentDelay + 80,
        ease: slideEditorialEase,
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
      },
      { threshold: 0.15 }
    );
    observer.observe(el);

    // Desktop fallback only. On mobile this slide is mounted one step early, so
    // a timeout can run the animation before the user reaches the slide.
    const fallback = isMobile ? 0 : window.setTimeout(reveal, 600);

    return () => {
      observer.disconnect();
      if (fallback) window.clearTimeout(fallback);
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="slide font-sans"
    >
      {/* PrismaticBurst shimmer backdrop. Documented mobile exception to the
          desktop-only WebGL rule (prod.md): the Clients slide runs it on mobile too.
          DPR cap 1.25, RAF pauses offscreen; low-power machines drop the cap to
          0.75 (FPS watchdog) so the same shimmer renders fewer fragments. */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <PrismaticBurst
          colors={["#4bc2c2", "#14b8a6", "#0f766e", "#134e4a", "#0a2322"]}
          speed={0.18}
          maxDpr={lowPower ? 0.75 : 1.25}
        />
      </div>
      {/* Full-width wrapper to defeat .slide's items-center/justify-center */}
      <div className="relative z-10 flex h-full w-full flex-col px-8 pb-10 pt-[5.25rem] md:px-12 md:pb-12 md:pt-16">
        <header className="cl-heading text-left self-start">
          <h2 className="font-sans text-[2.4rem] sm:text-[3rem] md:text-[clamp(3.4rem,5.9vw,6.6rem)] font-black uppercase leading-[1.02] tracking-normal text-white text-left pb-2 [overflow-wrap:anywhere]">
            <span className="font-sans not-italic">Our </span>
            <span className="cl-title-accent font-sans not-italic text-primary inline-block pr-2">Clients</span>
          </h2>
        </header>

        <div className="cl-cards relative flex flex-1 w-full flex-col justify-center gap-4 md:gap-6">
          {/* Mobile: three logo sliders (replaces the credibility pills), each a
              distinct logo set so no logo repeats across rows at the same time */}
          <div className="flex flex-col gap-4 md:hidden">
            <LogoLoop
              logos={mobileRow1}
              speed={58}
              direction="left"
              logoHeight={96}
              gap={22}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#090d12"
              renderItem={renderClientLogo}
              ariaLabel="Clients row one"
            />
            <LogoLoop
              logos={mobileRow2}
              speed={66}
              direction="right"
              logoHeight={96}
              gap={22}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#090d12"
              renderItem={renderClientLogo}
              ariaLabel="Clients row two"
            />
            <LogoLoop
              logos={mobileRow3}
              speed={54}
              direction="left"
              logoHeight={96}
              gap={22}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#090d12"
              renderItem={renderClientLogo}
              ariaLabel="Clients row three"
            />
          </div>

          {/* Desktop: two logo sliders + credibility pills */}
          <div className="hidden md:flex md:flex-col md:gap-6">
            <LogoLoop
              logos={firstRow}
              speed={64}
              direction="left"
              logoHeight={96}
              gap={22}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#090d12"
              renderItem={renderClientLogo}
              ariaLabel="Major clients row one"
            />
            <LogoLoop
              logos={secondRow}
              speed={57}
              direction="right"
              logoHeight={96}
              gap={22}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#090d12"
              renderItem={renderClientLogo}
              ariaLabel="Major clients row two"
            />

            {/* Credibility strip — pills in the same family as the sector / outcome pills */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                { n: "End-to-end", l: "Brand to demand" },
                { n: "6", l: "Sectors served" },
                { n: "India + APAC", l: "Markets reached" },
                {
                  n: (
                    <span className="flex items-center gap-2">
                      <MetaMark className="h-5 w-5 shrink-0" />
                      <span aria-hidden="true" className="text-white/40">+</span>
                      <GoogleMark className="h-5 w-5 shrink-0" />
                      <span className="sr-only">Meta + Google</span>
                    </span>
                  ),
                  l: "Certified partner",
                },
                { n: "B2B", l: "Built for complex sales" },
              ].map((stat) => (
                <span
                  key={stat.l}
                  className="flex min-h-[3.25rem] items-center justify-center gap-3 rounded-full border border-white/14 bg-white/[0.06] px-6 py-3 backdrop-blur-sm"
                >
                  <span className="font-sans text-[1.02rem] font-black tabular-nums leading-none tracking-tight text-primary">
                    {stat.n}
                  </span>
                  <span className="font-body text-[0.78rem] font-bold uppercase leading-none tracking-[0.16em] text-white/70">
                    {stat.l}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSlide;
