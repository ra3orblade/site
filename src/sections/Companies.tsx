import { Section } from '../components/Section';
import { experience } from '../data/cv';

export function Companies() {
  return (
    <Section id="companies" eyebrow="Where I've been" title="Twenty years of teams and products.">
      <ol className="border-t hairline">
        {experience.map((e, i) => (
          <li
            key={e.company}
            className="grid grid-cols-[40px_1fr] items-baseline gap-x-6 gap-y-2 border-b hairline py-8 md:grid-cols-[60px_1fr_auto] md:gap-x-12 md:py-10"
            data-reveal
            style={{ ['--reveal-delay' as string]: `${i * 70}ms` }}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog-1">
              0{i + 1}
            </div>
            <div className="row-start-1 col-start-2 md:row-auto md:col-auto">
              <div className="text-2xl font-medium tracking-tight text-paper md:text-3xl">
                {e.company}
              </div>
              <div className="mt-1.5 text-sm text-fog-2 md:text-base">
                {e.role}
                <span className="mx-2 text-fog-1">·</span>
                <span className="text-fog-2">{e.location}</span>
              </div>
            </div>
            <div className="col-start-2 font-mono text-[11px] uppercase tracking-widest text-fog-1 md:col-auto md:text-xs">
              {e.period}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
