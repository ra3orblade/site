import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Text that tears the first time it scrolls into view, and again on the way
 * out.
 *
 * Two earlier attempts were wrong in instructive ways. Substituting noise
 * characters re-wrapped the line and broke inline italics. Clipping the single
 * real element could only ever hide and show the whole thing at once, which
 * reads as a blink rather than a glitch.
 *
 * A tear needs horizontal bands displacing *independently*, which one element
 * cannot do — so during the animation we stack three aria-hidden copies over
 * the real text, each clipped to its own band and sliding by its own offset.
 * The copies are absolutely positioned against the real text, so they inherit
 * its exact width and wrap identically, and the text itself never changes.
 */
type Props = {
  /** Convenience for plain-string headings; pass `children` instead when the
   *  heading carries inline markup of its own. */
  text?: string;
  className?: string;
  /** Fraction of the element that must be visible before it fires. */
  threshold?: number;
  children?: ReactNode;
};

const SLICES = [1, 2, 3];

export function GlitchText({ text, className = '', threshold = 0.2, children }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<'idle' | 'in' | 'out'>('idle');
  const content = children ?? text;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let wasVisible = false;
    let done: number | undefined;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // Ratio rather than the boolean: the exit tear should fire while the
          // line is still partly on screen, not once it is already gone.
          const visible = e.isIntersecting && e.intersectionRatio >= threshold;
          if (visible === wasVisible) continue;
          wasVisible = visible;

          setState(visible ? 'in' : 'out');
          window.clearTimeout(done);
          done = window.setTimeout(() => setState('idle'), visible ? 640 : 460);
        }
      },
      { threshold: [0, threshold] },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      window.clearTimeout(done);
    };
  }, [threshold]);

  const stateClass = state === 'in' ? 'is-tear-in' : state === 'out' ? 'is-tear-out' : '';

  return (
    <span ref={ref} className={`glitch-text ${stateClass} ${className}`}>
      {content}
      {state !== 'idle' &&
        SLICES.map((n) => (
          <span key={n} className={`glitch-slice glitch-slice-${n}`} aria-hidden>
            {content}
          </span>
        ))}
    </span>
  );
}
