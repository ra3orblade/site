import { lazy, Suspense } from 'react';
import { profile } from '../data/cv';

const Scene = lazy(() => import('../three/Scene'));

export function Hero() {
  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <Suspense fallback={<div className="h-full w-full bg-black" />}>
          <Scene />
        </Suspense>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/85" />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 md:px-12 md:pb-28 lg:px-20">
        <div className="mx-auto w-full max-w-6xl">
          <p
            className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-fog-1"
            data-parallax="0.18"
          >
            {profile.location}
          </p>
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
