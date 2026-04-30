import type { ReactNode } from 'react';

type Props = {
  id: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, children, className = '' }: Props) {
  return (
    <section
      id={id}
      className={`relative px-6 py-32 md:px-12 md:py-44 lg:px-20 lg:py-56 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">
        {(eyebrow || title) && (
          <header className="mb-16 md:mb-24" data-reveal>
            {eyebrow && (
              <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-fog-1">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="max-w-4xl text-4xl font-medium leading-[1.05] tracking-tight text-paper md:text-6xl lg:text-7xl">
                {title}
              </h2>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
