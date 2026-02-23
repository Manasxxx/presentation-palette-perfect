import { motion } from "framer-motion";
import harshitAvatar from "@/assets/harshit-avatar.png";
import sakshiAvatar from "@/assets/sakshi-avatar.png";
import pankajAvatar from "@/assets/pankaj-avatar.png";
import manasAvatar from "@/assets/manas-avatar.png";
import sanskritiAvatar from "@/assets/sanskriti-avatar.png";

const teamMembers = [
  { name: "Harshit", avatar: harshitAvatar },
  { name: "Sakshi", avatar: sakshiAvatar },
  { name: "Manas", avatar: manasAvatar },
  { name: "Sanskriti", avatar: sanskritiAvatar },
  { name: "Pankaj", avatar: pankajAvatar },
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

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-5 md:gap-7"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              variants={cardVariants}
              whileHover={{ scale: 1.06, y: -6 }}
              className="w-[calc(50%-10px)] md:w-[calc(20%-22px)]"
            >
              <div
                className="rounded-2xl p-4 md:p-5 text-center flex flex-col items-center border border-white/15"
                style={{
                  background: "linear-gradient(145deg, hsl(var(--background) / 0.4), hsl(var(--background) / 0.25))",
                  backdropFilter: "blur(24px) saturate(1.6)",
                  WebkitBackdropFilter: "blur(24px) saturate(1.6)",
                  boxShadow: "0 8px 32px hsl(var(--background) / 0.4), inset 0 1px 0 hsl(var(--foreground) / 0.06)",
                  transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-32 h-32 md:w-36 md:h-36 rounded-full object-contain mb-4"
                />
                <h3
                  className="shimmer-text text-sm md:text-base tracking-[0.15em] uppercase"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}
                >
                  {member.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSlide;
