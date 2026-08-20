import { Analytics } from '@vercel/analytics/react';
import { Hero } from './sections/Hero';
import { Lede } from './sections/Lede';
import { Work } from './sections/Work';
import { Capabilities } from './sections/Capabilities';
import { Companies } from './sections/Companies';
import { OpenSource } from './sections/OpenSource';
import { Contact } from './sections/Contact';
import { ParallaxRoot } from './components/Parallax';
import { ScrollProgress } from './components/ScrollProgress';

export default function App() {
  return (
    <main className="vignette grain scanlines min-h-screen bg-black text-paper">
      <ScrollProgress />
      <Hero />
      <Lede />
      <Work />
      <Capabilities />
      <OpenSource />
      <Companies />
      <Contact />
      <ParallaxRoot />
      <Analytics />
    </main>
  );
}
