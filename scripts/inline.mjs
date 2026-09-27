/**
 * Склеивает dist-local в ОДИН html-файл: портфолио.html
 *
 * Зачем: при открытии с диска (file://) браузер блокирует и внешние
 * ES-модули, и запросы за шрифтами — политика CORS. Поэтому скрипт,
 * стили и шрифты вшиваются прямо в html. Файл открывается двойным
 * кликом, работает офлайн и ни от чего не зависит.
 *
 * Запускается автоматически из `npm run build:file`.
 */
import fs from 'node:fs';
import path from 'node:path';

const DIR = 'dist-local';
const OUT = path.join(DIR, 'portfolio.html');

let html = fs.readFileSync(path.join(DIR, 'index.html'), 'utf8');
let css = fs.readFileSync(path.join(DIR, 'app.css'), 'utf8');
const js = fs.readFileSync(path.join(DIR, 'app.js'), 'utf8');

// шрифты → data:-URI
let fonts = 0;
css = css.replace(/url\(([^)]*?\.woff2)\)/g, (whole, url) => {
  const file = path.join(DIR, 'fonts', path.basename(url.replace(/['"]/g, '')));
  if (!fs.existsSync(file)) {
    console.warn('  ! шрифт не найден:', file);
    return whole;
  }
  fonts++;
  return `url(data:font/woff2;base64,${fs.readFileSync(file).toString('base64')})`;
});

// иконка → data:-URI, иначе на file:// будет пустой запрос
const favicon = path.join(DIR, 'favicon.svg');
if (fs.existsSync(favicon)) {
  const uri = `data:image/svg+xml;base64,${fs.readFileSync(favicon).toString('base64')}`;
  // функция-замена, а не строка: иначе $&, $` и $' в данных раскроются
  html = html.replace(/href="\.?\/?favicon\.svg"/, () => `href="${uri}"`);
}

// выкидываем внешние подключения и вшиваем содержимое
html = html
  .replace(/<link[^>]+rel="stylesheet"[^>]*>/g, '')
  .replace(/<script[^>]+src="[^"]*app\.js"[^>]*><\/script>/g, '');

// ВАЖНО: замены только функциями. Строка-замена в String.replace
// раскрывает $&, $` и $' — а они встречаются в минифицированном бандле,
// из-за чего документ вставлял сам себя и файл распухал в разы.
// Пути к ассетам в бандле абсолютные (/media/, /avatars/),
// а с диска файл открывается по file:// — делаем их относительными.
// Список должен покрывать все папки ассетов в public.
const ASSET_DIRS = ['media', 'avatars'];

let safeJs = js.replace(/<\/script>/gi, () => '<\\/script>');
for (const dir of ASSET_DIRS) {
  safeJs = safeJs.replace(
    new RegExp(`(["'\`])\\/${dir}\\/`, 'g'),
    (_, q) => `${q}./${dir}/`
  );
}

html = html
  .replace('</head>', () => `<style>\n${css}\n</style>\n</head>`)
  // classic script, БЕЗ type="module" — модуль на file:// не загрузится
  .replace('</body>', () => `<script>\n${safeJs}\n</script>\n</body>`);

fs.writeFileSync(OUT, html);

const kb = (n) => (n / 1024).toFixed(0) + ' КБ';
console.log(`\n  ✓ ${OUT} — ${kb(Buffer.byteLength(html))}`);
console.log(`    шрифтов вшито: ${fonts}`);
console.log(`    внешних запросов: 0 — открывается двойным кликом\n`);
