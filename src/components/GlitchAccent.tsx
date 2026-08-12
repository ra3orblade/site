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
    case 'circle':
      return (
        <>
          <circle cx="22" cy="22" r="16" />
          <circle cx="22" cy="22" r="7" opacity="0.45" />
          <line x1="6" y1="22" x2="38" y2="22" opacity="0.3" />
        </>
      );
    case 'square':
      return (
        <>
          <rect x="7" y="7" width="30" height="30" />
          <rect x="15" y="15" width="14" height="14" opacity="0.45" />
          <line x1="7" y1="7" x2="37" y2="37" opacity="0.25" />
        </>
      );
    case 'hexagon':
      return (
        <>
          <polygon points="22,4 37,13 37,31 22,40 7,31 7,13" />
          <line x1="7" y1="13" x2="37" y2="31" opacity="0.35" />
        </>
      );
    case 'octagon':
      return (
        <>
          <polygon points="37.7,28.5 28.5,37.7 15.5,37.7 6.3,28.5 6.3,15.5 15.5,6.3 28.5,6.3 37.7,15.5" />
          <polygon
            points="30.9,26.4 26.4,30.9 17.6,30.9 13.1,26.4 13.1,17.6 17.6,13.1 26.4,13.1 30.9,17.6"
            opacity="0.4"
          />
        </>
      );
    case 'star':
      return (
        <polygon points="22,4 26.4,15.9 39.1,16.4 29.1,24.3 32.6,36.6 22,29.5 11.4,36.6 14.9,24.3 4.9,16.4 17.6,15.9" />
      );
    case 'cross':
      return (
        <>
          <path d="M18 6h8v12h12v8H26v12h-8V26H6v-8h12z" />
          <line x1="18" y1="18" x2="26" y2="26" opacity="0.3" />
        </>
      );
    case 'chevron':
      return (
        <>
          <polyline points="10,14 22,26 34,14" />
          <polyline points="10,24 22,36 34,24" opacity="0.45" />
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
