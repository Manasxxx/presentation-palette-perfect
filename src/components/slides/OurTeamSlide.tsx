import { useEffect, useState } from 'react';
import Lanyard from '@/components/ui/Lanyard/Lanyard';
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

const OurTeamSlide = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeMember = teamMembers[activeIndex];

    useEffect(() => {
        const nextTimer = window.setTimeout(() => {
            setActiveIndex((currentIndex) => (currentIndex + 1) % teamMembers.length);
        }, AUTO_ADVANCE_MS);

        return () => window.clearTimeout(nextTimer);
    }, [activeIndex]);

    return (
        <section className="slide relative min-h-screen w-full overflow-hidden bg-background px-5 pb-5 pt-16 font-sans md:px-8 md:pb-7 md:pt-16">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40 hexagon-pattern" />
            <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_76%_34%,rgba(75,194,194,0.2),transparent_30%),radial-gradient(circle_at_18%_78%,rgba(2,184,252,0.12),transparent_28%),linear-gradient(180deg,rgba(9,13,18,0.9),rgba(7,9,13,0.98))]" />

            <div className="relative z-10 flex h-full w-full max-w-[1720px] flex-col">
                <header className="text-left self-start shrink-0">
                    <span className="text-[10px] md:text-xs tracking-[0.3em] text-primary font-medium mb-3 block">
                        THE PEOPLE
                    </span>
                    <h2 className="font-sans text-[clamp(3.4rem,5.9vw,6.6rem)] font-black uppercase leading-[0.95] tracking-normal text-white text-left pb-2">
                        <span className="font-sans not-italic">OUR </span>
                        <span className="font-sans not-italic text-gradient-green inline-block pr-2">
                            TEAM
                        </span>
                    </h2>
                </header>

                <div className="relative grid min-h-0 flex-1 grid-cols-1 items-center gap-8 overflow-visible lg:grid-cols-[minmax(360px,0.82fr)_minmax(520px,1.18fr)]">
                    <div className="absolute inset-x-12 top-1/2 h-32 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

                    <div className="relative z-10 w-full max-w-[560px] lg:-mt-4">
                        <div className="mb-5 flex items-center gap-4">
                            <span className="h-px w-12 bg-primary/70" />
                            <span className="font-body text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-white/45">
                                Core team
                            </span>
                        </div>

                        <div className="relative">
                            {teamMembers.map((member, index) => {
                                const isActive = index === activeIndex;

                                return (
                                    <button
                                        key={member.name}
                                        type="button"
                                        onClick={() => setActiveIndex(index)}
                                        className={`group relative grid w-full grid-cols-[2.8rem_1fr] items-baseline gap-4 border-b py-3.5 text-left transition-all duration-300 ${
                                            isActive
                                                ? 'border-primary/72 text-white opacity-100'
                                                : 'border-white/8 text-white/18 opacity-45 saturate-0 hover:border-white/18 hover:text-white/34 hover:opacity-70'
                                        }`}
                                    >
                                        <span className={`font-mono text-[0.72rem] font-bold tabular-nums transition-colors ${
                                            isActive ? 'text-primary' : 'text-white/18 group-hover:text-white/34'
                                        }`}>
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <span className="min-w-0">
                                            <span className={`block truncate font-sans text-[clamp(1.25rem,1.8vw,2.05rem)] font-black uppercase leading-none tracking-normal transition-colors ${
                                                isActive ? 'text-white' : 'text-white/24 group-hover:text-white/40'
                                            }`}>
                                                {member.name}
                                            </span>
                                            <span className={`mt-1.5 block truncate font-body text-sm font-semibold leading-tight transition-colors ${
                                                isActive ? 'text-primary' : 'text-white/16 group-hover:text-white/32'
                                            }`}>
                                                {member.title}
                                            </span>
                                        </span>
                                        <span
                                            key={isActive ? `${member.name}-progress` : member.name}
                                            className={`absolute bottom-0 left-0 h-px bg-primary ${isActive ? 'team-roster-progress' : 'w-0'}`}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="relative z-10 flex min-h-[620px] items-center justify-center overflow-visible">
                        <div className="absolute right-4 top-1/2 h-[58%] w-[72%] -translate-y-1/2 rounded-full bg-primary/14 blur-[70px]" />
                        <div className="relative h-[680px] w-full max-w-[720px] overflow-visible">
                            <Lanyard
                                className="single-team-lanyard"
                                person={activeMember}
                                position={[0, 0, 22]}
                                gravity={[0, -38, 0]}
                                fov={11.5}
                                startOffset={lanyardFallOffsets[activeIndex]}
                            />
                            <div className="team-lanyard-name absolute inset-x-0 bottom-12 z-10 text-center">
                                <div className="font-sans text-[clamp(1.4rem,2.35vw,2.55rem)] font-black uppercase leading-none tracking-normal text-white">
                                    {activeMember.name}
                                </div>
                                <div className="mx-auto mt-2 max-w-[18rem] font-body text-[clamp(0.9rem,1.1vw,1.14rem)] font-semibold leading-tight text-white/62">
                                    {activeMember.title}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurTeamSlide;
