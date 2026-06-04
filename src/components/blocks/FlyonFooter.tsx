import { Facebook, Instagram, Linkedin } from "lucide-react";
import logoPill from "@/assets/owlsurf-logo-pill.png";

const socialLinks = [
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/owlsurfdigital" },
  { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/owlsurfdigital" },
  { label: "Facebook", icon: Facebook, href: "https://www.facebook.com/owlsurfdigital" },
];

const FlyonFooter = () => (
  <footer className="w-full font-sans text-white">
    <div className="mx-auto flex max-w-[1720px] flex-row items-center justify-between gap-3 px-0 py-2 md:py-2.5 lg:px-8">
      <div className="flex min-h-10 items-center md:min-h-14">
        <img
          src={logoPill}
          className="h-10 w-auto object-contain md:h-14"
          alt="OwlSurf Digital"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="flex items-center justify-center gap-5 text-primary">
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

    <div className="mx-auto max-w-[1720px] px-0 py-2.5 lg:px-8">
      <div className="text-center text-[13px] leading-none text-white/58">
        &copy; 2026 <span className="text-primary">OwlSurf Digital</span>. Made with love in India.
      </div>
    </div>
  </footer>
);

export default FlyonFooter;
