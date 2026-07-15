import { site } from "@/data/site";

/* Brand icons as inline SVGs (lucide no longer ships brand icons) */
const icons: Record<string, React.ReactNode> = {
  instagram: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  linkedin: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  youtube: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  ),
  behance: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.84 10.84c.9-.43 1.53-1.34 1.53-2.44 0-2.03-1.5-3.15-3.63-3.15H1v12.5h5.92c2.24 0 3.98-1.22 3.98-3.45 0-1.55-.87-2.86-2.06-3.24zM3.72 7.35h2.61c.98 0 1.62.5 1.62 1.4 0 .94-.62 1.43-1.62 1.43H3.72V7.35zm2.87 8.3H3.72v-3.13h2.9c1.1 0 1.79.6 1.79 1.57 0 1-.7 1.56-1.82 1.56zM18.5 8.1c-2.7 0-4.6 1.94-4.6 4.87 0 2.96 1.85 4.88 4.68 4.88 2.14 0 3.72-1.1 4.25-2.94h-2.42c-.26.66-.94 1.04-1.78 1.04-1.16 0-1.9-.7-2.06-1.94h6.36c.02-.23.04-.47.04-.7 0-3.02-1.83-5.2-4.47-5.2zm-1.92 4c.2-1.13.9-1.8 1.94-1.8 1.05 0 1.76.67 1.9 1.8h-3.84zM15.5 5.5h6v1.5h-6z" />
    </svg>
  ),
  mail: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
};

export function Footer() {
  return (
    <footer className="bg-primary pb-24 pt-16 text-slate-400 md:pb-0">
      <div className="mx-auto max-w-[1200px] px-5 md:px-6">
        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.4fr]">
          <div>
            <a href="#top" className="mb-4 flex items-center gap-2.5 font-heading text-[21px] font-bold text-white">
              <span className="inline-block h-2.5 w-2.5 rounded-[3px] bg-gradient-to-br from-blue-600 to-violet-600" />
              {site.name}
            </a>
            <p className="max-w-[280px] text-sm leading-relaxed">
              Premium video editing for brands, creators and agencies worldwide. Raw footage in —
              high-converting content out.
            </p>
          </div>

          <div>
            <h5 className="mb-4 font-heading text-[14.5px] font-semibold text-white">Quick Links</h5>
            <ul className="space-y-2.5 text-sm">
              <li><a className="transition hover:text-blue-400" href="#portfolio">Portfolio</a></li>
              <li><a className="transition hover:text-blue-400" href="#services">Services</a></li>
              <li><a className="transition hover:text-blue-400" href="#process">About</a></li>
              <li><a className="transition hover:text-blue-400" href="#contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <h5 className="mb-4 font-heading text-[14.5px] font-semibold text-white">Services</h5>
            <ul className="space-y-2.5 text-sm">
              <li><a className="transition hover:text-blue-400" href="#services">Long Form</a></li>
              <li><a className="transition hover:text-blue-400" href="#services">Short Form</a></li>
              <li><a className="transition hover:text-blue-400" href="#services">Commercials</a></li>
              <li><a className="transition hover:text-blue-400" href="#services">Motion Graphics</a></li>
            </ul>
          </div>

          <div>
            <h5 className="mb-4 font-heading text-[14.5px] font-semibold text-white">Follow</h5>
            <div className="flex flex-wrap gap-3">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:-translate-y-0.5 hover:bg-accent hover:text-white"
                >
                  {icons[s.icon]}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center text-[13px]">
          © {new Date().getFullYear()} {site.name} Studio — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
