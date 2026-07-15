"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Premium smooth scrolling — disabled for reduced-motion users. */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.12, autoRaf: true });
    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
