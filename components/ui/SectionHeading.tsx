import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  center = false,
  light = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <Reveal className={`mb-14 ${center ? "text-center" : ""}`}>
      <span className="mb-3 inline-block text-[13px] font-semibold uppercase tracking-[0.12em] text-accent">
        {eyebrow}
      </span>
      <h2
        className={`mb-4 text-3xl font-bold tracking-tight md:text-[44px] md:leading-[1.1] ${
          light ? "text-white" : "text-txt"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={`max-w-[560px] text-[17px] ${center ? "mx-auto" : ""} ${
            light ? "text-slate-400" : "text-muted"
          }`}
        >
          {sub}
        </p>
      )}
    </Reveal>
  );
}
