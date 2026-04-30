import { Section } from '../components/Section';
import { aiPractice, capabilities, stack } from '../data/cv';

export function Capabilities() {
  return (
    <Section id="capabilities" eyebrow="How I work" title="AI-native, end to end.">
      <article className="border-y hairline py-14 md:py-20" data-reveal>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog-1">
          {aiPractice.eyebrow}
        </div>
        <h3
          className="mt-5 text-3xl font-medium tracking-tight text-paper md:text-5xl lg:text-6xl"
          style={{ letterSpacing: '-0.03em' }}
        >
          {aiPractice.title}
        </h3>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-fog-3 md:text-xl">
          {aiPractice.body}
        </p>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-fog-2 md:text-xl">
          <span className="serif">{aiPractice.tail}</span>
        </p>
      </article>

      <div className="mt-20 md:mt-24">
        <div className="mb-8 font-mono text-[10px] uppercase tracking-[0.3em] text-fog-1">
          Where I go deep
        </div>
        <div className="grid gap-px bg-white/10 md:grid-cols-3">
          {capabilities.map((c, i) => (
            <article
              key={c.title}
              className="bg-black p-8 md:p-10"
              data-reveal
              style={{ ['--reveal-delay' as string]: `${i * 90}ms` }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog-1">
                0{i + 1}
              </div>
              <h4 className="mt-4 text-xl font-medium tracking-tight text-paper md:text-2xl">
                {c.title}
              </h4>
              <p className="mt-4 leading-relaxed text-fog-3">{c.body}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-20 md:mt-28">
        <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-fog-1">
          Day-to-day stack
        </div>
        <p className="max-w-4xl text-lg leading-relaxed text-fog-2 md:text-xl">
          {stack.join(' · ')}
        </p>
      </div>
    </Section>
  );
}
