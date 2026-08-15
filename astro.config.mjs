// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';

import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
  site: 'https://shopeepayreferral.web.id',
  
  // SSR mode: diperlukan agar middleware bisa baca Accept header saat request.
  // Browser tetap dapat HTML. Agent yang kirim Accept: text/markdown dapat Markdown.
  output: 'server',
  adapter: cloudflare(),
  
  integrations: [mdx(), sitemap(), keystatic(), react(), tailwind(), markdoc()],
});