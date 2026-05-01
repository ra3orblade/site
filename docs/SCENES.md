# Three.js scenes

Three custom scenes, all in the same shading family. Each lives in its
own file and is lazy-loaded so the r3f bundle is split off the main
`index-*.js`.

## Shared shading

Across all three scenes:

```ts
gl.toneMapping = THREE.ACESFilmicToneMapping
gl.toneMappingExposure = 1.05
ambientLight intensity={0.04}
hemisphereLight ['#ffffff', '#000000', 0.18]
key directional ~3.0 from upper-right
fill directional 0.3 from opposite
meshStandardMaterial color="#ffffff" or "#f0f0f0"
                    roughness={0.32–0.4}
                    metalness={0.12–0.18}
                    flatShading
```

The hero adds `envMapIntensity={0.4}` and casts shadows; the other two
do not (no ground plane to receive on).

## Hero — `src/three/Scene.tsx` + `Form.tsx` + `Shards.tsx`

The biggest scene. Three layers:

1. **`Form`** — central icosahedron and torus knot, both subdivided to 24
   segments. Both use the same simplex-noise vertex displacement shader,
   driven by uniforms `uTime`, `uAmp`, `uFreq`, `uSpike`. The icosa is
   primary at the top of the page and fades out by ~70% scroll; the
   torus knot fades in starting at ~35% scroll. Cross-fade is implemented
   on `meshStandardMaterial.opacity` per-frame.
2. **`Shards`** — 60 instanced tetrahedra orbiting at varying radii and
   tilt angles. `castShadow` + `receiveShadow` so they appear in the
   ContactShadows below. Fade out as you scroll.
3. **`CameraRig`** — eases the camera toward `(pointer × 0.45, …)` at
   60fps. On touch devices (`pointer: coarse`) the pointer is replaced
   with a slow lissajous so the scene never sits dead still.

Postprocessing: `Bloom` (luminanceThreshold 0.55, mipmapBlur, radius
0.75) + `Vignette` (offset 0.18, darkness 0.9). Both disabled on mobile.

The `Form.tsx` simplex-noise functions (`mod289`, `permute`,
`taylorInvSqrt`, `snoise`) are reused verbatim by the two other scenes
when they need vertex displacement.

## KnowledgeGraph — `src/components/KnowledgeGraph.tsx`

Lives in the Work section header. Visually echoes the actual graph
feature shipped in Anytype.

- **Nodes** — 38 (22 mobile) flat-shaded tetrahedra positioned randomly
  inside a sphere. Each has its own drift (sinusoidal X/Y/Z with random
  phases and amplitudes 0.07–0.15) plus per-mesh rotation rates.
- **Edges** — built once at construction by walking each node's two
  nearest neighbours and deduplicating into a `lineSegments` geometry.
  The position buffer is updated every frame to follow the live drifted
  node positions, so edges visibly stretch and reshape with the cluster.
- **Signals** — 9 pool slots (5 mobile). A cooldown timer fires at
  random 0.4–1.3s intervals; the next inactive slot picks a random edge
  and a direction, animates a small bright tetra along the edge with a
  smoothstep ease, and on arrival sets the destination node's
  emissive-intensity pulse to 1. Pulses decay at 1.6/s; the receiving
  node also scales up briefly via the pulse value.
- **Group rotation** — slow `0.11 rad/s` Y plus low-amplitude X/Z
  oscillation. The whole cluster rotates lazily while signals fly along
  the edges.

The cluster is horizontally stretched (`STRETCH_X = 1.75` on the X
component of each node's base position) so the silhouette fits the
landscape header column.

## CubicScene — `src/components/CubicScene.tsx`

Voxel cluster in the Capabilities section. Scroll-driven.

- **Five shape generators** — `cubeShape`, `sphereShape`, `torusShape`,
  `pyramidShape`, `helixShape`. Each returns exactly `count` Vector3
  targets so any voxel can be assigned a slot in any shape.
- **Slot order** — shuffled once at component init and reused across all
  shapes. Voxel `i` always goes to `slotOrder[i]` of whichever shape is
  current. This keeps voxel paths consistent rather than re-randomising
  each cycle.
- **Scroll progress** — the parent `CubicScene` tracks
  `(viewportHeight - sectionTop) / (sectionHeight + viewportHeight)`,
  clamped to `[0, 1]`. `FlyingVoxels` reads it via a ref and computes
  `f = scroll × 5`. The integer part picks two adjacent shapes; the
  fractional part is smoothsteped and lerps between them.
- **Scatter on out-of-view** — IntersectionObserver fires
  `assemble: false` when the section leaves; voxels' targets become
  random points on a 3.2–5 sphere along their current direction
  (radial outward). Frameloop kept alive for 2.2s after assemble flips
  off so the explosion plays out before pausing.
- **Voxel sizes** — tiered: 7% large (0.22–0.32), 21% medium
  (0.15–0.20), 72% small (0.08–0.13).

No ground plane, no shadows. The cluster floats against pure black with
the page-level grain on top.

## Mobile guard

Every scene exports a `detectMobile()` that checks
`(pointer: coarse) || innerWidth < 820`. Anything that gates on `mobile`
in the source is part of the cheap-path for phones: lower geometry
counts, capped DPR (1.25), `antialias: false`, `powerPreference:
"default"`, no postprocessing, no shadows, no `ContactShadows`. The
hero further drops the second drifting lamp on mobile.

## Frameloop pause

Every `Canvas` has its `frameloop` prop tied to an in-view boolean from
an `IntersectionObserver` with a `120px` rootMargin. When the canvas
leaves the viewport the prop flips to `'never'` and r3f stops
scheduling RAF — the scene is fully paused until you scroll back. On
desktop with three scenes on the page this is the difference between
~12 and ~60 frame schedules per second when only one is visible.
