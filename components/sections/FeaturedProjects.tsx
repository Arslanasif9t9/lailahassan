import { TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { featuredProjects } from "@/data/projects";

export function FeaturedProjects() {
  return (
    <section className="bg-bg2 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-6">
        <SectionHeading center eyebrow="Featured Projects" title="Work That Moved the Needle" />
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          {featuredProjects.map((f, i) => (
            <Reveal key={f.heading} delay={i * 0.1}>
              <div className="card-shadow card-shadow-hover h-full overflow-hidden rounded-[20px] border border-line bg-card transition-all duration-300 hover:-translate-y-1.5">
                <div
                  className="relative flex aspect-[16/8.5] items-end p-6"
                  style={{ background: f.gradient }}
                >
                  <span className="absolute right-4 top-4 rounded-lg bg-black/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                    {f.duration}
                  </span>
                  <span className="font-heading text-lg font-semibold text-white">{f.title}</span>
                </div>
                <div className="p-7">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {f.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-accent/10 px-3 py-1.5 text-[11.5px] font-semibold text-accent"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="mb-2.5 text-xl font-semibold text-txt">{f.heading}</h3>
                  <p className="text-[14.5px] leading-relaxed text-muted">{f.description}</p>
                  <div className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-sm font-semibold text-green-600">
                    <TrendingUp size={16} /> {f.result}
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
