import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight, Compass, Mail } from "lucide-react";
import logo from "@/assets/logo-main.webp";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#07090d] font-sans text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(75,194,194,0.2),transparent_28%),radial-gradient(circle_at_20%_80%,rgba(75,194,194,0.13),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.055),transparent_42%)]" />
      <div className="absolute inset-x-8 top-8 h-px bg-white/12 md:inset-x-12" />
      <div className="absolute inset-x-8 bottom-8 h-px bg-white/12 md:inset-x-12" />
      <div className="absolute bottom-8 top-8 left-8 w-px bg-white/12 md:left-12" />
      <div className="absolute bottom-8 top-8 right-8 w-px bg-white/12 md:right-12" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-8 py-20 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.7fr)] md:px-14 lg:px-20">
        <section className="max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-primary/28 bg-primary/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.26em] text-primary">
            <Compass className="h-3.5 w-3.5" />
            404 page
          </div>

          <h1 className="font-sans text-[clamp(4.5rem,12vw,11rem)] font-black uppercase leading-[0.82] tracking-normal">
            Lost in
            <span className="block bg-gradient-to-r from-primary via-[#61f5f5] to-white bg-clip-text pr-2 text-transparent">
              the deck.
            </span>
          </h1>

          <p className="mt-7 max-w-xl font-body text-lg font-medium leading-snug text-white/62 md:text-2xl">
            This path does not exist. Jump back to the OwlSurf presentation or get in touch from the closing slide.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="/"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 font-sans text-sm font-black uppercase tracking-[0.16em] text-[#061112] transition duration-300 hover:-translate-y-0.5 hover:bg-[#61f5f5]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to cover
            </a>
            <a
              href="/#contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/16 px-5 font-sans text-sm font-black uppercase tracking-[0.16em] text-white transition duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
            >
              Contact OwlSurf
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </section>

        <aside className="relative hidden min-h-[520px] md:block">
          <div className="absolute right-0 top-1/2 h-[430px] w-[330px] -translate-y-1/2 rounded-[2rem] border border-white/12 bg-white/[0.045] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.32)]">
            <div className="flex h-full flex-col justify-between rounded-[1.5rem] bg-[#091218]/95 p-7">
              <div className="flex items-center justify-between">
                <img src={logo} alt="OwlSurf Digital" className="h-12 w-12 rounded-full object-cover" />
                <span className="rounded-full border border-primary/30 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  404
                </span>
              </div>

              <div>
                <div className="text-[8rem] font-black leading-none text-white/8">?</div>
                <p className="mt-3 font-body text-xl font-semibold leading-tight text-white">
                  Wrong room. Right brand.
                </p>
                <p className="mt-2 font-body text-sm leading-snug text-white/52">
                  The page is missing, but the deck is ready.
                </p>
              </div>

              <a
                href="/"
                className="group inline-flex items-center justify-between border-t border-white/12 pt-4 font-sans text-xs font-black uppercase tracking-[0.2em] text-white/70 transition duration-300 hover:text-primary"
              >
                Open presentation
                <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default NotFound;
