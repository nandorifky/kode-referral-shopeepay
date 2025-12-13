// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://shopeepayreferral.web.id',
  
  // HAPUS output: 'hybrid'. Astro 5 otomatis tau dari adapter.
  adapter: cloudflare(),
  
  integrations: [
    mdx(), 
    sitemap(), 
    keystatic(), 
    react(),
    tailwind()
  ],
});