import { useEffect, useRef } from "react";
import { animate, stagger, createSpring } from "animejs";

interface RevealOptions {
    /** CSS selector for children to animate (uses stagger). If omitted, animates the root element itself. */
    childSelector?: string;
    translateY?: number | [number, number];
    translateX?: number | [number, number];
    opacity?: number | [number, number];
    scale?: number | [number, number];
    rotate?: number | [number, number];
    clipPath?: [string, string];
    scaleX?: number | [number, number];
    duration?: number;
    delay?: number;
    /** Stagger delay between children (ms) */
    staggerDelay?: number;
    staggerFrom?: "first" | "last" | "center" | number;
    ease?: string | ReturnType<typeof createSpring>;
    /** IntersectionObserver threshold (0-1) */
    threshold?: number;
    /** Only trigger once */
    once?: boolean;
}

/**
 * Hook to reveal elements on scroll using anime.js + IntersectionObserver.
 * Replaces framer-motion's `initial` / `whileInView` pattern.
 */
export function useAnimeReveal<T extends HTMLElement = HTMLElement>(
    options: RevealOptions = {}
) {
    const ref = useRef<T>(null);
    const triggered = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const {
            childSelector,
            translateY,
            translateX,
            opacity = [0, 1],
            scale,
            rotate,
            clipPath,
            scaleX,
            duration = 800,
            delay = 0,
            staggerDelay,
            staggerFrom = "first",
            ease = "out(3)",
            threshold = 0.15,
            once = true,
        } = options;

        // Set initial state
        const targets = childSelector ? el.querySelectorAll(childSelector) : el;
        const initProps: Record<string, string | number> = {};
        if (opacity !== undefined) {
            const from = Array.isArray(opacity) ? opacity[0] : 0;
            initProps.opacity = from;
        }
        if (translateY !== undefined) {
            const from = Array.isArray(translateY) ? translateY[0] : translateY;
            initProps.transform = `translateY(${from}px)`;
        }
        if (translateX !== undefined) {
            const from = Array.isArray(translateX) ? translateX[0] : translateX;
            initProps.transform = `translateX(${from}px)`;
        }
        if (scale !== undefined) {
            const from = Array.isArray(scale) ? scale[0] : scale;
            const existing = initProps.transform || "";
            initProps.transform = `${existing} scale(${from})`.trim();
        }
        if (rotate !== undefined) {
            const from = Array.isArray(rotate) ? rotate[0] : rotate;
            const existing = initProps.transform || "";
            initProps.transform = `${existing} rotate(${from}deg)`.trim();
        }
        if (scaleX !== undefined) {
            const from = Array.isArray(scaleX) ? scaleX[0] : 0;
            const existing = initProps.transform || "";
            initProps.transform = `${existing} scaleX(${from})`.trim();
        }
        if (clipPath) {
            initProps.clipPath = clipPath[0];
        }

        // Apply initial styles
        if (childSelector) {
            (el.querySelectorAll(childSelector) as NodeListOf<HTMLElement>).forEach(
                (child) => {
                    Object.assign(child.style, {
                        opacity: initProps.opacity?.toString() ?? "",
                        transform: initProps.transform ?? "",
                        ...(initProps.clipPath ? { clipPath: initProps.clipPath } : {}),
                    });
                }
            );
        } else {
            Object.assign((el as HTMLElement).style, {
                opacity: initProps.opacity?.toString() ?? "",
                transform: initProps.transform ?? "",
                ...(initProps.clipPath ? { clipPath: initProps.clipPath } : {}),
            });
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && (!once || !triggered.current)) {
                    triggered.current = true;

                    const animProps: Record<string, unknown> = {};
                    if (opacity !== undefined) {
                        animProps.opacity = Array.isArray(opacity) ? opacity : [0, opacity];
                    }
                    if (translateY !== undefined) {
                        animProps.translateY = Array.isArray(translateY)
                            ? translateY
                            : [translateY, 0];
                    }
                    if (translateX !== undefined) {
                        animProps.translateX = Array.isArray(translateX)
                            ? translateX
                            : [translateX, 0];
                    }
                    if (scale !== undefined) {
                        animProps.scale = Array.isArray(scale) ? scale : [scale, 1];
                    }
                    if (rotate !== undefined) {
                        animProps.rotate = Array.isArray(rotate) ? rotate : [rotate, 0];
                    }
                    if (scaleX !== undefined) {
                        animProps.scaleX = Array.isArray(scaleX) ? scaleX : [scaleX, 1];
                    }
                    if (clipPath) {
                        animProps.clipPath = clipPath;
                    }

                    animProps.duration = duration;
                    animProps.delay = delay;
                    animProps.ease = ease;

                    if (staggerDelay && childSelector) {
                        animProps.delay = stagger(staggerDelay, {
                            from: staggerFrom,
                            start: delay,
                        });
                    }

                    animate(targets, animProps);
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return ref;
}

/**
 * Hook to animate elements on mount (no scroll trigger).
 * Replaces framer-motion's `initial` / `animate` pattern.
 */
export function useAnimeOnMount<T extends HTMLElement = HTMLElement>(
    animateCallback: (el: T) => (() => void) | void
) {
    const ref = useRef<T>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const cleanup = animateCallback(el);
        return () => {
            if (cleanup) cleanup();
        };
    }, []);

    return ref;
}
