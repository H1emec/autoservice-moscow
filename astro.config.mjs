import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './src/config/site.ts';

// https://astro.build/config
export default defineConfig({
  site: site.url,
  compressHTML: true,
  build: { inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
  integrations: [
    // служебные страницы закрыты от индексации (noindex), в карту сайта не попадают
    sitemap({ filter: (page) => !/\/(privacy|credits)\/?$/.test(page) }),
  ],
});
