import { Section } from '../components/Section';
import { lazy } from 'react';
import { LazyVisual } from '../components/LazyVisual';
import { EyebrowMark } from '../components/EyebrowMark';
import { AppIconStrip } from '../components/AppIconStrip';
import { GlitchText } from '../components/GlitchText';
import { selectedWork } from '../data/cv';

const KnowledgeGraph = lazy(() =>
  import('../components/KnowledgeGraph').then((m) => ({ default: m.KnowledgeGraph })),
);

export function Work() {
  return (
    <Section id="work">
      <div className="relative mb-6 md:mb-12" data-reveal>
        <LazyVisual className="h-[460px] w-full lg:h-[540px]">
          <KnowledgeGraph />
        </LazyVisual>
        {/* Overlaid on the graph from md up; on phones the graph is short
            enough that the heading sat right on top of the nodes, so it drops
            below instead. */}
        <header className="overlay-text pointer-events-none relative z-10 mt-4 md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:p-4">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-fog-1">
            <EyebrowMark />
            Selected work
          </div>
          <h2 className="text-4xl font-medium leading-[1.05] tracking-tight text-paper md:text-6xl lg:text-7xl">
            <GlitchText text="A few things worth showing." />
          </h2>
        </header>
      </div>
      <div className="space-y-px bg-white/10">
        {selectedWork.map((w, i) => (
          <article
            key={w.title}
            className="group grid grid-cols-1 gap-3 bg-black p-6 transition hover:bg-ink-2 md:grid-cols-[60px_1fr] md:gap-x-12 md:p-10"
          >
            {/* Two columns, not three. A third `auto` column for the context
                reserved its full width down the whole row — squeezing the
                blurb into a narrow ribbon while leaving a tall empty void
                beside every entry. The context now shares a baseline with the
                title, so the text gets the width back. */}
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog-1 md:pt-1.5">
              {String(i + 1).padStart(2, '0')}
            </div>
            <div>
              <div className="flex flex-col gap-1.5 md:flex-row md:items-baseline md:justify-between md:gap-8">
                <h3 className="text-2xl font-medium tracking-tight text-paper md:text-3xl">
                  {w.title}
                </h3>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.3em] text-fog-2">
                  {w.context}
                </span>
              </div>
              <p className="mt-4 max-w-2xl leading-relaxed text-fog-3">{w.blurb}</p>
              {w.apps && <AppIconStrip className="mt-6" seed={w.title} />}
              {/*
                Dofollow — there is no rel="nofollow" here and never was, so
                crawlers already pass the link along. What changed is
                `noreferrer` dropping to `noopener`: noreferrer was stripping
                the Referer header, so the destination could not see the
                traffic as coming from this site. noopener keeps the
                window.opener guard without hiding the referral.
              */}
              {w.href && (
                <a
                  href={w.href}
                  target="_blank"
                  rel="noopener"
                  className="mt-5 inline-flex items-center gap-2 border-b border-white/25 pb-0.5 font-mono text-[11px] uppercase tracking-[0.2em] text-fog-2 transition hover:border-white/60 hover:text-paper"
                >
                  {w.hrefLabel ?? w.href}
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
