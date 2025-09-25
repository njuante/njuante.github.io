// @ts-check

import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://njuante.github.io',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [mdx()],
  output: 'static',
  build: {
    assets: 'assets'
  },
  trailingSlash: 'ignore'
});