import { lazy, Suspense, useCallback, useMemo, useState, useEffect, useRef, type ComponentType, type CSSProperties } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Lenis, { type VirtualScrollData } from "lenis";
import TitleSlide from "@/components/slides/TitleSlide";

import SlideReveal from "@/components/SlideReveal";
import PillNav from "@/components/PillNav";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { getMountedSlideIndexes, getSlideIndexFromScroll } from "./slide-window";
import { indexForSlug, slugForIndex } from "./slide-routes";
import {
  FLICK_GESTURE_GAP_MS,
  MOBILE_FLICK_DISTANCE_THRESHOLD,
  MOBILE_FLICK_PEAK_THRESHOLD,
  MOBILE_FLICK_WINDOW_MS,
  getFlickDirection,
  type FlickDirection,
} from "./deck-flick";

const SkyrocketSlide = lazy(() => import("@/components/slides/SkyrocketSlide"));
const ServicesSlide = lazy(() => import("@/components/slides/ServicesSlide"));
const ClientsSlide = lazy(() => import("@/components/slides/ClientsSlide"));
const CaseStudySlide = lazy(() => import("@/components/slides/CaseStudySlide"));
const KurarayCaseStudy = lazy(() => import("@/components/slides/KurarayCaseStudy"));
const BaxsaaCaseStudy = lazy(() => import("@/components/slides/BaxsaaCaseStudy"));
const GirlUpCaseStudy = lazy(() => import("@/components/slides/GirlUpCaseStudy"));
const CTPCaseStudy = lazy(() => import("@/components/slides/CTPCaseStudy"));
const VNTCaseStudy = lazy(() => import("@/components/slides/VNTCaseStudy"));
const DEHNCaseStudy = lazy(() => import("@/components/slides/DEHNCaseStudy"));
const ContactSlide = lazy(() => import("@/components/slides/ContactSlide"));

const slides: ComponentType[] = [
  TitleSlide,
  SkyrocketSlide,
  ServicesSlide,
  ClientsSlide,
  CaseStudySlide,
  KurarayCaseStudy,
  DEHNCaseStudy,
  BaxsaaCaseStudy,
  GirlUpCaseStudy,
  CTPCaseStudy,
  VNTCaseStudy,
  ContactSlide,
];

const SLIDE_MOUNT_RADIUS = 1;
const NAV_IDLE_HIDE_DELAY = 1600;
const LENIS_SCROLL_DURATION = 0.68;
const LENIS_MOBILE_SCROLL_DURATION = 0.74;
const LENIS_SETTLE_DURATION = 0.38;
const LENIS_MOBILE_SETTLE_DURATION = 0.4;
const LENIS_SETTLE_DELAY = 110;
const LENIS_MOBILE_SETTLE_DELAY = 95;

// Fast release, no overshoot. The tiny spring character now belongs to slide
// content only; the scroll itself stays calm and physically predictable.
const deckScrollEase = (t: number) => 1 - Math.pow(1 - t, 4);

// Mobile settles decisively without bounce or overshoot.
const mobileDeckSettleEase = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * The slides are sized in `svh` (small-viewport height, constant), but
 * `window.innerHeight` grows on mobile when the browser URL bar auto-hides on
 * scroll. Dividing `scrollTop` (which accrues in real svh-based layout pixels)
 * by `window.innerHeight` makes the active-slide index drift low and compound
 * down the deck, so the looked-at slide stops being the mounted one and shows
 * the black `SlideFallback`. Measuring an actual rendered slide gives the true
 * per-slide stride and is correct on desktop too.
 */
const getSlideHeight = (container: HTMLElement) => {
  const probe = container.querySelector<HTMLElement>(".slide");
  const height = probe?.getBoundingClientRect().height ?? 0;
  return height > 0 ? height : window.innerHeight;
};

