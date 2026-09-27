/**
 * Пишет dist/sitemap.xml и дописывает ссылку на него в dist/robots.txt.
 * Адрес сайта — из scripts/site-url.mjs (на Vercel подставляется сам).
 * Список кейсов берётся из src/data/cases.ts.
 *
 * Запускается автоматически из `npm run build`.
 */
import fs from 'node:fs';
import { resolveSiteUrl } from './site-url.mjs';

const siteUrl = resolveSiteUrl();

const source = fs.readFileSync('src/data/cases.ts', 'utf8');
const slugs = [...source.matchAll(/^\s{4}slug: '([a-z0-9-]+)',/gm)].map(
  (m) => m[1]
);

const paths = ['/', '/projects', ...slugs.map((s) => `/case/${s}`)];
const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (p) => `  <url>
    <loc>${siteUrl}${p}</loc>
    <lastmod>${today}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync('dist/sitemap.xml', xml);

const robots = fs.readFileSync('dist/robots.txt', 'utf8').trimEnd();
fs.writeFileSync('dist/robots.txt', `${robots}\n\nSitemap: ${siteUrl}/sitemap.xml\n`);

console.log(`  dist/sitemap.xml: ${paths.length} адресов на ${siteUrl}`);
