import { CornerMarks } from '../components/CornerMarks';
import { FloatingAccents } from '../components/FloatingAccents';
import { PhotoFrame } from '../components/PhotoFrame';

export function Lede() {
  return (
    <section
      id="lede"
      className="relative px-5 py-6 md:px-12 md:py-6 lg:px-20 lg:py-6"
    >
      <CornerMarks />
      <FloatingAccents id="lede" />
      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <p
          className="text-3xl font-medium leading-[1.15] tracking-tight text-paper md:text-5xl lg:text-6xl"
          data-reveal
        >
          I <span className="serif">build</span> production front-ends —{' '}
          <span className="serif">AI-natively</span>, every day.
        </p>
        <p
          className="mt-8 max-w-2xl text-lg leading-relaxed text-fog-3 md:text-xl"
          data-reveal
          style={{ ['--reveal-delay' as string]: '100ms' }}
        >
          Claude Code is my primary tool. Specs, not prompts. Subagents in parallel.
          Custom skills and hooks for the work I run weekly. The way I build now is{' '}
          <span className="serif">not</span> the way I built two years ago.
        </p>
        <p
          className="mt-6 max-w-2xl text-lg leading-relaxed text-fog-2 md:text-xl"
          data-reveal
          style={{ ['--reveal-delay' as string]: '180ms' }}
        >
          Fifteen years of production web work before that. Founding engineer at
          Anytype, where I architected the front-end of an open-source, local-first
          knowledge platform now used by thousands of people.
        </p>

        <figure
          className="mt-10 w-full md:mt-12"
          data-reveal
          style={{ ['--reveal-delay' as string]: '240ms' }}
        >
          <PhotoFrame src="/photo1.png" label="Fig.01" index="Lede" />
        </figure>
      </div>
    </section>
  );
}
