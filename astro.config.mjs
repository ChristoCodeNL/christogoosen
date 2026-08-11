// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://christogoosen.com',
  output: 'static',
  integrations: [mdx(), sitemap()],
  // /blog was the old route. Keep it alive so nothing already shared 404s.
  redirects: {
    '/blog': '/essays',
    '/blog/[...slug]': '/essays/[...slug]',
  },
});
