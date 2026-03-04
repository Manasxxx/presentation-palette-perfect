import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";
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
  <div className="flex items-center justify-center px-6 py-4 md:px-10 md:py-6 rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm min-w-[140px] md:min-w-[200px] h-[70px] md:h-[100px]">
    {client.logo ? (
      <img
        src={client.logo}
        alt={client.name}
        className="h-10 md:h-20 w-auto object-contain max-w-[120px] md:max-w-[180px]"
      />
    ) : (
      <span className="text-xs md:text-base font-semibold text-foreground whitespace-nowrap">
        {client.name}
      </span>
    )}
  </div>
);

const ClientsSlide = () => {
  return (
    <section className="slide py-20 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-3xl md:text-6xl font-black tracking-tight mb-8 md:mb-12 text-center"
        >
          <span className="text-foreground">MAJOR </span>
          <span className="text-gradient-green">CLIENTS</span>
        </motion.h2>

        <div className="relative flex flex-col gap-4 md:gap-6">
          <Marquee pauseOnHover className="[--duration:25s] md:[--duration:30s] [--gap:1rem] md:[--gap:1.5rem]">
            {firstRow.map((client) => (
              <ClientCard key={client.name} client={client} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:25s] md:[--duration:30s] [--gap:1rem] md:[--gap:1.5rem]">
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
