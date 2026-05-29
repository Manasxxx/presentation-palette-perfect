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
    <div className="max-w-[1720px] py-3 lg:px-8">
      <div className="flex items-center justify-between gap-4 max-md:flex-col">
        <img
          src={logoPill}
          className="-ml-3 h-20 w-auto"
          alt="OwlSurf Digital"
          loading="lazy"
          decoding="async"
        />

        <div className="flex flex-nowrap items-center justify-center gap-x-6 gap-y-2 whitespace-nowrap max-md:flex-wrap">
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-2 text-sm font-medium text-white/72 transition duration-300 hover:text-primary"
              >
                <Icon className="h-4 w-4 text-primary" strokeWidth={1.8} />
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="flex h-5 gap-4 text-primary">
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

    <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
      <div className="text-center text-sm text-white/58">
        &copy; 2026{" "}
        <span className="text-primary">OwlSurf Digital</span>. Made with love in India.
      </div>
    </div>
  </footer>
);

export default FlyonFooter;
