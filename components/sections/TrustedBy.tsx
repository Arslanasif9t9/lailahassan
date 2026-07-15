import { Play, Rocket, Building2, ShoppingBag, Mic, Home, Briefcase } from "lucide-react";
import { site } from "@/data/site";

const icons = [Play, Rocket, Building2, ShoppingBag, Mic, Home, Briefcase];

export function TrustedBy() {
  const row = site.trustedBy.map((label, i) => ({ label, Icon: icons[i % icons.length] }));

  return (
    <section className="border-b border-line bg-bg py-14">
      <div className="mx-auto max-w-[1200px] px-5 md:px-6">
        <p className="mb-8 text-center text-[13px] font-semibold uppercase tracking-[0.14em] text-muted">
          Trusted by creators &amp; brands worldwide
        </p>
        <div className="marquee-mask overflow-hidden">
          <div className="animate-marquee flex w-max gap-16">
            {[...row, ...row].map(({ label, Icon }, i) => (
              <span
                key={`${label}-${i}`}
                className="flex items-center gap-2.5 whitespace-nowrap font-heading text-lg font-semibold text-muted/75"
              >
                <Icon size={19} /> {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
