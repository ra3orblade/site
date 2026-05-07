```


                                     ◆
                                   ╱ │ ╲
                                ╱    │    ╲
                             ╱       │       ╲
                          ◆──────────●──────────◆
                          │ ╲        │        ╱ │
                          │   ╲      │      ╱   │
                          │     ╲    │    ╱     │
                          │       ╲  │  ╱       │
                          ◆──────────●──────────◆
                             ╲       │       ╱
                                ╲    │    ╱
                                   ╲ │ ╱
                                     ◆


      █████╗ ███╗   ██╗██████╗ ██████╗ ███████╗██╗    ██╗
     ██╔══██╗████╗  ██║██╔══██╗██╔══██╗██╔════╝██║    ██║
     ███████║██╔██╗ ██║██║  ██║██████╔╝█████╗  ██║ █╗ ██║
     ██╔══██║██║╚██╗██║██║  ██║██╔══██╗██╔══╝  ██║███╗██║
     ██║  ██║██║ ╚████║██████╔╝██║  ██║███████╗╚███╔███╔╝
     ╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝╚══════╝ ╚══╝╚══╝

     ███████╗██╗███╗   ███╗ █████╗  ██████╗██╗  ██╗███████╗██╗   ██╗
     ██╔════╝██║████╗ ████║██╔══██╗██╔════╝██║  ██║██╔════╝██║   ██║
     ███████╗██║██╔████╔██║███████║██║     ███████║█████╗  ██║   ██║
     ╚════██║██║██║╚██╔╝██║██╔══██║██║     ██╔══██║██╔══╝  ╚██╗ ██╔╝
     ███████║██║██║ ╚═╝ ██║██║  ██║╚██████╗██║  ██║███████╗ ╚████╔╝
     ╚══════╝╚═╝╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝  ╚═══╝

     ◇ personal portfolio · ai-native build · no designer in the loop
     ◇ live  →  https://razorbladez.vercel.app/
     ◇ deployed on vercel from `main`

────────────────────────────────────────────────────────────────────────────────
```

```
 ◇ ─── S T A C K ──────────────────────────────────────────────────────────── ◇

   bundler ─────────── vite (rolldown)
   language ────────── typescript strict
   ui ──────────────── react 19
   styling ─────────── tailwind css v4
   3d ──────────────── three.js + @react-three/{fiber,drei,postprocessing}
   runtime ─────────── bun
   hosting ─────────── vercel
```

```
 ◇ ─── R U N ────────────────────────────────────────────────────────────────  ◇

   $ bun install
   $ bun run dev        # vite dev server, hmr
   $ bun run build      # tsc -b && vite build → dist/
   $ bun run preview    # serve the production build locally
   $ bun run lint       # eslint
```

```
 ◇ ─── V I S U A L   L A N G U A G E ────────────────────────────────────────  ◇

   pure black background. paper-white type. hairline white-with-low-alpha
   borders. mono labels for small copy. a single italic serif (instrument
   serif) used sparingly for emphasis. the aesthetic sits at the intersection
   of editorial print, brutalist architecture, and 80s techno — close to the
   awwwards "black-and-white" collection.
```

```
 ◇ ─── S C E N E S ──────────────────────────────────────────────────────────  ◇


            ◆                  ●─────●              ┌──┬──┬──┐
          ╱ │ ╲               ╱ ╲   ╱ ╲             ├──┼──┼──┤
         ◆──┼──◆             ●───●★──●              ├──┼──┼──┤
          ╲ │ ╱               ╲ ╱   ╲ ╱             └──┴──┴──┘
            ◆                  ●─────●

         Scene                KnowledgeGraph        CubicScene
         hero                 work header           capabilities


   the site has three custom three.js scenes that all share the same shading
   language (flat-shaded matte-white meshStandardMaterial, key directional
   plus hemisphere fill, aces tone mapping) so they read as one family:

   • Scene ........... the hero. faceted icosahedron with simplex-noise
                       vertex displacement that morphs into a torus knot as
                       you scroll. orbiting tetrahedra shards, contactshadows,
                       bloom + vignette postprocessing. mouse parallax on
                       desktop; lissajous "auto-parallax" on touch.

   • KnowledgeGraph .. small scene in the work section header. ~38 flat-
                       shaded tetrahedra connected by a live edge graph;
                       bright "signals" pulse along edges and trigger
                       receiver glows on arrival. echoes the actual graph
                       feature shipped in anytype.

   • CubicScene ...... voxel cluster in capabilities. continuously morphs
                       between five formations (cube, sphere, torus, pyramid,
                       helix) driven by scroll position; explodes outward
                       when the section leaves view and re-assembles into
                       the next shape on entry. voxel sizes vary; same matte
                       shading as the hero.

   all three share the same mobile-conscious plumbing: detect coarse pointer
   / narrow viewport → smaller geometry counts, lower dpr cap, no aa, no
   shadows; an intersectionobserver toggles Canvas.frameloop between
   'always' and 'never' so offscreen scenes don't burn the gpu.
```

