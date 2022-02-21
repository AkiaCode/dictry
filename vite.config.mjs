import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import vercel from "solid-start-vercel";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [solidPlugin({ adapter: vercel() }), VitePWA({
    manifest: {
      short_name: 'Dictry',
      name: 'Dictry',
      description: "Let's memorize the words for a day!",
      start_url: '/',
      background_color: '#1d1d1d',
      display: 'standalone',
      lang: 'en',
      theme_color: '#ee7f2d',
      icons: [
        {
          "src": 'dictry.png',
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ]
    },
    base: '/',
    filename: './sw.ts',
    mode: 'development',
    strategies: 'injectManifest',
    srcDir: 'src',
    registerType: 'autoUpdate',
    includeManifestIcons: true,
  })],
  publicDir: './src/assets',
});
