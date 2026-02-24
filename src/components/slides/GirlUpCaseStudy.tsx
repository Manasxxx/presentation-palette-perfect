import { motion } from "framer-motion";
import girlupCreative1 from "@/assets/girlup-creative-1.png";
import girlupCreative2 from "@/assets/girlup-creative-2.png";

/* Girl Up brand: teal/green #00B89F, lavender/purple #9B72CF */
const girlUpTeal = "168 100% 36%";
const girlUpPurple = "268 48% 63%";

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

const GirlUpCaseStudy = () => {
  return (
    <section className="slide py-20 px-6 overflow-hidden relative">
      {/* Circular wipe background */}
      <motion.div
        initial={{ clipPath: "circle(5% at 50% 50%)", opacity: 0 }}
        whileInView={{ clipPath: "circle(150% at 50% 50%)", opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.5 }}
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(160deg, hsl(${girlUpTeal} / 0.15), hsl(${girlUpPurple} / 0.12), hsl(${girlUpTeal} / 0.08))`,
        }}
      />
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          background: `linear-gradient(160deg, hsl(${girlUpTeal} / 0.15), hsl(${girlUpPurple} / 0.12), hsl(${girlUpTeal} / 0.08))`,
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
            style={{ color: `hsl(${girlUpTeal})` }}
          >
            Case Study
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black tracking-tight mb-3 text-center text-foreground"
        >
          Girl Up{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, hsl(${girlUpTeal}), hsl(${girlUpPurple}))`,
            }}
          >
            Success
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-10 max-w-2xl mx-auto text-sm md:text-base text-muted-foreground"
        >
          Amplified youth-led advocacy through vibrant social media content and community-driven engagement strategies.
        </motion.p>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 md:gap-6"
        >
          {[girlupCreative1, girlupCreative2].map((src, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="rounded-2xl overflow-hidden"
            >
              <img src={src} alt={`Girl Up creative ${i + 1}`} className="w-full h-auto object-contain rounded-2xl" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GirlUpCaseStudy;
