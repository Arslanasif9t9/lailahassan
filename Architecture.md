# Architecture — Video Editing Portfolio

## 1. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | SEO, performance, Vercel deploy, image/video optimization |
| Language | **TypeScript** | Safety, maintainability |
| Styling | **Tailwind CSS v4** | Fast, consistent design tokens |
| Animations | **Framer Motion** + CSS | Reveal, hover, counters, page transitions |
| Smooth scroll | **Lenis** | Premium smooth scrolling |
| Icons | **lucide-react** | Clean, consistent |
| Fonts | `next/font` — Space Grotesk (headings), Inter (body) | Zero layout shift |
| Content | **Local typed data files** (`/data/*.ts`) — CMS-ready | Portfolio editable without touching components; can swap to Sanity/Contentlayer later |
| Forms | API route + (Resend email or Formspree) | Lead capture |
| Hosting | **Vercel** | Fast, free tier, CI/CD |

> Phase 1 is a **static HTML/CSS/JS preview** (already in repo as `preview.html`) for client approval. Production build follows this architecture.

## 2. App Flow

```
Visitor lands on /
  → Hero (video bg + CTAs)
  → scrolls: TrustedBy → Services → Portfolio (filter → modal) → Featured
    → Process → WhyMe → Software → Testimonials → Stats → FAQ → Contact
  → CTA click → smooth-scroll to Contact OR Book-a-Call link (Calendly)
  → Form submit → /api/contact → email notification → success toast
```

Single-page landing + optional dedicated project pages (`/work/[slug]`) later.

## 3. Folder & File Architecture

```
video-editor-portfolio/
├── app/
│   ├── layout.tsx            # fonts, metadata, ThemeProvider, cursor, lenis
│   ├── page.tsx              # home — assembles all sections
│   ├── globals.css           # tokens, base styles
│   ├── api/contact/route.ts  # form handler
│   └── work/[slug]/page.tsx  # (optional) project detail pages
├── components/
│   ├── layout/   (Navbar.tsx, Footer.tsx, ThemeToggle.tsx)
│   ├── sections/ (Hero, TrustedBy, Services, Portfolio, FeaturedProjects,
│   │              Process, WhyMe, Software, Testimonials, Stats, FAQ, Contact)
│   ├── ui/       (Button, SectionHeading, GlassCard, MagneticButton,
│   │              AnimatedCounter, VideoModal, Cursor, Reveal)
│   └── providers/ (ThemeProvider.tsx, LenisProvider.tsx)
├── data/
│   ├── services.ts, projects.ts, testimonials.ts, faqs.ts, stats.ts, site.ts
├── lib/ (utils.ts, validators.ts)
├── public/ (videos/, thumbs/, logos/)
└── config files (tailwind, tsconfig, next.config, vercel.ts)
```

## 4. Key Architectural Rules

- **Sections are dumb, data lives in `/data`** — portfolio updates = edit one data file.
- Server Components by default; `"use client"` only where animation/interaction needs it.
- Videos: lazy-loaded, poster images, `preload="none"`, YouTube/Vimeo embeds inside modal (loaded on open only).
- Theme: CSS variables + `data-theme` attribute; both dark & light polished.
- All animations respect `prefers-reduced-motion`.
