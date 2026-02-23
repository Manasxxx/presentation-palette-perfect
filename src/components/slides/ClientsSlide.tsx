import { motion } from "framer-motion";
import clientsLogos from "@/assets/clients-logos.png";

const ClientsSlide = () => {
  return (
    <section className="slide py-20 px-0 hexagon-pattern overflow-hidden">
      <div className="absolute inset-0 bg-background/90" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 80, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black tracking-tight mb-14 text-center"
        >
          <span className="text-foreground">MAJOR </span>
          <span className="text-gradient-green">CLIENTS</span>
        </motion.h2>

        {/* Marquee Row 1 - scrolls left */}
        <div className="marquee-container mb-6">
          <div className="marquee-track animate-marquee-left">
            <div className="marquee-item">
              <img src={clientsLogos} alt="Client logos" className="h-16 md:h-20 w-auto" />
            </div>
            <div className="marquee-item">
              <img src={clientsLogos} alt="Client logos" className="h-16 md:h-20 w-auto" />
            </div>
          </div>
        </div>

        {/* Marquee Row 2 - scrolls right */}
        <div className="marquee-container">
          <div className="marquee-track animate-marquee-right">
            <div className="marquee-item">
              <img src={clientsLogos} alt="Client logos" className="h-16 md:h-20 w-auto" />
            </div>
            <div className="marquee-item">
              <img src={clientsLogos} alt="Client logos" className="h-16 md:h-20 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSlide;
