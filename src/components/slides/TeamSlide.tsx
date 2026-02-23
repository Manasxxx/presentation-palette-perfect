import { motion } from "framer-motion";
import harshitAvatar from "@/assets/harshit-avatar.png";
import sakshiAvatar from "@/assets/sakshi-avatar.png";
import pankajAvatar from "@/assets/pankaj-avatar.png";

const teamMembers = [
  { name: "Harshit Srivastava", avatar: harshitAvatar },
  { name: "Manas Srivastava" },
  { name: "Sanskriti Navin" },
  { name: "Vishnu Madhupal" },
  { name: "Sakshi Srivastava", avatar: sakshiAvatar },
  { name: "Pankaj Singh", avatar: pankajAvatar },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.8, rotateY: -20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    rotateY: 0,
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
          className="text-4xl md:text-6xl font-black tracking-tight mb-12 text-center"
        >
          <span className="text-foreground">OUR </span>
          <span className="text-gradient-green">TEAM</span>
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -8 }}
            >
              <div className="card-glass rounded-2xl p-6 md:p-8 text-center transition-all duration-300 hover:border-primary/30 flex flex-col items-center">
                {member.avatar && (
                  <img src={member.avatar} alt={member.name} className="w-16 h-16 md:w-20 md:h-20 rounded-full object-contain mb-4" />
                )}
                <h3 className="font-bold text-base md:text-lg text-foreground">{member.name}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSlide;
