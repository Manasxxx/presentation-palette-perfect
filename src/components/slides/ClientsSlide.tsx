import { motion } from "framer-motion";
import mitsuiLogo from "@/assets/client-mitsui.png";
import dehnLogo from "@/assets/client-dehn.png";
import kurarayLogo from "@/assets/client-kuraray.png";
import cultfitLogo from "@/assets/client-cultfit.png";

type Client = {
  name: string;
  color: string;
  logo?: string;
  large?: boolean;
};

const clients: Client[] = [
  { name: "Mitsui Chemicals", color: "210 100% 30%", logo: mitsuiLogo },
  { name: "DEHN", color: "0 80% 45%", logo: dehnLogo },
  { name: "VNT", color: "220 60% 50%" },
  { name: "Kuraray", color: "210 70% 40%", logo: kurarayLogo },
  { name: "GirlUp", color: "340 80% 55%" },
  { name: "Cliques", color: "260 60% 55%" },
  { name: "IIM Lucknow", color: "25 80% 50%" },
  { name: "AVI Global Plast", color: "145 60% 40%" },
  { name: "The Baxsaa Co.", color: "0 68% 33%" },
  { name: "Check This Property", color: "95 48% 41%" },
  { name: "Cult.fit", color: "0 0% 100%", logo: cultfitLogo, large: true },
];
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 14 }
  }
};

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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 md:gap-5"
        >
          {clients.map((client) => (
            <motion.div
              key={client.name}
              variants={itemVariants}
              whileHover={{ scale: 1.06, y: -4 }}
              className="px-6 py-4 rounded-2xl flex items-center justify-center"
              style={{
                minHeight: "56px",
                transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {client.logo ? (
                <img
                  src={client.logo}
                  alt={client.name}
                  className={client.large ? "h-20 md:h-28 w-auto object-contain" : "h-8 md:h-10 w-auto object-contain"}
                />
              ) : (
                <span className="text-sm md:text-base font-semibold text-foreground">
                  {client.name}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsSlide;
