import { Clapperboard, Zap, TrendingUp, Home, Briefcase, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";

const iconMap = {
  film: Clapperboard,
  zap: Zap,
  trending: TrendingUp,
  home: Home,
  briefcase: Briefcase,
  sparkles: Sparkles,
} as const;

export function Services() {
  return (
    <section id="services" className="scroll-mt-16 bg-bg2 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-6">
        <SectionHeading
          center
          eyebrow="Services"
          title="Editing That Drives Results"
          sub="From long-form storytelling to scroll-stopping shorts — every edit is built for retention and conversion."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="card-shadow card-shadow-hover group relative h-full overflow-hidden rounded-[20px] border border-line bg-card p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/30">
                  <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-blue-600 to-violet-600 transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105 group-hover:bg-accent group-hover:text-white">
                    <Icon size={25} />
                  </div>
                  <h3 className="mb-3.5 text-[21px] font-semibold text-txt">{s.title}</h3>
                  <ul className="space-y-1.5">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-[14.5px] text-muted">
                        <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
