import { Section } from '../components/Section';
import { selectedWork } from '../data/cv';

export function Work() {
  return (
    <Section id="work" eyebrow="Selected work" title="A few things worth showing.">
      <div className="space-y-px bg-white/10">
        {selectedWork.map((w, i) => (
          <article
            key={w.title}
            className="group grid gap-6 bg-black p-8 transition hover:bg-ink-2 md:grid-cols-[100px_1fr_auto] md:items-baseline md:gap-12 md:p-12"
            data-reveal
            style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}
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
