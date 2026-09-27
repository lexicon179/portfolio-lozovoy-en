/**
 * Абсолютный адрес сайта: для og:url, og:image и sitemap.xml.
 * Телеграм и WhatsApp не разворачивают превью по относительному пути.
 *
 * Порядок:
 *   1. SITE_URL — задать руками, когда появится свой домен;
 *   2. VERCEL_PROJECT_PRODUCTION_URL — Vercel сам отдаёт при сборке
 *      боевой адрес проекта (xxx.vercel.app или привязанный домен);
 *   3. запасной адрес, если собираем локально.
 */
export const FALLBACK_URL = 'https://mikelozovoy.vercel.app';

export function resolveSiteUrl(env = process.env) {
  const raw =
    env.SITE_URL ||
    (env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
      : FALLBACK_URL);
  return raw.replace(/\/+$/, '');
}
