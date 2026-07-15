# phases.md — Build Phases

> Rule: complete a phase → test responsive + dark/light → update memory.md → get approval → next phase.

## Phase 0 — Planning & Preview ✅
- [x] PRD.md, Architecture.md, rules.md, phases.md, design.md, memory.md
- [x] `preview.html` — full single-file design preview for client approval
- [x] Client approval of preview.html + stack (Next.js) + video strategy + mobile-app feel

## Phase 1 — Project Setup & Foundation ✅
- [x] Scaffold Next.js (16.2, App Router, Turbopack) + TypeScript + Tailwind v4
- [x] Fonts (Space Grotesk, Inter via next/font), design tokens in globals.css
- [x] ThemeProvider (dark/light, no-flash inline script), Lenis smooth scroll
- [x] Navbar (glass, scroll-aware) + Footer + **BottomNav (mobile app-style tab bar with scroll-spy)**

## Phase 2 — Hero & Trust ✅
- [x] Hero: animated cinematic bg (drop-in slot for real video at /public/videos/hero.mp4), headline, sub, magnetic CTAs
- [x] Trusted By infinite marquee

## Phase 3 — Services & Software ✅
- [x] 6 service cards (hover lift, gradient top bar, icon animation)
- [x] Software section with animated icon tiles

## Phase 4 — Portfolio & Featured Projects ✅
- [x] Filterable portfolio grid (13 categories, swipeable filter row on mobile) — data in `/data/projects.ts`
- [x] Video modal popup — **facade pattern**: YouTube iframe mounts only on click; auto YouTube thumbnails
- [x] Featured Projects cards (duration, industry tags, services, results)

## Phase 5 — Process, Why Me, Stats ✅
- [x] Animated 5-step editing process timeline
- [x] Why Work With Me glass cards (8 items)
- [x] Animated counters (100+ / 50+ / 5+ / 3+)

## Phase 6 — Testimonials & FAQ ✅
- [x] Testimonial cards (video-ready via youtubeId field)
- [x] FAQ accordion (animated height)

## Phase 7 — Contact & Conversion ✅
- [x] Contact form (Name, Email, Project Type, Budget, Deadline, Details)
- [x] zod validation client + server, /api/contact route (tested: 200 valid, 400 invalid)
- [ ] Hook up real email (Resend/Formspree) — needs client's API key at launch
- [ ] Real Book-a-Call link (Calendly) — needs client's link

## Phase 8 — Polish & Micro-interactions ✅
- [x] Magnetic buttons, reveal animations, hover zooms, glassmorphism
- [x] prefers-reduced-motion support (Lenis + CSS)
- [x] Mobile app feel: bottom tab bar, safe-area insets, swipeable filters

## Phase 9 — SEO, Performance & Launch ✅ (code side)
- [x] Metadata + OG + Twitter cards, sitemap.xml, robots.txt, manifest (PWA installable)
- [x] Production build passes clean (lint ✅, types ✅, build ✅, smoke test ✅)
- [ ] Deploy to Vercel + custom domain — when client is ready
- [ ] Replace placeholder content: real videos (YouTube IDs), stats, testimonials, logos, domain
