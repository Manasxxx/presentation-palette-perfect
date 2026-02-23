import { motion } from "framer-motion";
import { Linkedin, Instagram } from "lucide-react";
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
                <div
                  className="group rounded-2xl p-4 md:p-5 text-center flex flex-col items-center border border-white/10 hover:border-primary/40 cursor-pointer"
                  style={{
                    background: "linear-gradient(145deg, hsl(var(--foreground) / 0.06), hsl(var(--foreground) / 0.02))",
                    backdropFilter: "blur(30px) saturate(1.8)",
                    WebkitBackdropFilter: "blur(30px) saturate(1.8)",
                    boxShadow: "0 8px 32px hsl(var(--background) / 0.5), inset 0 1px 0 hsl(var(--foreground) / 0.08), inset 0 -1px 0 hsl(var(--foreground) / 0.03)",
                    transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-32 h-32 md:w-36 md:h-36 rounded-full object-contain mb-4 transition-transform duration-300 group-hover:scale-105"
                  />
                  <h3
                    className="shimmer-text text-sm md:text-base tracking-[0.15em] uppercase"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                  >
                    {member.name}
                  </h3>
                  <div className="flex gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin size={16} fill="currentColor" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Instagram size={16} fill="currentColor" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TeamSlide;
