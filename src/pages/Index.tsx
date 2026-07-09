import { lazy, Suspense, useMemo, useState, useEffect, useRef, type ComponentType, type CSSProperties } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TitleSlide from "@/components/slides/TitleSlide";

import SlideReveal from "@/components/SlideReveal";
import PillNav from "@/components/PillNav";
import DeckTransitionLayer from "@/components/DeckTransitionLayer";
import { DeckScrollContext } from "@/components/deck-scroll-context";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { getMountedSlideIndexes, getSlideIndexFromScroll } from "./slide-window";
import { indexForSlug, slugForIndex } from "./slide-routes";
import { seamColor } from "./slide-edge-colors";
import { getDeckSnapConfig } from "./deck-snap";

const MobileTransitionLayer = lazy(() => import("@/components/MobileTransitionLayer"));
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
      const previousScrollBehavior = container.style.scrollBehavior;
      container.style.scrollBehavior = "auto";
      container.scrollTop = targetTop;
      window.requestAnimationFrame(() => {
        container.style.scrollBehavior = previousScrollBehavior;
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
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({
      top: index * getSlideHeight(container),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  /**
   * Mobile only — Way A scroll-synced URLs. Once the user settles on a slide,
   * reflect it in the address bar so every slide is deep-linkable and back /
   * forward steps between slides. Debounced so a single scroll-through writes
   * one history entry, not one per slide it passes. Desktop never syncs.
   */
  useEffect(() => {
    if (!isMobile) return;
    const id = window.setTimeout(() => {
      if (suppressUrlSyncRef.current) return;
      const slug = slugForIndex(currentSlide);
      if (slug !== window.location.pathname) {
        navigate(slug);
      }
    }, 160);
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
    if (targetIndex === currentSlideRef.current) return;

    const firstPaint = !hasSyncedInitialUrlRef.current;
    hasSyncedInitialUrlRef.current = true;

    suppressUrlSyncRef.current = true;
    currentSlideRef.current = targetIndex;
    container.scrollTo({
      top: targetIndex * getSlideHeight(container),
      behavior: firstPaint || prefersReducedMotion ? "auto" : "smooth",
    });

    const release = window.setTimeout(() => {
      suppressUrlSyncRef.current = false;
    }, 650);
    return () => window.clearTimeout(release);
  }, [location.pathname, prefersReducedMotion]);

  const snapConfig = getDeckSnapConfig(isMobile);

  return (
    <DeckScrollContext.Provider value={containerRef}>
    <div
      ref={containerRef}
      data-deck-scroll-container
      className={`w-full overflow-y-auto overflow-x-hidden bg-background${prefersReducedMotion ? "" : " scroll-smooth"}`}
      style={{
        "--deck-vh": "100dvh",
        height: "var(--deck-vh)",
        scrollSnapType: snapConfig.container,
        WebkitOverflowScrolling: "touch",
      } as CSSProperties}
    >

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
          // Mobile seam blend: both sides of each slide joint fade to the same
          // mix of the two adjacent slides' edge colors (slide-edge-colors.ts),
          // so the boundary reads as one wash, not a divider line.
          seamTopColor={isMobile && !(index >= 4 && index <= 10) ? seamColor(index - 1) : undefined}
          seamBottomColor={isMobile && !(index >= 4 && index <= 10) ? seamColor(index) : undefined}
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
      {/* Desktop keeps the animejs liquid-wash transition. Mobile gets the
          Motion scroll-linked cross-fade (SlideReveal) plus the Theatre.js
          signature sweep below. */}
      {!isMobile && (
        <DeckTransitionLayer
          currentSlide={currentSlide}
          isMobile={isMobile}
          reducedMotion={prefersReducedMotion}
        />
      )}
      {isMobile && !prefersReducedMotion && (
        <Suspense fallback={null}>
          <MobileTransitionLayer />
        </Suspense>
      )}
    </div>
    </DeckScrollContext.Provider>
  );
};

export default Index;
