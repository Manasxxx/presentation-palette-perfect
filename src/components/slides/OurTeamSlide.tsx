import { useEffect, useRef, useState } from 'react';
import { animate, createSpring, stagger } from 'animejs';
import Lanyard from '@/components/ui/Lanyard/Lanyard';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';
import harshitAvatar from '@/assets/harshit-avatar.png';
import manasAvatar from '@/assets/manas-avatar.png';
import pankajAvatar from '@/assets/pankaj-avatar.png';
import sakshiAvatar from '@/assets/sakshi-avatar.png';
import sanskritiAvatar from '@/assets/sanskriti-avatar.png';

const teamMembers = [
    {
        name: 'Harshit',
        title: 'Strategy & growth',
        avatar: harshitAvatar,
    },
    {
        name: 'Sakshi',
        title: 'Client lead',
        avatar: sakshiAvatar,
    },
    {
        name: 'Manas',
        title: 'Digital strategy',
        avatar: manasAvatar,
    },
    {
        name: 'Sanskriti',
        title: 'Creative direction',
        avatar: sanskritiAvatar,
    },
    {
        name: 'Pankaj',
        title: 'Build & ship',
        avatar: pankajAvatar,
    },
    {
        name: 'Vishnu',
        title: 'Brand & identity',
        avatar: pankajAvatar,
    },
];

const lanyardFallOffsets = [-0.72, 0.38, -0.18, 0.82, -0.48, 0.58];
const AUTO_ADVANCE_MS = 5000;

const getRouletteOffset = (index: number, activeIndex: number) => {
    const rawOffset = index - activeIndex;
    const half = teamMembers.length / 2;

    if (rawOffset > half) return rawOffset - teamMembers.length;
    if (rawOffset < -half) return rawOffset + teamMembers.length;
    return rawOffset;
};

