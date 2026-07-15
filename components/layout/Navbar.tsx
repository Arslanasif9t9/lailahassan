"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { site } from "@/data/site";

const links = [
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#process", label: "Process" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-bg/80 py-3 backdrop-blur-xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 md:px-6">
        <a
          href="#top"
          className={`flex items-center gap-2.5 font-heading text-[21px] font-bold ${
            scrolled ? "text-txt" : "text-white"
          }`}
        >
          <span className="inline-block h-2.5 w-2.5 rounded-[3px] bg-gradient-to-br from-blue-600 to-violet-600" />
          {site.name}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-[14.5px] font-medium transition-colors hover:text-accent ${
                  scrolled ? "text-muted" : "text-white/85"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle dark / light mode"
            className={`flex h-10 w-10 items-center justify-center rounded-xl border backdrop-blur-md transition hover:-translate-y-0.5 ${
              scrolled
                ? "border-line bg-bg2 text-txt"
                : "border-white/25 bg-white/10 text-white"
            }`}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a
            href="#contact"
            className="hidden rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:-translate-y-0.5 hover:bg-accent-hover md:inline-block"
          >
            Book a Call
          </a>
        </div>
      </div>
    </nav>
  );
}
