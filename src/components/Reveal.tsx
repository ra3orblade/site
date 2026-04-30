import { useEffect } from 'react';

/**
 * Single global IntersectionObserver: tags any element with a `data-reveal`
 * attribute as visible once it enters the viewport. Cheap, no per-element hook.
 */
export function RevealRoot() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (reduced) {
      targets.forEach((el) => (el.dataset.revealVisible = 'true'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealVisible = 'true';
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
