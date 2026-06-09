import { useState } from "react";
import { Bug, RefreshCw, X } from "lucide-react";

/**
 * Session/dev-only mobile helper. A floating bug FAB that expands to a
 * hot-reload button plus a jump-to-any-slide list — so the deck can be tested
 * on a real phone without scrolling the whole way through. Mobile-only
 * (`md:hidden`); remove before a production push if it should not ship.
 */

const SLIDE_LABELS = [
  "Cover",
  "Who We Are",
  "Services",
  "Clients",
  "Case Studies (Mitsui)",
  "Kuraray",
  "Baxsaa",
  "CultFit",
  "GirlUp",
  "CTP",
  "VNT",
  "Contact",
];

interface DebugMenuProps {
  currentSlide: number;
  onNavigate: (index: number) => void;
}

const DebugMenu = ({ currentSlide, onNavigate }: DebugMenuProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-[1100] flex flex-col items-end gap-3 md:hidden">
      {open && (
        <div className="flex w-56 flex-col gap-2 rounded-2xl border border-white/15 bg-black/85 p-3 shadow-[0_18px_44px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white py-2.5 text-sm font-semibold text-black"
          >
            <RefreshCw className="h-4 w-4" strokeWidth={2.4} />
            Hot reload
          </button>

          <div className="mt-1 max-h-[42vh] overflow-y-auto pr-0.5">
            <p className="px-1 pb-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/45">
              Jump to slide
            </p>
            <ul className="flex flex-col gap-1">
              {SLIDE_LABELS.map((label, index) => {
                const active = index === currentSlide;
                return (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate(index);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[0.82rem] ${
                        active
                          ? "bg-[rgba(75,194,194,0.22)] text-[#4bc2c2]"
                          : "text-white/80 hover:bg-white/8"
                      }`}
                    >
                      <span className="w-4 shrink-0 text-[0.7rem] tabular-nums text-white/40">
                        {index}
                      </span>
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close debug menu" : "Open debug menu"}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/18 bg-[#4bc2c2] text-black shadow-[0_12px_34px_rgba(0,0,0,0.4)]"
      >
        {open ? <X className="h-5 w-5" strokeWidth={2.4} /> : <Bug className="h-5 w-5" strokeWidth={2.2} />}
      </button>
    </div>
  );
};

export default DebugMenu;
