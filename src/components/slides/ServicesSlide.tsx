import { motion } from "framer-motion";
import { BarChart3, Palette, Globe, Code } from "lucide-react";

const services = [
  { 
    icon: BarChart3, 
    title: "Digital Strategy",
    items: ["Building Brands", "Media Placements", "Writing and Repurposing", "Strategic Communications"],
    color: "primary"
  },
  { 
    icon: Palette, 
    title: "Creative Strategy",
    items: ["Visual Identity", "Graphic Design", "Creative Advertising", "Space Design and Events"],
    color: "secondary"
  },
  { 
    icon: Globe, 
    title: "Web Presence",
    items: ["Web Design", "SEO", "Social Media", "+ more services"],
    color: "primary"
  },
  { 
    icon: Code, 
    title: "Development Services",
    items: ["Technology Consulting", "Turnkey Product Development", "Product Strategy", "Manual and Automated Testing"],
    color: "secondary"
  },
];

const ServicesSlide = () => {
  return (
    <section className="slide py-20 px-6 bg-gradient-to-b from-background via-owl-darker to-background">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-center"
        >
          <span className="text-foreground">OUR </span>
          <span className="text-gradient-gold">SERVICES</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center mb-12 max-w-xl mx-auto"
        >
          Comprehensive solutions for your digital needs
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="card-glass rounded-2xl p-6 md:p-8 h-full transition-all duration-300 hover:border-primary/30">
                <div className={`w-14 h-14 rounded-xl ${service.color === 'primary' ? 'bg-primary/20' : 'bg-secondary/20'} flex items-center justify-center mb-5`}>
                  <service.icon className={`w-7 h-7 ${service.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                </div>
                
                <h3 className={`text-xl md:text-2xl font-bold mb-4 ${service.color === 'primary' ? 'text-gradient-teal' : 'text-gradient-gold'}`}>
                  {service.title}
                </h3>
                
                <ul className="space-y-2">
                  {service.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-muted-foreground">
                      <span className={`w-1.5 h-1.5 rounded-full ${service.color === 'primary' ? 'bg-primary' : 'bg-secondary'}`} />
                      <span className="text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSlide;
