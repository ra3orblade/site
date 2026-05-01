import { Hero } from './sections/Hero';
import { Lede } from './sections/Lede';
import { Work } from './sections/Work';
import { Capabilities } from './sections/Capabilities';
import { Companies } from './sections/Companies';
import { Contact } from './sections/Contact';
import { ParallaxRoot } from './components/Parallax';

export default function App() {
  return (
    <main className="vignette grain min-h-screen bg-black text-paper">
      <Hero />
      <Lede />
      <Work />
      <Capabilities />
      <Companies />
      <Contact />
      <ParallaxRoot />
    </main>
  );
}
