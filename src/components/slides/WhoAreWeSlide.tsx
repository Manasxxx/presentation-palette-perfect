import { motion } from "framer-motion";
import { Lightbulb, Target, Zap } from "lucide-react";

const WhoAreWeSlide = () => {
  return (
    <section className="slide hexagon-pattern py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-owl-darker via-background to-background" />
      
      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black tracking-tight mb-12 text-center"
        >
          <span className="text-foreground">WHO ARE </span>
          <span className="text-gradient-teal">WE?</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="card-glass rounded-3xl p-8 md:p-12 mb-10 max-w-3xl"
        >
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-6">
            To be successful, the tactics of today aren't going to cut it, so we designed a new type of agency - one where{" "}
            <span className="text-primary font-semibold">Tech Meets Design.</span>
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            We are <span className="text-secondary font-bold">OWLSURF DIGITAL</span>. We are a 360° full service digital marketing agency and are here to provide our clients and their brands an incredible and seamless experience across all channels through our business acumen (fancy word for wicked smart) so that your brand can reach their maximum potential and the right audience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-6 md:gap-12"
        >
          {[
            { icon: Lightbulb, label: "Innovation" },
            { icon: Target, label: "Strategy" },
            { icon: Zap, label: "Execution" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <item.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <span className="text-xs md:text-sm font-medium tracking-wider text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhoAreWeSlide;
