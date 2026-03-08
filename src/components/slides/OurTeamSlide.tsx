import React from 'react';

/**
 * OurTeamSlide Component
 * 
 * Represents the 4th slide in the vertical snap presentation sequence.
 * Currently serves as a structural placeholder with dynamic theming.
 * Uses strict min-height and viewport-relative sizing to conform to the Index scroll hijacker.
 */
const OurTeamSlide = () => {
    return (
        <section className="slide bg-background flex flex-col items-center justify-center min-h-screen w-full relative overflow-hidden">
            {/* Decorative background element: A semi-transparent hexagon pattern that scales across the viewport */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-50 hexagon-pattern" />

            {/* Foreground Content Container: Uses z-10 to stay above the pattern layer */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
                <h2 className="text-4xl md:text-7xl font-black tracking-tight text-foreground">
                    OUR TEAM
                </h2>
                {/* Placeholder wrapper for future team member profile cards or interactive 3D elements */}
            </div>
        </section>
    );
};

export default OurTeamSlide;
