"use client";

import { Zap, Palette, BarChart3, Search, Film, Volume2, Sparkles, Infinity } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useContent } from "@/components/providers/ContentProvider";

const iconMap = {
  zap: Zap,
  palette: Palette,
  chart: BarChart3,
  search: Search,
  film: Film,
  volume: Volume2,
  sparkles: Sparkles,
  infinity: Infinity,
} as const;

export function WhyMe() {
  const { whyMe } = useContent();
  return (
    <section className="relative overflow-hidden bg-primary py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 80% 20%, rgba(37,99,235,.18), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-[1200px] px-5 md:px-6">
        <SectionHeading
          center
          light
          eyebrow="Why Work With Me"
          title="Built for Brands That Expect More"
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyMe.map((w, i) => {
            const Icon = iconMap[w.icon as keyof typeof iconMap] ?? Sparkles;
            return (
              <Reveal key={w.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-white/10">
                  <div className="mb-3.5 text-blue-400">
                    <Icon size={26} />
                  </div>
                  <h4 className="mb-2 text-[16.5px] font-semibold text-white">{w.title}</h4>
                  <p className="text-[13.5px] leading-snug text-slate-400">{w.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
