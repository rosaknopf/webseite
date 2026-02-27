// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

import configData from './src/data/config.json' with { type: 'json' };

// https://astro.build/config
export default defineConfig({
  site: configData.siteUrl || 'https://der-rosa-knopf.de',
  output: 'static',
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [icon(), sitemap()]
});