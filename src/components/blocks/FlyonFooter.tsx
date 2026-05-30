import { Facebook, Globe, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import logoPill from "@/assets/owlsurf-logo-pill.png";

const contactItems = [
  { label: "+91 9520 367546", href: "tel:+919520367546", icon: Phone },
  { label: "growth@owlsurf.com", href: "mailto:growth@owlsurf.com", icon: Mail },
  { label: "owlsurf.com", href: "https://www.owlsurf.com", icon: Globe },
];

const socialLinks = [
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/owlsurfdigital" },
  { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/owlsurfdigital" },
  { label: "Facebook", icon: Facebook, href: "https://www.facebook.com/owlsurfdigital" },
];

const FlyonFooter = () => (
  <footer className="w-full font-sans text-white">
    <div className="mx-auto max-w-[1720px] px-0 py-2.5 lg:px-8">
      <div className="grid items-center gap-4 md:grid-cols-[minmax(170px,0.72fr)_minmax(0,1.7fr)_minmax(110px,0.42fr)]">
        <div className="flex min-h-12 items-center justify-center md:min-h-14 md:justify-start">
          <img
            src={logoPill}
            className="h-12 w-auto object-contain md:h-14"
            alt="OwlSurf Digital"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:gap-x-7">
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex min-w-0 items-center gap-2 text-[13px] font-medium leading-none text-white/72 transition duration-300 hover:text-primary lg:text-sm"
              >
                <Icon className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.8} />
                <span className="truncate">{item.label}</span>
              </a>
            );
          })}
        </div>

        <div className="flex items-center justify-start gap-4 text-primary md:justify-end">
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
    </div>

    <div className="h-px w-full bg-white/12" />

    <div className="mx-auto grid max-w-[1720px] gap-4 px-0 py-2.5 lg:px-8 md:grid-cols-[minmax(170px,0.72fr)_minmax(0,1.7fr)_minmax(110px,0.42fr)]">
      <div className="text-center text-[13px] leading-none text-white/58 md:col-start-2">
        &copy; 2026 <span className="text-primary">OwlSurf Digital</span>. Made with love in India.
      </div>
    </div>
  </footer>
);

export default FlyonFooter;
