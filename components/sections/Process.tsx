import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/data/stats";

export function Process() {
  return (
    <section id="process" className="scroll-mt-16 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-6">
        <SectionHeading center eyebrow="Editing Process" title="From Raw Footage to Final Cut" />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-5 md:gap-0">
          {processSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <div className="group relative flex items-center gap-5 px-0 py-3 text-left md:block md:px-4 md:py-0 md:text-center">
                {/* connector line (desktop) */}
                {i < processSteps.length - 1 && (
                  <span className="absolute left-[calc(50%+38px)] top-[29px] hidden h-0.5 w-[calc(100%-76px)] bg-gradient-to-r from-accent to-accent/15 md:block" />
                )}
                <div className="relative z-10 flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full border-2 border-accent bg-card font-heading text-xl font-bold text-accent shadow-[0_0_0_6px_var(--bg)] transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white md:mx-auto md:mb-4">
                  {i + 1}
                </div>
                <div>
                  <h4 className="mb-1 text-[16.5px] font-semibold text-txt">{step.title}</h4>
                  <p className="text-[13.5px] leading-snug text-muted">{step.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
