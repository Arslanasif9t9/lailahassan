import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { software } from "@/data/stats";

export function Software() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-6">
        <SectionHeading center eyebrow="Toolkit" title="Industry-Standard Software" />
        <div className="flex flex-wrap justify-center gap-5">
          {software.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.06}>
              <div className="card-shadow card-shadow-hover group w-[150px] rounded-[18px] border border-line bg-card px-4 py-7 text-center transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-accent/35">
                <div
                  className="mx-auto mb-3.5 flex h-[54px] w-[54px] items-center justify-center rounded-[13px] font-heading text-[17px] font-bold text-white transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                  style={{ background: s.bg }}
                >
                  {s.short}
                </div>
                <p className="text-[13px] font-semibold text-muted">{s.name}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
