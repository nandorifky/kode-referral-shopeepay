// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import keystatic from '@keystatic/astro';

import react from '@astrojs/react';

import cloudflare from '@astrojs/cloudflare';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://shopeepayreferral.web',
  integrations: [mdx(), sitemap(), keystatic(), react()],
  
  adapter: cloudflare(),

  vite: {
    plugins: [tailwindcss()],
  },
});