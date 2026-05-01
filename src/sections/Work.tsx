import { Section } from '../components/Section';
import { KnowledgeGraph } from '../components/KnowledgeGraph';
import { selectedWork } from '../data/cv';

export function Work() {
  return (
    <Section id="work">
      <div className="relative mb-10 md:mb-12" data-reveal>
        <KnowledgeGraph />
        <header className="overlay-text pointer-events-none absolute inset-x-0 bottom-0 z-10 p-2 md:p-4">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-fog-1">
            Selected work
          </div>
          <h2 className="text-4xl font-medium leading-[1.05] tracking-tight text-paper md:text-6xl lg:text-7xl">
            A few things worth showing.
          </h2>
        </header>
      </div>
      <div className="space-y-px bg-white/10">
        {selectedWork.map((w, i) => (
          <article
            key={w.title}
            className="group grid grid-cols-[40px_1fr] gap-6 bg-black p-8 transition hover:bg-ink-2 md:grid-cols-[60px_1fr_auto] md:items-baseline md:gap-12 md:p-10"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog-1">
              0{i + 1}
            </div>
            <div>
              <h3 className="text-2xl font-medium tracking-tight text-paper md:text-3xl">
                {w.title}
              </h3>
              <p className="mt-4 max-w-2xl leading-relaxed text-fog-3">{w.blurb}</p>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog-2">
              {w.context}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
