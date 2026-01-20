import { motion } from "framer-motion";
import { Phone, Globe, Mail } from "lucide-react";
import logo from "@/assets/logo.jpg";

const ContactSlide = () => {
  return (
    <section className="slide hexagon-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-owl-darker to-background" />
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-primary/20 p-4 animate-pulse-glow">
            <img src={logo} alt="OwlSurf Digital" className="w-full h-full object-contain rounded-full" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black tracking-tight mb-4"
        >
          <span className="text-foreground">REACH OUT </span>
          <span className="text-gradient-teal">WHERE</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl font-bold tracking-wider text-secondary mb-10"
        >
          TECH MEETS DESIGN
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl"
        >
          <a 
            href="tel:+919520367546"
            className="card-glass rounded-2xl p-6 flex flex-col items-center gap-3 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">+91 9520 367546</span>
          </a>

          <a 
            href="https://www.owlsurf.com"
            target="_blank"
            rel="noopener noreferrer"
            className="card-glass rounded-2xl p-6 flex flex-col items-center gap-3 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">www.owlsurf.com</span>
          </a>

          <a 
            href="mailto:growth@owlsurf.com"
            className="card-glass rounded-2xl p-6 flex flex-col items-center gap-3 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
          >
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">growth@owlsurf.com</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 flex items-center gap-4"
        >
          <div className="h-px w-12 bg-border" />
          <span className="text-xs tracking-widest text-muted-foreground">© OWLSURF DIGITAL</span>
          <div className="h-px w-12 bg-border" />
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSlide;
