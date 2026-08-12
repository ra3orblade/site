import { GlitchAccent } from './GlitchAccent';
import { seedFrom, GLITCH_SHAPES } from './glitch';

/**
 * Anchor points in the outer gutters, clear of the max-w-4xl reading column.
 * Only usable from lg up, where that gutter actually exists.
 */
const WIDE_POSITIONS = [
  'left-[2.5%] top-[9%]',
  'left-[4.5%] top-[31%]',
  'left-[2%] top-[54%]',
  'left-[5%] top-[78%]',
  'right-[3%] top-[13%]',
  'right-[5.5%] top-[36%]',
  'right-[2%] top-[59%]',
  'right-[4.5%] top-[83%]',
];

/**
 * Phones have no gutter to speak of — the reading column runs nearly edge to
 * edge. These sit in the 24px side padding and in the vertical breathing room
 * between sections, so the page still flickers on a phone instead of being
 * completely inert.
 */
const NARROW_POSITIONS = [
  'left-0.5 top-[6%]',
  'right-0.5 top-[27%]',
  'left-0.5 top-[52%]',
  'right-0.5 top-[71%]',
  'left-0.5 top-[92%]',
];

const WIDE_SIZES = [28, 34, 40, 46, 54];
const NARROW_SIZES = [18, 20, 24, 28];

/**
 * Wireframe glyphs scattered through a section. Which shape lands where is
 * seeded off the section id so the arrangement is stable across renders;
 * *when* each one flashes is decided at runtime by the shared scheduler.
 */
export function FloatingAccents({ id }: { id: string }) {
  const base = seedFrom(id);

  const render = (positions: string[], sizes: number[], offset: number) =>
    positions.map((className, i) => {
      const n = base + (i + offset) * 37;
      return (
        <GlitchAccent
          key={className}
          shape={GLITCH_SHAPES[(n * 7 + i * 13) % GLITCH_SHAPES.length]}
          size={sizes[(n + i * 3) % sizes.length]}
          className={className}
        />
      );
    });

  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block" aria-hidden>
        {render(WIDE_POSITIONS, WIDE_SIZES, 0)}
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 lg:hidden" aria-hidden>
        {render(NARROW_POSITIONS, NARROW_SIZES, 11)}
      </div>
    </>
  );
}
