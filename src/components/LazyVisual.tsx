import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { useLightweight } from './useLightweight';

/**
 * Phones do not get the decorative WebGL scenes at all.
 *
 * The r3f bundle is ~1MB minified (324KB gzipped) and was in the *eager*
 * graph: the hero scene is lazy, but KnowledgeGraph and CubicScene were
 * imported directly, so every visit parsed all of three.js before first
 * paint. That is the single largest cost in a mobile Lighthouse run, and no
 * amount of tuning makes a megabyte of JS cheap on a phone CPU.
 *
 * On a pointer-coarse or narrow viewport the children are never rendered, so
 * the chunk is never fetched. On desktop they mount when the reader gets near
 * them, which keeps them off the initial critical path too.
 */
export function LazyVisual({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const light = useLightweight();
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    if (light) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [light]);

  // No placeholder box on phones — the space it reserved was part of what made
  // the page feel gappy there.
  if (light) return null;

  return (
    <div ref={ref} className={className}>
      {near ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  );
}
