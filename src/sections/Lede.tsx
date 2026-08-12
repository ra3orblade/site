import { CornerMarks } from '../components/CornerMarks';
import { FloatingAccents } from '../components/FloatingAccents';
import { PhotoFrame } from '../components/PhotoFrame';

export function Lede() {
  return (
    <section
      id="lede"
      className="relative px-6 py-6 md:px-12 md:py-6 lg:px-20 lg:py-6"
    >
      <CornerMarks />
      <FloatingAccents id="lede" />
      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <p
          className="text-3xl font-medium leading-[1.15] tracking-tight text-paper md:text-5xl lg:text-6xl"
          data-reveal
        >
          I <span className="serif">build</span> production front-ends. Lately, more by{' '}
          <span className="serif">specifying</span> them than typing them.
        </p>
        <p
          className="mt-8 max-w-2xl text-lg leading-relaxed text-fog-3 md:text-xl"
          data-reveal
          style={{ ['--reveal-delay' as string]: '100ms' }}
        >
          That is not a figure of speech. The Anytype desktop client was rebuilt end
          to end that way — Electron to Tauri, contentEditable to Lexical, webpack to
          Vite — <span className="serif">mostly solo</span>, against specs I wrote and
          diffs I reviewed.
        </p>
        <p
          className="mt-6 max-w-2xl text-lg leading-relaxed text-fog-2 md:text-xl"
          data-reveal
          style={{ ['--reveal-delay' as string]: '180ms' }}
        >
          Now I&rsquo;m building Brainstorm — a local-first knowledge OS where every
          app and every AI call reaches your data through a capability ledger, or not
          at all. Fifteen years of production work behind that — Anytype, devtodev,
          Game Insight.
        </p>

        <figure
          className="mt-10 w-full md:mt-12"
          data-reveal
          style={{ ['--reveal-delay' as string]: '240ms' }}
        >
          <PhotoFrame src="/photo1.jpg" label="Fig.01" index="Lede" />
        </figure>
      </div>
    </section>
  );
}
