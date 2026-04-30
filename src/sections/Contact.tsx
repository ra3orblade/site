import { profile } from '../data/cv';

export function Contact() {
  return (
    <section id="contact" className="relative border-t hairline px-6 py-32 md:px-12 md:py-44 lg:px-20 lg:py-56">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-12 font-mono text-[10px] uppercase tracking-[0.3em] text-fog-1">
          Contact
        </div>

        <h2
          className="text-4xl font-medium leading-[1.05] tracking-tight text-paper md:text-7xl lg:text-8xl"
          data-reveal
        >
          Let&rsquo;s <span className="serif">build</span> something.
        </h2>

        <p
          className="mt-12 max-w-2xl text-lg leading-relaxed text-fog-3 md:text-xl"
          data-reveal
          style={{ ['--reveal-delay' as string]: '120ms' }}
        >
          The fastest way to reach me is on LinkedIn — I check it.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-3" data-reveal>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-paper px-6 py-3 text-sm text-black transition hover:bg-bone"
          >
            Message on LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 px-6 py-3 text-sm text-paper transition hover:border-white/40"
          >
            GitHub
          </a>
        </div>

        <footer className="mt-32 grid gap-3 border-t hairline pt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-fog-1 md:flex md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Andrew Simachev · {profile.location}</span>
          <span>This site was built AI-natively with Claude Code</span>
        </footer>
      </div>
    </section>
  );
}
