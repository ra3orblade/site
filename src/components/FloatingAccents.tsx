import { GlitchAccent } from './GlitchAccent';
import { seedFrom, type GlitchShape } from './glitch';

const SHAPES: GlitchShape[] = ['ico', 'tetra', 'triangle', 'diamond', 'ring'];

/** Anchor points in the outer gutters, clear of the max-w-4xl reading column. */
const POSITIONS = [
  'left-[2.5%] top-[9%]',
  'left-[4.5%] top-[31%]',
  'left-[2%] top-[54%]',
  'left-[5%] top-[78%]',
  'right-[3%] top-[13%]',
  'right-[5.5%] top-[36%]',
  'right-[2%] top-[59%]',
  'right-[4.5%] top-[83%]',
];

const SIZES = [20, 26, 32, 38, 44];

/**
 * Wireframe glyphs scattered through a section's gutters — the hexagon family
 * only, matching the hero mark. Which shape lands where is seeded off the
 * section id so the arrangement is stable across renders; *when* each one
 * flashes is decided at runtime by the shared scheduler.
 */
export function FloatingAccents({ id }: { id: string }) {
  const base = seedFrom(id);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block" aria-hidden>
      {POSITIONS.map((className, i) => {
        const n = base + i * 37;
        return (
          <GlitchAccent
            key={className}
            shape={SHAPES[(n * 7 + i * 13) % SHAPES.length]}
            size={SIZES[(n + i * 3) % SIZES.length]}
            className={className}
          />
        );
      })}
    </div>
  );
}
