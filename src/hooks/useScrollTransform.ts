import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Lightweight replacement for framer-motion's useScroll + useTransform.
 * Returns a numeric value between outputRange[0] and outputRange[1]
 * based on the element's scroll progress through the viewport.
 *
 * @param offset - Controls the start/end scroll positions.
 *   "start start" = element top at viewport top
 *   "end start" = element bottom at viewport top
 *   "start end" = element top at viewport bottom
 *   "end end" = element bottom at viewport bottom
 */
export function useScrollTransform(
    inputRange: [number, number] = [0, 1],
    outputRange: [number, number] = [0, 100],
    offset: [string, string] = ["start start", "end start"]
): { ref: React.RefObject<HTMLElement | null>; value: number } {
    const ref = useRef<HTMLElement>(null);
    const [value, setValue] = useState(outputRange[0]);
    const raf = useRef<number>(0);

    const lerp = useCallback(
        (progress: number) => {
            const clamped = Math.max(
                inputRange[0],
                Math.min(inputRange[1], progress)
            );
            const normalized =
                (clamped - inputRange[0]) / (inputRange[1] - inputRange[0]);
            return outputRange[0] + normalized * (outputRange[1] - outputRange[0]);
        },
        [inputRange[0], inputRange[1], outputRange[0], outputRange[1]]
    );

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const getOffset = (spec: string) => {
            const [elRef, vpRef] = spec.split(" ");
            return { elRef, vpRef };
        };

        const startSpec = getOffset(offset[0]);
        const endSpec = getOffset(offset[1]);

        const getElPos = (spec: { elRef: string; vpRef: string }) => {
            const rect = el.getBoundingClientRect();
            const elPos = spec.elRef === "start" ? rect.top : rect.bottom;
            const vpPos =
                spec.vpRef === "start" ? 0 : window.innerHeight;
            return elPos - vpPos;
        };

        const onScroll = () => {
            raf.current = requestAnimationFrame(() => {
                const startPos = getElPos(startSpec);
                const endPos = getElPos(endSpec);
                const total = endPos - startPos;
                if (total === 0) return;
                const progress = -startPos / -total;
                setValue(lerp(progress));
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        return () => {
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(raf.current);
        };
    }, [offset[0], offset[1], lerp]);

    return { ref, value };
}

/**
 * Multi-value scroll transform - returns multiple computed values at once.
 */
export function useMultiScrollTransform(
    transforms: Array<{
        inputRange: [number, number];
        outputRange: [number, number];
    }>,
    offset: [string, string] = ["start start", "end start"]
): { ref: React.RefObject<HTMLElement | null>; values: number[] } {
    const ref = useRef<HTMLElement>(null);
    const [values, setValues] = useState(transforms.map((t) => t.outputRange[0]));
    const raf = useRef<number>(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const getOffset = (spec: string) => {
            const [elRef, vpRef] = spec.split(" ");
            return { elRef, vpRef };
        };

        const startSpec = getOffset(offset[0]);
        const endSpec = getOffset(offset[1]);

        const getElPos = (spec: { elRef: string; vpRef: string }) => {
            const rect = el.getBoundingClientRect();
            const elPos = spec.elRef === "start" ? rect.top : rect.bottom;
            const vpPos = spec.vpRef === "start" ? 0 : window.innerHeight;
            return elPos - vpPos;
        };

        const onScroll = () => {
            raf.current = requestAnimationFrame(() => {
                const startPos = getElPos(startSpec);
                const endPos = getElPos(endSpec);
                const total = endPos - startPos;
                if (total === 0) return;
                const progress = -startPos / -total;
                const newValues = transforms.map((t) => {
                    const clamped = Math.max(
                        t.inputRange[0],
                        Math.min(t.inputRange[1], progress)
                    );
                    const normalized =
                        (clamped - t.inputRange[0]) /
                        (t.inputRange[1] - t.inputRange[0]);
                    return t.outputRange[0] + normalized * (t.outputRange[1] - t.outputRange[0]);
                });
                setValues(newValues);
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        return () => {
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(raf.current);
        };
    }, [offset[0], offset[1]]);

    return { ref, values };
}
