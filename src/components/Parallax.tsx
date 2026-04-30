import { useEffect } from 'react';

/**
 * Global parallax: any element with `data-parallax="<factor>"` gets a
 * scroll-driven Y translation. Factor is unitless; positive = moves with the
 * scroll (background feel), negative = moves against scroll (foreground feel).
 *
 * Uses an IntersectionObserver to only update visible elements, plus a single
 * rAF-throttled scroll listener.
 */
export function ParallaxRoot() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const all = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]')).map((el) => ({
      el,
      factor: parseFloat(el.dataset.parallax || '0') || 0,
      visible: false,
    }));
    if (all.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const target = all.find((t) => t.el === entry.target);
          if (target) target.visible = entry.isIntersecting;
        }
      },
      { rootMargin: '20% 0px 20% 0px' }
    );
    all.forEach(({ el }) => io.observe(el));

    let raf = 0;
    const update = () => {
      raf = 0;
      const vhCenter = window.innerHeight / 2;
      for (const t of all) {
        if (!t.visible) continue;
        const rect = t.el.getBoundingClientRect();
        const distFromCenter = rect.top + rect.height / 2 - vhCenter;
        // Clamp so off-screen elements don't accumulate huge offsets.
        const offset = Math.max(-200, Math.min(200, -distFromCenter * t.factor));
        t.el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
