import { GlitchAccent } from './GlitchAccent';
import { hashIndex, GLITCH_SHAPES } from './glitch';

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
/**
 * Deal `count` items from a per-key shuffle of `items`.
 *
 * Straight hashing gave a section repeats and left some shapes unused
 * entirely (octagon never came up across all six sections). Dealing from a
 * deterministic Fisher-Yates shuffle guarantees every slot in a section gets
 * a different shape while keeping the arrangement stable across renders.
 */
function deal<T>(items: T[], key: string, count: number): T[] {
  const deck = [...items];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = hashIndex(`${key}/${i}`, i + 1);
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return Array.from({ length: count }, (_, i) => deck[i % deck.length]);
}

export function FloatingAccents({ id }: { id: string }) {
  /*
   * Index off a string hash per slot rather than arithmetic on a single seed.
   * The previous form was `(base + i*37) * 7 + i*13` mod 12, which reduces to
   * `(7*base + 8i) % 12` — and since gcd(8, 12) = 4 that orbit only ever
   * visits three shapes, the same three in every section regardless of the
   * seed. The size index collapsed harder still: `(base + 40i) % 5` with
   * 40 ≡ 0 (mod 5) gave every accent in a section an identical size.
   */
  const render = (positions: string[], sizes: number[], salt: string) => {
    const shapes = deal(GLITCH_SHAPES, `${id}${salt}shape`, positions.length);
    const dealtSizes = deal(sizes, `${id}${salt}size`, positions.length);
    return positions.map((className, i) => (
      <GlitchAccent key={className} shape={shapes[i]} size={dealtSizes[i]} className={className} />
    ));
  };

  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block" aria-hidden>
        {render(WIDE_POSITIONS, WIDE_SIZES, ':wide:')}
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 lg:hidden" aria-hidden>
        {render(NARROW_POSITIONS, NARROW_SIZES, ':narrow:')}
      </div>
    </>
  );
}
