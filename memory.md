# memory.md — Project Progress Tracker

> AI must update this file after every completed task.

## Current Status
- **Current Phase:** BACKEND + ADMIN PANEL (Supabase CMS) added — 2026-07-21 ✅ (pending client Supabase keys)
- **Live URL:** https://arslanasif9t9.github.io/lailahassan/
- **GitHub Repo:** https://github.com/Arslanasif9t9/lailahassan (branch: master; deploys from gh-pages branch)
- **Currently Working On:** Supabase backend + `/admin` CMS (branch `worktree-supabase-admin-panel` → draft PR)
- **Blocked On:** User must create a Supabase project, run `supabase/schema.sql`, add an admin user, and paste `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` into `.env.local` (see `supabase/README.md`), then `npm run deploy:pages`

## Rebrand (2026-07-15)
- Brand name = **Laila Hassan** (site.ts, metadata, manifest, sitemap/robots) — deployed live & verified.
- Email/phone still PLACEHOLDER (hello@lailahassan.studio) — replace in data/site.ts when client provides real ones.

## Deploy Notes (2026-07-15)
- GitHub Pages = static hosting → `npm run deploy:pages` builds static export (GITHUB_PAGES=true, basePath /lailahassan, app/api excluded) and pushes `out/` to gh-pages branch.
- On the live static site the contact form falls back to opening the visitor's email app (mailto) since there is no server; on Vercel/localhost the real API works.
- To redeploy after any change: `git add -A; git commit; git push` (code) + `npm run deploy:pages` (live site).

## Completed

| Date | Task | File(s) |
|---|---|---|
| 2026-07-15 | Planning docs created | PRD.md, Architecture.md, rules.md, phases.md, design.md, memory.md |
| 2026-07-15 | Design preview built & approved by client | preview.html |
| 2026-07-15 | Next.js 16.2 scaffold (TS, Tailwind v4, Turbopack) + framer-motion, lenis, lucide-react, zod | package.json |
| 2026-07-15 | Design tokens, dark/light themes, keyframes | app/globals.css |
| 2026-07-15 | Root layout: fonts, SEO metadata, theme no-flash script, providers | app/layout.tsx |
| 2026-07-15 | Theme + smooth-scroll providers | components/providers/* |
| 2026-07-15 | Navbar, Footer, mobile app BottomNav (scroll-spy) | components/layout/* |
| 2026-07-15 | All 12 sections built | components/sections/* |
| 2026-07-15 | UI kit: Reveal, SectionHeading, AnimatedCounter, MagneticButton, VideoModal (facade) | components/ui/* |
| 2026-07-15 | Content data layer (client edits content here) | data/*.ts |
| 2026-07-15 | Contact API with zod validation | app/api/contact/route.ts, lib/validators.ts |
| 2026-07-15 | PWA manifest, sitemap, robots, icon | app/manifest.ts, app/sitemap.ts, app/robots.ts, public/icon.svg |
| 2026-07-15 | Verified: lint ✅, tsc ✅, prod build ✅, smoke test (home 200, API 200/400) ✅ | — |

## Next Up
1. Client provides real content → replace placeholders in `/data/*.ts` (videos = paste YouTube IDs).
2. Add Resend API key + real Calendly link + real domain in metadata/sitemap/robots.
3. Deploy to Vercel.

## Decisions Log
- 2026-07-15: Stack = Next.js (App Router) + TS + Tailwind v4 + Framer Motion + Lenis. Next 16.2 installed (latest).
- 2026-07-15: Content lives in `/data/*.ts` (CMS-ready), no hardcoded content in components.
- 2026-07-15: Light mode default with deep-navy hero/footer; full dark mode via `data-theme` attr + useSyncExternalStore.
- 2026-07-15: Videos = facade pattern (thumbnail only; YouTube iframe mounts on click; YouTube handles adaptive chunk streaming). Never self-host raw MP4s.
- 2026-07-15: Mobile = app feel: bottom tab bar (scroll-spy), swipeable filter row, safe-area insets, PWA installable manifest.
- 2026-07-15: lucide-react ≥1.x removed brand icons — social icons are inline SVGs in Footer.tsx.
- 2026-07-15: Hero video slot: drop file at /public/videos/hero.mp4 and set `heroVideo` in data/site.ts; until then premium animated gradient shows.
- 2026-07-21: Added Supabase backend + `/admin` CMS (USER-APPROVED — overrides rules "no new libs / no client fetch"). Architecture: hybrid — `data/*.ts` stay as typed DEFAULTS (baked into static HTML for SEO + instant paint), `ContentProvider` fetches live doc from Supabase on mount and overrides. Site still works if Supabase is down/unset.
- 2026-07-21: Data model = ONE `site_content` row (JSONB `data` mirroring `data/content.ts` `SiteContent`) + `leads` table (contact form) + `media` storage bucket. RLS: public read content / insert leads; authenticated (admin) writes everything. Single-JSONB doc chosen over normalized tables (single admin, small doc, TS types are the source of truth).
- 2026-07-21: Auth = Supabase email/password (no OAuth redirect → works on static GitHub Pages under basePath). Admin at `/admin` (route group `(marketing)` keeps the marketing chrome off it; `noindex`).
- 2026-07-21: Contact form now writes straight to Supabase `leads` (fixes the previously-dead form on the static live site); mailto is still the fallback.

## Backend + Admin CMS (2026-07-21)

- **New files:** `lib/supabase.ts`, `data/content.ts`, `components/providers/ContentProvider.tsx`, `components/admin/*` (AdminApp, LoginForm, Dashboard, LeadsViewer, fields, schema), `app/(marketing)/{layout,page}.tsx`, `app/admin/{layout,page}.tsx`, `supabase/{schema.sql,README.md}`, `.env.example`. Dep added: `@supabase/supabase-js`.
- **Editable in `/admin`:** brand/contact info, hero video+poster, social links, trusted-by, projects (thumbnail upload + YouTube id + categories), featured projects, services, why-me, software, process, stats, testimonials, FAQs, + view leads. Schema-driven editors (`components/admin/schema.ts`) — add a field there and it appears in the panel.
- **How content flows:** admin edits → `Save` upserts the whole `SiteContent` doc to `site_content` (id=1) → public `ContentProvider` reads it live. No rebuild needed for content changes (rebuild only needed to change the Supabase env keys, since NEXT_PUBLIC_* are inlined at build).
- **Verified:** `tsc` ✅, `eslint` ✅, static export build ✅ (8 routes, `/admin` prerenders "not configured" until keys are set, home keeps baked default content, basePath `/lailahassan` applied).
- **Client setup steps:** `supabase/README.md` (create project → run schema.sql → add admin user → copy URL+anon key to `.env.local` → `npm run deploy:pages`).
