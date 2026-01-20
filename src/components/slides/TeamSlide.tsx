import { motion } from "framer-motion";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";
import team5 from "@/assets/team-5.jpg";
import team6 from "@/assets/team-6.jpg";

const teamMembers = [
  { name: "Harshit Srivastava", role: "Head of Client Relations", image: team1 },
  { name: "Manas Srivastava", role: "Digital Enablement Head", image: team2 },
  { name: "Sanskriti Navin", role: "Social Media Manager", image: team3 },
  { name: "Vishnu Madhupal", role: "Graphic Design Consultant", image: team4 },
  { name: "Sakshi Srivastava", role: "Business Development Manager", image: team5 },
  { name: "Pankaj Singh", role: "SEO Strategist", image: team6 },
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
          className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-center"
        >
          <span className="text-foreground">OUR </span>
          <span className="text-gradient-teal">TEAM</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center mb-12 max-w-xl mx-auto"
        >
          The talented people behind our success
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="card-glass rounded-2xl p-4 md:p-6 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="font-bold text-sm md:text-base text-foreground mb-1">{member.name}</h3>
                <p className="text-xs md:text-sm text-primary font-medium">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSlide;
