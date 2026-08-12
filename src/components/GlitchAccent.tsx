import { useEffect, useRef, type CSSProperties } from 'react';
import { registerAccent } from './glitchScheduler';
import type { GlitchShape } from './glitch';

/**
 * A hairline wireframe glyph — the same faceted vocabulary as the hero mark,
 * at accent scale. Invisible until the shared scheduler picks it, then it
 * tears in and cuts out. The parent positions it.
 */
function Shape({ shape }: { shape: GlitchShape }) {
  switch (shape) {
    case 'tetra':
      return (
        <>
          <polygon points="22,5 38,34 6,34" />
          <line x1="22" y1="5" x2="22" y2="34" opacity="0.55" />
          <line x1="6" y1="34" x2="26" y2="18" opacity="0.4" />
          <line x1="38" y1="34" x2="18" y2="18" opacity="0.4" />
        </>
      );
    case 'triangle':
      return (
        <>
          <polygon points="22,7 36,33 8,33" />
          <line x1="22" y1="7" x2="22" y2="33" opacity="0.35" />
        </>
      );
    case 'diamond':
      return (
        <>
          <polygon points="22,5 35,22 22,39 9,22" />
          <line x1="9" y1="22" x2="35" y2="22" opacity="0.45" />
          <line x1="22" y1="5" x2="22" y2="39" opacity="0.45" />
        </>
      );
    case 'ring':
      return (
        <>
          <polygon points="22,6 34,13 34,29 22,36 10,29 10,13" />
          <polygon points="22,14 28,18 28,26 22,30 16,26 16,18" opacity="0.5" />
        </>
      );
    default:
      // ico — the hexagon the hero mark is built from
      return (
        <>
          <polygon points="22,5 37,15 37,29 22,39 7,29 7,15" />
          <line x1="22" y1="5" x2="22" y2="39" opacity="0.5" />
          <line x1="7" y1="15" x2="37" y2="29" opacity="0.5" />
          <line x1="37" y1="15" x2="7" y2="29" opacity="0.5" />
          <line x1="7" y1="15" x2="37" y2="15" opacity="0.3" />
          <line x1="7" y1="29" x2="37" y2="29" opacity="0.3" />
        </>
      );
  }
}

type Props = {
  shape?: GlitchShape;
  size?: number;
  className?: string;
  style?: CSSProperties;
};

export function GlitchAccent({ shape = 'ico', size = 32, className = '', style }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return registerAccent(el);
  }, []);

  return (
    <span ref={ref} className={`glitch-accent ${className}`} style={style} aria-hidden>
      <svg
        className="glitch-geo"
        width={size}
        height={size}
        viewBox="0 0 44 44"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Shape shape={shape} />
      </svg>
    </span>
  );
}
