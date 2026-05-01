import type { ReactNode } from 'react';
import { CornerMarks } from './CornerMarks';

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
      className={`relative px-6 py-10 md:px-12 md:py-6 lg:px-20 lg:py-6 ${className}`}
    >
      <CornerMarks />
      <div className="mx-auto w-full max-w-4xl">
        {(eyebrow || title) && (
          <header className="mb-8 md:mb-12" data-reveal>
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
