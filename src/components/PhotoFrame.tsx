import { useEffect, useRef } from 'react';
import { registerAccent } from './glitchScheduler';

/**
 * A photograph treated as a monitor feed rather than a picture: targeting
 * brackets, a reticle, tick rules, scanlines and a mono readout, over an image
 * whose horizontal bands tear apart when the scheduler picks it.
 *
 * The displacement is done with copies of the image clipped to bands, so the
 * tear is in the picture itself and not an overlay pretending to be one. The
 * frame carries a high scheduler weight — it is a feature element, not a
 * marginal accent, so it should fire on the order of seconds.
 */
type Props = {
  src: string;
  /** Mono readout in the corner. Decorative. */
  label: string;
  index: string;
  /**
   * 'scan' tears the image into horizontal bands that slide sideways, with the
   * reticle left of centre. 'sweep' cuts vertical columns that jump up and
   * down and adds a rolling desync bar, reticle to the right. Two frames
   * running the identical animation read as one effect used twice.
   */
  variant?: 'scan' | 'sweep';
  className?: string;
};

export function PhotoFrame({ src, label, index, variant = 'scan', className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return registerAccent(el, 14);
  }, []);

  return (
    <div
      ref={ref}
      className={`photo-frame photo-frame-${variant} relative isolate overflow-hidden ${className}`}
    >
      <img
        src={src}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="block h-auto w-full opacity-90"
      />

      {/* Torn slices — same image, clipped and displaced. Four on 'sweep' so
          the vertical cut reads as columns rather than a split. */}
      {(variant === 'sweep' ? [1, 2, 3, 4] : [1, 2, 3]).map((n) => (
        <img
          key={n}
          src={src}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className={`photo-tear photo-tear-${n}`}
        />
      ))}

      <div className="photo-scan" aria-hidden />
      {variant === 'sweep' && <div className="photo-roll" aria-hidden />}

      {/* HUD. Hairlines and brackets in the accent, everything sized in % so
          it tracks the image at any width. */}
      <div className="photo-hud pointer-events-none absolute inset-0" aria-hidden>
        <span className="hud-bracket hud-tl" />
        <span className="hud-bracket hud-tr" />
        <span className="hud-bracket hud-bl" />
        <span className="hud-bracket hud-br" />

        <span className="hud-rule hud-rule-v" />
        <span className="hud-rule hud-rule-h" />

        <svg className="hud-reticle" viewBox="0 0 80 80" fill="none" stroke="currentColor">
          <circle cx="40" cy="40" r="30" strokeWidth="0.8" opacity="0.7" />
          <circle cx="40" cy="40" r="13" strokeWidth="0.6" opacity="0.45" />
          <path d="M40 2v14M40 64v14M2 40h14M64 40h14" strokeWidth="0.8" />
          <path d="M40 36v8M36 40h8" strokeWidth="0.6" opacity="0.8" />
        </svg>

        <svg className="hud-ticks" viewBox="0 0 100 6" preserveAspectRatio="none" stroke="currentColor">
          {Array.from({ length: 21 }, (_, i) => (
            <line
              key={i}
              x1={i * 5}
              y1="0"
              x2={i * 5}
              y2={i % 5 === 0 ? 6 : 3}
              strokeWidth="0.3"
              opacity={i % 5 === 0 ? 0.8 : 0.4}
            />
          ))}
        </svg>

        <span className="hud-label hud-label-tl">{label}</span>
        <span className="hud-label hud-label-br">
          <span className="hud-dot" />
          {index}
        </span>
      </div>
    </div>
  );
}
