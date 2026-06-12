import { useEffect, useRef } from 'react';
import { animate, stagger, utils } from 'animejs';
import { Home, Compass, Wrench, Users, FolderOpen, Mail } from 'lucide-react';
import { InteractiveMenu } from '@/components/ui/modern-mobile-menu';
import '@/styles/PillNav.css';
import logoImg from '@/assets/logo-main.webp';

const navItems = [
  { label: 'Cover', slideIndex: 0, icon: Home },
  { label: 'Positioning', slideIndex: 1, icon: Compass },
  { label: 'Services', slideIndex: 2, icon: Wrench },
  { label: 'Proof', slideIndex: 3, icon: Users },
  { label: 'Cases', slideIndex: 4, icon: FolderOpen },
  { label: 'Contact', slideIndex: 12, icon: Mail },
];

const slideToNavIndex = (slideIndex: number): number => {
  if (slideIndex <= 3) return slideIndex;
  if (slideIndex <= 11) return 4; // case studies map to "Cases"
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
  // Glass blend-in (Session 42): pills sit transparent on the bar's dark
  // glass; teal is the only fill (active pill + hover circle + accents).
  const baseColor = 'hsl(180, 45%, 53%)';
  const pillColor = 'transparent';
  const hoveredPillTextColor = 'hsl(214, 30%, 6%)';
  const pillTextColor = 'hsl(0 0% 100% / 0.85)';

  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pillGeomRef = useRef<{ h: number }[]>([]);
  const logoImgRef = useRef<HTMLImageElement>(null);
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
      ...Array.from(container.querySelectorAll('.imenu__item')),
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

        {/* Mobile: Modern Mobile Menu (21st.dev easemize port) replaces the
            old hamburger + popover. */}
        <div className="mobile-only imenu-wrap">
          <InteractiveMenu
            items={navItems.map(({ label, icon }) => ({ label, icon }))}
            activeIndex={activeNavIndex}
            onItemClick={(i) => onNavigate(navItems[i].slideIndex)}
          />
        </div>
      </nav>
    </div>
  );
};

export default PillNav;
