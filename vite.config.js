import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [solidPlugin(), VitePWA({
    manifest: {
      name: 'Dictry',
      description: 'Guess one word a day!',
    }
  })],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
