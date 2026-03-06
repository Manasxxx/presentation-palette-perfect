import { motion } from "framer-motion";
import raychemCreative1 from "@/assets/Raychemcasestudy 1.webp";
import raychemCreative2 from "@/assets/Raychemcasestudy 2.webp";
import raychemCreative3 from "@/assets/Raychemcasestudy 3.webp";
import { useIsMobile } from "@/hooks/use-mobile";
import ParallaxCardSlider from "@/components/ParallaxCardSlider";

const raychemRed = "356 86% 52%";
const raychemBlue = "210 100% 25%";

const sliderImages = [
    { image: raychemCreative1, alt: "Raychem RPG creative 1" },
    { image: raychemCreative2, alt: "Raychem RPG creative 2" },
    { image: raychemCreative3, alt: "Raychem RPG creative 3" },
];

const RaychemRPGCaseStudy = () => {
    const isMobile = useIsMobile();

    return (
        <section className="slide py-10 px-6 overflow-hidden relative flex flex-col">
            <motion.div
                initial={{ clipPath: "circle(5% at 50% 50%)", opacity: 0 }}
                whileInView={{ clipPath: "circle(150% at 50% 50%)", opacity: 1 }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.5 }}
                className="absolute inset-0 z-0"
                style={{ background: `linear-gradient(145deg, hsl(210 30% 10%), hsl(210 50% 15%), hsl(${raychemBlue} / 0.6), hsl(${raychemRed} / 0.15))` }}
            />
            <div className="absolute inset-0 z-[-1]" style={{ background: `linear-gradient(145deg, hsl(210 30% 10%), hsl(210 50% 15%), hsl(${raychemBlue} / 0.6), hsl(${raychemRed} / 0.15))` }} />

            <div className={`max-w-6xl mx-auto w-full relative z-10 ${isMobile ? 'flex flex-col flex-1' : ''}`}>
                <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className={`text-center ${isMobile ? 'mb-1' : 'mb-5'}`}>
                    <span className="text-xs tracking-[0.3em] font-medium uppercase" style={{ color: `hsl(${raychemRed})` }}>Case Study</span>
                </motion.div>

                <motion.h2 initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, type: "spring" }} viewport={{ once: true }} className={`text-3xl md:text-5xl font-black tracking-tight text-center text-white ${isMobile ? 'mb-1' : 'mb-3'}`}>
                    Raychem RPG{" "}<span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, hsl(${raychemRed}), hsl(${raychemBlue}))` }}>Success</span>
                </motion.h2>

                <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} className={`text-center max-w-2xl mx-auto text-sm md:text-base ${isMobile ? 'mb-3' : 'mb-6'}`} style={{ color: "hsl(210 20% 70%)" }}>
                    Elevated Raychem RPG's digital presence through compelling visual campaigns and targeted strategies for their industrial electrical solutions.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className={`flex justify-center ${isMobile ? 'flex-1 items-center' : 'mb-14'}`}
                >
                    <ParallaxCardSlider slides={sliderImages} accentColor={raychemRed} />
                </motion.div>
            </div>
        </section>
    );
};

export default RaychemRPGCaseStudy;
