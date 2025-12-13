// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind'; // <--- Ini import yang BENAR untuk v3

// https://astro.build/config
export default defineConfig({
  site: 'https://shopeepayreferral.web.id',
  
  adapter: cloudflare(),
  
  integrations: [
    mdx(), 
    sitemap(), 
    keystatic(), 
    react(),
    tailwind() // <--- Tailwind masuk di sini sebagai integrasi
  ],
  
  // BAGIAN VITE PLUGINS DI HAPUS KARENA ITU UNTUK V4
});