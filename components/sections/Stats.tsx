import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { stats } from "@/data/stats";

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-primary py-16 md:py-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 80% at 50% 0%, rgba(37,99,235,.16), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-[1200px] px-5 md:px-6">
        <div className="grid grid-cols-2 gap-7 text-center md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <h3 className="bg-gradient-to-br from-blue-400 to-violet-400 bg-clip-text text-4xl font-bold text-transparent md:text-[54px]">
                <AnimatedCounter to={s.value} suffix={s.suffix} />
              </h3>
              <p className="mt-1 text-[14.5px] font-medium text-slate-400">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
