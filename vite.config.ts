import { defineConfig, type Plugin } from 'vite';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { renderBody, renderICS, esc } from './src/render';
import { config } from './src/data/config';

/** base './' keeps every path relative (works on any GitHub Pages sub-path or locally).
 *  SITE_URL (optional) makes the link-preview image absolute for WhatsApp. */
const SITE_URL = (process.env.SITE_URL || '').replace(/\/?$/, process.env.SITE_URL ? '/' : '');

function invitation(): Plugin {
  const ics = fileURLToPath(new URL('./public/engagement.ics', import.meta.url));
  return {
    name: 'prerender-invitation',
    buildStart() {
      writeFileSync(ics, renderICS());
    },
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const s = config.share;
        const og = SITE_URL ? `${SITE_URL}social-preview.jpg` : 'social-preview.jpg';
        return html
          .replace(/%SHARE_TITLE%/g, esc(s.title))
          .replace(/%SHARE_DESC%/g, esc(s.description))
          .replace(/%THEME_COLOR%/g, s.themeColor)
          .replace(/%OG_IMAGE%/g, og)
          .replace('%OG_URL%', SITE_URL ? `<meta property="og:url" content="${SITE_URL}" />` : '')
          .replace('<!--APP-->', renderBody());
      },
    },
  };
}

export default defineConfig({ base: './', plugins: [invitation()], build: { target: 'es2019', assetsInlineLimit: 0 } });
