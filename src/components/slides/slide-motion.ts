import { animate, cubicBezier, spring, stagger } from "animejs";

export interface SharedSlideMotionProfile {
  headingDropY: number;
  headingDuration: number;
  accentDelay: number;
  contentDelay: number;
  itemStagger: number;
  copyDelay: number;
}

export const getSharedSlideMotionProfile = (isMobile = false): SharedSlideMotionProfile =>
  isMobile
    ? {
        headingDropY: -16,
        headingDuration: 680,
        accentDelay: 90,
        contentDelay: 230,
        itemStagger: 66,
        copyDelay: 260,
      }
    : {
        headingDropY: -22,
        headingDuration: 760,
        accentDelay: 120,
        contentDelay: 300,
        itemStagger: 84,
        copyDelay: 340,
      };

/**
 * Entrance animations end on `filter: blur(0px)`, which is not a no-op: the
 * residual inline filter keeps a compositor layer alive, and iOS WebKit can
 * ghost stale layers until the next touch repaint. Clear it once settled.
 */
export const clearInlineFilter = (target: Element | NodeListOf<Element> | null) => {
  if (!target) return;
  const list = target instanceof Element ? [target] : Array.from(target);
  list.forEach((el) => {
    if (el instanceof HTMLElement) el.style.filter = "";
  });
};

export const slideEditorialEase = cubicBezier(0.18, 0.82, 0.18, 1);
export const slideSettleEase = cubicBezier(0.16, 1, 0.3, 1);
export const slideHeadingSpring = spring({ stiffness: 235, damping: 35, mass: 0.65 });
export const slideContentSpring = spring({ stiffness: 205, damping: 33, mass: 0.7 });

/**
 * Lenis now owns the deck movement on both platforms. Content gets one shared,
 * heavily damped spring so it settles quietly without stacking a second large
 * motion language on top of the scroll.
 */
export const getSlideContentEase = (_isMobile: boolean) => slideContentSpring;

export const animateSlideHeading = (
  root: ParentNode,
  selector: string,
  isMobile = false,
  delay = 80,
) => {
  const profile = getSharedSlideMotionProfile(isMobile);
  const targets = root.querySelectorAll(selector);
  if (!targets.length) return;

  animate(targets, {
    opacity: [0, 1],
    translateY: [profile.headingDropY, 0],
    scale: [0.985, 1],
    filter: ["blur(12px)", "blur(0px)"],
    duration: isMobile ? 700 : profile.headingDuration,
    delay,
    ease: slideHeadingSpring,
    onComplete: () => clearInlineFilter(targets),
  });
};

export const animateSlideAccent = (
  root: ParentNode,
  selector: string,
  isMobile = false,
  delay?: number,
) => {
  const profile = getSharedSlideMotionProfile(isMobile);
  const targets = root.querySelectorAll(selector);
  if (!targets.length) return;

  animate(targets, {
    translateY: [-12, 0],
    scale: [0.985, 1],
    filter: ["blur(10px)", "blur(0px)"],
    duration: profile.headingDuration,
    delay: delay ?? profile.accentDelay,
    ease: slideContentSpring,
    onComplete: () => clearInlineFilter(targets),
  });
};

export const animateSlideItems = (
  root: ParentNode,
  selector: string,
  isMobile = false,
  start?: number,
) => {
  const profile = getSharedSlideMotionProfile(isMobile);
  const targets = root.querySelectorAll(selector);
  if (!targets.length) return;

  animate(targets, {
    opacity: [0, 1],
    translateY: [16, 0],
    scale: [0.985, 1],
    filter: ["blur(8px)", "blur(0px)"],
    delay: stagger(profile.itemStagger, { start: start ?? profile.contentDelay }),
    duration: isMobile ? 620 : 760,
    ease: slideContentSpring,
    onComplete: () => clearInlineFilter(targets),
  });
};
