import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import logoPill from "@/assets/owlsurf-logo-pill.png";

const socialLinks = [
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/owlsurfdigital" },
  { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/owlsurfdigital" },
  { label: "Facebook", icon: Facebook, href: "https://www.facebook.com/owlsurfdigital" },
];

const FlyonFooter = () => (
  <footer className="w-full font-sans text-white">
    <div className="mx-auto grid max-w-[1720px] grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2 px-0 py-2 md:relative md:flex md:flex-row md:justify-between md:gap-3 md:py-2.5 lg:px-8">
      <div className="flex min-h-12 items-center justify-self-start md:min-h-20">
        <img
          src={logoPill}
          className="h-12 w-auto object-contain md:h-20"
          alt="OwlSurf Digital"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="justify-self-end md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        <div className="flex flex-col items-end gap-1 text-right text-[11px] font-bold uppercase leading-tight tracking-[0.08em] text-white/78 md:items-center md:text-center md:text-sm">
          <a href="mailto:growth@owlsurf.com" className="inline-flex items-center justify-end gap-1.5 hover:text-primary">
            <Mail className="h-3 w-3 text-primary" strokeWidth={2.2} />
            growth@owlsurf.com
          </a>
          <div className="flex flex-col items-end gap-1 text-white/58 md:flex-row md:items-center md:gap-3">
            <a href="tel:+919520367546" className="inline-flex items-center justify-end gap-1.5 hover:text-primary">
              <Phone className="h-3 w-3 text-primary" strokeWidth={2.2} />
              +91 9520 367546
            </a>
            <a href="tel:8948489489" className="inline-flex items-center justify-end gap-1.5 hover:text-primary">
              <Phone className="h-3 w-3 text-primary" strokeWidth={2.2} />
              8948-489-489
            </a>
          </div>
        </div>
      </div>

      <div className="col-span-2 flex items-center justify-center gap-5 text-primary md:col-span-1 md:gap-5">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="transition duration-300 hover:text-primary/70"
              >
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </a>
            );
          })}
      </div>
    </div>

    <div className="h-px w-full bg-white/12" />

    <div className="mx-auto max-w-[1720px] px-0 py-2 lg:px-8">
      <div className="text-center text-[12px] leading-snug text-white/58 md:text-[13px] md:leading-none">
        &copy; 2026 <span className="text-primary">OwlSurf Digital</span>. Made with ❤️ in India.
      </div>
    </div>
  </footer>
);

export default FlyonFooter;
