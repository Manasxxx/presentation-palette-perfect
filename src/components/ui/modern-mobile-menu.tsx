import React, { useRef, useEffect, useMemo } from "react";

// Local adaptation of 21st.dev "Modern Mobile Menu" (easemize/modern-mobile-menu).
// Controlled: active index comes from the deck's current slide instead of
// internal state, so scrolling the deck moves the highlight too. Styles live
// in src/styles/PillNav.css under `.imenu*`.

type IconComponentType = React.ElementType<{ className?: string }>;

export interface InteractiveMenuItem {
  label: string;
  icon: IconComponentType;
}

export interface InteractiveMenuProps {
  items: InteractiveMenuItem[];
  accentColor?: string;
  activeIndex: number;
  onItemClick: (index: number) => void;
}

const InteractiveMenu = ({ items, accentColor, activeIndex, onItemClick }: InteractiveMenuProps) => {
  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // The active underline grows to the label's measured width (original
  // component behavior); re-measure on activation and viewport resize.
  useEffect(() => {
    const setLineWidth = () => {
      const activeItemElement = itemRefs.current[activeIndex];
      const activeTextElement = textRefs.current[activeIndex];
      if (activeItemElement && activeTextElement) {
        activeItemElement.style.setProperty("--lineWidth", `${activeTextElement.offsetWidth}px`);
      }
    };

    setLineWidth();
    window.addEventListener("resize", setLineWidth);
    return () => window.removeEventListener("resize", setLineWidth);
  }, [activeIndex, items]);

  const navStyle = useMemo(
    () => (accentColor ? ({ "--imenu-active-color": accentColor } as React.CSSProperties) : undefined),
    [accentColor]
  );

  // Plain div: the host `nav.pill-nav` already provides the navigation
  // landmark; a nested same-label nav would duplicate it.
  return (
    <div className="imenu" style={navStyle}>
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        const IconComponent = item.icon;
        return (
          <button
            key={item.label}
            className={`imenu__item ${isActive ? "active" : ""}`}
            aria-current={isActive ? "page" : undefined}
            onClick={() => onItemClick(index)}
            ref={(el) => (itemRefs.current[index] = el)}
            style={{ "--lineWidth": "0px" } as React.CSSProperties}
          >
            <div className="imenu__icon">
              <IconComponent className="icon" />
            </div>
            <strong
              className={`imenu__text ${isActive ? "active" : ""}`}
              ref={(el) => (textRefs.current[index] = el)}
            >
              {item.label}
            </strong>
          </button>
        );
      })}
    </div>
  );
};

export { InteractiveMenu };
