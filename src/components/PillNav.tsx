import { useEffect, useRef, useState } from 'react';
import { animate, stagger, utils } from 'animejs';
import '@/styles/PillNav.css';
import logoImg from '@/assets/logo-main.webp';

const navItems = [
  { label: 'Cover', slideIndex: 0 },
  { label: 'Positioning', slideIndex: 1 },
  { label: 'Services', slideIndex: 2 },
  { label: 'Proof', slideIndex: 3 },
  { label: 'Cases', slideIndex: 4 },
  { label: 'Contact', slideIndex: 11 },
];

const slideToNavIndex = (slideIndex: number): number => {
  if (slideIndex <= 3) return slideIndex;
  if (slideIndex <= 10) return 4; // case studies map to "Cases"
  return 5; // Contact
};

interface PillNavProps {
  visible: boolean;
  currentSlide: number;
  onNavigate: (index: number) => void;
}

const PillNav = ({
  visible,
  currentSlide,
  onNavigate,
}: PillNavProps) => {
  const ease = 'out(4)';
  const baseColor = 'hsl(0, 0%, 100%)';
  const pillColor = 'hsl(214, 30%, 6%)';
  const hoveredPillTextColor = 'hsl(214, 30%, 6%)';
  const pillTextColor = 'hsl(0, 0%, 100%)';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pillGeomRef = useRef<{ h: number }[]>([]);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Show/hide animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const movingItems = [
      logoRef.current,
      ...Array.from(container.querySelectorAll('.pill-list > li')),
      hamburgerRef.current,
    ].filter(Boolean) as HTMLElement[];

    utils.remove([container, ...movingItems]);

    if (visible) {
      container.style.visibility = 'visible';
      container.style.pointerEvents = 'auto';
      animate(container, { opacity: 1, translateY: 0, duration: 280, ease });
      animate(movingItems, { opacity: 1, translateY: 0, duration: 340, delay: stagger(35), ease });
    } else {
      animate(movingItems, { opacity: 0, translateY: -18, duration: 240, delay: stagger(25), ease });
      animate(container, {
        opacity: 0,
        translateY: -24,
        duration: 320,
        delay: 50,
        ease,
        onComplete: () => { container.style.pointerEvents = 'none'; },
      });
    }
  }, [visible]);

  // Geometry + initial-load animation (the hover circle-fill is animated
  // directly on enter/leave below, so no paused timelines are stored).
  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;
        const pill = circle.parentElement;
        const { width: w, height: h } = pill.getBoundingClientRect();
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;
        circle.style.transformOrigin = `50% ${originY}px`;
        utils.set(circle, { translateX: '-50%', scale: 0 });

        const label = pill.querySelector('.pill-label') as HTMLElement | null;
        const white = pill.querySelector('.pill-label-hover') as HTMLElement | null;
        if (label) utils.set(label, { translateY: 0 });
        if (white) utils.set(white, { translateY: h + 12, opacity: 0 });

        pillGeomRef.current[index] = { h };
      });
    };

    layout();
    window.addEventListener('resize', layout);
    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => { });
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      menu.style.transformOrigin = 'top center';
      utils.set(menu, { opacity: 0, scaleY: 1 });
      menu.style.visibility = 'hidden';
    }

    // Initial load animation
    const logo = logoRef.current;
    const navI = navItemsRef.current;
    if (logo) {
      utils.set(logo, { scale: 0 });
      animate(logo, { scale: 1, duration: 600, ease });
    }
    if (navI) {
      utils.set(navI, { opacity: 0, translateY: -8 });
      animate(navI, { opacity: 1, translateY: 0, duration: 450, ease });
    }

    return () => window.removeEventListener('resize', layout);
  }, []);

  const pillParts = (i: number) => {
    const circle = circleRefs.current[i];
    if (!circle?.parentElement) return null;
    const pill = circle.parentElement;
    const h = pillGeomRef.current[i]?.h ?? pill.getBoundingClientRect().height;
    const label = pill.querySelector('.pill-label') as HTMLElement | null;
    const white = pill.querySelector('.pill-label-hover') as HTMLElement | null;
    return { circle, label, white, h };
  };

  const handleEnter = (i: number) => {
    const parts = pillParts(i);
    if (!parts) return;
    const { circle, label, white, h } = parts;
    utils.remove([circle, label, white].filter(Boolean) as HTMLElement[]);
    animate(circle, { scale: 1.2, duration: 300, ease });
    if (label) animate(label, { translateY: -(h + 8), duration: 300, ease });
    if (white) animate(white, { translateY: 0, opacity: 1, duration: 300, ease });
  };

  const handleLeave = (i: number) => {
    const parts = pillParts(i);
    if (!parts) return;
    const { circle, label, white, h } = parts;
    utils.remove([circle, label, white].filter(Boolean) as HTMLElement[]);
    animate(circle, { scale: 0, duration: 200, ease });
    if (label) animate(label, { translateY: 0, duration: 200, ease });
    if (white) animate(white, { translateY: h + 12, opacity: 0, duration: 200, ease });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    utils.remove(img);
    utils.set(img, { rotate: 0 });
    animate(img, { rotate: 360, duration: 600, ease });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;
    const backdrop = document.querySelector('.mobile-menu-backdrop') as HTMLElement;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        animate(lines[0], { rotate: 45, translateY: 3, duration: 300, ease });
        animate(lines[1], { rotate: -45, translateY: -3, duration: 300, ease });
      } else {
        animate(lines[0], { rotate: 0, translateY: 0, duration: 300, ease });
        animate(lines[1], { rotate: 0, translateY: 0, duration: 300, ease });
      }
    }

    if (backdrop) {
      if (newState) {
        backdrop.style.visibility = 'visible';
        animate(backdrop, { opacity: 1, duration: 300, ease });
      } else {
        animate(backdrop, {
          opacity: 0,
          duration: 200,
          ease,
          onComplete: () => { backdrop.style.visibility = 'hidden'; },
        });
      }
    }

    if (menu) {
      if (newState) {
        menu.style.visibility = 'visible';
        utils.set(menu, { opacity: 0, translateY: 10 });
        animate(menu, { opacity: 1, translateY: 0, duration: 300, ease });
      } else {
        animate(menu, {
          opacity: 0,
          translateY: 10,
          duration: 200,
          ease,
          onComplete: () => { menu.style.visibility = 'hidden'; },
        });
      }
    }
  };

  // Close the mobile menu on Escape, move focus into it on open, and return
  // focus to the hamburger on close — keyboard-accessible disclosure.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const hamburger = hamburgerRef.current;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') toggleMobileMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    mobileMenuRef.current
      ?.querySelector<HTMLButtonElement>('.mobile-menu-link')
      ?.focus();
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      hamburger?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobileMenuOpen]);

  const activeNavIndex = slideToNavIndex(currentSlide);

  const cssVars = {
    '--base': baseColor,
    '--pill-bg': pillColor,
    '--hover-text': hoveredPillTextColor,
    '--pill-text': pillTextColor,
  } as React.CSSProperties;

  return (
    <div className="pill-nav-container" ref={containerRef} style={{ visibility: 'hidden' }}>
      <nav className="pill-nav" aria-label="Primary" style={cssVars}>
        <button
          className="pill-logo"
          aria-label="Home"
          onMouseEnter={handleLogoEnter}
          onClick={() => onNavigate(0)}
          ref={logoRef}
        >
          <img src={logoImg} alt="OwlSurf Logo" ref={logoImgRef} />
        </button>

        <div className="pill-nav-items desktop-only" ref={navItemsRef}>
          <ul className="pill-list">
            {navItems.map((item, i) => (
              <li key={item.label}>
                <button
                  className={`pill${activeNavIndex === i ? ' is-active' : ''}`}
                  aria-label={item.label}
                  aria-current={activeNavIndex === i ? 'page' : undefined}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                  onClick={() => onNavigate(item.slideIndex)}
                >
                  <span
                    className="hover-circle"
                    aria-hidden="true"
                    ref={(el) => { circleRefs.current[i] = el; }}
                  />
                  <span className="label-stack">
                    <span className="pill-label">{item.label}</span>
                    <span className="pill-label-hover" aria-hidden="true">
                      {item.label}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="mobile-menu-button mobile-only"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-menu"
          ref={hamburgerRef}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      <div
        className="mobile-menu-backdrop mobile-only"
        onClick={() => {
          if (isMobileMenuOpen) toggleMobileMenu();
        }}
      />

      <div className="mobile-menu-popover mobile-only" id="mobile-nav-menu" ref={mobileMenuRef} style={cssVars}>
        <ul className="mobile-menu-list">
          {navItems.map((item, i) => (
            <li key={item.label}>
              <button
                className={`mobile-menu-link${activeNavIndex === i ? ' is-active' : ''}`}
                aria-current={activeNavIndex === i ? 'page' : undefined}
                onClick={() => {
                  toggleMobileMenu();
                  onNavigate(item.slideIndex);
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
