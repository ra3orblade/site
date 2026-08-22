import { Section } from '../components/Section';
import { openSource } from '../data/cv';

export function OpenSource() {
  return (
    <Section id="open-source" eyebrow="Open source" title="Code you can read.">
      <ol className="border-t hairline">
        {openSource.map((p, i) => (
          <li
            key={p.name}
            className="grid grid-cols-1 gap-3 border-b hairline py-8 md:grid-cols-[60px_1fr] md:gap-x-12 md:py-10"
            data-reveal
            style={{ ['--reveal-delay' as string]: `${i * 50}ms` }}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog-1 md:pt-1.5">
              0{i + 1}
            </div>
            <div>
              <div className="flex flex-col gap-1.5 md:flex-row md:items-baseline md:justify-between md:gap-8">
                <h3 className="font-mono text-2xl font-medium tracking-tight text-paper md:text-3xl">
                  {p.name}
                </h3>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.3em] text-fog-2">
                  {p.license}
                </span>
              </div>
              <p className="mt-2 text-sm text-fog-2 md:text-base">{p.tagline}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-fog-3">{p.blurb}</p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-fog-1">
                {p.tech}
              </p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                {[p.website, p.href].filter((u): u is string => Boolean(u)).map((u) => (
                  <a
                    key={u}
                    href={u}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 border-b border-white/25 pb-0.5 font-mono text-[11px] uppercase tracking-[0.2em] text-fog-2 transition hover:border-white/60 hover:text-paper"
                  >
                    {u.replace('https://', '')}
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