// A soft branded skeleton instead of a black void, so the lazy-chunk fetch for
// the next slide does not flash an empty frame between scroll-snap stops.
const SlideFallback = () => (
  <section className="slide bg-background" aria-hidden="true">
    <div className="h-full w-full bg-[radial-gradient(circle_at_50%_40%,rgba(75,194,194,0.06),transparent_60%)]" />
  </section>
);

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSettlingRef = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  // Mirrors `currentSlide` for use inside effects that must not re-run on every
  // scroll tick (URL sync + history navigation).
  const currentSlideRef = useRef(currentSlide);
  // True while we are programmatically scrolling in response to a URL change
  // (deep link / back-forward), so the scroll it produces does not push a new
  // history entry and create a navigate <-> scroll loop.
  const suppressUrlSyncRef = useRef(false);
  // Distinguishes the first URL→scroll sync (instant, no animation on initial
  // deep link) from later back/forward navigations (smooth).
  const hasSyncedInitialUrlRef = useRef(false);

  // Case studies (Mitsui through VNT) are immersive on mobile — hide the
  // whole nav bar (logo + menu) there. Desktop keeps the nav untouched.
  const onCaseStudy = currentSlide >= 4 && currentSlide <= 10;

  const [navActive, setNavActive] = useState(true);
  const navIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deckViewportHeightRef = useRef(0);

  const scrollToSlide = useCallback((index: number, immediate = false) => {
    const container = containerRef.current;
    if (!container) return;

    const targetIndex = Math.max(0, Math.min(index, slides.length - 1));
    const targetTop = targetIndex * getSlideHeight(container);
    const lenis = lenisRef.current;

    if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    isSettlingRef.current = false;

    if (!lenis || immediate || prefersReducedMotion) {
      container.scrollTop = targetTop;
      return;
    }

    isSettlingRef.current = true;
    lenis.scrollTo(targetTop, {
      duration: isMobile ? LENIS_MOBILE_SCROLL_DURATION : LENIS_SCROLL_DURATION,
      easing: deckScrollEase,
      lock: false,
      userData: { initiator: "deck-navigation" },
      onComplete: () => {
        isSettlingRef.current = false;
      },
    });
  }, [isMobile, prefersReducedMotion]);

  /**
   * Mobile browser chrome changes the visible viewport while scrolling,
   * especially on reverse scroll. Keep the deck's slide stride tied to the
   * actual visual viewport and preserve the user's scroll progress when that
   * height changes so snap points do not drift.
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;

    const readViewportHeight = () => {
      const visualHeight = window.visualViewport?.height ?? 0;
      return Math.round(visualHeight || window.innerHeight || container.clientHeight);
    };

    const applyViewportHeight = () => {
      rafId = null;
      const nextHeight = readViewportHeight();
      if (nextHeight <= 0) return;

      const previousHeight = deckViewportHeightRef.current || getSlideHeight(container);
      if (Math.abs(nextHeight - previousHeight) < 1) return;

      const progress = previousHeight > 0 ? container.scrollTop / previousHeight : currentSlideRef.current;
      deckViewportHeightRef.current = nextHeight;
      container.style.setProperty("--deck-vh", `${nextHeight}px`);

      const targetTop = Math.max(0, progress * nextHeight);
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(targetTop, { immediate: true, force: true });
      } else {
        container.scrollTop = targetTop;
      }
      window.requestAnimationFrame(() => {
        lenisRef.current?.resize();
      });
    };

    const scheduleViewportHeight = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(applyViewportHeight);
    };

    deckViewportHeightRef.current = readViewportHeight();
    container.style.setProperty("--deck-vh", `${deckViewportHeightRef.current}px`);

    window.visualViewport?.addEventListener("resize", scheduleViewportHeight);
    window.visualViewport?.addEventListener("scroll", scheduleViewportHeight);
    window.addEventListener("resize", scheduleViewportHeight);
    window.addEventListener("orientationchange", scheduleViewportHeight);

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.visualViewport?.removeEventListener("resize", scheduleViewportHeight);
      window.visualViewport?.removeEventListener("scroll", scheduleViewportHeight);
      window.removeEventListener("resize", scheduleViewportHeight);
      window.removeEventListener("orientationchange", scheduleViewportHeight);
    };
  }, []);

  /**
   * Lenis owns wheel/touch smoothing on the deck's real nested scroll
   * container. Native CSS smooth-scroll and native CSS snap stay disabled
   * while it is active; a short nearest-slide settle keeps the presentation
   * structure without stacking two competing scroll engines.
   */
  useEffect(() => {
    const wrapper = containerRef.current;
    const content = contentRef.current;
    if (!wrapper || !content || prefersReducedMotion) return;

    const lenis = new Lenis({
      wrapper,
      content,
      eventsTarget: wrapper,
      autoRaf: true,
      smoothWheel: true,
      syncTouch: true,
      lerp: isMobile ? 0.15 : 0.16,
      syncTouchLerp: isMobile ? 0.1 : 0.12,
      touchInertiaExponent: 1.35,
      wheelMultiplier: 0.92,
      touchMultiplier: isMobile ? 1.08 : 1,
      overscroll: false,
      stopInertiaOnNavigate: true,
      prevent: (node) => node.hasAttribute("data-lenis-prevent"),
    });

    lenisRef.current = lenis;

    const clearSettleTimer = () => {
      if (!settleTimerRef.current) return;
      clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    };

    let gestureStartedAt = 0;
    let lastGestureInputAt = 0;
    let gestureDistance = 0;
    let gesturePeak = 0;
    let gestureStartIndex = currentSlideRef.current;
    let flickDirection: FlickDirection = 0;

    const clearGesture = () => {
      gestureStartedAt = 0;
      lastGestureInputAt = 0;
      gestureDistance = 0;
      gesturePeak = 0;
      flickDirection = 0;
    };

    const settleToNearestSlide = () => {
      settleTimerRef.current = null;
      if (isSettlingRef.current) return;

      if (lenis.isTouching) {
        settleTimerRef.current = setTimeout(settleToNearestSlide, 70);
        return;
      }

      // Let Lenis finish the user's own inertia before adding the small final
      // settle. This avoids the tug-of-war produced by CSS scroll-snap.
      if (Math.abs(lenis.velocity) > 0.08) {
        settleTimerRef.current = setTimeout(settleToNearestSlide, 70);
        return;
      }

      const slideHeight = getSlideHeight(wrapper);
      const nearestIndex = getSlideIndexFromScroll(lenis.scroll, slideHeight, slides.length);
      const targetIndex = flickDirection === 0
        ? nearestIndex
        : Math.max(0, Math.min(gestureStartIndex + flickDirection, slides.length - 1));
      const targetTop = targetIndex * slideHeight;
      if (Math.abs(targetTop - lenis.scroll) < 1) {
        clearGesture();
        return;
      }

      isSettlingRef.current = true;
      lenis.scrollTo(targetTop, {
        duration: isMobile ? LENIS_MOBILE_SETTLE_DURATION : LENIS_SETTLE_DURATION,
        easing: isMobile ? mobileDeckSettleEase : deckScrollEase,
        lock: false,
        userData: { initiator: "deck-settle" },
        onComplete: () => {
          isSettlingRef.current = false;
          clearGesture();
        },
      });
    };

    const scheduleSettle = () => {
      if (isSettlingRef.current) return;
      clearSettleTimer();
      settleTimerRef.current = setTimeout(
        settleToNearestSlide,
        isMobile ? LENIS_MOBILE_SETTLE_DELAY : LENIS_SETTLE_DELAY,
      );
    };

    const recordGesture = ({ deltaY }: VirtualScrollData) => {
      const now = performance.now();
      const startsNewGesture = lastGestureInputAt === 0 || now - lastGestureInputAt > FLICK_GESTURE_GAP_MS;

      if (startsNewGesture) {
        gestureStartedAt = now;
        gestureDistance = 0;
        gesturePeak = 0;
        flickDirection = 0;
        gestureStartIndex = getSlideIndexFromScroll(
          lenis.scroll,
          getSlideHeight(wrapper),
          slides.length,
        );
      }

      gestureDistance += deltaY;
      gesturePeak = Math.max(gesturePeak, Math.abs(deltaY));
      const detectedDirection = getFlickDirection({
        distance: gestureDistance,
        peak: gesturePeak,
        durationMs: now - gestureStartedAt,
        ...(isMobile && {
          windowMs: MOBILE_FLICK_WINDOW_MS,
          distanceThreshold: MOBILE_FLICK_DISTANCE_THRESHOLD,
          peakThreshold: MOBILE_FLICK_PEAK_THRESHOLD,
        }),
      });
      if (detectedDirection !== 0) flickDirection = detectedDirection;
      lastGestureInputAt = now;

      isSettlingRef.current = false;
      clearSettleTimer();
    };

    lenis.on("scroll", scheduleSettle);
    lenis.on("virtual-scroll", recordGesture);

    return () => {
      clearSettleTimer();
      isSettlingRef.current = false;
      lenis.off("scroll", scheduleSettle);
      lenis.off("virtual-scroll", recordGesture);
      lenis.destroy();
      if (lenisRef.current === lenis) lenisRef.current = null;
    };
  }, [isMobile, prefersReducedMotion]);

  const mountedSlides = useMemo(
    () => getMountedSlideIndexes(slides.length, currentSlide, SLIDE_MOUNT_RADIUS),
    [currentSlide],
  );

  /**
   * Keeps the header navigation available while the user is moving through the
   * deck, then clears it once they pause to view the current slide.
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const showNavWhileActive = () => {
      setNavActive(true);
      if (navIdleTimerRef.current) clearTimeout(navIdleTimerRef.current);
      navIdleTimerRef.current = setTimeout(() => {
        setNavActive(false);
      }, NAV_IDLE_HIDE_DELAY);
    };

    showNavWhileActive();
    container.addEventListener("mousemove", showNavWhileActive);
    container.addEventListener("wheel", showNavWhileActive, { passive: true });
    container.addEventListener("touchstart", showNavWhileActive, { passive: true });
    container.addEventListener("touchmove", showNavWhileActive, { passive: true });
    container.addEventListener("scroll", showNavWhileActive, { passive: true });
    window.addEventListener("keydown", showNavWhileActive);

    return () => {
      if (navIdleTimerRef.current) clearTimeout(navIdleTimerRef.current);
      container.removeEventListener("mousemove", showNavWhileActive);
      container.removeEventListener("wheel", showNavWhileActive);
      container.removeEventListener("touchstart", showNavWhileActive);
      container.removeEventListener("touchmove", showNavWhileActive);
      container.removeEventListener("scroll", showNavWhileActive);
      window.removeEventListener("keydown", showNavWhileActive);
    };
  }, []);

  /**
   * Tracks the user's vertical scroll position across the full-height sections
   * and maps it to the `currentSlide` index.
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        const scrollTop = container.scrollTop;
        const slideHeight = getSlideHeight(container);
        const next = getSlideIndexFromScroll(scrollTop, slideHeight, slides.length);
        currentSlideRef.current = next;
        setCurrentSlide(next);
        rafId = null;
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  /**
   * Programmatically scrolls the container to a specific slide index.
   */
  const navigateToSlide = (index: number) => {
    scrollToSlide(index);
  };

  /**
   * Mobile only — Way A scroll-synced URLs. Once the user settles on a slide,
   * reflect it in the address bar so every slide is deep-linkable and back /
   * forward steps between slides. Debounced so a single scroll-through writes
   * one history entry, not one per slide it passes. Desktop never syncs.
   */
  useEffect(() => {
    if (!isMobile) return;
    let id: ReturnType<typeof setTimeout>;

    const syncUrlWhenSettled = () => {
      if (suppressUrlSyncRef.current) return;
      if (isSettlingRef.current || lenisRef.current?.isScrolling) {
        id = window.setTimeout(syncUrlWhenSettled, 80);
        return;
      }
      const slug = slugForIndex(currentSlide);
      if (slug !== window.location.pathname) {
        navigate(slug);
      }
    };

    id = window.setTimeout(syncUrlWhenSettled, 180);
    return () => window.clearTimeout(id);
  }, [currentSlide, isMobile, navigate]);

  /**
   * Reacts to URL changes that did NOT originate from scrolling: the initial
   * deep link on mount, and browser back / forward. Scrolls the container to
   * the slide the URL points at. The scroll this triggers is suppressed from
   * re-writing the URL (see `suppressUrlSyncRef`) so the two effects can't loop.
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targetIndex = indexForSlug(location.pathname);
    const firstPaint = !hasSyncedInitialUrlRef.current;
    hasSyncedInitialUrlRef.current = true;
    if (targetIndex === currentSlideRef.current) return;

    suppressUrlSyncRef.current = true;
    currentSlideRef.current = targetIndex;
    scrollToSlide(targetIndex, firstPaint || prefersReducedMotion);

    const release = window.setTimeout(() => {
      suppressUrlSyncRef.current = false;
    }, firstPaint || prefersReducedMotion ? 80 : 800);
    return () => window.clearTimeout(release);
  }, [location.pathname, prefersReducedMotion, scrollToSlide]);

  return (
    <div
      ref={containerRef}
      data-deck-scroll-container
      className="w-full overflow-y-auto overflow-x-hidden bg-background"
      style={{
        "--deck-vh": "100dvh",
        height: "var(--deck-vh)",
        // Reduced motion keeps an instant native snap. Otherwise Lenis owns
        // both the glide and the short nearest-slide settle.
        scrollSnapType: prefersReducedMotion ? "y mandatory" : "none",
        WebkitOverflowScrolling: "touch",
      } as CSSProperties}
    >
      <div ref={contentRef} data-lenis-content className="relative w-full">
        <PillNav
          // Case-study slides are fully immersive: no top navigation on mobile or desktop.
          // Mobile also hides on the cover (slide 0) so the hook lands clean.
          visible={onCaseStudy ? false : isMobile ? navActive && currentSlide !== 0 : true}
          currentSlide={currentSlide}
          onNavigate={navigateToSlide}
        />
        {slides.map((SlideComponent, index) => (
          <SlideReveal
            key={index}
            className="relative"
            data-slide-index={index}
            nativeMotion={index === 2 || index === 3 || (index >= 4 && index <= 10)}
          >
            {mountedSlides.has(index) ? (
              <Suspense fallback={<SlideFallback />}>
                {index === 0 ? (
                  <TitleSlide onViewCaseStudies={() => navigateToSlide(4)} />
                ) : (
                  <SlideComponent />
                )}
              </Suspense>
            ) : (
              <SlideFallback />
            )}
          </SlideReveal>
        ))}
      </div>
    </div>
  );
};

export default Index;
