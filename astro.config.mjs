// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://njuante.github.io',
  base: '/myweb',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx()],
  
  // Optimize for static site generation
  output: 'static',
  
  // Build configuration
  build: {
    assets: 'assets'
  },
  
  // Ensure proper trailing slashes for GitHub Pages
  trailingSlash: 'ignore'
});