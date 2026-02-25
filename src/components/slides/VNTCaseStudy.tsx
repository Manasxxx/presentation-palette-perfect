import { motion } from "framer-motion";
import vntCreative1 from "@/assets/vnt-creative-1.png";
import vntCreative2 from "@/assets/vnt-creative-2.png";

/* VNT brand: electric green #7CC83E, teal #00B4D8, dark #1B3A2D */
const vntGreen = "100 55% 50%";
const vntTeal = "192 100% 42%";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100 }
  }
};

const VNTCaseStudy = () => {
  return (
    <section className="slide py-10 px-6 overflow-hidden relative">
      {/* Circular wipe background — rich green */}
      <motion.div
        initial={{ clipPath: "circle(5% at 50% 50%)", opacity: 0 }}
        whileInView={{ clipPath: "circle(150% at 50% 50%)", opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.5 }}
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(145deg, hsl(120 25% 88%), hsl(140 30% 82%), hsl(${vntGreen} / 0.35))`,
        }}
      />
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          background: `linear-gradient(145deg, hsl(120 25% 88%), hsl(140 30% 82%), hsl(${vntGreen} / 0.35))`,
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-5"
        >
          <span
            className="text-xs tracking-[0.3em] font-medium uppercase"
            style={{ color: `hsl(${vntGreen})` }}
          >
            Case Study
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black tracking-tight mb-3 text-center"
          style={{ color: "hsl(0 0% 15%)" }}
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, hsl(${vntGreen}), hsl(${vntTeal}))`,
            }}
          >
            VNT
          </span>{" "}
          Success
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-6 max-w-2xl mx-auto text-sm md:text-base"
          style={{ color: "hsl(0 0% 40%)" }}
        >
          Amplified VNT's EV charging network presence through impactful visual storytelling and strategic digital campaigns across India.
        </motion.p>

        {/* Creatives */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 md:gap-6 items-center max-w-4xl mx-auto"
        >
          {[vntCreative1, vntCreative2].map((src, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="rounded-2xl overflow-hidden"
            >
              <img src={src} alt={`VNT creative ${i + 1}`} className="w-full h-auto object-contain rounded-2xl" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VNTCaseStudy;
