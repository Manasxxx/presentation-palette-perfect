import { motion } from "framer-motion";
import mitsuiCreative3 from "@/assets/mitsui-creative-3.png";
import mitsuiCreative4 from "@/assets/mitsui-creative-4.png";

const mitsuiBlue = "210 100% 30%";
const mitsuiCyan = "193 100% 42%";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
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

const MitsuiCaseStudy2 = () => {
  return (
    <section className="slide py-10 px-6 overflow-hidden relative">
      <motion.div
        initial={{ clipPath: "circle(5% at 50% 50%)", opacity: 0 }}
        whileInView={{ clipPath: "circle(150% at 50% 50%)", opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.5 }}
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(160deg, hsl(${mitsuiBlue} / 0.85), hsl(210 60% 22% / 0.7), hsl(${mitsuiCyan} / 0.3))`,
        }}
      />
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          background: `linear-gradient(160deg, hsl(${mitsuiBlue} / 0.85), hsl(210 60% 22% / 0.7), hsl(${mitsuiCyan} / 0.3))`,
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-3"
        >
          <span
            className="text-xs tracking-[0.3em] font-medium uppercase"
            style={{ color: `hsl(${mitsuiCyan})` }}
          >
            Case Study
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black tracking-tight mb-3 text-center text-white"
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, hsl(${mitsuiCyan}), hsl(193 80% 65%))`,
            }}
          >
            Mitsui Chemicals
          </span>{" "}
          Creatives
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-6 max-w-2xl mx-auto text-sm md:text-base"
          style={{ color: "hsl(210 30% 75%)" }}
        >
          High-impact visual campaigns crafted for Mitsui Chemicals' product lines and sustainability initiatives.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 md:gap-6 items-center max-w-4xl mx-auto"
        >
          {[mitsuiCreative3, mitsuiCreative4].map((src, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="rounded-2xl overflow-hidden"
            >
              <img src={src} alt={`Mitsui Chemicals creative ${i + 3}`} className="w-full h-auto object-contain rounded-2xl" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MitsuiCaseStudy2;
