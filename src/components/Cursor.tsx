import { useEffect, useRef } from 'react';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let visible = false;
    let raf = 0;

    const tick = () => {
      // Ring eases toward the pointer for a soft trail.
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dot.style.transform = `translate3d(${mx - 2.5}px, ${my - 2.5}px, 0)`;
      ring.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        visible = true;
      }
    };
    const onLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      visible = false;
    };

    const interactiveSel = 'a, button, [data-cursor-hover]';
    const onOver = (e: Event) => {
      const t = e.target as Element | null;
      if (t && t.closest(interactiveSel)) ring.dataset.hover = 'true';
    };
    const onOut = (e: Event) => {
      const t = e.target as Element | null;
      if (t && t.closest(interactiveSel)) ring.dataset.hover = 'false';
    };

    dot.style.opacity = '0';
    ring.style.opacity = '0';

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerover', onOver, true);
    document.addEventListener('pointerout', onOut, true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerover', onOver, true);
      document.removeEventListener('pointerout', onOut, true);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  );
}
