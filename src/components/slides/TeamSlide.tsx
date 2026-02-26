import { motion } from "framer-motion";
import { Linkedin, Instagram } from "lucide-react";
import { LiquidGlassCard } from "react-liquid-glass-card";
import harshitAvatar from "@/assets/harshit-avatar.png";
import sakshiAvatar from "@/assets/sakshi-avatar.png";
import pankajAvatar from "@/assets/pankaj-avatar.png";
import manasAvatar from "@/assets/manas-avatar.png";
import sanskritiAvatar from "@/assets/sanskriti-avatar.png";

const row1 = [
  { name: "Harshit", avatar: harshitAvatar },
  { name: "Sakshi", avatar: sakshiAvatar },
  { name: "Manas", avatar: manasAvatar },
];

const row2 = [
  { name: "Pankaj", avatar: pankajAvatar },
  { name: "Sanskriti", avatar: sanskritiAvatar },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.8 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 12 }
  }
};

const TeamSlide = () => {
  return (
    <section className="slide py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 80, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black tracking-tight mb-14 text-center"
        >
          <span className="text-foreground">OUR </span>
          <span className="text-gradient-green">TEAM</span>
        </motion.h2>

        {[row1, row2].map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center gap-5 md:gap-7 mb-5 md:mb-7 last:mb-0"
          >
            {row.map((member) => (
              <motion.div
                key={member.name}
                variants={cardVariants}
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }}
                className="w-[45%] md:w-[200px]"
              >
                <LiquidGlassCard padding="1rem 1.25rem" borderRadius="1rem" blur={15} brightness={1.1} backgroundColor="rgba(255, 255, 255, 0.06)">
                  <div className="group text-center flex flex-col items-center cursor-pointer">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-32 h-32 md:w-36 md:h-36 rounded-full object-contain mb-4 transition-transform duration-300 group-hover:scale-105"
                    />
                    <LiquidGlassCard padding="0.375rem 1.25rem" borderRadius="9999px" blur={10} brightness={1.1} backgroundColor="rgba(255, 255, 255, 0.06)">
                      <h3
                        className="shimmer-text text-sm md:text-base tracking-[0.15em] uppercase"
                        style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                      >
                        {member.name}
                      </h3>
                    </LiquidGlassCard>
                    <div className="flex gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin size={16} fill="currentColor" strokeWidth={0} />
                      </a>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                        <Instagram size={16} />
                      </a>
                    </div>
                  </div>
                </LiquidGlassCard>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TeamSlide;