```
 ◇ ─── S T R U C T U R E ────────────────────────────────────────────────────  ◇

   src/
   ├─ App.tsx                    page composition
   ├─ main.tsx                   react entry
   ├─ data/
   │  └─ cv.ts                   all copy + structured cv data
   ├─ sections/
   │  ├─ Hero.tsx                100svh hero, 3d scene + parallax overlay
   │  ├─ Lede.tsx                intro paragraphs + photo
   │  ├─ Work.tsx                selected work — list + KnowledgeGraph header
   │  ├─ Capabilities.tsx        ai practice + capability cards + CubicScene
   │  ├─ Companies.tsx           experience timeline
   │  └─ Contact.tsx             email / linkedin / github
   ├─ three/
   │  ├─ Scene.tsx               hero r3f canvas wrapper
   │  ├─ Form.tsx                hero icosahedron + torus-knot with shader
   │  ├─ Shards.tsx              hero orbiting tetrahedra
   │  └─ scroll.ts               scroll progress helpers used across scenes
   ├─ components/
   │  ├─ Section.tsx             shared section frame (max-w-4xl, eyebrow + title)
   │  ├─ Parallax.tsx            data-parallax="<factor>" → scroll y translate
   │  ├─ KnowledgeGraph.tsx      work-section r3f scene
   │  ├─ CubicScene.tsx          capabilities-section r3f scene
   │  ├─ CornerMarks.tsx         + registration marks at section corners
   │  ├─ ScrollProgress.tsx      hairline progress bar pinned to viewport top
   │  ├─ EyebrowMark.tsx         ◇ glyph before every eyebrow label
   │  ├─ Divider.tsx             hairline rule with central + mark
   │  ├─ CapabilityIcon.tsx      three unique geometric svgs per capability
   │  └─ HeroAccent.tsx          wireframe icosahedron glyph in hero overlay
   ├─ styles/
   │  └─ index.css               tailwind import + theme tokens + utilities
   public/
   ├─ photo1.png                 mood photo (atmospheric contact-sheet)
   ├─ photo2.png                 mood photo
   └─ favicon.svg                isometric tetrahedron, three flat-shaded faces
   scripts/
   └─ replace-white.ts           sharp script: blacken white gridlines in photos
```

```
 ◇ ─── D E S I G N   S Y S T E M ────────────────────────────────────────────  ◇

   documented in docs/DESIGN.md. short version:

   • all non-hero sections use max-w-4xl content column
     with px-6 md:px-12 lg:px-20 outer padding
   • section vertical padding ─── py-10 md:py-6 lg:py-6
   • cards ───────────────────── p-8 md:p-10
   • three-column lists (work, companies):
     grid-cols-[40px_1fr] md:grid-cols-[60px_1fr_auto] gap-6 md:gap-12
   • scroll-triggered reveal animations have been removed;
     only data-parallax remains active
```

```
 ◇ ─── A S S E T S ──────────────────────────────────────────────────────────  ◇

   scripts/replace-white.ts is a bun + sharp script that detects the white
   gridlines in the ai-generated contact-sheet pngs (public/photoN.png) and
   flood-fills them to black so the photos blend into the page background.
   the detector splits the image into bands separated by horizontal grid-
   lines, then finds vertical gridlines per band — handles non-uniform
   sub-photo widths.

   $ bun run scripts/replace-white.ts public/photo1.png public/photo1.png
```

```
 ◇ ─── F U R T H E R   R E A D I N G ────────────────────────────────────────  ◇

   • docs/DESIGN.md ─── design tokens, layout grid, motion
   • docs/SCENES.md ─── three.js scene architecture


                                     ◆
                                   ╱   ╲
                                ◆────────◆
                                   ╲   ╱
                                     ◆


                              END  OF  TRANSMISSION
```

[docs/DESIGN.md](docs/DESIGN.md) · [docs/SCENES.md](docs/SCENES.md)
