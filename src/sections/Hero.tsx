import { lazy, Suspense, useEffect, useState } from 'react';
import { profile } from '../data/cv';
import { CornerMarks } from '../components/CornerMarks';
import { EyebrowMark } from '../components/EyebrowMark';
import { FloatingAccents } from '../components/FloatingAccents';
import { useLightweight } from '../components/useLightweight';

const Scene = lazy(() => import('../three/Scene'));

/** Still of the same form. Also the LCP element, so it is eager, not lazy. */
function HeroPoster() {
  return (
    <img
      src="/hero-poster.jpg"
      alt=""
      aria-hidden
      fetchPriority="high"
      className="h-full w-full object-cover opacity-90"
    />
  );
}

export function Hero() {
  const light = useLightweight();
  const [armed, setArmed] = useState(false);

  /*
   * Even on desktop, mounting the scene during first render puts ~1MB of
   * three.js on the critical path. The poster paints immediately and the
   * canvas swaps in once the browser is idle, so the largest paint is a 84KB
   * jpeg rather than a WebGL frame waiting on a megabyte of script.
   */
  useEffect(() => {
    if (light) return;
    const start = () => setArmed(true);
    // A `'requestIdleCallback' in window` guard narrows window to never on the
    // negative branch, since the DOM lib declares it unconditionally.
    const ric = typeof window.requestIdleCallback === 'function' ? window.requestIdleCallback : null;
    if (ric) {
      const id = ric.call(window, start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(start, 1200);
    return () => window.clearTimeout(t);
  }, [light]);

  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        {light || !armed ? (
          <HeroPoster />
        ) : (
          <Suspense fallback={<HeroPoster />}>
            <Scene />
          </Suspense>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/85" />

      {/* Darkens the plate behind the name rather than shadowing the type.
          A blur large enough to carry 9rem text over the lit side of the form
          reads as a halo; a feathered scrim is invisible as an effect and
          leaves the letterforms crisp. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 75% at 8% 88%, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 32%, rgba(0,0,0,0.35) 55%, transparent 74%)',
        }}
      />

      <CornerMarks />
      <FloatingAccents id="hero" dense />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 md:px-12 md:pb-28 lg:px-20">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-6" data-parallax="0.18">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog-1">
              <EyebrowMark />
              {profile.location}
            </p>
          </div>
          <h1
            className="text-5xl font-medium leading-[0.9] text-paper md:text-7xl lg:text-[9rem]"
            style={{ letterSpacing: 'var(--tracking-hero)' }}
            data-parallax="0.32"
          >
            {profile.name}
          </h1>
          <p
            className="mt-8 max-w-2xl text-lg text-fog-3 md:text-2xl"
            data-parallax="0.22"
          >
            {profile.title}
          </p>
          <p
            className="mt-4 max-w-2xl text-base text-fog-2 md:text-lg"
            data-parallax="0.18"
          >
            Building <span className="serif">AI-natively</span>, with Claude Code.
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <div
          className="font-mono text-[10px] uppercase tracking-[0.4em] text-fog-1"
          data-parallax="-0.12"
        >
          Scroll
        </div>
      </div>
    </section>
  );
}
