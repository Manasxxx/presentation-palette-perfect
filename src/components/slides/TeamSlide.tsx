import { motion } from "framer-motion";

const teamMembers = [
  { name: "Harshit Srivastava", role: "Head of Client Relations" },
  { name: "Manas Srivastava", role: "Digital Enablement Head" },
  { name: "Sanskriti Navin", role: "Social Media Manager" },
  { name: "Vishnu Madhupal", role: "Graphic Design Consultant" },
  { name: "Sakshi Srivastava", role: "Business Development Manager" },
  { name: "Pankaj Singh", role: "SEO Strategist" },
];

const TeamSlide = () => {
  return (
    <section className="slide py-20 px-6">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black tracking-tight mb-12 text-center"
        >
          <span className="text-foreground">OUR </span>
          <span className="text-gradient-teal">TEAM</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="card-glass rounded-2xl p-6 md:p-8 text-center transition-all duration-300 hover:border-primary/30">
                <h3 className="font-bold text-base md:text-lg text-foreground mb-2">{member.name}</h3>
                <p className="text-sm md:text-base text-primary font-medium">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSlide;
