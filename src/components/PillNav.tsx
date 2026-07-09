import { useEffect, useRef } from 'react';
import { animate, stagger, utils } from 'animejs';
import { Home, Compass, Wrench, Users, FolderOpen, Mail } from 'lucide-react';
import { InteractiveMenu } from '@/components/ui/modern-mobile-menu';
import { FloatingNav } from '@/components/ui/floating-navbar';
import '@/styles/PillNav.css';

const navItems = [
  { label: 'Home', slideIndex: 0, icon: Home },
  { label: 'About', slideIndex: 1, icon: Compass },
  { label: 'Work', slideIndex: 2, icon: Wrench },
  { label: 'Clients', slideIndex: 3, icon: Users },
  { label: 'Cases', slideIndex: 4, icon: FolderOpen },
  { label: 'Contact', slideIndex: 11, icon: Mail },
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
  const containerRef = useRef<HTMLDivElement>(null);

  // Show/hide animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const movingItems = [
      ...Array.from(container.querySelectorAll('.floating-nav-item')),
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

  const activeNavIndex = slideToNavIndex(currentSlide);

  return (
    <div className="pill-nav-container" ref={containerRef} style={{ visibility: 'hidden' }}>
      <nav className="pill-nav" aria-label="Primary">
        <div className="desktop-only">
          <FloatingNav
            items={navItems.map((item, i) => {
              const Icon = item.icon;
              return {
                title: item.label,
                icon: <Icon aria-hidden="true" className="h-full w-full" strokeWidth={2} />,
                onClick: () => onNavigate(item.slideIndex),
                active: activeNavIndex === i,
              };
            })}
          />
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
