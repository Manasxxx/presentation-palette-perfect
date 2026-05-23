import ProfileCard from '@/components/ProfileCard';
import Radar from '@/components/Radar';
import harshitAvatar from '@/assets/harshit-avatar.png';
import manasAvatar from '@/assets/manas-avatar.png';
import pankajAvatar from '@/assets/pankaj-avatar.png';
import sakshiAvatar from '@/assets/sakshi-avatar.png';
import sanskritiAvatar from '@/assets/sanskriti-avatar.png';

/**
 * OurTeamSlide Component
 */
const teamMembers = [
    {
        name: 'Harshit',
        title: 'Strategy & Growth',
        handle: '',
        status: '',
        avatar: harshitAvatar,
        gradient: 'linear-gradient(145deg, rgba(75,194,194,0.42), rgba(46,158,158,0.22))',
    },
    {
        name: 'Sakshi',
        title: 'Client Partnerships',
        handle: '',
        status: '',
        avatar: sakshiAvatar,
        gradient: 'linear-gradient(145deg, rgba(75,194,194,0.42), rgba(125,216,216,0.20))',
    },
    {
        name: 'Manas',
        title: 'Digital Enablement',
        handle: '',
        status: '',
        avatar: manasAvatar,
        gradient: 'linear-gradient(145deg, rgba(75,194,194,0.42), rgba(2,184,252,0.16))',
    },
    {
        name: 'Sanskriti',
        title: 'Creative Direction',
        handle: '',
        status: '',
        avatar: sanskritiAvatar,
        gradient: 'linear-gradient(145deg, rgba(75,194,194,0.42), rgba(46,158,158,0.20))',
    },
    {
        name: 'Pankaj',
        title: 'Technology & Delivery',
        handle: '',
        status: '',
        avatar: pankajAvatar,
        gradient: 'linear-gradient(145deg, rgba(75,194,194,0.42), rgba(15,118,110,0.24))',
    },
    {
        name: 'Vishnu',
        title: 'Creative Architect',
        handle: '',
        status: '',
        avatar: pankajAvatar,
        gradient: 'linear-gradient(145deg, rgba(75,194,194,0.42), rgba(125,216,216,0.18))',
    },
];

const OurTeamSlide = () => {
    return (
        <section className="slide relative min-h-screen w-full overflow-hidden bg-background px-8 pb-7 pt-24 font-sans md:px-12 md:pb-8 md:pt-24">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-50 hexagon-pattern" />
            <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_16%_18%,rgba(75,194,194,0.16),transparent_28%),linear-gradient(180deg,rgba(9,13,18,0.82),rgba(9,13,18,0.98))]" />
            <div className="absolute inset-0 z-[2] pointer-events-none opacity-55 mix-blend-screen">
                <Radar
                    speed={0.45}
                    scale={0.62}
                    ringCount={12}
                    spokeCount={12}
                    ringThickness={0.035}
                    spokeThickness={0.008}
                    sweepSpeed={0.7}
                    sweepWidth={2.4}
                    sweepLobes={1}
                    color="#4bc2c2"
                    backgroundColor="#000000"
                    falloff={2.4}
                    brightness={0.72}
                    enableMouseInteraction={false}
                    mouseInfluence={0.08}
                />
            </div>

            <div className="relative z-10 flex h-full w-full max-w-[1720px] flex-col">
                <header>
                    <h2 className="font-sans text-[clamp(3.4rem,5.9vw,6.6rem)] font-black uppercase leading-[0.82] tracking-normal text-white">
                        OUR TEAM
                    </h2>
                </header>

                <div className="mx-auto mt-8 grid w-full max-w-[1500px] grid-cols-3 items-end gap-x-10 gap-y-5">
                    {teamMembers.map((member) => (
                        <ProfileCard
                            key={member.name}
                            className={`team-profile-card team-profile-card-${member.name.toLowerCase()}`}
                            avatarUrl={member.avatar}
                            miniAvatarUrl={member.avatar}
                            name={member.name}
                            title={member.title}
                            handle={member.handle}
                            status={member.status}
                            contactText="View"
                            innerGradient={member.gradient}
                            behindGlowColor="rgba(75,194,194,0.42)"
                            behindGlowSize="42%"
                            enableMobileTilt={false}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurTeamSlide;
