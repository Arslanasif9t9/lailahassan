# design.md — Colors, Theme, Fonts, Typography

Style inspiration: **Apple · Stripe · Linear · MotionVFX · Frame.io · Artlist**
Feel: premium creative agency — generous white space, subtle motion, instant trust.

## 1. Color Palette

### Light Mode (default)
| Token | Hex | Use |
|---|---|---|
| `--primary` | `#0F172A` | Deep Navy — hero bg, footer, headings on light |
| `--accent` | `#2563EB` | Electric Blue — CTAs, links, highlights |
| `--accent-hover` | `#1D4ED8` | Button hover |
| `--bg` | `#FFFFFF` | Main background |
| `--bg-secondary` | `#F8FAFC` | Alternate sections |
| `--text` | `#111827` | Body text |
| `--text-muted` | `#64748B` | Secondary text |
| `--border` | `#E2E8F0` | Card borders, dividers |

### Dark Mode
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#0B1120` | Main background |
| `--bg-secondary` | `#0F172A` | Cards / alt sections |
| `--text` | `#F1F5F9` | Body text |
| `--text-muted` | `#94A3B8` | Secondary text |
| `--border` | `rgba(148,163,184,.15)` | Borders |
| `--accent` | `#3B82F6` | Slightly brighter blue for dark bg |

### Gradients & Effects
- Hero glow: radial `#2563EB` @ 15–25% opacity on navy.
- Accent gradient: `linear-gradient(135deg, #2563EB, #7C3AED)` — sparingly (badges, counters, text highlights).
- Glassmorphism: `background: rgba(255,255,255,.06); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,.12)`.

## 2. Fonts

- **Headings:** Space Grotesk (fallback: Sora) — weights 500/600/700
- **Body:** Inter (fallback: Manrope) — weights 400/500/600
- Loaded via `next/font` (production) / Google Fonts (preview).

## 3. Typography Scale

| Element | Size (desktop → mobile) | Weight | Notes |
|---|---|---|---|
| H1 (hero) | 64–72px → 38px | 700 | -2% letter-spacing, 1.05 line-height |
| H2 (section) | 44px → 30px | 700 | -1% ls |
| H3 (card title) | 22px → 19px | 600 | |
| Body large | 19px | 400 | hero sub, 1.6 lh, muted |
| Body | 16px | 400 | 1.7 lh |
| Small / label | 13px | 600 | uppercase, +8% ls, accent color (section eyebrows) |
| Buttons | 15–16px | 600 | |

## 4. Spacing & Layout
- Container: max-width **1200px**, padding 24px (mobile 20px).
- Section padding: **120px** top/bottom desktop, 72px mobile.
- Border radius: cards **20px**, buttons **12px** (pill for badges).
- Card shadow (light): `0 4px 24px rgba(15,23,42,.06)`, hover: `0 12px 40px rgba(37,99,235,.14)`.

## 5. Motion Language
- Entrance: fade-up 24px, 0.5–0.6s, `cubic-bezier(.22,1,.36,1)`, stagger 80ms.
- Hover: cards lift -6px + shadow; images zoom 1.05; buttons magnetic pull.
- Counters: count-up on scroll into view.
- Marquee: 30s linear infinite (Trusted By).
- Respect `prefers-reduced-motion: reduce` — disable all non-essential motion.
