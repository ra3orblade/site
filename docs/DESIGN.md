# Design system

Reference for the spacing, type, colour, and motion choices used across the
portfolio. Anything in here is enforced by a real file in `src/`; it's not
a wishlist.

## Colour tokens

Defined in `src/styles/index.css` under `@theme`. Tailwind picks them up as
arbitrary `text-*`, `bg-*`, `border-*` utilities.

| Token | Value | Used for |
|---|---|---|
| `--color-ink-0` | `#000000` | Page background |
| `--color-ink-1..5` | `#0a0a0a` → `#3a3a3a` | Subtle surface variations |
| `--color-fog-1` | `#6a6a6a` | Mono labels, eyebrow text, footnotes |
| `--color-fog-2` | `#9a9a9a` | Secondary body copy |
| `--color-fog-3` | `#c4c4c4` | Primary body copy |
| `--color-bone` | `#e8e8e8` | Hover background of `bg-paper` button |
| `--color-paper` | `#f5f5f5` | Display type, primary button bg |

Borders use `.hairline` (`rgba(255, 255, 255, 0.08)`) — never a solid colour.

## Typography

| Role | Font | Sizes |
|---|---|---|
| Display headings | Inter (sans), `font-medium`, `tracking-tight` | `text-4xl md:text-6xl lg:text-7xl` |
| Body copy | Inter | `text-lg md:text-xl` |
| Secondary copy | Inter | `text-base md:text-lg` |
| Eyebrow / mono labels | system mono | `font-mono text-[10px] uppercase tracking-[0.3em]` |
| Italic accent | Instrument Serif via `.serif` class | inline only, used sparingly |

The hero name uses a custom `--tracking-hero: -0.04em` and clamps at
`lg:text-[9rem]`.

## Layout

```
        ┌── viewport ──────────────────────────────────┐
        │                                              │
        │        ┌── max-w-4xl (896px) ──────┐         │
        │ px-* → │ section content           │ ← px-* │
        │        │                           │         │
        │        └───────────────────────────┘         │
        │                                              │
        └──────────────────────────────────────────────┘
```

| Token | Value |
|---|---|
| Content max width | `max-w-4xl` (896px) — every non-Hero section |
| Section horizontal pad | `px-6 md:px-12 lg:px-20` |
| Section vertical pad | `py-10 md:py-6 lg:py-6` |
| Card padding | `p-8 md:p-10` |
| Three-col list grid | `grid-cols-[40px_1fr] md:grid-cols-[60px_1fr_auto]` |
| List gap | `gap-6 md:gap-12` |
| Section header → content | `mb-8 md:mb-12` |
| Eyebrow → title | `mb-5` |
| Major sub-block rhythm | `mt-10 md:mt-12` |

The Hero is the one exception — it stays full-bleed `100svh` with text
laid out at the bottom in a `max-w-4xl` column. The 3D scene fills the
entire viewport behind it.

## Motion

- **Parallax** — the only scroll-driven motion that survives. Any element
  with `data-parallax="<factor>"` gets a scroll-tied `translate3d` from
  `ParallaxRoot`. Negative factor = moves against scroll.
- **3D scenes** — every `<Canvas>` has its `frameloop` toggled between
  `'always'` (in view) and `'never'` (offscreen) by an
  IntersectionObserver. No frames render when nothing is visible.
- **CubicScene** — scroll position relative to its section drives the
  shape interpolation. Voxels lerp toward shape targets at `0.09`/frame
  while in view, `0.075` while scattered after scroll-out.
- **Reveal-on-scroll** has been removed. Items render at full opacity
  immediately so fast scrolling doesn't leave half-revealed cards.

## Decorative vector elements

| Component | Where | What |
|---|---|---|
| `CornerMarks` | Every section | Four 10×10 + glyphs at the corners of the section's padding box |
| `EyebrowMark` | Every eyebrow label | Inline 6×6 hairline diamond, before the text |
| `Divider` | Capabilities, between sub-blocks | Hairline rule with a centred + mark |
| `ScrollProgress` | Top of viewport | 1px progress bar, scales `0 → 1` left-to-right with scroll |
| `CapabilityIcon` | Each capability card | One of three custom 36×36 hairline glyphs (architecture / data / platform) |
| `HeroAccent` | Hero overlay | 44×44 wireframe icosahedron next to the location label |

All vector accents share the hairline language: 0.7–1px stroke,
`stroke-linecap="round"`, in `text-fog-1` or `text-fog-3`. Their job is
to make the layout feel technically authored without crowding the type.

## Mobile

| Constraint | Behaviour |
|---|---|
| `(pointer: coarse)` or viewport `< 820px` | All three.js scenes downshift |
| Hero | `dpr ≤ 1.25`, `antialias: false`, `shadows: false`, no postprocessing, no ContactShadows. Camera parallax driven by lissajous instead of `pointermove` |
| KnowledgeGraph | 22 nodes / 5 signals (vs 38 / 9 desktop) |
| CubicScene | 32 voxels (vs 80 desktop) |
| `prefers-reduced-motion: reduce` | All Canvases replaced by a static gradient div |