const OurTeamSlide = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const triggered = useRef(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showLanyard, setShowLanyard] = useState(false);
    const prefersReducedMotion = usePrefersReducedMotion();
    const activeMember = teamMembers[activeIndex];

    useEffect(() => {
        // Respect reduced-motion: don't auto-rotate the roster, let the user drive it.
        if (prefersReducedMotion) return;
        const nextTimer = window.setTimeout(() => {
            setActiveIndex((currentIndex) => (currentIndex + 1) % teamMembers.length);
        }, AUTO_ADVANCE_MS);

        return () => window.clearTimeout(nextTimer);
    }, [activeIndex, prefersReducedMotion]);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        let lanyardTimer = 0;

        const reveal = () => {
            if (triggered.current) return;
            triggered.current = true;

            // Defer the heavy WebGL/physics lanyard until the scroll-snap settles,
            // so initializing it doesn't jank the entrance.
            lanyardTimer = window.setTimeout(() => setShowLanyard(true), 650);

            animate(el.querySelectorAll('.team-heading'), {
                opacity: [0, 1],
                translateY: [70, 0],
                scale: [0.94, 1],
                delay: stagger(80),
                duration: 900,
                ease: createSpring({ stiffness: 95, damping: 12 }),
            });

            animate(el.querySelector('.team-title-accent')!, {
                translateX: [-26, 0],
                filter: ['blur(10px)', 'blur(0px)'],
                duration: 900,
                delay: 160,
                ease: 'out(4)',
            });

            animate(el.querySelectorAll('.team-roulette-item'), {
                opacity: [0, 1],
                delay: stagger(80, { start: 320 }),
                duration: 750,
                ease: 'out(4)',
            });

            animate(el.querySelector('.team-lanyard-stage')!, {
                opacity: [0, 1],
                scale: [0.82, 1.04, 1],
                translateX: [120, -14, 0],
                rotate: [5, -1, 0],
                duration: 1300,
                delay: 360,
                ease: 'out(4)',
            });

        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) reveal();
            },
            { threshold: 0.25 }
        );
        observer.observe(el);
        const fallback = window.setTimeout(reveal, 700);
        return () => {
            observer.disconnect();
            window.clearTimeout(fallback);
            window.clearTimeout(lanyardTimer);
        };
    }, []);

    return (
        <section ref={sectionRef} className="slide relative min-h-screen w-full overflow-hidden bg-background px-5 pb-5 pt-16 font-sans md:px-8 md:pb-7 md:pt-16">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40 hexagon-pattern" />
            <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_76%_34%,rgba(75,194,194,0.2),transparent_30%),radial-gradient(circle_at_18%_78%,rgba(2,184,252,0.12),transparent_28%),linear-gradient(180deg,rgba(9,13,18,0.9),rgba(7,9,13,0.98))]" />
            <div className="relative z-10 flex h-full w-full max-w-[1720px] flex-col">
                <header className="text-left self-start shrink-0">
                    <span className="team-heading text-[10px] md:text-xs tracking-[0.3em] text-primary font-medium mb-3 block" style={{ opacity: 0 }}>
                        THE PEOPLE
                    </span>
                    <h2 className="team-heading font-sans text-[clamp(3.4rem,5.9vw,6.6rem)] font-black uppercase leading-[0.95] tracking-normal text-white text-left pb-2" style={{ opacity: 0 }}>
                        <span className="font-sans not-italic">OUR </span>
                        <span className="team-title-accent font-sans not-italic text-gradient-green inline-block pr-2">
                            TEAM
                        </span>
                    </h2>
                </header>

                <div className="relative grid min-h-0 flex-1 grid-cols-1 items-center gap-8 overflow-visible lg:grid-cols-[minmax(360px,0.82fr)_minmax(520px,1.18fr)]">
                    <div className="absolute inset-x-12 top-1/2 h-32 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

                    <div className="relative z-10 flex w-full max-w-[560px] flex-col justify-center lg:-mt-2">
                        <div className="mb-5 flex items-center gap-4">
                            <span className="h-px w-12 bg-primary/70" />
                            <span className="font-body text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-white/45">
                                Core team
                            </span>
                        </div>

                        <div className="relative h-[390px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] px-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_80px_rgba(0,0,0,0.22)] [perspective:1050px]">
                            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-background via-background/78 to-transparent" />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-background via-background/78 to-transparent" />
                            <div className="pointer-events-none absolute left-6 right-6 top-1/2 z-10 h-[5.1rem] -translate-y-1/2 rounded-2xl border border-primary/35 bg-primary/[0.08] shadow-[0_0_42px_rgba(75,194,194,0.16)]" />
                            <div className="pointer-events-none absolute left-10 right-10 top-1/2 z-10 h-px -translate-y-[2.55rem] bg-primary/25" />
                            <div className="pointer-events-none absolute left-10 right-10 top-1/2 z-10 h-px translate-y-[2.55rem] bg-primary/25" />

                            {teamMembers.map((member, index) => {
                                const isActive = index === activeIndex;
                                const offset = getRouletteOffset(index, activeIndex);
                                const hidden = Math.abs(offset) > 2;
                                const absOffset = Math.abs(offset);

                                return (
                                    <button
                                        key={member.name}
                                        type="button"
                                        onClick={() => setActiveIndex(index)}
                                        className="team-roulette-item absolute left-0 right-0 top-1/2 z-20 flex h-20 -translate-y-1/2 items-center justify-center transition-[opacity,filter,color,transform] duration-700"
                                        style={{
                                            opacity: hidden ? 0 : isActive ? 1 : absOffset === 1 ? 0.6 : 0.28,
                                            transform: `translateY(calc(-50% + ${offset * 4.85}rem)) rotateX(${-offset * 18}deg) scale(${isActive ? 1 : absOffset === 1 ? 0.92 : 0.8})`,
                                            filter: isActive ? 'blur(0px)' : absOffset === 1 ? 'blur(0.12px)' : 'blur(0.65px)',
                                            pointerEvents: hidden ? 'none' : 'auto',
                                            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                                        }}
                                    >
                                        <span className="min-w-0 px-6 text-center">
                                            <span
                                                className={`block truncate font-sans text-[clamp(2.1rem,3.7vw,4.35rem)] font-black uppercase leading-none tracking-normal transition-colors duration-500 ${
                                                    isActive ? 'text-primary' : 'text-white/65 hover:text-white/90'
                                                }`}
                                            >
                                                {member.name}
                                            </span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="team-lanyard-stage relative z-10 flex min-h-[620px] items-center justify-center overflow-visible" style={{ opacity: 0 }}>
                        <div className="absolute right-4 top-1/2 h-[58%] w-[72%] -translate-y-1/2 rounded-full bg-primary/14 blur-[70px]" />
                        <div className="relative h-[680px] w-full max-w-[720px] overflow-visible">
                            {showLanyard && (
                                <Lanyard
                                    className="single-team-lanyard"
                                    person={activeMember}
                                    position={[0, 0, 22]}
                                    gravity={[0, -38, 0]}
                                    fov={11.5}
                                    startOffset={lanyardFallOffsets[activeIndex]}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurTeamSlide;
