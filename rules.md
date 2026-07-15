# rules.md — What to Use, What to Avoid, AI Boundaries

## ✅ What to Use

### Libraries (approved list — do not add others without approval)
- `next` (15, App Router), `react`, `typescript`
- `tailwindcss` (v4)
- `framer-motion` (reveal/hover/counters/transitions)
- `lenis` (smooth scroll)
- `lucide-react` (icons)
- `next/font` (Space Grotesk + Inter)
- `zod` (form validation)
- `resend` or Formspree (contact form email) — only when contact phase starts

### Patterns
- Design tokens as CSS variables (colors, spacing, radii) — single source in `globals.css`.
- All content/text/projects in `/data/*.ts` files — never hardcode content inside components.
- Server Components default; `"use client"` only for interactive/animated components.
- Semantic HTML (`section`, `nav`, `header`, `footer`, `h1–h3` hierarchy) + ARIA labels.
- Lazy loading: `next/image` for images, `preload="none"` + poster for videos, embeds mounted only when modal opens.
- Mobile-first responsive Tailwind classes.

## ❌ What to Avoid

- ❌ jQuery, Bootstrap, Material UI, heavy UI kits — design is 100% custom.
- ❌ GSAP + Framer Motion together (pick one — we use Framer Motion).
- ❌ Autoplaying videos with sound; hero video must be `muted playsinline loop`.
- ❌ Heavy hero videos (> 4–6 MB); compress to ~1080p H.264/webm.
- ❌ Inline styles (except dynamic animation values).
- ❌ `any` types; no `@ts-ignore`.
- ❌ Client-side data fetching for static content.
- ❌ Layout shift: always set width/height/aspect-ratio on media.
- ❌ Animations that block reading (max 0.6s entrance, subtle easing).

## 🛡️ Error Handling

- Contact form: `zod` validation client + server side; show inline field errors; never crash on failed submit — show retry toast.
- API route: try/catch, return typed JSON `{ ok, error? }`, log server-side, never leak secrets/stack traces to client.
- Media: `onError` fallback poster/gradient for broken videos & thumbnails.
- Wrap section-level failures with error boundaries so one broken section never kills the page.

## 🤖 Boundaries for AI (Claude)

1. **Follow phases.md order** — do not jump ahead to a later phase without approval.
2. **Update memory.md after every completed task** (what done, current file, timestamp).
3. **Never change design tokens** (colors, fonts) defined in design.md without asking.
4. **Never add new libraries** beyond the approved list without asking.
5. **Never delete/rewrite an entire existing file** unless the task explicitly requires it.
6. **No fake claims** — placeholder stats/logos/testimonials must be clearly placeholder and easy for the owner to replace in `/data`.
7. Keep components under ~200 lines; split when bigger.
8. Ask before: paid services, external APIs, deleting files, changing site structure.
9. All work must be responsive + dark/light tested before marking a phase complete.
