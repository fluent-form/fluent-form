import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/ui-zorro',
  plugins: [
    tsconfigPaths(),
    viteStaticCopy({
      targets: [
        { src: '*.md', dest: '.' }
      ]
    })
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // }
});
