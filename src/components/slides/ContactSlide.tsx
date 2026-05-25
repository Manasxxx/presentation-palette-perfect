import { useEffect, useRef } from "react";
import { ArrowUpRight, Globe, Mail, Phone } from "lucide-react";
import { animate, createSpring, stagger } from "animejs";
import logo from "@/assets/logo-main.jpg";

const contactLinks = [
  {
    label: "Email",
    value: "growth@owlsurf.com",
    href: "mailto:growth@owlsurf.com",
    icon: Mail,
  },
  {
    label: "Call",
    value: "+91 9520 367546",
    href: "tel:+919520367546",
    icon: Phone,
  },
  {
    label: "Web",
    value: "owlsurf.com",
    href: "https://www.owlsurf.com",
    icon: Globe,
  },
];

const ContactSlide = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reveal = () => {
      if (triggered.current) return;
      triggered.current = true;

      animate(el.querySelectorAll(".ct-reveal"), {
        opacity: [0, 1],
        translateY: [24, 0],
        scale: [0.96, 1],
        duration: 850,
        delay: stagger(110),
        ease: createSpring({ stiffness: 100, damping: 14 }),
      });

      animate(el.querySelector(".ct-title-accent")!, {
        translateX: [-26, 0],
        filter: ["blur(10px)", "blur(0px)"],
        duration: 900,
        delay: 250,
        ease: "out(4)",
      });

      animate(el.querySelector(".ct-mark"), {
        opacity: [0, 1],
        duration: 800,
        delay: 220,
        ease: "out(3)",
      });

      animate(el.querySelector(".ct-mark-inner"), {
        opacity: [0, 1],
        scale: [0.78, 1.08, 1],
        rotate: [8, -1, 0],
        duration: 1350,
        delay: 220,
        ease: "out(4)",
      });

      animate(el.querySelectorAll(".ct-link-icon"), {
        scale: [0.6, 1.26, 1],
        filter: [
          "drop-shadow(0 0 0 hsl(180 45% 53% / 0))",
          "drop-shadow(0 0 12px hsl(180 45% 53% / 0.48))",
          "drop-shadow(0 0 0 hsl(180 45% 53% / 0))",
        ],
        delay: stagger(90, { start: 760 }),
        duration: 850,
        ease: "out(4)",
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
  }, []);

  return (
    <section ref={sectionRef} className="slide overflow-hidden bg-background font-sans">
      <div className="absolute inset-0 bg-[#07090d]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_42%,rgba(75,194,194,0.18),transparent_29%),linear-gradient(115deg,rgba(255,255,255,0.045),transparent_34%,rgba(75,194,194,0.055)_72%,transparent)]" />
      <div className="absolute inset-x-8 top-8 h-px bg-white/12 md:inset-x-12" />
      <div className="absolute inset-x-8 bottom-8 h-px bg-white/12 md:inset-x-12" />
      <div className="absolute bottom-8 top-8 left-8 w-px bg-white/12 md:left-12" />
      <div className="absolute bottom-8 top-8 right-8 w-px bg-white/12 md:right-12" />
      <div className="relative z-10 grid h-full w-full max-w-[1720px] grid-cols-1 px-8 py-8 md:grid-cols-[minmax(0,1fr)_minmax(360px,0.58fr)] md:px-12">
        <div className="flex min-h-0 flex-col justify-center px-0 py-10 md:py-12 lg:px-8">
          <main className="max-w-[980px]">
            <p className="ct-reveal mb-7 max-w-[700px] font-body text-lg font-medium leading-tight text-white/58 opacity-0 md:mb-9 md:text-2xl">
              For B2B brands ready to skip the noise.
            </p>

            <h2 className="ct-reveal font-sans text-[clamp(3rem,7.45vw,8.2rem)] font-black uppercase leading-[0.86] tracking-normal text-white opacity-0">
              <span className="block font-sans not-italic">LET'S MAKE</span>
              <span className="block font-sans not-italic">COMPLEX</span>
              <span className="ct-title-accent block font-serif italic normal-case leading-[0.92] tracking-normal text-primary">
                obvious.
              </span>
            </h2>
          </main>

          <div className="ct-reveal mt-12 grid gap-3 opacity-0 md:grid-cols-3">
            {contactLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex min-h-[74px] items-center justify-between gap-4 border-t border-white/18 py-4 transition duration-300 hover:border-primary"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="ct-link-icon flex h-10 w-10 flex-none items-center justify-center rounded-full border border-white/14 text-primary transition duration-300 group-hover:border-primary/80 group-hover:bg-primary/10">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.26em] text-white/36">
                        {item.label}
                      </span>
                      <span className="mt-1 block break-words font-body text-base font-semibold leading-tight text-white md:text-lg lg:text-xl">
                        {item.value}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 flex-none text-white/32 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                </a>
              );
            })}
          </div>
        </div>

        <aside className="relative hidden min-h-0 md:block">
          <div className="ct-mark absolute left-1/2 top-[45%] aspect-square w-[min(78%,470px)] -translate-x-1/2 -translate-y-1/2 opacity-0">
            <div className="ct-mark-inner relative flex h-full w-full items-center justify-center rounded-full border border-white/12 opacity-0">
              <div className="absolute inset-7 rounded-full border border-primary/25" />
              <div className="absolute inset-16 rounded-full bg-primary/[0.045] blur-sm" />
              <div className="relative flex h-[62%] w-[62%] items-center justify-center rounded-full border border-primary/35 bg-black/45 p-3 shadow-[0_0_90px_rgba(75,194,194,0.18)]">
                <img
                  src={logo}
                  alt="OwlSurf Digital"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ContactSlide;
