import { motion } from "framer-motion";

const clients = [
  "Mitsui Chemicals",
  "DEHN",
  "VNT",
  "Kuraray",
  "GirlUp",
  "Cliques",
  "IIM Lucknow",
  "AVI Global Plast",
  "The Baxsaa Co.",
];

const ClientsSlide = () => {
  return (
    <section className="slide py-20 px-6 hexagon-pattern">
      <div className="absolute inset-0 bg-background/90" />
      
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-center"
        >
          <span className="text-foreground">MAJOR </span>
          <span className="text-gradient-teal">CLIENTS</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center mb-12 max-w-xl mx-auto"
        >
          Trusted by industry leaders worldwide
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 md:gap-6"
        >
          {clients.map((client, i) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="card-glass px-6 py-4 rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300"
            >
              <span className="text-sm md:text-base font-semibold text-foreground">{client}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsSlide;
