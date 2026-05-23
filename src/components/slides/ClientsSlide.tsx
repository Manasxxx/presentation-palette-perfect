import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { Marquee } from "@/components/ui/marquee";
import PrismaticBurst from "@/components/ui/PrismaticBurst/PrismaticBurst";
import cultfitLogo from "@/assets/client-cultfit.png";
import vntLogo from "@/assets/client-vnt.png";
import girlupLogo from "@/assets/client-girlup.png";
import cliquesLogo from "@/assets/client-cliques.png";
import aviLogo from "@/assets/client-avi.png";
import iimlLogo from "@/assets/client-iiml.png";
import baxsaaLogo from "@/assets/client-baxsaa.png";
import ctpLogo from "@/assets/client-ctp.png";
import welhamLogo from "@/assets/client-welham2.png";
import extraLogo from "@/assets/client-extra.png";

type Client = {
  name: string;
  logo?: string;
};

const allClients: Client[] = [
  { name: "VNT", logo: vntLogo },
  { name: "GirlUp", logo: girlupLogo },
  { name: "Cliques", logo: cliquesLogo },
  { name: "IIM Lucknow", logo: iimlLogo },
  { name: "AVI Global Plast", logo: aviLogo },
  { name: "The Baxsaa Co.", logo: baxsaaLogo },
  { name: "Check This Property", logo: ctpLogo },
  { name: "Cult.fit", logo: cultfitLogo },
  { name: "Welham", logo: welhamLogo },
  { name: "Client", logo: extraLogo },
];

const firstRow = allClients.slice(0, Math.ceil(allClients.length / 2));
const secondRow = allClients.slice(Math.ceil(allClients.length / 2));

const ClientCard = ({ client }: { client: Client }) => (
  <div className="flex flex-row items-center justify-center px-8 py-5 md:px-12 md:py-8 rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm min-w-[170px] md:min-w-[240px] h-[85px] md:h-[120px]">
    {client.logo ? (
      <img
        src={client.logo}
        alt={client.name}
        className="h-14 md:h-24 w-auto object-contain max-w-[150px] md:max-w-[220px]"
      />
    ) : (
      <span className="text-sm md:text-lg font-semibold text-foreground whitespace-nowrap">
        {client.name}
      </span>
    )}
  </div>
);

const ClientsSlide = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggered = useRef(false);

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
        duration: 800,
        ease: "out(3)",
      });
      animate(cards, {
        opacity: 1,
        translateY: 0,
        duration: 800,
        delay: 200,
        ease: "out(3)",
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
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <PrismaticBurst
          colors={["#4bc2c2", "#14b8a6", "#0f766e", "#134e4a", "#0a2322"]}
          speed={0.18}
        />
      </div>

      {/* Full-width wrapper to defeat .slide's items-center/justify-center */}
      <div className="relative z-10 flex h-full w-full flex-col px-8 pt-24 pb-10 md:px-12 md:pt-24 md:pb-12">
        <header className="cl-heading text-left self-start">
          <span className="text-[10px] md:text-xs tracking-[0.3em] text-primary font-medium mb-3 block">
            WHO WE WORK WITH
          </span>
          <h2 className="font-sans text-[clamp(3.4rem,5.9vw,6.6rem)] font-black uppercase leading-[0.95] tracking-normal text-white text-left pb-2">
            <span className="font-sans not-italic">MAJOR </span>
            <span className="font-sans not-italic text-gradient-green inline-block pr-2">CLIENTS</span>
          </h2>
        </header>

        <div
          className="cl-cards relative my-auto flex w-full flex-col gap-4 md:gap-6"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
          }}
        >
          <Marquee
            repeat={4}
            pauseOnHover
            className="[--duration:30s] [--gap:1rem] md:[--gap:1.5rem]"
          >
            {firstRow.map((client) => (
              <ClientCard key={client.name} client={client} />
            ))}
          </Marquee>
          <Marquee
            repeat={4}
            reverse
            pauseOnHover
            className="[--duration:34s] [--gap:1rem] md:[--gap:1.5rem]"
          >
            {secondRow.map((client) => (
              <ClientCard key={client.name} client={client} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default ClientsSlide;
