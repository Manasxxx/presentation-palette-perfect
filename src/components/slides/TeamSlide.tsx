import { motion } from "framer-motion";

const teamMembers = [
  { name: "Harshit Srivastava", role: "Head of Client Relations" },
  { name: "Manas Srivastava", role: "Digital Enablement Head" },
  { name: "Sanskriti Navin", role: "Social Media Manager" },
  { name: "Vishnu Madhupal", role: "Graphic Design Consultant" },
  { name: "Sakshi Srivastava", role: "Business Development Manager" },
  { name: "Pankaj Singh", role: "SEO Strategist" },
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
          <span className="text-gradient-teal">TEAM</span>
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
              <div className="card-glass rounded-2xl p-6 md:p-8 text-center transition-all duration-300 hover:border-primary/30">
                <h3 className="font-bold text-base md:text-lg text-foreground mb-2">{member.name}</h3>
                <p className="text-sm md:text-base text-primary font-medium">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSlide;
