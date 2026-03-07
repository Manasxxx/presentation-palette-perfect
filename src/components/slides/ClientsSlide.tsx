import { useEffect, useRef, useState } from "react";
import { animate, createSpring } from "animejs";
import { Marquee } from "@/components/ui/marquee";
import LightRays from "@/components/LightRays";
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
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);

          animate(el.querySelector(".cl-heading")!, {
            opacity: [0, 1],
            translateY: [60, 0],
            duration: 700,
            ease: "cubicBezier(0.22, 1, 0.36, 1)",
          });
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <section ref={sectionRef} className="slide py-20 px-6 overflow-hidden">
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
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="cl-heading text-3xl md:text-6xl font-black tracking-tight mb-8 md:mb-12 text-center" style={{ opacity: 0 }}>
          <span className="text-foreground">MAJOR </span>
          <span className="text-gradient-green">CLIENTS</span>
        </h2>

        <div className="relative flex flex-col gap-4 md:gap-6">
          <Marquee pauseOnHover className="[--duration:18s] md:[--duration:22s] [--gap:1rem] md:[--gap:1.5rem]">
            {firstRow.map((client) => (
              <ClientCard key={client.name} client={client} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:18s] md:[--duration:22s] [--gap:1rem] md:[--gap:1.5rem]">
            {secondRow.map((client) => (
              <ClientCard key={client.name} client={client} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[10%] md:w-1/4 bg-gradient-to-r from-background" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[10%] md:w-1/4 bg-gradient-to-l from-background" />
        </div>
      </div>
    </section>
  );
};

export default ClientsSlide;
