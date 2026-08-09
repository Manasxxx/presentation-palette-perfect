import { useEffect, useRef, useState, type MouseEvent } from "react";
import { animate, stagger } from "animejs";
import FlyonFooter from "@/components/blocks/FlyonFooter";
import { OwlSurfLogo } from "@/components/OwlSurfLogo";
import { ChatGPTMark, ClaudeMark } from "@/components/ui/brand-marks";
import GlassSurface from "@/components/ui/glass-surface";
import { Ripple } from "@/components/ui/ripple";
import { WordRotate } from "@/components/ui/word-rotate";
import { useIsMobile } from "@/hooks/use-mobile";
import { animateSlideAccent, animateSlideHeading, getSharedSlideMotionProfile, getSlideContentEase, slideEditorialEase, slideSettleEase } from "./slide-motion";

const rotatingComplexity = ["complex", "technical", "complicated", "confusing", "overwhelming"];
const rotatingChoose = ["understand", "explain", "buy", "get", "choose"];
const askAiPrompt = "What does OwlSurf Digital do? Use https://www.owlsurf.com as the source.";
const encodedAskAiPrompt = encodeURIComponent(askAiPrompt);
const askAiLinks = [
  {
    label: "Claude",
    href: `https://claude.ai/new?q=${encodedAskAiPrompt}`,
    appHref: `claude://claude.ai/new?q=${encodedAskAiPrompt}`,
    Mark: ClaudeMark,
  },
  {
    label: "ChatGPT",
    href: `https://chatgpt.com/?q=${encodedAskAiPrompt}`,
    Mark: ChatGPTMark,
  },
] as const;

