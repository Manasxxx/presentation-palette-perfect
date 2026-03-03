import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";
import mitsuiLogo from "@/assets/client-mitsui.png";
import dehnLogo from "@/assets/client-dehn.png";
import kurarayLogo from "@/assets/client-kuraray.png";
import cultfitLogo from "@/assets/client-cultfit.png";

type Client = {
  name: string;
  logo?: string;
  large?: boolean;
};

const allClients: Client[] = [
  { name: "Mitsui Chemicals", logo: mitsuiLogo },
  { name: "DEHN", logo: dehnLogo },
  { name: "VNT" },
  { name: "Kuraray", logo: kurarayLogo },
  { name: "GirlUp" },
  { name: "Cliques" },
  { name: "IIM Lucknow" },
  { name: "AVI Global Plast" },
  { name: "The Baxsaa Co." },
  { name: "Check This Property" },
  { name: "Cult.fit", logo: cultfitLogo, large: true },
];

const firstRow = allClients.slice(0, Math.ceil(allClients.length / 2));
const secondRow = allClients.slice(Math.ceil(allClients.length / 2));

const ClientCard = ({ client }: { client: Client }) => (
  <div className="flex items-center justify-center px-8 py-4 rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm min-w-[160px] h-[80px]">
    {client.logo ? (
      <img
        src={client.logo}
        alt={client.name}
        className={client.large ? "h-16 md:h-20 w-auto object-contain" : "h-8 md:h-10 w-auto object-contain"}
      />
    ) : (
      <span className="text-sm md:text-base font-semibold text-foreground whitespace-nowrap">
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
          className="text-4xl md:text-6xl font-black tracking-tight mb-12 text-center"
        >
          <span className="text-foreground">MAJOR </span>
          <span className="text-gradient-green">CLIENTS</span>
        </motion.h2>

        <div className="relative flex flex-col gap-6">
          <Marquee pauseOnHover className="[--duration:30s] [--gap:1.5rem]">
            {firstRow.map((client) => (
              <ClientCard key={client.name} client={client} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:30s] [--gap:1.5rem]">
            {secondRow.map((client) => (
              <ClientCard key={client.name} client={client} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />
        </div>
      </div>
    </section>
  );
};

export default ClientsSlide;
