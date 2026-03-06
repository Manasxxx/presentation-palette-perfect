import { motion } from "framer-motion";
import { Eye, Users, Share2, Smartphone, Zap } from "lucide-react";
import baxsaaCreative1 from "@/assets/baxsaa-creative-1.png";
import baxsaaCreative2 from "@/assets/baxsaa-creative-2.png";
import { LiquidGlassCard } from "react-liquid-glass-card";
import { useIsMobile } from "@/hooks/use-mobile";
import ParallaxCardSlider from "@/components/ParallaxCardSlider";

const stats = [
  { icon: Eye, value: "2.76M", label: "Impressions" },
  { icon: Users, value: "14.6K", label: "Followers" },
  { icon: Share2, value: "3.9M", label: "Reach" },
  { icon: Zap, value: "3x", label: "CTR" },
  { icon: Smartphone, value: "97/100", label: "Mobile" },
];

const baxsaaMaroon = "0 68% 33%";
const baxsaaCream = "36 33% 93%";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -50, rotate: -5 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 100 }
  }
};

const sliderImages = [
  { image: baxsaaCreative1, alt: "Baxsaa Co. creative 1" },
  { image: baxsaaCreative2, alt: "Baxsaa Co. creative 2" },
];

const BaxsaaCaseStudy = () => {
  const isMobile = useIsMobile();

  return (
    <section className="slide py-10 px-6 overflow-hidden relative flex flex-col">
      {/* Circular wipe background */}
      <motion.div
        initial={{ clipPath: "circle(5% at 50% 50%)", opacity: 0 }}
        whileInView={{ clipPath: "circle(150% at 50% 50%)", opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.5 }}
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(160deg, hsl(${baxsaaCream}), hsl(36 25% 88%), hsl(${baxsaaMaroon} / 0.15))`,
        }}
      />
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          background: `linear-gradient(160deg, hsl(${baxsaaCream}), hsl(36 25% 88%), hsl(${baxsaaMaroon} / 0.15))`,
        }}
      />

      <div className={`max-w-6xl mx-auto w-full relative z-10 ${isMobile ? 'flex flex-col flex-1' : ''}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`text-center ${isMobile ? 'mb-1' : 'mb-3'}`}
        >
          <span
            className="text-xs tracking-[0.3em] font-medium uppercase"
            style={{ color: `hsl(${baxsaaMaroon})` }}
          >
            Case Study
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className={`text-3xl md:text-5xl font-black tracking-tight text-center ${isMobile ? 'mb-1' : 'mb-3'}`}
          style={{ color: "hsl(0 0% 15%)" }}
        >
          The Baxsaa Co.{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, hsl(${baxsaaMaroon}), hsl(0 55% 45%))`,
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
          className={`text-center max-w-2xl mx-auto text-sm md:text-base ${isMobile ? 'mb-3' : 'mb-6'}`}
          style={{ color: "hsl(0 0% 40%)" }}
        >
          Grew followers and reach through targeted social campaigns aligned with the marketing funnel.
        </motion.p>

        {/* Images: slider on mobile, grid on desktop */}
        {isMobile ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center flex-1 items-center"
          >
            <ParallaxCardSlider slides={sliderImages} accentColor={baxsaaMaroon} />
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4 md:gap-6 mb-5 max-w-4xl mx-auto"
          >
            {[baxsaaCreative1, baxsaaCreative2].map((src, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="aspect-square rounded-2xl overflow-hidden"
              >
                <img src={src} alt={`Baxsaa Co. creative ${i + 1}`} loading="lazy" className="w-full h-full object-cover rounded-2xl" />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Stats - always at bottom */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`flex flex-wrap gap-3 ${isMobile ? 'mt-auto pt-4 justify-start gap-1.5' : 'justify-center mb-8'}`}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.label} variants={itemVariants}>
                <LiquidGlassCard padding={isMobile ? "0.4rem 0.75rem" : "0.5rem 1rem"} borderRadius="9999px" blur={12} brightness={1.15} backgroundColor="rgba(255, 255, 255, 0.3)">
                  <div className="flex items-center gap-2">
                    <Icon className={`${isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} style={{ color: `hsl(${baxsaaMaroon})` }} />
                    <span className={`${isMobile ? 'text-xs' : 'text-sm md:text-base'} font-bold`} style={{ color: "hsl(0 0% 15%)" }}>
                      {stat.value}
                    </span>
                    <span className={`${isMobile ? 'text-[9px]' : 'text-[10px] md:text-xs'} font-medium uppercase tracking-wider`} style={{ color: "hsl(0 0% 35%)" }}>
                      {stat.label}
                    </span>
                  </div>
                </LiquidGlassCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* SEO card - hidden on mobile */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <LiquidGlassCard padding="1.5rem 2rem" borderRadius="1rem" blur={12} brightness={1.15} backgroundColor="rgba(255, 255, 255, 0.25)">
              <div className="text-center">
                <p className="text-lg md:text-xl font-semibold mb-2" style={{ color: "hsl(0 0% 15%)" }}>SEO Transformation</p>
                <p className="text-sm md:text-base" style={{ color: "hsl(0 0% 40%)" }}>
                  Reduced website errors from <span style={{ color: `hsl(${baxsaaMaroon})` }} className="font-bold">3000+</span> to <span style={{ color: "hsl(145 60% 40%)" }} className="font-bold">0</span> and improved page load time by <span style={{ color: "hsl(145 60% 40%)" }} className="font-bold">34%</span>
                </p>
              </div>
            </LiquidGlassCard>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BaxsaaCaseStudy;
