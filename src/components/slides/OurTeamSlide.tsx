import { useState } from 'react';
import Lanyard from '@/components/ui/Lanyard/Lanyard';
import harshitAvatar from '@/assets/harshit-avatar.png';
import manasAvatar from '@/assets/manas-avatar.png';
import pankajAvatar from '@/assets/pankaj-avatar.png';
import sakshiAvatar from '@/assets/sakshi-avatar.png';
import sanskritiAvatar from '@/assets/sanskriti-avatar.png';

const teamMembers = [
    {
        name: 'Harshit',
        title: 'Strategy & Growth',
        avatar: harshitAvatar,
    },
    {
        name: 'Sakshi',
        title: 'Client Partnerships',
        avatar: sakshiAvatar,
    },
    {
        name: 'Manas',
        title: 'Digital Enablement',
        avatar: manasAvatar,
    },
    {
        name: 'Sanskriti',
        title: 'Creative Direction',
        avatar: sanskritiAvatar,
    },
    {
        name: 'Pankaj',
        title: 'Technology & Delivery',
        avatar: pankajAvatar,
    },
    {
        name: 'Vishnu',
        title: 'Creative Architect',
        avatar: pankajAvatar,
    },
];

const lanyardFallOffsets = [-0.72, 0.38, -0.18, 0.82, -0.48, 0.58];

const OurTeamSlide = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeMember = teamMembers[activeIndex];

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

                    <div className="relative z-10 max-w-[620px]">
                        <div className="mb-7 font-body text-[clamp(1rem,1.3vw,1.34rem)] font-medium uppercase leading-snug tracking-[0.18em] text-white/48">
                            Core team roster
                        </div>

                        <div className="flex flex-col gap-2">
                            {teamMembers.map((member, index) => {
                                const isActive = index === activeIndex;

                                return (
                                    <button
                                        key={member.name}
                                        type="button"
                                        onClick={() => setActiveIndex(index)}
                                        className={`group relative flex w-full items-center justify-between border-b px-0 py-4 text-left transition-colors ${
                                            isActive
                                                ? 'border-primary/70 text-white'
                                                : 'border-white/10 text-white/42 hover:border-white/30 hover:text-white/80'
                                        }`}
                                    >
                                        <span className="flex items-baseline gap-5">
                                            <span className={`font-mono text-xs font-bold tabular-nums ${isActive ? 'text-primary' : 'text-white/24'}`}>
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <span className="font-sans text-[clamp(1.35rem,2.2vw,2.6rem)] font-black uppercase leading-none tracking-normal">
                                                {member.name}
                                            </span>
                                        </span>
                                        <span className={`hidden max-w-[190px] text-right font-body text-sm font-semibold leading-tight md:block ${
                                            isActive ? 'text-primary' : 'text-white/32 group-hover:text-white/58'
                                        }`}>
                                            {member.title}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="relative z-10 flex min-h-[620px] items-center justify-center overflow-visible">
                        <div className="absolute right-4 top-1/2 h-[58%] w-[72%] -translate-y-1/2 rounded-full bg-primary/14 blur-[70px]" />
                        <div className="relative h-[680px] w-full max-w-[720px] overflow-visible">
                            <Lanyard
                                key={activeMember.name}
                                className="single-team-lanyard"
                                person={activeMember}
                                position={[0, 0, 22]}
                                gravity={[0, -38, 0]}
                                fov={11.5}
                                startOffset={lanyardFallOffsets[activeIndex]}
                            />
                            <div className="team-lanyard-name absolute inset-x-0 bottom-3 z-10 text-center">
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
