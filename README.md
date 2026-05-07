# andrew.simachev

Personal portfolio site. AI-native build — written together with Claude Code,
shipped without a designer in the loop.

Live: https://razorbladez.vercel.app/ (deployed on Vercel from `main`)

## Stack

| Layer | Choice |
|---|---|
| Bundler | Vite (rolldown) |
| Language | TypeScript strict |
| UI | React 19 |
| Styling | Tailwind CSS v4 |
| 3D | three.js + @react-three/fiber + @react-three/drei + @react-three/postprocessing |
| Runtime | Bun |
| Hosting | Vercel |

## Run it

```sh
bun install
bun run dev      # vite dev server, HMR
bun run build    # tsc -b && vite build → dist/
bun run preview  # serve the production build locally
bun run lint     # eslint
```

## Visual language

Pure black background, paper-white type, hairline white-with-low-alpha borders,
mono labels for small copy, a single italic serif (Instrument Serif) used
sparingly for emphasis. The aesthetic sits at the intersection of editorial
print, brutalist architecture, and 80s techno — close to the awwwards
"black-and-white" collection.

The site has three custom three.js scenes that all share the same shading
language (flat-shaded matte-white meshStandardMaterial, key directional plus
hemisphere fill, ACES tone mapping) so they read as one family:

- **`Scene`** — the hero. Faceted icosahedron with simplex-noise vertex
  displacement that morphs into a torus knot as you scroll. Orbiting
  tetrahedra shards, ContactShadows, Bloom + Vignette postprocessing.
  Mouse parallax on desktop; lissajous "auto-parallax" on touch.
- **`KnowledgeGraph`** — small scene in the Work section header. ~38
  flat-shaded tetrahedra connected by a live edge graph; bright "signals"
  pulse along edges and trigger receiver glows on arrival. Echoes the
  actual graph feature shipped in Anytype.
- **`CubicScene`** — voxel cluster in Capabilities. Continuously morphs
  between five formations (cube, sphere, torus, pyramid, helix) driven
  by scroll position; explodes outward when the section leaves view and
  re-assembles into the next shape on entry. Voxel sizes vary; same matte
  shading as the hero.

All three scenes share the same mobile-conscious plumbing: detect coarse
pointer / narrow viewport → smaller geometry counts, lower DPR cap, no
antialiasing, no shadows; an IntersectionObserver toggles
`Canvas.frameloop` between `'always'` and `'never'` so offscreen scenes
don't burn the GPU.

## Project structure

```
src/
├─ App.tsx                    Page composition
├─ main.tsx                   React entry
├─ data/
│  └─ cv.ts                   All copy + structured CV data
├─ sections/
│  ├─ Hero.tsx                100svh hero, 3D scene + parallax overlay
│  ├─ Lede.tsx                Intro paragraphs + photo
│  ├─ Work.tsx                Selected work — list + KnowledgeGraph header
│  ├─ Capabilities.tsx        AI practice + capability cards + CubicScene
│  ├─ Companies.tsx           Experience timeline
│  └─ Contact.tsx             Email / LinkedIn / GitHub
├─ three/
│  ├─ Scene.tsx               Hero r3f Canvas wrapper
│  ├─ Form.tsx                Hero icosahedron + torus-knot with shader
│  ├─ Shards.tsx              Hero orbiting tetrahedra
│  └─ scroll.ts               Scroll progress helpers used across scenes
├─ components/
│  ├─ Section.tsx             Shared section frame (max-w-4xl, eyebrow + title)
│  ├─ Parallax.tsx            data-parallax="<factor>" → scroll Y translate
│  ├─ KnowledgeGraph.tsx      Work-section r3f scene
│  ├─ CubicScene.tsx          Capabilities-section r3f scene
│  ├─ CornerMarks.tsx         + registration marks at section corners
│  ├─ ScrollProgress.tsx      Hairline progress bar pinned to viewport top
│  ├─ EyebrowMark.tsx         Diamond glyph before every eyebrow label
│  ├─ Divider.tsx             Hairline rule with central + mark
│  ├─ CapabilityIcon.tsx      Three unique geometric SVGs per capability card
│  └─ HeroAccent.tsx          Wireframe icosahedron glyph in Hero overlay
├─ styles/
│  └─ index.css               Tailwind import + theme tokens + utilities
public/
├─ photo1.png                 Mood photo (atmospheric contact-sheet)
├─ photo2.png                 Mood photo
└─ favicon.svg                Isometric tetrahedron, three flat-shaded faces
scripts/
└─ replace-white.ts           Sharp script: blacken white gridlines in photos
```

## Design system

Documented in [docs/DESIGN.md](docs/DESIGN.md). Short version:

- All non-Hero sections use `max-w-4xl` content column with
  `px-6 md:px-12 lg:px-20` outer padding.
- Section vertical padding: `py-10 md:py-6 lg:py-6`.
- Cards: `p-8 md:p-10`.
- Three-column lists (Work, Companies):
  `grid-cols-[40px_1fr] md:grid-cols-[60px_1fr_auto]` with `gap-6 md:gap-12`.
- Scroll-triggered reveal animations have been removed; only
  `data-parallax` remains active.

## Asset processing

`scripts/replace-white.ts` is a Bun + Sharp script that detects the white
gridlines in the AI-generated contact-sheet PNGs (`public/photoN.png`) and
flood-fills them to black so the photos blend into the page background.
The detector splits the image into bands separated by horizontal gridlines,
then finds vertical gridlines per band — handles non-uniform sub-photo widths.

```sh
bun run scripts/replace-white.ts public/photo1.png public/photo1.png
```

## Further reading

- [docs/DESIGN.md](docs/DESIGN.md) — design tokens, layout grid, motion
- [docs/SCENES.md](docs/SCENES.md) — three.js scene architecture
