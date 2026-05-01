import { useEffect, useRef } from 'react';

/**
 * Hairline progress bar pinned to the top of the viewport. Fills left-to-right
 * as the page scrolls. Pure decorative technical accent.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!ref.current) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      ref.current.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-px bg-white/[0.06]"
      aria-hidden
    >
      <div
        ref={ref}
        className="h-px origin-left bg-paper transition-transform duration-100"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
