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
        headingDropY: -26,
        headingDuration: 780,
        accentDelay: 90,
        contentDelay: 230,
        itemStagger: 66,
        copyDelay: 260,
      }
    : {
        headingDropY: -34,
        headingDuration: 920,
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
export const slideHeadingSpring = spring({ stiffness: 135, damping: 18, mass: 0.88 });
export const slideContentSpring = spring({ stiffness: 105, damping: 15, mass: 0.9 });

/**
 * Mobile entrances avoid spring overshoot entirely — on phones the bounce
 * lands on top of the proximity-snap settle and reads as jank, not life.
 * Desktop keeps the springs.
 */
export const getSlideContentEase = (isMobile: boolean) =>
  isMobile ? slideSettleEase : slideContentSpring;

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
    scale: isMobile ? [0.985, 1] : [0.96, 1],
    filter: ["blur(12px)", "blur(0px)"],
    duration: isMobile ? 880 : profile.headingDuration,
    delay,
    ease: isMobile ? slideSettleEase : slideHeadingSpring,
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
    scale: [0.96, 1],
    filter: ["blur(10px)", "blur(0px)"],
    duration: profile.headingDuration,
    delay: delay ?? profile.accentDelay,
    ease: slideSettleEase,
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
    translateY: [24, 0],
    scale: [0.97, 1],
    filter: ["blur(8px)", "blur(0px)"],
    delay: stagger(profile.itemStagger, { start: start ?? profile.contentDelay }),
    duration: isMobile ? 620 : 760,
    ease: slideEditorialEase,
    onComplete: () => clearInlineFilter(targets),
  });
};
