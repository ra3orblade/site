import { profile } from '../data/cv';
import { CornerMarks } from '../components/CornerMarks';

function MailIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden>
      <path d="M2 3h12a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1zm12 1.5L8 8.7 2 4.5V12h12V4.5zM2.6 4l5.4 3.7L13.4 4H2.6z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
      <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5V8h3v11zM6.5 6.73a1.74 1.74 0 110-3.48 1.74 1.74 0 010 3.48zM20 19h-3v-5.6c0-1.34-.03-3.06-1.86-3.06-1.87 0-2.14 1.45-2.14 2.96V19h-3V8h2.88v1.5h.04c.4-.76 1.38-1.56 2.84-1.56C19.04 7.94 20 9.94 20 12.54V19z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.45 7.45 0 014 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      className="relative border-t hairline px-6 py-10 md:px-12 md:py-6 lg:px-20 lg:py-6"
    >
      <CornerMarks />
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-fog-1">
          Contact
        </div>

        <h2 className="text-4xl font-medium leading-[1.05] tracking-tight text-paper md:text-7xl lg:text-8xl">
          Let&rsquo;s <span className="serif">build</span> something.
        </h2>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fog-3 md:text-xl">
          The fastest way to reach me is on LinkedIn — I check it.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-w-[160px] items-center justify-center gap-2 rounded-full bg-paper px-6 py-3 text-sm text-black transition hover:bg-bone"
          >
            <LinkedInIcon />
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex min-w-[160px] items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-paper transition hover:border-white/40"
          >
            <MailIcon />
            Mail me
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-w-[160px] items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-paper transition hover:border-white/40"
          >
            <GitHubIcon />
            GitHub
          </a>
        </div>

        <footer className="mt-16 border-t hairline pt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-fog-1">
          © {new Date().getFullYear()} Andrew Simachev · {profile.location}
        </footer>
      </div>
    </section>
  );
}
