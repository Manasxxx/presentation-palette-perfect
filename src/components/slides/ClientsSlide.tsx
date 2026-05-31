import { useEffect, useRef } from "react";
import { animate, createSpring } from "animejs";
import LogoLoop from "@/components/ui/LogoLoop/LogoLoop";
import PrismaticBurst from "@/components/ui/PrismaticBurst/PrismaticBurst";
import { useIsMobile } from "@/hooks/use-mobile";
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

const marketNotes = [
  "Industrial and manufacturing clients",
  "Consumer and fitness brands",
  "Education and institutional work",
  "India plus international exposure",
];

const renderClientLogo = (client: Client, key: React.Key) => (
  <div
    key={key}
    className="flex h-[96px] w-[210px] items-center justify-center rounded-lg border border-white/12 bg-[#0b1217]/72 px-8 backdrop-blur-sm transition duration-300 hover:border-primary/60 hover:bg-primary/10 md:h-[128px] md:w-[280px]"
  >
    <img
      src={client.src}
      alt={client.alt}
      className="max-h-[70px] max-w-[165px] object-contain md:max-h-[98px] md:max-w-[230px]"
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
      animate(heading, {
        opacity: 1,
        translateY: 0,
        scale: [0.94, 1],
        duration: 900,
        ease: createSpring({ stiffness: 95, damping: 12 }),
      });
      animate(el.querySelector(".cl-title-accent")!, {
        translateX: [-26, 0],
        filter: ["blur(10px)", "blur(0px)"],
        duration: 900,
        delay: 120,
        ease: "out(4)",
      });
      animate(cards, {
        opacity: 1,
        translateY: [60, -10, 0],
        scale: [0.92, 1.03, 1],
        duration: 1100,
        delay: 200,
        ease: "out(4)",
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
      },
      { threshold: 0.15 }
    );
    observer.observe(el);

    // Fallback: if observer hasn't fired within 600ms, reveal anyway
    const fallback = window.setTimeout(reveal, 600);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="slide font-sans"
    >
      {/* Heavy WebGL backdrop — desktop only (gated off mobile per prod.md) */}
      {!isMobile && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <PrismaticBurst
            colors={["#4bc2c2", "#14b8a6", "#0f766e", "#134e4a", "#0a2322"]}
            speed={0.18}
          />
        </div>
      )}
      {/* Full-width wrapper to defeat .slide's items-center/justify-center */}
      <div className="relative z-10 flex h-full w-full flex-col justify-center px-8 pt-20 pb-10 md:justify-start md:px-12 md:pt-24 md:pb-12">
        <header className="cl-heading text-left self-start">
          <span className="text-[10px] md:text-xs tracking-[0.3em] text-primary font-medium mb-3 block">
            WHO HAS SEEN THE WORK
          </span>
          <h2 className="font-sans text-[2.4rem] sm:text-[3rem] md:text-[clamp(3.4rem,5.9vw,6.6rem)] font-black uppercase leading-[1.02] tracking-normal text-white text-left pb-2 [overflow-wrap:anywhere]">
            <span className="font-sans not-italic">PROOF </span>
            <span className="cl-title-accent font-sans not-italic text-primary inline-block pr-2">CLIENTS</span>
          </h2>
          <div className="mt-4 grid max-w-[58rem] gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {marketNotes.map((note) => (
              <div key={note} className="border-t border-white/15 pt-2 font-body text-sm leading-snug text-white/55">
                {note}
              </div>
            ))}
          </div>
        </header>

        <div className="cl-cards relative mt-8 flex w-full flex-col gap-4 md:my-auto md:mt-0 md:gap-6">
          <LogoLoop
            logos={firstRow}
            speed={46}
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
            speed={40}
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
        </div>
      </div>
    </section>
  );
};

export default ClientsSlide;
