"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type FloatingNavItem = {
  title: string;
  icon: ReactNode;
  onClick: () => void;
  active?: boolean;
};

/**
 * Aceternity-style floating navbar, adapted locally to the OwlSurf deck.
 *
 * Deviations from the upstream component, on purpose:
 * - No `useScroll` hide/show. The deck already drives nav visibility through
 *   `PillNav`'s activity timer; a second scroll listener would fight it.
 * - No `fixed` positioning. `.pill-nav-container` owns that, and it animates
 *   `translateY`, which a nested fixed element would not inherit.
 * - The upstream "Login" button becomes the last nav item, keeping the bordered
 *   pill + gradient underline signature as the deck's contact action.
 */
export const FloatingNav = ({
  items,
  className,
}: {
  items: FloatingNavItem[];
  className?: string;
}) => {
  const navItems = items.slice(0, -1);
  const ctaItem = items[items.length - 1];

  return (
    <div
      className={cn(
        "hidden max-w-fit items-center justify-center gap-1 rounded-full border border-white/[0.14] bg-background/70 py-2 pl-6 pr-2 shadow-[0_10px_36px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl md:flex",
        className
      )}
    >
      {navItems.map((item) => (
        <button
          key={item.title}
          type="button"
          onClick={item.onClick}
          aria-current={item.active ? "page" : undefined}
          className={cn(
            "floating-nav-item relative flex items-center gap-2 rounded-full px-3 py-1.5 font-sans text-[0.78rem] font-semibold tracking-[0.02em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-owl-teal/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            item.active ? "text-owl-teal" : "text-white/70 hover:text-white"
          )}
        >
          <span className="block h-4 w-4 shrink-0" aria-hidden="true">
            {item.icon}
          </span>
          <span>{item.title}</span>
        </button>
      ))}

      {ctaItem && (
        <button
          type="button"
          onClick={ctaItem.onClick}
          aria-current={ctaItem.active ? "page" : undefined}
          className={cn(
            "floating-nav-item relative ml-2 flex items-center gap-2 rounded-full border px-4 py-1.5 font-sans text-[0.78rem] font-semibold tracking-[0.02em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-owl-teal/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            ctaItem.active
              ? "border-owl-teal/45 bg-owl-teal/12 text-owl-teal"
              : "border-white/[0.18] text-white/85 hover:border-owl-teal/35 hover:text-owl-teal"
          )}
        >
          <span className="block h-4 w-4 shrink-0" aria-hidden="true">
            {ctaItem.icon}
          </span>
          <span>{ctaItem.title}</span>
          {/* Upstream's signature: a hairline that fades out at both ends */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-owl-teal to-transparent"
          />
        </button>
      )}
    </div>
  );
};
