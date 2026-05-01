import { CornerMarks } from '../components/CornerMarks';
import { CubicScene } from '../components/CubicScene';
import { aiPractice, capabilities, stack } from '../data/cv';

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative px-6 py-10 md:px-12 md:py-6 lg:px-20 lg:py-6"
    >
      <CornerMarks />
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-8 md:mb-12" data-reveal>
          <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-fog-1">
            How I work
          </div>
          <h2 className="text-4xl font-medium leading-[1.05] tracking-tight text-paper md:text-6xl lg:text-7xl">
            AI-native, end to end.
          </h2>
        </header>

        <figure
          className="w-full"
          data-reveal
          style={{ ['--reveal-delay' as string]: '120ms' }}
        >
          <img
            src="/photo2.png"
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="block h-auto w-full opacity-90"
          />
        </figure>

        <article className="mt-10 border-y hairline py-10 md:mt-12 md:py-12" data-reveal>
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

        <div className="mt-10 md:mt-12">
          <CubicScene />
        </div>

        <div className="mt-10 md:mt-12">
          <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-fog-1">
            Where I go deep
          </div>
          <div className="grid gap-px bg-white/10 md:grid-cols-3">
            {capabilities.map((c, i) => (
              <article
                key={c.title}
                className="bg-black p-8 md:p-10"
                data-reveal
                style={{ ['--reveal-delay' as string]: `${i * 60}ms` }}
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

        <div className="mt-10 md:mt-12">
          <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-fog-1">
            Day-to-day stack
          </div>
          <p className="max-w-4xl text-lg leading-relaxed text-fog-2 md:text-xl">
            {stack.join(' · ')}
          </p>
        </div>
      </div>
    </section>
  );
}
