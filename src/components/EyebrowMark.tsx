import { useEffect, useRef } from 'react';
import { registerAccent } from './glitchScheduler';

/**
 * Tiny geometric dot rendered as a hairline diamond. Used inline before
 * eyebrow text as a small technical accent. Registered with the shared
 * scheduler, so it tears at the same irregular moments as everything else
 * rather than on a period of its own.
 */
export function EyebrowMark() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return registerAccent(el);
  }, []);

  return (
    <span ref={ref} className="mr-3 inline-block align-middle leading-none text-fog-1">
      <svg
        className="glitch-mark"
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        aria-hidden
      >
        <polygon points="3,0 6,3 3,6 0,3" />
      </svg>
    </span>
  );
}
