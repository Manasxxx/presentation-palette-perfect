import { motion } from "framer-motion";
import vntCreative1 from "@/assets/vnt-creative-1.png";
import vntCreative2 from "@/assets/vnt-creative-2.png";
import { useIsMobile } from "@/hooks/use-mobile";
import ParallaxCardSlider from "@/components/ParallaxCardSlider";

const vntGreen = "100 55% 38%";
const vntTeal = "192 100% 32%";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 100 } }
};

const sliderImages = [
  { image: vntCreative1, alt: "VNT creative 1" },
  { image: vntCreative2, alt: "VNT creative 2" },
];

const VNTCaseStudy = () => {
  const isMobile = useIsMobile();

  return (
    <section className="slide py-10 px-6 overflow-hidden relative flex flex-col">
      <motion.div
        initial={{ clipPath: "circle(5% at 50% 50%)", opacity: 0 }}
        whileInView={{ clipPath: "circle(150% at 50% 50%)", opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.5 }}
        className="absolute inset-0 z-0"
        style={{ background: `linear-gradient(145deg, hsl(120 25% 75%), hsl(140 30% 68%), hsl(${vntGreen} / 0.5))` }}
      />
      <div className="absolute inset-0 z-[-1]" style={{ background: `linear-gradient(145deg, hsl(120 25% 75%), hsl(140 30% 68%), hsl(${vntGreen} / 0.5))` }} />

      <div className={`max-w-6xl mx-auto w-full relative z-10 ${isMobile ? 'flex flex-col flex-1' : ''}`}>

        <motion.h2 initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, type: "spring" }} viewport={{ once: true }} className={`text-3xl md:text-5xl font-black tracking-tight text-center ${isMobile ? 'mb-1' : 'mb-3'}`} style={{ color: "hsl(0 0% 15%)" }}>
          VNT{" "}<span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, hsl(${vntGreen}), hsl(${vntTeal}))` }}>Success</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} className={`text-center max-w-2xl mx-auto text-sm md:text-base ${isMobile ? 'mb-3' : 'mb-6'}`} style={{ color: "hsl(0 0% 40%)" }}>
          Amplified VNT's EV charging network presence through impactful visual storytelling and strategic digital campaigns across India.
        </motion.p>

        {isMobile ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="flex justify-center flex-1 items-center">
            <ParallaxCardSlider slides={sliderImages} accentColor={vntGreen} />
          </motion.div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 gap-4 md:gap-6 items-center max-w-4xl mx-auto">
            {[vntCreative1, vntCreative2].map((src, i) => (
              <motion.div key={i} variants={itemVariants} className="rounded-2xl overflow-hidden">
                <img src={src} alt={`VNT creative ${i + 1}`} loading="lazy" className="w-full h-auto object-contain rounded-2xl" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default VNTCaseStudy;
