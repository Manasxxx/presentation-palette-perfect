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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 15 }
  }
};

const ClientsSlide = () => {
  return (
    <section className="slide py-20 px-6 hexagon-pattern overflow-hidden">
      <div className="absolute inset-0 bg-background/90" />
      
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 80, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black tracking-tight mb-12 text-center"
        >
          <span className="text-foreground">MAJOR </span>
          <span className="text-gradient-teal">CLIENTS</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 md:gap-6"
        >
          {clients.map((client) => (
            <motion.div
              key={client}
              variants={itemVariants}
              whileHover={{ scale: 1.1, rotate: 2 }}
              className="card-glass px-6 py-4 rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-default"
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
