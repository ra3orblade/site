import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    /*
     * The three.js bundle is ~1MB (324KB gzipped) and is reachable only
     * through lazy() — the hero scene, the knowledge graph and the cubes.
     * Vite still emits a <link rel="modulepreload"> for it in index.html,
     * which means every visit downloads it up front, phones included, even
     * though nothing on a phone ever renders a canvas. Dropping the hint
     * leaves the chunk to load on the dynamic import that actually needs it.
     */
    modulePreload: {
      resolveDependencies: (_url, deps) => deps.filter((d) => !/\/(r3f|three)-/.test(d)),
    },
    /*
     * No manualChunks for three.js. Forcing it into a named chunk made the
     * bundler link that chunk statically from the entry, so it loaded on every
     * visit despite all three of its consumers being behind lazy(). Left
     * alone, it lands in the async graph and is fetched only when a scene
     * actually mounts.
     */
  },
});
