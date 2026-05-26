import { Facebook, Github, Instagram, Twitter } from "lucide-react";

const navItems = ["About", "Features", "Works", "Career"];

const socialLinks = [
  { label: "Facebook", icon: Facebook },
  { label: "Instagram", icon: Instagram },
  { label: "Twitter", icon: Twitter },
  { label: "Github", icon: Github },
];

const FlyonFooter = () => (
  <footer className="w-full font-sans text-white">
    <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-3 max-md:flex-col">
        <div className="flex items-center gap-3 text-xl font-bold">
          <img
            src="https://cdn.flyonui.com/fy-assets/logo/logo.png"
            className="h-8 w-8"
            alt="FlyonUI brand logo"
            loading="lazy"
            decoding="async"
          />
          <span>FlyonUI</span>
        </div>

        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-white/72 transition duration-300 hover:text-primary"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex h-5 gap-4 text-white/80">
          {socialLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href="#"
                aria-label={item.label}
                className="transition duration-300 hover:text-primary"
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
        &copy;2024{" "}
        <a href="#" className="text-primary">
          FlyonUI
        </a>
        , <br className="md:hidden" />
        Made With love for a better web.
      </div>
    </div>
  </footer>
);

export default FlyonFooter;
