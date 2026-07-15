"use client";

import { useEffect, useState } from "react";
import { Home, Clapperboard, LayoutGrid, MessageSquareQuote, Mail } from "lucide-react";

/**
 * Instagram/YouTube-app style bottom navigation — mobile only.
 * Makes the site feel like a native app instead of a shrunk website.
 * Active tab follows scroll position (scroll-spy).
 */
const tabs = [
  { id: "top", label: "Home", icon: Home },
  { id: "portfolio", label: "Work", icon: Clapperboard },
  { id: "services", label: "Services", icon: LayoutGrid },
  { id: "testimonials", label: "Reviews", icon: MessageSquareQuote },
  { id: "contact", label: "Contact", icon: Mail },
];

export function BottomNav() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const sections = tabs
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => el !== null);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div className="pb-safe fixed inset-x-0 bottom-0 z-[110] border-t border-line bg-bg/85 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-between px-2">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = active === t.id;
          return (
            <a
              key={t.id}
              href={`#${t.id}`}
              aria-label={t.label}
              className={`flex min-w-0 flex-1 flex-col items-center gap-1 py-2.5 text-[10.5px] font-medium transition-colors ${
                isActive ? "text-accent" : "text-muted"
              }`}
            >
              <span
                className={`flex h-8 w-14 items-center justify-center rounded-full transition-all ${
                  isActive ? "bg-accent/12" : ""
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.4 : 2} />
              </span>
              {t.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
