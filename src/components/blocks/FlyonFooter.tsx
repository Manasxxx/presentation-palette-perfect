import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import logoPill from "@/assets/owlsurf-logo-pill.png";

const socialLinks = [
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/owlsurfdigital" },
  { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/owlsurfdigital" },
  { label: "Facebook", icon: Facebook, href: "https://www.facebook.com/owlsurfdigital" },
];

const FlyonFooter = () => (
  <footer className="w-full font-sans text-white">
    <div className="mx-auto grid max-w-[1720px] grid-cols-[auto_1fr] items-center gap-x-3 gap-y-3 rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-3 backdrop-blur-sm md:relative md:flex md:flex-row md:justify-between md:gap-3 md:border-0 md:bg-transparent md:px-0 md:py-2.5 md:backdrop-blur-none lg:px-8">
      <div className="flex min-h-12 items-center justify-self-start md:min-h-20">
        <img
          src={logoPill}
          className="h-14 w-auto object-contain md:h-20"
          alt="OwlSurf Digital"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="justify-self-end md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        <div className="flex flex-col items-end gap-1.5 text-right text-[10.5px] font-bold leading-tight tracking-[0.08em] text-white/78 md:items-center md:gap-1 md:text-center md:text-sm md:uppercase">
          <a href="mailto:growth@owlsurf.com" className="inline-flex items-center justify-end gap-1.5 rounded-full border border-primary/18 bg-primary/[0.055] px-2.5 py-1 normal-case hover:text-primary md:border-0 md:bg-transparent md:px-0 md:py-0">
            <Mail className="h-3.5 w-3.5 text-primary md:h-3 md:w-3" strokeWidth={2.2} />
            growth@owlsurf.com
          </a>
          <div className="flex flex-col items-end gap-1 text-white/72 md:flex-row md:items-center md:gap-3 md:text-white/58">
            <a href="tel:+919520367546" className="inline-flex items-center justify-end gap-1.5 rounded-full border border-white/10 bg-black/15 px-2.5 py-1 hover:text-primary md:border-0 md:bg-transparent md:px-0 md:py-0">
              <Phone className="h-3.5 w-3.5 text-primary md:h-3 md:w-3" strokeWidth={2.2} />
              +91 9520 367546
            </a>
            <a href="tel:8948489489" className="inline-flex items-center justify-end gap-1.5 rounded-full border border-white/10 bg-black/15 px-2.5 py-1 hover:text-primary md:border-0 md:bg-transparent md:px-0 md:py-0">
              <Phone className="h-3.5 w-3.5 text-primary md:h-3 md:w-3" strokeWidth={2.2} />
              8948-489-489
            </a>
          </div>
        </div>
      </div>

      <div className="col-span-2 flex items-center justify-center gap-3 border-t border-white/10 pt-2 text-primary md:col-span-1 md:gap-5 md:border-t-0 md:pt-0">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="rounded-full border border-primary/20 bg-primary/[0.055] p-2 transition duration-300 hover:text-primary/70 md:border-0 md:bg-transparent md:p-0"
              >
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </a>
            );
          })}
      </div>
    </div>

    <div className="mt-2 h-px w-full bg-white/12 md:mt-0" />

    <div className="mx-auto max-w-[1720px] px-0 py-2 lg:px-8">
      <div className="text-center text-[11.5px] leading-snug text-white/62 md:text-[13px] md:leading-none">
        &copy; 2026 <span className="text-primary">OwlSurf Digital</span>. Made with ❤️ in India.
      </div>
    </div>
  </footer>
);

export default FlyonFooter;
