import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import vercel from "solid-start-vercel";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [solidPlugin({ adapter: vercel() }), VitePWA({
    manifest: {
      name: 'Dictry',
      description: "Let's memorize the words for a day!",
    },
  })]
});
