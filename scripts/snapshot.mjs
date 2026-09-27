/**
 * Статический снимок страницы — чтобы показать сайт человеку или ассистенту,
 * не таща за собой React-бандл.
 *
 * Берёт уже отрендеренный DOM из dist-local/portfolio.html, выкидывает весь
 * JavaScript и «доводит» элементы, которые Framer Motion оставил невидимыми
 * (появление при скролле не сработало — прокрутки-то не было).
 *
 * Результат — один html без скриптов: открывается, читается, весит немного.
 *
 * Запуск: npm run snapshot
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME =
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SRC = path.resolve('dist-local/portfolio.html');
const OUT = 'dist-local/portfolio-static.html';

if (!fs.existsSync(SRC)) {
  console.error('Сначала собери страницу: npm run build:file');
  process.exit(1);
}
if (!fs.existsSync(CHROME)) {
  console.error('Не найден Google Chrome по пути:\n  ' + CHROME);
  process.exit(1);
}

let html = execFileSync(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--virtual-time-budget=8000',
    '--dump-dom',
    'file://' + SRC,
  ],
  { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] }
);

// 1. Вырезаем скрипты — снимок статический
const scripts = (html.match(/<script/g) || []).length;
html = html.replace(/<script[\s\S]*?<\/script>/gi, '');

// 2. Блоки ниже первого экрана остались скрытыми: наблюдатель до них
//    не дошёл, прокрутки в headless не было. Показываем их стилем.
const revealed = (html.match(/class="reveal(?![^"]*is-visible)/g) || []).length;
html = html.replace(
  '</head>',
  () =>
    '<style>.reveal{opacity:1!important;transform:none!important}</style>\n</head>'
);

// 3. Пометка в заголовке, чтобы снимок не путали с рабочей страницей
html = html.replace(
  /<title>([^<]*)<\/title>/,
  (_, title) => `<title>${title} — статический снимок</title>`
);

fs.writeFileSync(OUT, html);

const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
console.log(`\n  ✓ ${OUT} — ${kb} КБ`);
console.log(`    скриптов вырезано: ${scripts}`);
console.log(`    секций проявлено:  ${revealed}\n`);
