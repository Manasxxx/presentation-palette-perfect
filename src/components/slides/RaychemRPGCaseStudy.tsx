import { useEffect, useRef, useState } from "react";
import { animate, createSpring } from "animejs";
import raychemCreative1 from "@/assets/raychem-creative-1.webp";
import raychemCreative2 from "@/assets/raychem-creative-2.webp";
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
    const sectionRef = useRef<HTMLElement>(null);
    const [triggered, setTriggered] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !triggered) {
                    setTriggered(true);

                    animate(el.querySelector(".bg-wipe")!, {
                        clipPath: ["circle(5% at 50% 50%)", "circle(150% at 50% 50%)"],
                        opacity: [0, 1],
                        duration: 1800,
                        ease: "cubicBezier(0.22, 1, 0.36, 1)",
                    });

                    animate(el.querySelector(".cs-heading")!, {
                        opacity: [0, 1],
                        translateY: [80, 0],
                        duration: 800,
                        ease: createSpring({ stiffness: 100, damping: 15 }),
                    });

                    animate(el.querySelector(".cs-subtitle")!, {
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 600,
                        delay: 200,
                        ease: "out(3)",
                    });

                    animate(el.querySelector(".cs-slider")!, {
                        opacity: [0, 1],
                        scale: [0.9, 1],
                        duration: 800,
                        ease: "out(3)",
                    });
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [triggered]);

    return (
        <section ref={sectionRef} className="slide py-6 md:py-10 px-4 md:px-6 overflow-hidden relative flex flex-col">
            <div
                className="bg-wipe absolute inset-0 z-0"
                style={{ opacity: 0, clipPath: "circle(5% at 50% 50%)", background: `linear-gradient(145deg, hsl(210 30% 10%), hsl(210 50% 15%), hsl(${raychemBlue} / 0.6), hsl(${raychemRed} / 0.15))` }}
            />
            <div className="absolute inset-0 z-[-1]" style={{ background: `linear-gradient(145deg, hsl(210 30% 10%), hsl(210 50% 15%), hsl(${raychemBlue} / 0.6), hsl(${raychemRed} / 0.15))` }} />

            <div className={`max-w-6xl mx-auto w-full relative z-10 ${isMobile ? 'flex flex-col flex-1' : ''}`}>

                <h2 className="cs-heading text-2xl md:text-5xl font-black tracking-tight text-center text-white" style={{ opacity: 0, marginBottom: isMobile ? '0.25rem' : '0.75rem' }}>
                    Raychem RPG{" "}<span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, hsl(${raychemRed}), hsl(${raychemBlue}))` }}>Success</span>
                </h2>

                <p className="cs-subtitle text-center max-w-2xl mx-auto text-sm md:text-base" style={{ opacity: 0, color: "hsl(210 20% 70%)", marginBottom: isMobile ? '0.75rem' : '1.5rem' }}>
                    Elevated Raychem RPG's digital presence through compelling visual campaigns and targeted strategies for their industrial electrical solutions.
                </p>

                <div className={`cs-slider flex justify-center ${isMobile ? 'flex-1 items-center' : 'mb-14'}`} style={{ opacity: 0 }}>
                    <ParallaxCardSlider slides={sliderImages} accentColor={raychemRed} />
                </div>
            </div>
        </section>
    );
};

export default RaychemRPGCaseStudy;
