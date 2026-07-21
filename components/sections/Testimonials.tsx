"use client";

import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useContent } from "@/components/providers/ContentProvider";

export function Testimonials() {
  const { testimonials } = useContent();
  return (
    <section id="testimonials" className="scroll-mt-16 bg-bg2 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-6">
        <SectionHeading center eyebrow="Testimonials" title="What Clients Say" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div className="card-shadow card-shadow-hover h-full rounded-[20px] border border-line bg-card p-8 transition-all duration-300 hover:-translate-y-1">
                <div className="mb-4 flex gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={15} fill="currentColor" />
                  ))}
                </div>
                <p className="mb-6 text-[15px] italic leading-relaxed text-txt">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3.5">
                  <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 font-heading text-base font-bold text-white">
                    {t.initials}
                  </div>
                  <div>
                    <h5 className="text-[14.5px] font-semibold text-txt">{t.name}</h5>
                    <small className="text-[12.5px] text-muted">{t.role}</small>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