const ContactSlide = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggered = useRef(false);
  const isMobile = useIsMobile();
  const [askAiStatus, setAskAiStatus] = useState("");

  const copyAskAiPrompt = async () => {
    if (window.isSecureContext && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(askAiPrompt);
        return true;
      } catch {
        // Fall through to the legacy path used by local mobile previews over HTTP.
      }
    }

    const textarea = document.createElement("textarea");
    textarea.value = askAiPrompt;
    textarea.readOnly = true;
    textarea.setAttribute("aria-hidden", "true");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    }
    textarea.remove();
    return copied;
  };

  const handleAskAi = async (event: MouseEvent<HTMLAnchorElement>, link: (typeof askAiLinks)[number]) => {
    event.preventDefault();

    const promptCopied = await copyAskAiPrompt();
    setAskAiStatus(promptCopied ? "Prompt copied" : `Opening ${link.label}`);

    if ("appHref" in link) {
      window.location.href = link.appHref;
      window.setTimeout(() => {
        if (document.visibilityState === "visible") window.location.href = link.href;
      }, 900);
      return;
    }

    window.setTimeout(() => {
      window.location.href = link.href;
    }, promptCopied ? 420 : 0);
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reveal = () => {
      if (triggered.current) return;
      triggered.current = true;
      const profile = getSharedSlideMotionProfile(isMobile);

      animate(el.querySelectorAll(".ct-reveal"), {
        opacity: [0, 1],
        translateY: [isMobile ? 16 : 24, 0],
        scale: isMobile ? [1, 1] : [0.96, 1],
        duration: 850,
        delay: stagger(profile.itemStagger, { start: profile.contentDelay }),
        ease: getSlideContentEase(isMobile),
      });

      animateSlideHeading(el, ".ct-heading", isMobile, 120);
      animateSlideAccent(el, ".ct-title-accent", isMobile, 170);

      animate(el.querySelector(".ct-mark"), {
        opacity: [0, 1],
        duration: 800,
        delay: 220,
        ease: slideSettleEase,
      });

      animate(el.querySelector(".ct-mark-inner"), {
        opacity: [0, 1],
        scale: [0.78, 1.08, 1],
        rotate: [8, -1, 0],
        duration: 1350,
        delay: 220,
        ease: slideEditorialEase,
      });

    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    const fallback = window.setTimeout(reveal, 700);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="slide overflow-hidden bg-background font-sans">
      <div className="absolute inset-0 bg-[#07090d]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(75,194,194,0.2),transparent_56%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_76%,rgba(75,194,194,0.13),transparent_34%),radial-gradient(circle_at_84%_76%,rgba(75,194,194,0.12),transparent_34%),linear-gradient(115deg,rgba(75,194,194,0.07),transparent_28%,transparent_70%,rgba(75,194,194,0.06))]" />
      <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(0deg,rgba(75,194,194,0.08),transparent_72%)]" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-start px-6 pb-[15.25rem] pt-[2.35rem] text-center md:justify-center md:pb-32 md:pt-8">
        {/* OwlSurf ripple mark — hero */}
        <div className="ct-mark relative mb-3 aspect-square w-[205px] opacity-0 md:mb-4 md:w-[372px]">
          {isMobile && (
            <Ripple
              mainCircleSize={236}
              mainCircleOpacity={0.26}
              numCircles={7}
              accentColor="hsl(var(--primary))"
              ringBorderColor="transparent"
              className="left-1/2 top-1/2 h-[52rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(circle,white_28%,transparent_68%)]"
            />
          )}
          <div className="ct-mark-inner relative flex h-full w-full items-center justify-center opacity-0">
            <OwlSurfLogo className="h-[72%] w-[72%] overflow-visible drop-shadow-[0_0_42px_rgba(75,194,194,0.22)] md:h-[68%] md:w-[68%]" />
          </div>
        </div>

        <h2 className="ct-heading flex max-w-[22rem] flex-wrap items-center justify-center gap-x-3 gap-y-1.5 font-sans text-[clamp(1.55rem,6.25vw,2.18rem)] font-black uppercase leading-[1.08] tracking-normal text-white opacity-0 [overflow-wrap:anywhere] md:max-w-none md:flex-nowrap md:gap-x-4 md:text-[clamp(1.7rem,3.1vw,2.6rem)]">
          <span className="shrink-0 whitespace-nowrap not-italic">We make the</span>
          <span className="ct-title-accent inline-flex shrink-0 not-italic rounded-full border border-owl-teal/45 bg-owl-teal px-4 py-1 text-[1.28rem] font-black uppercase leading-[1.16] tracking-[0.02em] text-background shadow-[0_0_28px_rgba(75,194,194,0.28)] md:px-6 md:py-2 md:text-[clamp(1.5rem,2.7vw,2.4rem)]">
            <WordRotate words={rotatingComplexity} duration={1900} className="text-center not-italic" />
          </span>
          <span className="shrink-0 whitespace-nowrap not-italic">easy to</span>
          <span className="inline-flex shrink-0 not-italic rounded-full border border-owl-teal/45 bg-owl-teal px-4 py-1 text-[1.28rem] font-black uppercase leading-[1.16] tracking-[0.02em] text-background shadow-[0_0_28px_rgba(75,194,194,0.28)] md:px-6 md:py-2 md:text-[clamp(1.5rem,2.7vw,2.4rem)]">
            <WordRotate words={rotatingChoose} duration={1900} className="text-center not-italic" />
          </span>
        </h2>

        {isMobile ? (
          <div className="ct-reveal mt-8 flex flex-col items-center gap-2.5 opacity-0" aria-label="Ask an AI about OwlSurf">
            <GlassSurface
              width={220}
              height={48}
              borderRadius={999}
              borderWidth={0.05}
              brightness={72}
              opacity={0.96}
              blur={8}
              backgroundOpacity={0.08}
              saturation={1.35}
              distortionScale={-90}
              className="ts-review-case-pill pointer-events-none"
            >
              <span className="relative z-10 font-sans text-[0.72rem] font-bold uppercase tracking-[0.18em] text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.45)]">
                Ask AI what we do.
              </span>
            </GlassSurface>
            <div className="flex items-center justify-center gap-2" aria-label="Choose an AI assistant">
              {askAiLinks.map((link) => {
                const { label, href, Mark } = link;
                return (
                  <a
                    key={label}
                    href={href}
                    aria-label={`Ask ${label}: ${askAiPrompt}`}
                    onClick={(event) => void handleAskAi(event, link)}
                    className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.055] px-3 text-[10.5px] font-bold text-white/82 transition-[color,background-color,border-color] duration-200 hover:border-primary/45 hover:bg-primary/[0.1] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#07090d]"
                  >
                    <Mark className="h-3.5 w-3.5 shrink-0" />
                    <span>{label}</span>
                  </a>
                );
              })}
            </div>
            <span className="min-h-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/58" role="status" aria-live="polite">
              {askAiStatus}
            </span>
          </div>
        ) : (
          <span className="ct-reveal mt-12 block text-[12.5px] font-bold uppercase tracking-[0.34em] text-primary opacity-0 md:mt-5 md:text-xs">
            Let’s talk
          </span>
        )}

      </div>

      <div className="ct-reveal absolute inset-x-5 bottom-4 z-[46] opacity-0 md:inset-x-12 md:bottom-8">
        <FlyonFooter />
      </div>
    </section>
  );
};

export default ContactSlide;
